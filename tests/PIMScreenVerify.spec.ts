import { test,expect} from '@playwright/test';
import { EmployeePage } from '../src/pages/EmployeePage';
import { table } from 'node:console';

test.describe('Employee PIM Module Tests', () => {

    test('Should load PIM Module Screen and verify labels are visible', async ({ page }) => {
    const employeePage = new EmployeePage(page);
    //Wait for the page to load
    await employeePage.navigate();
    await employeePage.waitForLoad(); 
        // Click PIM option in the sidebar/menu
     await employeePage.pimModule();
    await  employeePage.waitForLoad();
        // Get the filter component from EmployeePage
    const table = employeePage.getTable(); 
     
    //Label checks
    await employeePage.employeeNameLabel('Employee Name');
    await employeePage.employeeIdLabel('Employee Id');
    await table.getRowCount();
    console.log(`Total Rows in Employee Table: ${await table.getRowCount()}`);
    await employeePage.takeScreenshot('PIMScreen_Verify_Labels');
    await page.close();
    });
});


    



