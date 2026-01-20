import { Page,Locator } from "@playwright/test";

/**
 * Base Component class for Component Page Object Model (CPOM)
 * All reusable components should extend this class
 */
export abstract class BaseComponent {
  protected page: Page; // Playwright Page object
  protected locator: Locator; // Locator for the component root element
 
  constructor(page: Page, selector: string) {
    this.page = page; // Initialize the Page object
    this.locator = page.locator(selector); // Initialize the Locator for the component
  }
/**
   * Wait for the component to be visible
   */
  async waitForVisible(): Promise<void> {
    await this.locator.waitFor({ state: 'visible' }); // Wait until the component is visible
  }

  /**
   * Check if component is visible
   */
  async isVisible(): Promise<boolean> {
    return await this.locator.isVisible();  // Return visibility status of the component
  }
/**
   * Fill an input field by label or placeholder
   * identifier: string - label text or placeholder text
   * value: string - value to fill 
   * Promise<void>- used to indicate that the function does not return a value, only performs an action when work is done 
   */
  async fillField(identifier: string, value: string): Promise<void> {
    const field = this.page.locator
    (`input[name="${identifier}"], input[name*="${identifier}"], input[placeholder*="${identifier}"],
     input[id*="${identifier}"],textarea[name="${identifier}"], textarea[name*="${identifier}"], 
    textarea[placeholder*="${identifier}"], textarea[id*="${identifier}"]`).first();
    await field.fill(value);
  }

   /**
   * Select dropdown option
   * selectName: string - name attribute of the select element
   * option: {value?:string;label?:string;index?:number} - option to select by value, label, or index
   */
  async selectOption(selectName: string,option:{value?:string;label?:string;index?:number}): Promise<void> {
    (await this.page.locator(`select[name*="${selectName}"]`).selectOption(option));
  }


   /**
   * Check checkbox
   * checkboxName: string - name or id attribute of the checkbox
   */
  async checkCheckbox(checkboxName: string): Promise<void> {
    const checkbox = this.page.locator
    (`input[type="checkbox"][name*="${checkboxName}"],
         input[type="checkbox"][id*="${checkboxName}"]`).first();
    await checkbox.check();
  }
 /**
   * Click submit button
   * buttonText: string - text on the submit button (default: 'Submit')
   */

 //button[type="submit"],
    async clickSubmitButton(buttonText: string = 'Submit'): Promise<void> {
    const button = this.page.locator
    (`button:has-text("${buttonText}"),
     input[type="submit"][value*="${buttonText}"]`).first();
    await button.click();
  } 


}

