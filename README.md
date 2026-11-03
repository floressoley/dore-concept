# Doré

A concept website for a fictional Mediterranean real-estate agency. It is a portfolio piece: a complete design system and a working front end, with no real business, listings or data behind it.

Designed and built by Soley Flores, Lead Product Designer and front-end developer.

> **Concept project.** Doré is not a real agency. Every home, price, person and testimonial is made up, and none of the forms send or store anything.

## What is in it

| Page | Route | Notes |
|---|---|---|
| Home | `/` | Video hero with search, selected homes, areas, team carousel, journal |
| Homes | `/buy` | Area tabs, search and filters on top, sorting, show more. Filters live in the URL |
| Home detail | `/buy/:slug` | Photo, specs, viewing request, similar homes |
| Services | `/services` | Five services and a contact form |
| Journal | `/guides` | Featured story, stories by category, a quote |
| Article | `/guides/:slug`, `/journal/:slug` | Story template with related stories |
| Sell | `/sell` | Video hero with a valuation form, steps, comparison, FAQ |
| Contact | `/contact` | Details and a message form |
| About | `/about` | Story, principles, team |
| Privacy, Terms | `/privacy`, `/terms` | Short placeholder legal pages |
| Design system | `/system`, `/components` | Foundations and every component with its states |

## Stack

- React 19 and TypeScript
- Vite 8
- Tailwind CSS v4, with the design tokens defined in `src/styles/index.css`
- React Router 7
- Phosphor icons
- Sedan and Nata Sans, self-hosted through Fontsource

There is no backend, no CMS and no analytics.

## Run it

You need Node 20 or newer. The app lives in the `dore-prototype` folder.

```bash
cd dore-prototype
npm install
npm run dev        # http://localhost:5173
npm run build      # type check, then production build into dist/
npm run preview    # serve the production build locally
npm run lint
```

## Project layout

```
dore-prototype/
  public/            static files: favicons, videos, robots.txt, _redirects
  src/
    assets/          photos, team portraits, journal photos, video posters, brand marks
    components/      the design system: Button, Footer, Carousel, forms, cards and more
    data/            homes, articles and team content
    lib/             small hooks: page titles, section animation
    pages/           one file per route
    styles/index.css tokens: colour, type scale, spacing, radius, breakpoints
```

## Design system

- **Colour.** Linen is the base. Each inner page has its own coloured band under the navigation, drawn from Vino Bianco, Limone, Azzuro, Citrine, Pear Tree, Clay, Terracotta, Cerulean and Hillside. Ink is the text colour. Terracotta is a fill only, and small Terracotta text uses a darker shade for contrast.
- **Type.** Eight sizes: 72, 56, 40, 28, 16, 14, 12 and 11. Headings in Sedan, everything else in Nata Sans. No italics.
- **Breakpoints.** 393 is the base, then 768, 1040 and 1440.
- **Motion.** Sections fade in as they scroll into view, and a thin progress line runs on each page change. Everything switches off for visitors who ask their device for reduced motion.
- **Accessibility.** Text and control contrast was checked against WCAG 2.1 AA, every page has one main heading and a skip link, and forms have real labels.

Open `/system` and `/components` while the dev server runs to see all of it.

## Deploy

The site is a static single-page app. Build it, then serve `dist/` with every unknown path rewritten to `index.html`. Both rewrite files are already in the project.

The app is in a subfolder, so tell your host where it is.

**Vercel**
1. Import the repository.
2. Set **Root Directory** to `dore-prototype`.
3. Framework preset: Vite. Build command `npm run build`, output directory `dist`.
4. `vercel.json` handles the rewrites.

**Netlify**
1. Import the repository.
2. Set **Base directory** to `dore-prototype`, build command `npm run build`, publish directory `dist` (Netlify reads it relative to the base directory).
3. `public/_redirects` handles the rewrites.

### Before you make it public

The site is set up so that search engines ignore it. When you are ready to show it openly:

1. Delete the `noindex, nofollow` meta tag in `dore-prototype/index.html`.
2. Replace the contents of `dore-prototype/public/robots.txt` with `User-agent: *` and `Allow: /`.
3. If you move to a custom domain, update the `og:url` and `og:image` addresses in `index.html`. The preview image is `public/og-dore.png`, 2400 by 1260.
4. Check `CREDITS.md`: the source and licence of the property photos, team portraits, journal photos, videos and illustrations are still to be confirmed.

## Credits

Photography, video, illustrations, fonts and icons are listed in [`dore-prototype/CREDITS.md`](dore-prototype/CREDITS.md).
