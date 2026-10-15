const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUTPUT_DIR = path.join(__dirname, 'screenshots');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function run() {
  console.log('Launching Puppeteer Chrome...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    defaultViewport: { width: 1366, height: 850, deviceScaleFactor: 2 },
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200));

  // 1. Landing Page Hero
  console.log('1. Capturing fig1_hero_landing_page.png...');
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'fig1_hero_landing_page.png') });

  // 2. Landing Page Features
  console.log('2. Capturing fig2_landing_features.png...');
  await page.evaluate(() => window.scrollBy(0, 950));
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'fig2_landing_features.png') });

  // 3-8. Wizard Steps
  console.log('Navigating to Wizard Step 1...');
  await page.evaluate(() => {
    window.scrollTo(0, 0);
    window.__setActivePage('wizard');
  });
  await new Promise(r => setTimeout(r, 800));
  console.log('3. Capturing fig3_trip_wizard_step1.png...');
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'fig3_trip_wizard_step1.png') });

  // Step 2
  console.log('Advancing to Step 2...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find(b => b.textContent.includes('Continue to Step 2'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 800));
  console.log('4. Capturing fig4_trip_wizard_step2.png...');
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'fig4_trip_wizard_step2.png') });

  // Step 3
  console.log('Advancing to Step 3...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find(b => b.textContent.includes('Continue to Step 3'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 800));
  console.log('5. Capturing fig5_trip_wizard_step3.png...');
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'fig5_trip_wizard_step3.png') });

  // Step 4
  console.log('Advancing to Step 4...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find(b => b.textContent.includes('Continue to Step 4'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 800));
  console.log('6. Capturing fig6_trip_wizard_step4.png...');
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'fig6_trip_wizard_step4.png') });

  // Step 5
  console.log('Advancing to Step 5...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find(b => b.textContent.includes('Continue to Step 5'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 800));
  console.log('7. Capturing fig7_trip_wizard_step5.png...');
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'fig7_trip_wizard_step5.png') });

  // Step 6
  console.log('Advancing to Step 6...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find(b => b.textContent.includes('Continue to Step 6'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 800));
  console.log('8. Capturing fig8_trip_wizard_step6.png...');
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'fig8_trip_wizard_step6.png') });

  // Generate Itinerary via backend call and set in UI
  console.log('Generating real itinerary from API...');
  await page.evaluate(async () => {
    const res = await fetch('http://localhost:5000/api/itinerary/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        destination: 'Udaipur',
        startingCity: 'Indore',
        durationDays: 3,
        budget: 8000,
        budgetType: 'per_person',
        travelers: 1,
        interests: ['Historical Monuments', 'Local Food', 'Photography'],
        travelStyle: 'Balanced',
        travelGroup: 'Solo',
        dietaryPreferences: 'Vegetarian',
        preferredTransportation: 'Train / Sleeper',
        accommodationPreferences: 'Boutique Homestay / 3-Star'
      })
    });
    const data = await res.json();
    window.__setCurrentItinerary(data);
    window.__setActivePage('results');
    window.scrollTo(0, 0);
  });
  await new Promise(r => setTimeout(r, 1500));

  // 9. Itinerary Overview
  console.log('9. Capturing fig9_itinerary_overview.png...');
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'fig9_itinerary_overview.png') });

  // 10. Itinerary Explainable AI & Feedback Buttons
  console.log('10. Capturing fig10_itinerary_explainable_ai.png...');
  await page.evaluate(() => window.scrollBy(0, 520));
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'fig10_itinerary_explainable_ai.png') });

  // 11. Budget Planner
  console.log('11. Capturing fig11_budget_planner.png...');
  await page.evaluate(() => {
    window.scrollTo(0, 0);
    window.__setActivePage('budget');
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'fig11_budget_planner.png') });

  // 12. Budget Optimization Modal
  console.log('12. Capturing fig12_budget_optimization.png...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const optBtn = btns.find(b => b.textContent.includes('Optimize') || b.textContent.includes('Smart Assistant'));
    if (optBtn) optBtn.click();
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'fig12_budget_optimization.png') });

  // Close modal if open
  await page.keyboard.press('Escape');
  await new Promise(r => setTimeout(r, 400));

  // 13. Destination Explorer
  console.log('13. Capturing fig13_destination_explorer.png...');
  await page.evaluate(() => {
    window.scrollTo(0, 0);
    window.__setActivePage('explore');
  });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'fig13_destination_explorer.png') });

  // 14. Destination Modal
  console.log('14. Capturing fig14_destination_modal.png...');
  await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('button, div'));
    const card = cards.find(c => c.textContent.includes('Udaipur') && c.textContent.includes('City of Lakes'));
    if (card) card.click();
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'fig14_destination_modal.png') });

  await page.keyboard.press('Escape');
  await new Promise(r => setTimeout(r, 400));

  // 15. My Trips Dashboard (add a trip to localStorage first)
  console.log('15. Capturing fig15_my_trips.png...');
  await page.evaluate(() => {
    const sampleTrip = {
      tripId: 'trip-sample-udaipur',
      destination: 'Udaipur',
      startingCity: 'Indore',
      durationDays: 3,
      travelers: 1,
      travelGroup: 'Solo',
      travelStyle: 'Balanced',
      budget: 8000,
      createdAt: new Date().toISOString(),
      itineraryDays: [
        { dayNumber: 1, title: 'Arrival & Lakeside Splendor' },
        { dayNumber: 2, title: 'Heritage & Grand Palaces' },
        { dayNumber: 3, title: 'Bazaars & Sunset Vistas' }
      ],
      budgetSummary: {
        totalEstimatedCost: 8900,
        budgetStatus: 'on_budget'
      }
    };
    localStorage.setItem('sair_saved_trips', JSON.stringify([sampleTrip]));
    window.scrollTo(0, 0);
    window.__setActivePage('my-trips');
  });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'fig15_my_trips.png') });

  // 16. User Profile
  console.log('16. Capturing fig16_user_profile.png...');
  await page.evaluate(() => {
    window.scrollTo(0, 0);
    window.__setActivePage('profile');
  });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'fig16_user_profile.png') });

  // 17. Academic Showcase
  console.log('17. Capturing fig17_academic_showcase.png...');
  await page.evaluate(() => {
    window.scrollTo(0, 0);
    window.__setActivePage('academic');
  });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'fig17_academic_showcase.png') });

  // 18. Test Runner Results (click Run All Tests)
  console.log('18. Running In-Browser Test Runner...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const runBtn = btns.find(b => b.textContent.includes('Run All Tests') || b.textContent.includes('Execute'));
    if (runBtn) runBtn.click();
  });
  await new Promise(r => setTimeout(r, 3500));
  await page.evaluate(() => window.scrollBy(0, 400));
  await new Promise(r => setTimeout(r, 500));
  console.log('Capturing fig18_test_runner_results.png...');
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'fig18_test_runner_results.png') });

  await browser.close();
  console.log('SUCCESS: All 18 screenshots captured!');
}

run().catch(err => {
  console.error('Execution error:', err);
  process.exit(1);
});
