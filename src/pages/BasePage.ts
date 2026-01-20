import { Page } from '@playwright/test';


/**
 * Base Page class for all page objects
 */
export abstract class BasePage {
  protected page: Page; // The Playwright Page object
  protected url: string; // The URL of the page

   constructor(page: Page, url: string = '') {
    this.page = page;// Initialize the Page object
    this.url = url; // Initialize the URL
  }
/**
   * Navigate to the page
   */

  async navigate(url?: string): Promise<void> {
    await this.page.goto(url || this.url, { waitUntil: 'domcontentloaded' }); // Navigate to the specified URL or the default URL
  }
   /**
   * Get page title
   */
  async getTitle(): Promise<string> {
    return await this.page.title(); // Return the title of the page
  }

  /**
   * Get current URL
   */
  async getCurrentURL(): Promise<string> {
    return this.page.url();// Return the current URL of the page
  } 

   /**
   * Wait for page to load
   */
  async waitForLoad(): Promise<void> {
    //await this.page.waitForLoadState('load');
   // await this.page.waitForLoadState('networkidle');   
    await this.page.waitForLoadState('domcontentloaded'); // Wait for the DOM content to be loaded
  } 

/**
   * Take screenshot
   */
   async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `screenshots/${name}.png`, fullPage: true }); // Take a screenshot and save it to the specified path
  }

/**
   * Scroll to element
   */
  async scrollToElement(selector: string): Promise<void> {
    await this.page.locator(selector).scrollIntoViewIfNeeded(); // Scroll to the specified element  
  } 


}
