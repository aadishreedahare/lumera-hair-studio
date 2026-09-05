export const featuredServices = [
  {
    slug: "custom-hair-color",
    title: "Custom Hair Color",
    description:
      "Personalized color designed to complement your skin tone, lifestyle and desired maintenance level.",
    image: "/images/services/service-color.jpg",
  },
  {
    slug: "signature-haircuts",
    title: "Signature Haircuts",
    description:
      "Precision cuts tailored to your natural texture, face shape and everyday routine.",
    image: "/images/services/service-cuts.jpg",
  },
  {
    slug: "extensions",
    title: "Extensions",
    description:
      "Premium extensions designed for natural-looking length, volume and seamless blending.",
    image: "/images/services/service-extensions.jpg",
  },
  {
    slug: "hair-treatments",
    title: "Hair Treatments",
    description:
      "Customized treatments focused on hydration, strength, shine and overall hair health.",
    image: "/images/services/service-treatments.jpg",
  },
];

export const serviceMenu = [
  {
    category: "Cut + Style",
    items: [
      { name: "Signature Haircut", price: "₹1,200+" },
      { name: "Extended Haircut", price: "₹1,600+" },
      { name: "Blowout", price: "₹900+" },
      { name: "Extended Blowout", price: "₹1,100+" },
      { name: "Event Styling", price: "₹2,000+" },
    ],
  },
  {
    category: "Color",
    items: [
      { name: "Signature Gloss", price: "₹1,500+" },
      { name: "Root Refresh", price: "₹2,000+" },
      { name: "Full Color", price: "₹3,500+" },
      { name: "Dimensional Color", price: "₹4,500+" },
      { name: "Balayage", price: "₹5,500+" },
      { name: "Full Highlights", price: "₹5,000+" },
      { name: "Color Correction", price: "₹2,500/hour" },
    ],
  },
  {
    category: "Treatments",
    items: [
      { name: "Hydration Ritual", price: "₹1,500+" },
      { name: "Repair Treatment", price: "₹1,800+" },
      { name: "Scalp Detox", price: "₹1,200+" },
      { name: "Bond Repair Treatment", price: "₹2,000+" },
    ],
  },
  {
    category: "Extensions",
    items: [
      { name: "Tape Extensions", price: "Consultation Required" },
      { name: "K-Tip Extensions", price: "Consultation Required" },
      { name: "Volume Weft Extensions", price: "Consultation Required" },
      { name: "Extension Maintenance", price: "₹2,500+" },
    ],
  },
  {
    category: "Curl Services",
    items: [
      { name: "Curl Cut", price: "₹2,000+" },
      { name: "Curl Refresh", price: "₹1,200+" },
      { name: "Curl Treatment", price: "₹1,800+" },
      { name: "Curl Styling", price: "₹1,000+" },
    ],
  },
];

// Flat list used by the booking flow's "choose a service" step.
export const bookableServices = serviceMenu.flatMap((group) =>
  group.items.map((item) => ({ ...item, category: group.category }))
);
