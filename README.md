<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/a25411e7-ec07-470f-9ac0-2948fe588653

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
# Atmospheric Simulator (Geometric Balance Edition)

An elegant, minimalist frontend application that synthesizes smooth physical displacements of natural climate elements and buoyant assets. Built with React, TypeScript, and Tailwind CSS, the simulator allows users to trigger calibrated, five-second physical simulations of falling snowflakes or rising balloons with a single tactile command.

##  Visual & Layout Identity

This project features the **Geometric Balance** design system—a refined, minimalist aesthetic that transforms a standard interactive app into a high-end, telemetry-inspired interface:
* **Geometric Dot Overlay:** An understated, mathematical slate-blue background grid (`#cbd5e1` radial dots) providing structured alignment.
* **Grid Selection Buttons:** Side-by-side action tiles featuring high-contrast typography, minimal icons, and active accent strips.
* **Telemetry & Logging:** Features a top-tier administrative header monitoring live system coordinates and real-time simulator phase tracks alongside a dedicated "Operational Control Center" footer.
* **Premium Color Palette:** Leverages an off-white background canvas contrasted with rich slate text and a curated luxury corporate palette for rendered elements.

---

##  Key Features

* **Crystalline Descent (Snowflakes):** Generates 45 unique, medium-sized vector snowflake SVGs cascading from the top of the viewport. Features organic multi-axial physical drift, variable weight, and random multi-directional rotation.
* **Buoyant Ascent (Balloons):** Spawns 30 premium 3D-glossy helium balloon SVGs with support strings rising from the bottom of the screen. Utilizes soft drop-shadow thresholds optimized for high-contrast visibility against light themes.
* **Precision Countdown Engine:** A high-performance tracking system with 100ms granularity that displays an active diagnostic progress bar during the 5-second emission window.
* **Fluid AnimatePresence Transitions:** Powered by Framer Motion (`motion/react`) to ensure that elements gracefully fade out and unmount cleanly once the operational cycle concludes.

---

##  Tech Stack & Dependencies

* **Framework:** React 19 (TypeScript)
* **Build Tool:** Vite 6
* **Styling:** Tailwind CSS v4 (Using the modern `@theme` directive)
* **Animation Engine:** Motion (`motion/react`)
* **Iconography:** Lucide React

---

##  Getting Started

### Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation
1. Clone the repository:
   ```bash
   git clone [https://github.com/YOUR_USERNAME/Atmospheric-Simulator.git](https://github.com/YOUR_USERNAME/Atmospheric-Simulator.git)
   cd Atmospheric-Simulator
