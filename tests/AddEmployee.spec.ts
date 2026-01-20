import { test,expect} from '@playwright/test';
import { EmployeePage } from '../src/pages/EmployeePage';

//test.use({ storageState: 'storageState.json' }); // Opt-in to use authenticated state

test.describe.serial('Employee Page Tests for Add and Delete Employee', () => {
let employeePage: EmployeePage;
let firstName: string;

 test.beforeEach(async ({ page }) => {
    employeePage = new EmployeePage(page);
    await employeePage.navigate();
    await employeePage.waitForLoad();
   
  });


    test('Should load Employee List Page and verify added detail is visible', async ({ page }) => {
     
        // Click PIM option in the sidebar/menu
    await employeePage.pimModule();
    await employeePage.waitForLoad();

    // Generate and assign firstName here
    firstName = employeePage.getFilter().generateRandomString();

     // Get the filter component from EmployeePage
    const filter = employeePage.getFilter();

     // Fill in employee details
     
    await employeePage.clickAddEmployee();
    await filter.setFirstName(firstName);
    await filter.setLastName('test');
    await filter.setEmployeeId(employeePage.getFilter().generateRandomEmployeeId());
    await filter.clickSaveEmployee();
    await employeePage.waitForLoad();
    await employeePage.takeScreenshot('EmployeePage_After_Adding_Employee');
    await employeePage.clickEmployeeList();

    // Search for the newly added employee
    await employeePage.verifyEmployeeInTable(firstName);   
    });




    test('Search for Added Employee and Delete them', async ({ page }) => {
        // Click PIM option in the sidebar/menu
        await employeePage.pimModule();
        await employeePage.waitForLoad();

        // Search for the newly added employee
        await employeePage.verifyEmployeeInTable(firstName);
        const table = employeePage.getTable();
        await table.clickDeleteByName(firstName);

        // Confirm deletion in the modal dialog
        await employeePage.deleteEmployeeByName(firstName);

        // Verify the employee is no longer present
        const isEmployeePresent = await employeePage.isEmployeePresent(firstName);
        test.expect(isEmployeePresent).toBeFalsy();
});
    test.afterEach(async ({ page }) => {
    await page.close();
  });
});



