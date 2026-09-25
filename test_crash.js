const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  page.on('response', response => {
    if (!response.ok()) {
      console.log('RESPONSE ERROR:', response.status(), response.url());
    }
  });

  await page.goto('https://basic-need.vercel.app/shop', { waitUntil: 'networkidle0' });
  
  await browser.close();
})();
