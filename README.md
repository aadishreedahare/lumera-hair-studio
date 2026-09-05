# LUMÉRA Hair Studio

A premium, editorial salon website concept built with React, React Router and plain CSS. This is a self-initiated portfolio project for a **fictional** business — no real salon, stylists, prices, reviews or client photos are involved.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

```bash
npm run build      # production build to /dist
npm run preview    # preview the production build locally
```

Requires Node 18+.

## Project structure

```
src/
  components/   Navbar, Hero, ServiceCard, TeamCard, GalleryGrid, TestimonialCard,
                BookingForm, Footer, FAQAccordion, CTASection, PageHero, Reveal...
  pages/        Home, About, Services, Team, Gallery, NewClients, Contact, Book, NotFound
  data/         Editable content — services, team, gallery, testimonials, FAQ, salon info
  styles/       Design tokens (variables.css), reset (base.css), shared utility classes
public/images/  Locally generated editorial placeholder imagery (see images/README.txt)
```

All copy, pricing, hours, stylists and testimonials live in `src/data/*.js` — edit those files to reskin the content without touching components.

## About the imagery

Every image in `public/images` is generated locally (soft gradients, grain and line work in the site's ivory / taupe / espresso palette) rather than sourced from stock photography, so the project has zero external image dependencies and works fully offline. Swap any file for real photography before using this as a live business site — keep the same filename, or update the path in the relevant `src/data/*.js` file.

## Routes

| Path | Page |
| --- | --- |
| `/` | Home |
| `/about` | About |
| `/services` | Services & pricing |
| `/team` | Our team |
| `/gallery` | Filterable gallery with lightbox |
| `/new-clients` | New client guide |
| `/contact` | Contact form, map, FAQ |
| `/book` | Multi-step appointment booking (demo — no real booking or payment) |

## Portfolio description

> Self-initiated concept project for a fictional premium hair studio. Designed and developed a responsive salon website with service discovery, stylist profiles, gallery browsing and appointment-booking flow.
