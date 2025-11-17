## Seminaarityö – Next.js + Tailwind setup

This repository hosts a Next.js 16 (App Router) project configured with TypeScript and Tailwind CSS for the *Seminaarityö: Yhteydenottolomake* assignment.

### Available scripts

- `npm run dev` – start the local development server on `http://localhost:3000`
- `npm run build` – build the production bundle
- `npm run start` – run the production server
- `npm run lint` – run ESLint with Next.js rules

### Project structure

- `app/` – App Router pages, shared layout, and global styles
- `components/` – shared UI components (currently empty)
- `data/contact-messages.json` – placeholder data store for contact submissions
- `public/` – static assets served at the root

### Styling

Tailwind CSS is configured in `tailwind.config.js` with standard base/component/utility layers imported via `app/globals.css`. PostCSS (with Autoprefixer) runs automatically through Next.js.

### Next steps

1. Implement the `/contact` route and form UI.
2. Persist form submissions into `data/contact-messages.json` or another storage layer.
3. Add validation, accessibility, and integration tests as the form evolves.

Happy building!
