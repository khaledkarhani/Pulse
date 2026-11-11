# Pulse — Medical Research Digest

> A frontend web application where doctors publish readable summaries of recent medical studies, and patients join discussions beneath them.

Pulse is a submission for the **Web2 course project**. It implements the *Dr. Online* theme with a research-digest focus — doctors post, patients read, both discuss.

**Live demo:** [pulse.vercel.app](https://pulse-gamma-flax.vercel.app/) 
**Repository:** [github.com/YOUR-USERNAME/pulse](https://github.com/khaledkarhani/pulse) 

---

## Features

- **6 pages** — Home, Studies, Study detail (dynamic route), Features, About, Contact, plus a 404
- **Dynamic routing** — every study has its own URL (`/studies/:id`)
- **Search & filter** — live keyword search and category filters on the Studies page
- **Mock authentication** — register as a patient or doctor; sessions persist via `localStorage`
- **Doctor verification** — doctor comments display a verified specialty badge
- **Discussion threads** — signed-in users can comment on any study; authors can delete their own
- **Responsive** — tested on desktop, tablet, and mobile viewports
- **Dark-mode-first design** — custom Tailwind v4 CSS-first theme with cyan accent

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Build tool | Vite 8 |
| Styling | Tailwind CSS v4 (CSS-first config) |
| Routing | React Router v6 |
| State | React Context + `localStorage` |
| Hosting | Vercel |
| Version control | Git + GitHub |

---

## Setup

### Prerequisites

- Node.js 20+
- npm 10+
- Git

### Install and run locally

```bash
# Clone
git clone https://github.com/khaledkarhani/pulse.git
cd pulse/my-app

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Build for production

```bash
npm run build
npm run preview
```

---

## Project structure

my-app/
├── public/
│ └── favicon.svg
├── src/
│ ├── components/
│ │ ├── AuthModal.jsx # Sign-in / register modal
│ │ ├── Discussion.jsx # Comment threads
│ │ ├── Footer.jsx
│ │ ├── Layout.jsx # Shared page shell
│ │ ├── Navbar.jsx # Sticky top nav + user menu
│ │ ├── ScrollToTop.jsx # Route-change scroll reset
│ │ └── StudyCard.jsx # Study preview card
│ ├── context/
│ │ └── AuthContext.jsx # Auth state + modal control
│ ├── data/
│ │ ├── discussions.js # Comment CRUD (localStorage)
│ │ └── studies.js # Seed study data
│ ├── pages/
│ │ ├── About.jsx
│ │ ├── Contact.jsx
│ │ ├── Features.jsx
│ │ ├── Home.jsx
│ │ ├── NotFound.jsx
│ │ ├── Studies.jsx
│ │ └── StudyDetails.jsx # Dynamic route /studies/:id
│ ├── App.jsx # Router setup
│ ├── index.css # Tailwind theme tokens
│ └── main.jsx
├── index.html
├── package.json
└── vite.config.js


---

## Screenshots

### Home — hero and featured studies
![Home page](docs/screenshots/Home.png)

### Studies — filter and search
![Studies list](docs/screenshots/Studies.png)

### Study detail — key findings and discussion
![Study detail](docs/screenshots/Studies2.png)

### Sign-in modal
![Sign-in modal](docs/screenshots/SignIn.png)

### Mobile navigation
![Mobile nav](docs/screenshots/Resize.png)

---

## Design decisions

- **Dark-mode-first palette.** Deep slate base (`#0a0e1a`) with a single cyan accent (`#22d3ee`). Chosen for a modern, developer-portfolio feel that also suits sustained reading.
- **Tailwind v4 CSS-first config.** All tokens live in `src/index.css` under `@theme`. No `tailwind.config.js` file needed.
- **Mock auth.** Per the rubric (frontend-only), users and sessions live in `localStorage`. Passwords are stored in plain text — this is explicitly **not secure** and would require a backend with hashing in production.
- **Reusable `StudyCard`.** Same component powers the Home featured strip and the full Studies list.
- **Single accent color.** Restraint on color draws attention to interactive elements and keeps the UI quiet.

---

## Known limitations

- Comments and user accounts live only in the current browser's `localStorage`. Clearing site data wipes them.
- No email verification, password reset, or account recovery.
- No real email sending on the Contact form; submission is simulated.

---

## Author

**Khaled Karhani**
Web2 course — CSCI390 project, 2026