import { Page,expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { EmployeeTableComponent } from '../components/EmployeeTableComponents';
import { EmployeeFilterComponent } from '../components/EmployeeFilterComponents';

export class EmployeePage extends BasePage {
    
    /*table component instance */
 private table: EmployeeTableComponent;
    /*filter component instance */
private filter: EmployeeFilterComponent;


/* Constructor to initialize page and components */
    constructor(page: Page) {
        super(page, ''); 
        this.table = new EmployeeTableComponent(page);
        this.filter = new EmployeeFilterComponent(page);
    }   
/** 
 * @returns 
 * isLoaded- checks the table is isLoaded
 */
 async isLoaded(): Promise<boolean> {
    return await this.table.isTableVisible();
  }

  // Getters for table and filter components
   getTable(): EmployeeTableComponent {
    return this.table;
  }

  // Get filter component

  getFilter(): EmployeeFilterComponent {
    return this.filter;
  }

  // Search employee using filter component
  async searchEmployee(criteria: { name?: string; id?: string; status?: string }): Promise<void> {
    if (criteria.name) await this.filter.setName(criteria.name);
    if (criteria.id) await this.filter.setId(criteria.id);
    if (criteria.status) await this.filter.setStatus(criteria.status);
    await this.filter.clickSearch();
  }

  // Click Add Employee button and navigate to Add Employee page
  async clickAddEmployee(): Promise<void> {
    await this.page.locator('a.oxd-topbar-body-nav-tab-item:has-text("Add Employee")').click(); // second "Add" button
  }

  // Delete employee by name
  async deleteEmployeeByName(name: string): Promise<void> {
    await this.page.locator('button:has-text("Yes, Delete")').click();
        await this.waitForLoad();
        await this.takeScreenshot('EmployeePage_After_Deletion');
  }


  // Click Employee List button and navigate to Employee List page
  async clickEmployeeList(): Promise<void> {
    await this.page.locator('a.oxd-topbar-body-nav-tab-item:has-text("Employee List")').click();
  }

  // Verify if an employee is present in the table by name
  async isEmployeePresent(name: string): Promise<boolean> {
  return await this.page.locator(`//div[contains(@class, 'oxd-table-cell')]//div[normalize-space(text())='${name}']`).isVisible();
}

// Verify that the added employee is visible in the table
  async verifyEmployeeInTable(employeeName: string): Promise<void> {
  await this.searchEmployee({ name: employeeName });
  await this.waitForLoad();
  await this.scrollToElement(`text=${employeeName}`);
  await expect(this.page.locator(`text=${employeeName}`)).toBeVisible();
  await this.takeScreenshot('EmployeePage_After_Search');
}

// Navigate to PIM module and click it
async pimModule(): Promise<void> {
    await this.page.locator('a:has-text("PIM")').click();
  }

  // Verify Employee Name label is visible
async employeeNameLabel(name: string): Promise<void> {
    await expect(this.page.locator(`label.oxd-label:has-text("Employee Name")`)).toBeVisible();
  } 

  // Verify Employee Id label is visible
async employeeIdLabel(name: string): Promise<void> {
    await expect(this.page.locator(`label.oxd-label:has-text("Employee Id")`)).toBeVisible();
  } 

// Get the total number of employees in the table
  async getEmployeeCount(): Promise<number> {
    return await this.table.getRowCount();
  }


}   