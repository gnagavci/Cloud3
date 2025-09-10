const { test, expect } = require('@playwright/test');

test.describe('Movie App E2E Smoke Tests', () => {
  test('can reach the frontend', async ({ page }) => {
    // Try to navigate and log what we get
    const response = await page.goto('http://frontend:5173', { 
      waitUntil: 'domcontentloaded',
      timeout: 30000 
    });
    
    console.log('Response status:', response.status());
    console.log('Response URL:', response.url());
    
    // Take a screenshot to see what's loaded
    await page.screenshot({ path: 'debug-screenshot.png' });
    
    // Log the page content
    const content = await page.content();
    console.log('Page content length:', content.length);
    console.log('First 500 chars:', content.substring(0, 500));
    
    // Simple check - just verify we got some HTML
    expect(content.length).toBeGreaterThan(100);
  });
});
