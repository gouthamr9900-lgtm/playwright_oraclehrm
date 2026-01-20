import { Page, Locator } from '@playwright/test';

export class EmployeeTableComponent {
  private page: Page;// Expose the Page object
  private table: Locator;// Locator for the employee table

  constructor(page: Page) {
    this.page = page;// Initialize the Page object
    this.table = page.locator('div.oxd-table');// Initialize the Locator for the employee table
  }
// Check if the table is visible
async isTableVisible(): Promise<boolean> {
    return await this.table.isVisible();
  } 
// Get all rows in the table and return as an array of Locators
 async getRows(): Promise<Locator[]> {
    return await this.table.locator('.oxd-table-row').all();
  }
   
  // Get a specific row by employee name and return its Locator
   async getRowByName(name: string): Promise<Locator | null> {
    const rows = await this.getRows();
    for (const row of rows) {
      if ((await row.textContent())?.includes(name)) {
        return row;
      }
    }
    return null;
  }

  // Click Edit button for a specific employee by name
  async clickEditByName(name: string): Promise<void> {
    const row = await this.getRowByName(name);
    if (row) {
      await row.locator('button:has([class*="bi-pencil"])').click();
    }
  }

  // Click Delete button for a specific employee by name
  async clickDeleteByName(name: string): Promise<void> {
    const row = await this.getRowByName(name);
    if (row) {
      await row.locator('button:has([class*="bi-trash"])').click();
    }
  }

  // Get the total number of rows in the table
  async getRowCount(): Promise<number> {
    const rows = await this.getRows();
    return rows.length;
  }


}

