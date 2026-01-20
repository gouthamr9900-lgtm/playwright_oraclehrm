import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Login Page Object Model
 */
export class LoginPage extends BasePage {
  
constructor(page: Page) {
    super(page, ''); 
    this.page = page;
  } 
 /**
   * Get username input locator
   * 
   */
 async getUsernameInput() {
    return this.page.locator('input[placeholder="Username"]');
  }
    /**
     * Get password input locator
     * 
     */
   async getPasswordInput() {
    return this.page.locator('input[placeholder="Password"]');
  } 
    
    /**
     * get login button locator
     * 
     */
   async getLoginButton() {
    return this.page.locator('button[type="submit"]');
  }

 /**
   * Fill username
   */
 async enterUsername(username: string): Promise<void> {
  await (await this.getUsernameInput()).fill(username);
}

  /**
   * Fill password
   */
  async enterPassword(password: string): Promise<void> {
    await (await this.getPasswordInput()).fill(password);
  }

  /**
   * Click login button
   */
  async clickLogin(): Promise<void> {
    await (await this.getLoginButton()).click();
  }

  /**
   * Perform login with credentials
   */
  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }


}

