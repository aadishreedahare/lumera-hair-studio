# LUMÉRA Hair Studio

A website for a fictional hair salon in Pune, built with React, React Router and plain CSS.
It's a portfolio project: the salon, stylists, prices and reviews are all made up.

**Pages:** Home, About, Services & pricing, Team, Gallery, New clients, Contact, Book.

## Features

- Multi-step booking flow: service → stylist → date → time → details → confirmation
  (front-end only, nothing is actually booked)
- Gallery with category filters and a keyboard-friendly lightbox
- "Book with this stylist" links that pre-select the stylist in the booking form
- Scroll-in animations using `IntersectionObserver`
- Responsive layout with a full-screen mobile menu
- All content (services, prices, team, FAQ, hours) lives in `src/data/`, so text can be changed
  without touching components

## Running it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build in dist/
npm run lint
```

Needs Node 18+. Set up for Vercel: `vercel.json` sends every route to `index.html` so
React Router works on refresh.

## Structure

```
src/
  components/   Navbar, Hero, BookingForm, GalleryGrid, FAQAccordion, cards...
  pages/        One file per route
  data/         Site content
  hooks/        useReveal (scroll animation)
  styles/       CSS variables, base styles, shared utility classes
public/images/  Photos, resized for the web
```

Photos are free stock images. Swap them for real photos if this is ever used for a real salon.
