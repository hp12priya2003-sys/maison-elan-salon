# MAISON ÉLAN — Premium Salon Website

A responsive, editorial-style salon website built with **Next.js App Router, TypeScript, Tailwind CSS v4 and Framer Motion**. Components are kept in `components/SalonSite.tsx`, and the design tokens / responsive styles are in `app/globals.css` so the project is easy to edit.

## Requirements
- Node.js 20.9+ (recommended)
- npm

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Production build:

```bash
npm run build
npm start
```

## What's included
- Cinematic animated hero and responsive navigation
- Editorial intro and four signature service cards
- Interactive service detail modals
- Beauty Atelier consultation entry point
- Specialist profiles
- Filterable lookbook and image lightbox
- Studio story, testimonial placeholders and CTA
- Luxury footer and floating WhatsApp contact
- Appointment enquiry form that opens WhatsApp with pre-filled details
- Responsive mobile layout and reduced-motion support
- User-supplied salon inspiration screenshot saved at `public/images/salon-inspiration.png` and shown as a small inspiration card in the hero

## Before using this for a real client
This is a polished portfolio starter, not a fully connected salon booking backend. Appointment enquiries are sent to WhatsApp; the salon must reply to confirm availability. Replace the demo brand, sample reviews, service prices, stylist names, address/hours, email and social links with verified client information. The Unsplash image URLs are remote images and require an internet connection. Check image licensing and replace imagery with client-approved assets before commercial launch.

### WhatsApp number
The current enquiry destination is `+91 70192 60151`. Update `WHATSAPP_NUMBER` at the top of `components/SalonSite.tsx` if the client needs a different country code or number. Keep the number in international format without `+`, spaces or punctuation.

### Main files
- `app/page.tsx` — page entry
- `app/layout.tsx` — metadata and root layout
- `app/globals.css` — full design system and responsive styling
- `components/SalonSite.tsx` — page sections, animations, modals, lookbook and booking interactions
- `public/images/salon-inspiration.png` — supplied reference image

## Images
Images use Unsplash image URLs and are not bundled locally. If a remote image changes or becomes unavailable, replace its URL in the `images` object at the top of `components/SalonSite.tsx`. The hero also contains the provided salon-inspiration screenshot as a small visual-direction card; remove the `.hero-inspiration` element if the client-facing production version should not display a reference screenshot.

## Recent updates

- Specialist cards now open a detailed profile modal with biography, experience, approach, areas of expertise, featured work and a booking CTA.
- Expanded the salon philosophy section to explain the consultation-first approach, personal care, transparent expectations and reasons clients may return.
- Added an interactive FAQ section directly after testimonials.
- Added a location/visit section after the FAQ with appointment, hours and directions enquiry links.
- Added responsive styles for the new specialist profile, FAQ and location sections.

## Demo content to replace before a real launch

This is a portfolio concept. The specialist profiles, sample testimonials, starting prices and Dubai location are demonstration content. Replace them with client-approved details before publishing. The booking form opens WhatsApp with a prefilled enquiry; it does not confirm or store appointments automatically.

## Install and run

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`. The `node_modules` directory is intentionally excluded from the ZIP and ignored by Git; `npm install` creates it on your machine.
