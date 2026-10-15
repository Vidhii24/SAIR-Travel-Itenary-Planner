# AI TravelMate — Your Personal AI Travel Planner

> **Academic Project Submission:** "Design and Evaluate an AI-Receptive, Human-Centered Software Application."

AI TravelMate is a full-stack, responsive, and human-centered web application designed to eliminate travel planning stress. It synthesizes personalized day-wise itineraries, itemizes realistic travel budgets in Indian Rupees (₹), adapts to traveler pace and mobility, and transparently explains its recommendations.

---

## 🌟 Key Features

1. **Human-Centered Trip Planning Wizard (6 Steps):**
   - **Step 1: Destination & Origin Hub:** Autocomplete and quick pills for Indian destinations (Udaipur, Jaipur, Goa, Manali, Rishikesh, Kerala, Varanasi, Ladakh).
   - **Step 2: Trip Duration & Dates:** Departure & return calendar pickers with date validation (ensuring return date ≥ departure date) and group counter (adults + children).
   - **Step 3: Budget in Indian Rupees (₹):** Per-person vs group total toggles, budget presets, and category tiers (*Budget-Friendly*, *Moderate*, *Premium*).
   - **Step 4: Travel Preferences & Pacing:** Selectable interest cards (*Historical Monuments*, *Local Food*, *Nature*, *Adventure*, *Beaches*, *Culture*, *Relaxation*, etc.) and pacing styles (*Relaxed*, *Balanced*, *Adventure-Focused*).
   - **Step 5: Travel Group & Accessibility:** Accommodates Solo, Couple, Family, and Friends with wheelchair and senior-friendly pacing options.
   - **Step 6: Refinement & Review:** Dietary options (Pure Veg, Vegan, Jain, Non-Veg), transit modes (Indian Railways, Flights, Volvo Bus, Self-Drive), and accommodation preferences.

2. **Personalized Itinerary Engine:**
   - Day-wise tabs with structured **Morning**, **Afternoon**, and **Evening** activity slots.
   - **Explainable Recommendations:** Every activity features an explicit rationale (e.g., *"Recommended because you selected Culture & Heritage"* or *"Relaxed afternoon break to prevent travel fatigue"*).
   - **Interactive User Feedback Revision Loop:** Quick buttons (*"Looks Good"*, *"Make It More Budget-Friendly"*, *"Add More Adventure"*, *"Reduce Travel Time / Relaxed Pace"*, *"Include More Local Food"*) that dynamically tune and update the itinerary.
   - **Activity Customization:** Replace activities with alternative candidates or remove them for unscheduled leisure.
   - **Curated Culinary Experiences:** Breakfast, lunch, and dinner recommendations for every single day.
   - **Print & Export:** Clean `@media print` layout allowing one-click export to PDF or physical print.

3. **Smart Budget Planner & Expense Optimizer:**
   - **8 Itemized Expense Categories:** Transportation, Accommodation, Food, Attractions & Activities, Local Travel, Shopping, Emergency Buffer (8%), and Miscellaneous (4%).
   - **Interactive Recharts Visualizations:** Donut chart of categorical expenditure share + Bar chart comparing stated budget vs estimated cost.
   - **Live Category Editor:** Modify any expense amount to trigger immediate real-time recalculation of total cost and remaining funds.
   - **"Optimize My Budget" Assistant:** Analyzes spending bottlenecks, suggests concrete substitutions (e.g., certified boutique homestays, executive train berths, local transit passes), displays exact rupee savings, and allows users to **Accept** or **Reject** proposals.

4. **Destination Explorer:**
   - Searchable and filterable directory (by interest, budget tier, and travel style).
   - Comprehensive detail modals covering regional overviews, top sights with costs, local dishes, and practical tips.
   - *"Plan This Trip"* CTA directly pre-populates the Trip Wizard.

5. **My Trips Management & Persistence:**
   - Categorized by *Upcoming*, *Planned*, and *Past* trips.
   - View, Edit, Duplicate, and Delete actions.
   - Explicit confirmation modal before permanent deletion.
   - Persisted across browser sessions using `localStorage` with server-side synchronization.

6. **User Profile & Default Preferences:**
   - Configure home city, preferred travel style, baseline budget, dietary rules, and interests to auto-populate future trip wizards.

7. **Academic Evaluation Dossier & Automated 10-Point Test Runner:**
   - **Task 1:** Problem Identification & AI-Receptive Approach.
   - **Task 2:** User Needs & Personas (Primary: Aarav Sharma [Student], Secondary: Patel Family [Family Travelers]).
   - **Task 3:** Human-Centered Design Heuristics (User Control, Visibility of Status, Error Prevention, Feedback, Accessibility).
   - **Task 4:** AI-Assisted Development Activity Log (AI contributions vs manual refinements).
   - **Interactive Test Runner:** Executes all 10 Assignment Test Cases live in the browser with real-time pass/fail indicators.

---

## 🛠️ Technology Stack

- **Frontend:** React 19, Vite, Tailwind CSS, Lucide React icons, Recharts data visualization.
- **Backend:** Node.js (v24), Express.js REST API with CORS and JSON middleware.
- **AI Integration:** Hybrid AI-Receptive Architecture supporting Google Gemini / OpenAI with automatic, deterministic fallback to our Curated Rule-Based Recommendation Engine.
- **Data Persistence:** Dual-layer persistence (`localStorage` for client-side prototype durability + Express server cache).

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation & Execution

1. Clone or navigate to the project directory:
   ```bash
   cd c:/Users/HP/OneDrive/Desktop/engineering/projects/coursera
   ```

2. Start the Backend Server (Port 5000):
   ```bash
   cd server
   npm install
   npm start
   ```

3. In a separate terminal, start the Frontend Client (Port 5173):
   ```bash
   cd client
   npm install
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

*(Alternatively, run `node test-runner.js` in the root directory to execute all 10 automated test cases against the backend).*

---

## 🧪 Verification & Test Results (10 / 10 Tests Passed)

| Test Case | Scenario | Input | Outcome | Status |
|---|---|---|---|---|
| **TC 1** | Valid Trip Generation | Udaipur, 3 days, ₹8,000, Heritage & Food | 3-day structured itinerary with itemized budget generated | **PASS** |
| **TC 2** | Missing Destination | Destination left blank | HTTP 400 Bad Request with inline validation message | **PASS** |
| **TC 3** | Invalid Dates | Return date earlier than departure | Prevented submission with date inconsistency alert | **PASS** |
| **TC 4** | Insufficient Budget | ₹1,500 for 4-day trip with 3 travelers | Deficit flagged (-₹29,143), displayed warning & optimizer CTA | **PASS** |
| **TC 5** | Preference Changes | Changed interest to Adventure | Dynamically scheduled rafting and mountain activities | **PASS** |
| **TC 6** | Save Trip Persistence | Saved itinerary to repository | Verified persistence in localStorage & `/api/trips` | **PASS** |
| **TC 7** | Budget Modification | Edited transport amount in editor | Recalculated total trip cost and remaining buffer live | **PASS** |
| **TC 8** | AI Service Fallback | Simulated unavailable cloud LLM | Seamlessly defaulted to transparent rule-based engine | **PASS** |
| **TC 9** | Mobile Layout & Health | Verified responsive layout & semantic tags | Clean viewport scaling and HTTP 200 system health | **PASS** |
| **TC 10** | Delete Trip | Deleted saved trip from store | Requested confirmation dialog and updated trip list | **PASS** |

---

## 🛡️ Responsible AI Design & System Transparency

1. **Estimates vs Binding Quotes:** All flight, train, hotel, and meal figures are clearly labeled as **planning estimates** for simulations. Users are reminded to confirm live ticket rates.
2. **Hallucination Prevention:** The application combines generative synthesis with deterministic mathematical calculations for all budgeting and schedule durations.
3. **Engine Disclosure:** The interface explicitly indicates whether an itinerary was synthesized via **Generative AI** or the **Transparent Rule-Based Recommendation Engine**.
4. **Data Privacy:** Prototype user settings are stored locally in the user's browser, preventing unauthorized data exfiltration.

---

## 📄 Academic Dossier Mapping

- **Task 1:** Found in UI under *Academic Showcase* -> *Task 1: Problem & AI Approach*.
- **Task 2:** Found in UI under *Academic Showcase* -> *Task 2: User Personas*.
- **Task 3:** Found in UI under *Academic Showcase* -> *Task 3: HCD Principles*.
- **Task 4:** Found in UI under *Academic Showcase* -> *Task 4: AI Development Log*.
- **Live Test Runner:** Found in UI under *Academic Showcase* -> *10 Test Cases Runner*.
