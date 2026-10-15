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

  // 11. Budget Planner & 12. Optimization Modal
  console.log('Setting up Udaipur itinerary...');
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
    window.__setActivePage('budget');
    window.scrollTo(0, 0);
  });
  await new Promise(r => setTimeout(r, 1500));
  console.log('11. Capturing fig11_budget_planner.png...');
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'fig11_budget_planner.png') });

  // Open "Optimize My Budget" assistant
  console.log('Clicking Optimize My Budget...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const optBtn = btns.find(b => b.textContent.includes('Optimize My Budget'));
    if (optBtn) optBtn.click();
  });
  await new Promise(r => setTimeout(r, 1500));
  console.log('12. Capturing fig12_budget_optimization.png...');
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'fig12_budget_optimization.png') });

  // 13. Destination Explorer & 14. Destination Modal
  console.log('Navigating to Destination Explorer...');
  await page.evaluate(() => {
    window.scrollTo(0, 0);
    window.__setActivePage('explore');
  });
  await new Promise(r => setTimeout(r, 1200));
  console.log('13. Capturing fig13_destination_explorer.png...');
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'fig13_destination_explorer.png') });

  console.log('Clicking Explore on first card to open modal...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const exploreBtn = btns.find(b => b.textContent.trim() === 'Explore');
    if (exploreBtn) exploreBtn.click();
  });
  await new Promise(r => setTimeout(r, 1000));
  console.log('14. Capturing fig14_destination_modal.png...');
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'fig14_destination_modal.png') });

  await browser.close();
  console.log('Modal captures completed!');
}

run().catch(err => {
  console.error('Execution error:', err);
  process.exit(1);
});
