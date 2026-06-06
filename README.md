# FlowAnalytics: Funnel Analytics Mini-App

A lightweight, performant funnel dashboard built to help e-commerce marketers visualize step-level campaign conversions, locate drop-offs, and receive action-oriented optimization recommendations.

---

## Core Features
* **Visual Funnel Bars:** Clear, horizontal progress bars that shrink proportionally based on the number of users at each step.
* **Worst-Step Highlights:** Instantly flags the exact step causing the highest drop-off rate.
* **Contextual Marketing Tips:** Displays targeted advice depending on the step type (Teaser, Exit-intent, Email, or Coupon).
* **Device Filters:** Easily filter the campaign list by Mobile or Desktop.

---

## Prerequisites
* **Node.js**: `v18.0.0` or higher
* **npm**: `v9.0.0` or higher

---

## Installation & Setup

1. **Clone or unzip the project files:**
   ```bash
   cd FlowAnalytics-optimonk
   ```

2. **Install local dependencies:**
   This project relies on `vue`, `tailwindcss` (v3 compatibility), and `lucide-vue-next` for UI assets.
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open the browser:**
   Once running, open your browser and navigate to the address listed in your terminal, which is typically:
   **[http://localhost:5173/](http://localhost:5173/)**

---

## Directory Structure
```text
├── src/
│   ├── assets/
│   │   ├── main.css                     # Main file for Tailwind CSS imports
│   ├── components/
│   │   ├── CampaignList.vue             # Handles the list and device filters
│   │   └── FunnelVisualizer.vue         # Displays the funnel bars and error messages
│   ├── data/
│   │   ├── campaigns.json               # Static JSON file with campaign data
│   │   └── recommendations.json         # Static JSON file with marketing tips
│   ├── services/
│   │   ├── campaignService.ts           # Math calculations and funnel logic
│   │   └── recommendationService.ts     # Logic to select the right marketing tip
│   ├── App.vue                          # Main component that holds global state and layout
│   ├── main.ts                          # Entry point to load styles and start Vue
│   └── style.css                        # Default CSS styling
├── tailwind.config.js                   # Tailwind CSS path configuration
├── postcss.config.js                    # PostCSS build tool configuration
├── README.md                            # Setup instructions (this file)
└── WRITEUP.md                           # Overview of tech, design, and AI usage
```