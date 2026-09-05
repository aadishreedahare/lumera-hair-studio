#!/usr/bin/env python3
"""
Generates all placeholder editorial imagery for the LUMERA Hair Studio
portfolio site. Everything is produced locally (soft gradients, film
grain, light blooms and hand-drawn line work) so the project ships with
zero external image dependencies. Swap any file in public/images for
real photography later -- filenames / aspect ratios are documented in
public/images/README.txt.
"""
import math
import os
import random

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageChops, ImageOps, ImageEnhance

random.seed(7)
np.random.seed(7)

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public", "images")

SERIF = "/usr/share/fonts/truetype/google-fonts/Lora-Variable.ttf"
SERIF_ITALIC = "/usr/share/fonts/truetype/google-fonts/Lora-Italic-Variable.ttf"

# ---------------------------------------------------------------- palette --
IVORY = (250, 246, 239)
BEIGE = (237, 228, 211)
BEIGE_DEEP = (227, 213, 191)
TAUPE = (169, 150, 125)
MOCHA = (138, 116, 96)
ESPRESSO = (73, 52, 40)
ESPRESSO_DEEP = (52, 37, 29)
CHARCOAL = (42, 38, 34)
NEAR_BLACK = (30, 27, 24)
GOLD = (196, 160, 100)
GOLD_SOFT = (214, 186, 140)

def hexs(c):
    return "#%02x%02x%02x" % c

def lerp(a, b, t):
    return a + (b - a) * t

def font(path, size):
    return ImageFont.truetype(path, size)

# --------------------------------------------------------------- gradient --
def gradient(w, h, c1, c2, angle=45.0):
    """Linear gradient between c1 -> c2 at the given angle, vectorised."""
    a = math.radians(angle)
    dx, dy = math.cos(a), math.sin(a)
    xs = np.linspace(0, 1, w)
    ys = np.linspace(0, 1, h)
    gx, gy = np.meshgrid(xs, ys)
    proj = gx * dx + gy * dy
    proj -= proj.min()
    proj /= (proj.max() + 1e-9)
    out = np.zeros((h, w, 3), dtype=np.float64)
    for i in range(3):
        out[..., i] = c1[i] + (c2[i] - c1[i]) * proj
    return out

def radial(w, h, center, c_in, c_out, radius):
    cx, cy = center
    xs = np.arange(w)
    ys = np.arange(h)
    gx, gy = np.meshgrid(xs, ys)
    d = np.sqrt((gx - cx) ** 2 + (gy - cy) ** 2) / radius
    d = np.clip(d, 0, 1)
    out = np.zeros((h, w, 3), dtype=np.float64)
    for i in range(3):
        out[..., i] = c_in[i] + (c_out[i] - c_in[i]) * d
    return out

def to_img(arr):
    return Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8), "RGB")

def add_grain(img, amount=7, mono=0.75):
    arr = np.asarray(img).astype(np.float64)
    h, w = arr.shape[:2]
    mono_noise = np.random.normal(0, amount, (h, w, 1))
    col_noise = np.random.normal(0, amount, (h, w, 3))
    noise = mono * mono_noise + (1 - mono) * col_noise
    arr = arr + noise
    return to_img(arr)

def vignette(img, strength=0.32, feather=1.35):
    w, h = img.size
    xs = np.linspace(-1, 1, w)
    ys = np.linspace(-1, 1, h)
    gx, gy = np.meshgrid(xs, ys)
    d = np.sqrt(gx ** 2 + gy ** 2) / feather
    mask = 1 - np.clip(d, 0, 1) * strength
    arr = np.asarray(img).astype(np.float64)
    for i in range(3):
        arr[..., i] *= mask
    return to_img(arr)

def light_bloom(img, center, color, radius, opacity=0.35):
    w, h = img.size
    layer = Image.new("RGB", (w, h), color)
    mask = Image.new("L", (w, h), 0)
    md = ImageDraw.Draw(mask)
    md.ellipse(
        [center[0] - radius, center[1] - radius, center[0] + radius, center[1] + radius],
        fill=int(255 * opacity),
    )
    mask = mask.filter(ImageFilter.GaussianBlur(radius * 0.65))
    return Image.composite(layer, img, mask)

def hairline_border(img, inset_ratio=0.045, color=(255, 255, 255), alpha=70, width=1):
    w, h = img.size
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    ix, iy = int(w * inset_ratio), int(h * inset_ratio)
    d.rectangle([ix, iy, w - ix, h - iy], outline=color + (alpha,), width=width)
    base = img.convert("RGBA")
    return Image.alpha_composite(base, layer).convert("RGB")

def flowing_strands(w, h, n, color, alpha=26, amp_range=(30, 90), thick_range=(2, 5), blur=1.6, seed_offset=0):
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    rnd = random.Random(1000 + seed_offset)
    for i in range(n):
        amp = rnd.uniform(*amp_range)
        thick = rnd.uniform(*thick_range)
        phase = rnd.uniform(0, math.tau)
        freq = rnd.uniform(1.1, 2.4)
        x0 = w * (i + 0.5) / n + rnd.uniform(-w * 0.02, w * 0.02)
        pts = []
        steps = 60
        for s in range(steps + 1):
            t = s / steps
            y = t * h
            x = x0 + amp * math.sin(freq * t * math.pi + phase)
            pts.append((x, y))
        a = int(alpha * rnd.uniform(0.5, 1.0))
        d.line(pts, fill=color + (a,), width=int(thick))
    layer = layer.filter(ImageFilter.GaussianBlur(blur))
    base = Image.new("RGBA", (w, h))
    base.paste(layer, (0, 0), layer)
    return base

def composite_rgba_over(base_rgb, rgba_layer):
    b = base_rgb.convert("RGBA")
    out = Image.alpha_composite(b, rgba_layer)
    return out.convert("RGB")

def blade_streak(w, h, color, alpha=40, angle=-18, band_w=0.09, pos=0.62, blur=60):
    layer = Image.new("L", (w, h), 0)
    d = ImageDraw.Draw(layer)
    cx = w * pos
    a = math.radians(angle)
    length = int(math.hypot(w, h) * 1.6)
    dx, dy = math.cos(a), math.sin(a)
    px, py = -dy, dx
    bw = w * band_w
    x0, y0 = cx - dx * length / 2, h / 2 - dy * length / 2
    x1, y1 = cx + dx * length / 2, h / 2 + dy * length / 2
    poly = [
        (x0 + px * bw, y0 + py * bw),
        (x1 + px * bw, y1 + py * bw),
        (x1 - px * bw, y1 - py * bw),
        (x0 - px * bw, y0 - py * bw),
    ]
    d.polygon(poly, fill=alpha)
    layer = layer.filter(ImageFilter.GaussianBlur(blur))
    solid = Image.new("RGB", (w, h), color)
    return Image.composite(solid, Image.new("RGB", (w, h), (0, 0, 0)), layer), layer

def screen_blend(base, add_rgb, mask_l):
    b = np.asarray(base).astype(np.float64)
    a = np.asarray(add_rgb).astype(np.float64)
    m = (np.asarray(mask_l).astype(np.float64) / 255.0)[..., None]
    screened = 255 - (255 - b) * (255 - a) / 255.0
    out = b * (1 - m) + screened * m
    return to_img(out)

def save(img, name, quality=86):
    path = os.path.join(OUT, name)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    img.save(path, "JPEG", quality=quality, optimize=True)
    print("wrote", name, img.size)

# ----------------------------------------------------------- style presets --
PALETTES = {
    "espresso": (ESPRESSO_DEEP, CHARCOAL),
    "mocha": (MOCHA, ESPRESSO),
    "taupe_beige": (TAUPE, BEIGE_DEEP),
    "ivory_beige": (IVORY, BEIGE),
    "beige_taupe": (BEIGE_DEEP, TAUPE),
    "gold_espresso": (GOLD_SOFT, ESPRESSO_DEEP),
    "charcoal_black": (CHARCOAL, NEAR_BLACK),
}

def base_card(w, h, palette_key, angle=128, grain=6, vig=0.28):
    c1, c2 = PALETTES[palette_key]
    img = to_img(gradient(w, h, c1, c2, angle))
    img = vignette(img, strength=vig)
    img = ImageEnhance.Contrast(img).enhance(1.14)
    img = ImageEnhance.Color(img).enhance(1.16)
    img = add_grain(img, amount=grain)
    return img

def style_diagonal(w, h, palette_key, bloom=True, **kw):
    img = base_card(w, h, palette_key, **kw)
    if bloom:
        c1, c2 = PALETTES[palette_key]
        bloom_c = tuple(min(255, int(c * 1.15 + 25)) for c in c1)
        img = light_bloom(img, (int(w * 0.18), int(h * 0.14)), bloom_c, radius=int(max(w, h) * 0.55), opacity=0.28)
        img = add_grain(img, amount=3)
    return img

def style_strands(w, h, palette_key, n=9, light=True, **kw):
    img = base_card(w, h, palette_key, **kw)
    c1, c2 = PALETTES[palette_key]
    line_color = tuple(min(255, int(c * 1.3 + 30)) for c in c2) if light else tuple(int(c * 0.6) for c in c1)
    layer = flowing_strands(w, h, n, line_color, alpha=58, amp_range=(w * 0.035, w * 0.1),
                             thick_range=(2, 6), blur=1.6)
    img = composite_rgba_over(img, layer)
    line_color2 = tuple(max(0, int(c * 0.55)) for c in c1)
    layer2 = flowing_strands(w, h, max(3, n // 3), line_color2, alpha=40, amp_range=(w * 0.05, w * 0.12),
                              thick_range=(2, 4), blur=2.4, seed_offset=77)
    img = composite_rgba_over(img, layer2)
    return img

def style_bands(w, h, palette_key, **kw):
    c1, c2 = PALETTES[palette_key]
    img = to_img(gradient(w, h, c1, c2, angle=90))
    img = img.filter(ImageFilter.GaussianBlur(2))
    img = vignette(img, strength=0.22)
    img = add_grain(img, amount=6)
    return img

def style_radial(w, h, palette_key, **kw):
    c1, c2 = PALETTES[palette_key]
    img = to_img(radial(w, h, (int(w * 0.5), int(h * 0.42)), c1, c2, radius=max(w, h) * 0.75))
    img = add_grain(img, amount=6)
    img = vignette(img, strength=0.3)
    return img

def style_sweep(w, h, palette_key, angle=-16, **kw):
    img = base_card(w, h, palette_key, angle=125, **kw)
    c1, c2 = PALETTES[palette_key]
    streak_c = tuple(min(255, int(c * 1.3 + 35)) for c in c2)
    _, mask = blade_streak(w, h, streak_c, alpha=95, angle=angle, band_w=0.045, pos=0.6, blur=int(w * 0.035))
    img = screen_blend(img, Image.new("RGB", (w, h), streak_c), mask)
    _, mask2 = blade_streak(w, h, streak_c, alpha=45, angle=angle, band_w=0.12, pos=0.3, blur=int(w * 0.08))
    img = screen_blend(img, Image.new("RGB", (w, h), streak_c), mask2)
    img = add_grain(img, amount=3)
    return img

def monogram_card(w, h, palette_key, letter, angle=135, size_ratio=0.62, pos=("center", "center"),
                   text_color=None, alpha=235, **kw):
    img = base_card(w, h, palette_key, angle=angle, **kw)
    c1, c2 = PALETTES[palette_key]
    tc = text_color or tuple(min(255, int(c * 1.4 + 40)) for c in c2)
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    f = font(SERIF, int(h * size_ratio))
    bbox = d.textbbox((0, 0), letter, font=f)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    px = w / 2 - tw / 2 - bbox[0] if pos[0] == "center" else w * 0.08
    py = h / 2 - th / 2 - bbox[1] if pos[1] == "center" else h * 0.55
    d.text((px, py), letter, font=f, fill=tc + (alpha,))
    img = composite_rgba_over(img, layer)
    img = hairline_border(img)
    return img

def avatar_monogram(size, palette_key, initials):
    img = base_card(size, size, palette_key, angle=140, grain=5, vig=0.2)
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).ellipse([0, 0, size, size], fill=255)
    circ = Image.new("RGB", (size, size), IVORY)
    circ.paste(img, (0, 0), mask)
    d = ImageDraw.Draw(circ)
    c1, c2 = PALETTES[palette_key]
    tc = tuple(min(255, int(c * 1.4 + 40)) for c in c2)
    f = font(SERIF, int(size * 0.34))
    bbox = d.textbbox((0, 0), initials, font=f)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    d.text((size / 2 - tw / 2 - bbox[0], size / 2 - th / 2 - bbox[1]), initials, font=f, fill=tc)
    ring = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    ImageDraw.Draw(ring).ellipse([1, 1, size - 2, size - 2], outline=(255, 255, 255, 90), width=1)
    circ = Image.alpha_composite(circ.convert("RGBA"), ring).convert("RGB")
    out = Image.new("RGB", (size, size), (255, 255, 255))
    out.paste(circ, (0, 0), mask)
    return out

# --------------------------------------------------------------- specific --
def make_hero():
    w, h = 2400, 1500
    img = to_img(gradient(w, h, ESPRESSO_DEEP, NEAR_BLACK, angle=118))
    img = light_bloom(img, (int(w * 0.22), int(h * 0.22)), GOLD_SOFT, radius=int(w * 0.55), opacity=0.22)
    img = light_bloom(img, (int(w * 0.85), int(h * 0.85)), MOCHA, radius=int(w * 0.5), opacity=0.16)
    layer = flowing_strands(w, h, 14, (214, 186, 140), alpha=16, amp_range=(60, 160),
                             thick_range=(1, 3), blur=3, seed_offset=5)
    img = composite_rgba_over(img, layer)
    img = vignette(img, strength=0.4, feather=1.5)
    img = add_grain(img, amount=6)
    save(img, "hero.jpg", quality=88)

def make_page_hero(name, palette_key, angle, seed):
    w, h = 2200, 900
    img = style_sweep(w, h, palette_key, angle=angle, grain=7)
    random.seed(seed)
    save(img, f"pages/{name}-hero.jpg", quality=87)

def make_intro():
    w, h = 1400, 1750
    img = style_strands(w, h, "beige_taupe", n=11, grain=6)
    save(img, "intro-editorial.jpg")

def make_services():
    specs = [
        ("service-color", "gold_espresso", style_sweep, dict(angle=-20)),
        ("service-cuts", "charcoal_black", style_sweep, dict(angle=18)),
        ("service-extensions", "mocha", style_strands, dict(n=10)),
        ("service-treatments", "ivory_beige", style_radial, dict()),
    ]
    for name, pal, fn, kw in specs:
        img = fn(1000, 1250, pal, **kw)
        save(img, f"services/{name}.jpg")

def make_about():
    save(style_diagonal(1800, 1000, "taupe_beige", angle=100), "pages/about-hero.jpg")
    save(style_strands(1100, 1350, "mocha", n=9), "pages/about-1.jpg")
    save(style_radial(1100, 1350, "beige_taupe"), "pages/about-2.jpg")

def make_new_clients():
    save(style_diagonal(1600, 1300, "espresso", angle=140), "pages/new-clients.jpg")

def make_contact():
    save(style_bands(1600, 1100, "taupe_beige"), "pages/contact-hero.jpg")

def make_team():
    people = [
        ("ananya-mehta", "AM", "gold_espresso"),
        ("rhea-kapoor", "RK", "taupe_beige"),
        ("mira-shah", "MS", "mocha"),
        ("tara-deshmukh", "TD", "beige_taupe"),
    ]
    for slug, initials, pal in people:
        img = monogram_card(900, 1125, pal, initials, angle=132, size_ratio=0.5, grain=6)
        save(img, f"team/{slug}.jpg")

def make_testimonial_avatars():
    people = [("meera-s", "MS", "taupe_beige"), ("kavya-r", "KR", "gold_espresso"), ("riya-m", "RM", "mocha")]
    for slug, initials, pal in people:
        img = avatar_monogram(300, pal, initials)
        save(img, f"testimonials/{slug}.jpg", quality=90)

GALLERY = [
    ("color-01", "Color", "gold_espresso", style_sweep, dict(angle=-14), 1000, 1250),
    ("color-02", "Color", "mocha", style_diagonal, dict(), 1000, 1000),
    ("color-03", "Color", "espresso", style_radial, dict(), 1000, 1250),
    ("color-04", "Color", "charcoal_black", style_sweep, dict(angle=22), 1200, 900),
    ("cuts-01", "Cuts", "charcoal_black", style_sweep, dict(angle=16), 1000, 1250),
    ("cuts-02", "Cuts", "taupe_beige", style_diagonal, dict(), 1000, 1000),
    ("cuts-03", "Cuts", "espresso", style_sweep, dict(angle=-24), 1200, 900),
    ("cuts-04", "Cuts", "beige_taupe", style_radial, dict(), 1000, 1250),
    ("balayage-01", "Balayage", "beige_taupe", style_bands, dict(), 1000, 1250),
    ("balayage-02", "Balayage", "taupe_beige", style_bands, dict(), 1200, 900),
    ("balayage-03", "Balayage", "gold_espresso", style_bands, dict(), 1000, 1000),
    ("balayage-04", "Balayage", "mocha", style_bands, dict(), 1000, 1250),
    ("extensions-01", "Extensions", "mocha", style_strands, dict(n=9), 1000, 1250),
    ("extensions-02", "Extensions", "espresso", style_strands, dict(n=8), 1200, 900),
    ("extensions-03", "Extensions", "charcoal_black", style_strands, dict(n=10), 1000, 1000),
    ("styling-01", "Styling", "taupe_beige", style_radial, dict(), 1000, 1250),
    ("styling-02", "Styling", "gold_espresso", style_diagonal, dict(), 1200, 900),
    ("styling-03", "Styling", "beige_taupe", style_radial, dict(), 1000, 1000),
    ("curly-01", "Curly Hair", "mocha", style_strands, dict(n=13), 1000, 1250),
    ("curly-02", "Curly Hair", "espresso", style_strands, dict(n=12), 1000, 1000),
    ("curly-03", "Curly Hair", "taupe_beige", style_strands, dict(n=14), 1200, 900),
    ("curly-04", "Curly Hair", "charcoal_black", style_strands, dict(n=11), 1000, 1250),
]

def make_gallery():
    for slug, cat, pal, fn, kw, w, h in GALLERY:
        img = fn(w, h, pal, **kw)
        save(img, f"gallery/{slug}.jpg")

def make_favicon():
    size = 256
    img = to_img(gradient(size, size, ESPRESSO_DEEP, NEAR_BLACK, angle=135))
    d = ImageDraw.Draw(img)
    f = font(SERIF, int(size * 0.56))
    bbox = d.textbbox((0, 0), "L", font=f)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    d.text((size / 2 - tw / 2 - bbox[0], size / 2 - th / 2 - bbox[1]), "L", font=f, fill=GOLD_SOFT)
    img.save(os.path.join(OUT, "..", "favicon.png"))
    print("wrote favicon.png")

def main():
    os.makedirs(OUT, exist_ok=True)
    make_hero()
    make_intro()
    make_services()
    make_about()
    make_new_clients()
    make_contact()
    make_page_hero("services", "espresso", 140, 11)
    make_page_hero("team", "taupe_beige", 100, 12)
    make_page_hero("gallery", "mocha", 120, 13)
    make_page_hero("book", "gold_espresso", 150, 14)
    make_team()
    make_testimonial_avatars()
    make_gallery()
    make_favicon()

    with open(os.path.join(OUT, "README.txt"), "w") as fh:
        fh.write(
            "All imagery in this folder is generated locally (soft gradients, grain,\n"
            "and line work) as premium editorial placeholders for this concept\n"
            "project -- no external stock photography is used. Swap any file for\n"
            "real photography before using this as a live business site; keep the\n"
            "same filename or update the path in src/data/*.js.\n"
        )

if __name__ == "__main__":
    main()
