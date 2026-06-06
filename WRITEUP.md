# FlowAnalytics Mini-App: Technical & Product Write-Up

This document describes the design implementation, code architecture, and development process of the FlowAnalytics V1 funnel application.

---

## 1. Problem Understanding
The primary challenge for e-commerce merchants is that standard analytics dashboards usually display only one final metric, such as an "overall conversion rate of 5%." This approach hides performance issues within multi-step popup campaigns. For example, a flow might feature a high-performing Teaser (Step 1) but experience a significant drop in performance on the Email Form (Step 2). As a result, the merchant cannot identify the exact stage where users abandon the process.

To address this issue, the V1 version of this application focuses on:
* **Step-Level Visibility:** Displaying granular data for each stage to help users analyze where visitors exit the funnel.
* **Bottleneck Identification:** Utilizing an algorithm to automatically find and highlight the step with the highest relative drop-off.
* **Data-Driven Suggestions:** Presenting optimization tips tailored to the functional type of the specific step causing the performance drop.

---

## 2. Scope Decisions (V1 MVP vs. V2 Roadmap)

### Included in V1:
* **Interactive Campaign Selector:** A dedicated sidebar component to filter and switch between different popup campaigns while showing core metrics.
* **Proportional Funnel Elements:** Visual bars implemented via native Tailwind CSS utilities that scale dynamically based on visitor volume, ensuring optimal performance.
* **Automatic Issue Highlighting:** Math logic that evaluates step differentials to instantly identify the critical drop-off point.
* **Contextual Recommendation Mapping:** A modular system that connects specific step types (*teaser*, *exit-intent*, *email*, *success/coupon*) with targeted optimization tips.
* **Predictable State Management:** Handling data and user selection reactively inside the local state using the Vue 3 Composition API.

### Excluded from V1:
* **External Charting Libraries (e.g., Chart.js, D3):** Excluded from the initial scope to prevent dependency overhead and maintain a minimal bundle size.
* **Persistent Database Integration:** Reading and processing data directly from static JSON arrays was prioritized, as data writing capabilities were not required for this analysis.

---

## 3. Architecture & Code Structure
The application code separates data processing and core calculations from visual presentation layers. This separation ensures that components remain thin and maintainable.

### Core Architecture Components:
* `src/data/campaigns.json`: The static dataset source of truth provided in the specification.
* `src/data/recommendations.json`: A static configuration file housing the structured marketing advice.
* `src/services/campaignService.ts`: The central service handling mathematical operations, including conversion rates, drop-off percentages, and worst-step search algorithms. Isolating this logic means the local data source can be replaced with a live backend API in the future without modification to the view layer.
* `src/services/recommendationService.ts`: A dedicated utility that evaluates the active step parameters and maps them to the appropriate recommendation string.
* `src/components/CampaignList.vue`: Handles sidebar directory data rendering, selection mechanics, and device segment filtration.
* `src/components/FunnelVisualizer.vue`: Renders the proportional funnel graphics, automated warning nodes, and contextual recommendations.
* `src/App.vue`: Acts as the main coordinator, maintaining root state boundaries and managing layout execution.

---

## 4. AI Tooling Usage
Artificial Intelligence was used as an assistant to speed up coding and check code quality:
* **Writing Marketing Tips:** Assisted in drafting professional, clear marketing advice for standard e-commerce problems.
* **Correcting Mistakes:** Used AI as a quick code reviewer to find and fix minor syntax errors, typos, and spelling mistakes in both the TypeScript logic and the English text labels. It helped save time on manual debugging and ensured the code and copy were clean.
* **Edge-Case Validation:** Used AI to review the code and ensure the application handles unusual data without unexpected crashes

---

## 5. Potential V2 Enhancements
1. **Interactive ROI Sandbox Simulator:** Allow users to adjust conversion values directly in the interface to model prospective revenue changes and conversion lifts.
2. **Dynamic Copy Evaluation:** Integrate an API endpoint to analyze a merchant’s actual popup header text and automatically generate high-converting text alternatives.
3. **Cross-Device Comparative Views:** Enable side-by-side analysis of identical desktop and mobile campaign funnels to spot platform-specific interface issues.