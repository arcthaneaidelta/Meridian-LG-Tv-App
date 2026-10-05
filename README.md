# Meridian — webOS Launch Console (LG TV App Demo)

> A calm, editorial showcase and interactive launch console engineered to test, package, and steer LG webOS Smart TV applications through LG Content Store approval.

## 🚀 Live Demo & Deployment

This project is configured for one-click deployment on **Netlify**.

- **Build Command:** `npm run build`
- **Publish Directory:** `dist`
- **SPA Routing:** Pre-configured via `netlify.toml` and `public/_redirects`

---

## 🛠️ Technology Stack
- **Framework:** React 19 + TypeScript + Vite
- **Routing:** React Router 7 with route-level code splitting (`React.lazy`)
- **Styling:** Tailwind CSS + Custom Design Tokens (Newsreader, Instrument Sans, JetBrains Mono)
- **State Management:** Zustand (persistent session state, mock latency 300–900ms)
- **Motion & Animations:** Framer Motion (Rise, Stagger, Mask Reveal, Count Up)
- **Icons:** Lucide React

---

## 🖥️ Architecture & Workstations

1. **Story Layer (`/`):**
   - Autonomous live TV simulation with channel grid and remote cursor feedback
   - 12-Step Launch Path pinned story
   - Interactive Readiness Score preview
   - 6-Scenario Rejection Library with Before/After defect toggles
   - 40-App Scale Grid with template batch fix runner
   - Qualifications table and intake booking calendar
   - Validated project intake form

2. **Console Layer (`/console`):**
   - **Project Overview (`/console`):** Live Readiness Score ring (0–100), KPIs, actionable items, and activity log
   - **TV Simulator (`/console/simulator`):** 1920×1080 scaled canvas, physical keyboard remote bindings (Arrows, Enter, Esc/Backspace for webOS keyCode 461, Color keys), Magic Remote pointer mode, defect simulations, and 6-point test checklist
   - **Config Validator (`/console/config`):** Real-time `appinfo.json` schema rules engine with auto-fix
   - **Build & Packaging (`/console/build`):** 6-stage pipeline (Lint → Minify → Verify → `ares-package` IPK → Validate → Checksum) with simulated error injection
   - **Store Assets (`/console/assets`):** Client-side browser image inspection (dimensions, aspect ratio, memory weight) and fixed-ratio CSS cropper
   - **Submission Tracker (`/console/submission`):** Full lifecycle stepper (*Prepared → Submitted → In QA → Changes requested → Approved → Live*), rejection loops, and speed slider
   - **Code Review (`/console/review`):** 3-pane file tree, 14 certification checks, plain-English vs technical explanations, and code diff drawer
   - **Resolution Lab (`/console/resolution`):** Fluid scaling across 720p, 1080p, 4K, and 8K with 5% title safe-area guides
   - **Portfolio (`/console/portfolio`):** 40-app catalog management with multi-selection, floating action bar, batch audits, and template fixes
   - **Launch Report (`/console/report`):** Printable certification document formatted for client stakeholders

3. **Global Overlays:**
   - Command Palette (`⌘K` / `Ctrl+K`)
   - Activity Notifications Drawer
   - Physical Keyboard Controls Reference (`?`)
   - 7-Step Guided Tour

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build

# Preview build locally
npm run preview
```

---

## 📄 License & Attribution
All data and app profiles in this repository are simulated demonstration samples. Built for LG webOS application onboarding and multi-app portfolio scaling.
