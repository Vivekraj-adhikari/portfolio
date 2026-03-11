# ML Portfolio

A dark terminal-aesthetic portfolio for Machine Learning Engineers, built with **React + Vite + TailwindCSS**.

## Getting Started

```bash
npm install
npm run dev      # dev server at http://localhost:5173
npm run build    # production build -> dist/
npm run preview  # preview the build
```

## Project Structure

```
ml-portfolio/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/               # images, icons
│   ├── components/
│   │   ├── Navbar.jsx        # fixed nav, scroll-aware
│   │   ├── NeuralCanvas.jsx  # animated canvas bg
│   │   ├── Hero.jsx          # hero + typewriter
│   │   ├── Projects.jsx      # filterable project grid
│   │   ├── ProjectCard.jsx   # individual card
│   │   ├── Skills.jsx        # skills grid
│   │   ├── About.jsx         # bio + terminal card
│   │   ├── Contact.jsx       # contact CTA
│   │   ├── Footer.jsx
│   │   └── SectionHeader.jsx # reusable heading
│   ├── data/
│   │   ├── projects.js       # project data + tag colors
│   │   └── skills.js         # skills by category
│   ├── hooks/
│   │   └── useTypewriter.js  # custom typewriter hook
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## Customisation

- **Projects**: edit `src/data/projects.js`
- **Skills**: edit `src/data/skills.js`
- **Personal info / bio**: `src/components/Hero.jsx` and `src/components/About.jsx`
- **Email**: `src/components/Contact.jsx`

## Deployment

Vercel (zero config): `npx vercel`
Netlify: drag `dist/` folder after `npm run build`
