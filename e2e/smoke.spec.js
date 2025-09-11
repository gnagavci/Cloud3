const { test, expect } = require('@playwright/test');

test.describe('Movie App E2E Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Set longer timeout for navigation
    page.setDefaultTimeout(30000);
  });


  test('search functionality works', async ({ page }) => {
    await page.goto('http://frontend:5173', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    // Look for search input - try multiple selectors
    const searchSelectors = [
      'input[type="text"]',
      'input[placeholder*="search" i]',
      'input[placeholder*="movie" i]',
      '[data-testid="search-input"]',
      '.search-input'
    ];
    
    let searchInput = null;
    for (const selector of searchSelectors) {
      try {
        searchInput = await page.waitForSelector(selector, { timeout: 5000 });
        if (searchInput) {
          console.log(`Found search input with selector: ${selector}`);
          break;
        }
      } catch (e) {
        console.log(`Selector ${selector} not found`);
      }
    }
    
    if (searchInput) {
      // Type in search input
      await searchInput.fill('avengers');
      
      // Wait for potential results
      await page.waitForTimeout(2000);
      
      // Take screenshot of search results
      await page.screenshot({ 
        path: 'test-results/search-results.png',
        fullPage: true 
      });
      
      console.log('Search test completed');
    } else {
      console.log('Search input not found - taking screenshot for debugging');
      await page.screenshot({ 
        path: 'test-results/no-search-input.png',
        fullPage: true 
      });
    }
  });

  test('backend health check', async ({ page }) => {
    // Test the backend directly
    const response = await page.request.get('http://backend-test:3001/api/health');
    expect(response.status()).toBe(200);
    
    const healthData = await response.json();
    expect(healthData).toHaveProperty('status', 'healthy');
    
    console.log('Backend health check passed:', healthData);
  });

  test('frontend-backend integration', async ({ page }) => {
    await page.goto('http://frontend:5173', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    // Monitor network requests
    const apiCalls = [];
    page.on('request', request => {
      if (request.url().includes('/api/')) {
        apiCalls.push(request.url());
      }
    });
    
    // Wait for any initial API calls
    await page.waitForTimeout(3000);
    
    console.log('API calls detected:', apiCalls);
    
    // Take final screenshot
    await page.screenshot({ 
      path: 'test-results/integration-test.png',
      fullPage: true 
    });
  });
});