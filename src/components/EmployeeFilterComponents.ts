import { Page } from '@playwright/test';
import { BaseComponent } from '../components/BaseComponents';

  export class EmployeeFilterComponent extends BaseComponent {
    public page: Page;// Expose the Page object

        constructor(page: Page) {
        super(page, ''); // You can specify a selector for the root element of this component if needed
        this.page = page; // Initialize the Page object
    }

  // Set first name in the filter using BaseComponent's fillField method
  async setFirstName(name: string): Promise<void> {
      await this.fillField('firstName', name);
  }

  // Set last name in the filter using BaseComponent's fillField method
  async setLastName(name: string): Promise<void> {
      await this.fillField('lastName', name);
  }


  // Set employee id in the filter
  async setEmployeeId(id: string): Promise<void> {
        await this.page.locator('//label[contains(text(),"Employee Id")]//following::input[contains(@class,"oxd-input")]').fill('');
        await this.page.locator('//label[contains(text(),"Employee Id")]//following::input[contains(@class,"oxd-input")]').fill(id);
  } 


  // Save employee using BaseComponent's clickSubmitButton method
  async clickSaveEmployee(): Promise<void> {
     await this.clickSubmitButton('Save');
  }

// Set name in the search filter using BaseComponent's fillField method
  async  setName(name: string): Promise<void> {
    await this.fillField('Type for hints...', name);
  }

  //Set id in the search filter
  async setId(id: string): Promise<void> {
    await this.page.locator('//input[contains(@class, "oxd-input") and contains(@class, "oxd-input--active")]').nth(1).fill(id);
  }

  // Set status in the search filter
  async setStatus(status: string): Promise<void> {
    await this.page.locator('div.oxd-select-text').first().click();
   // await this.page.locator(`div[role="option"]:has-text("${status}")`).click();
  }

  // Click Search button in the filter using BaseComponent's clickSubmitButton method
  async clickSearch(): Promise<void> {
    await this.clickSubmitButton('Search');
    //await this.page.locator('button:has-text("Search")').click();
  }

  // Click Reset button in the filter using BaseComponent's clickSubmitButton method
  async clickReset(): Promise<void> {
    await this.clickSubmitButton('Reset');
  }
  
  /**
   * Generate random string
   */
   generateRandomString(length: number = 10): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Generate random employee id
   */
   generateRandomEmployeeId(): string {
    const randomId = Math.floor(1000 + Math.random() * 9000).toString();
    return randomId;
  }
}

