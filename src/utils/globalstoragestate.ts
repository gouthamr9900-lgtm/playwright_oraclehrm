import { chromium } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';


// Function to get an authenticated browser context

export async function getAuthenticatedContext() {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    const loginPage = new LoginPage(page);  
    await loginPage.navigate('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await loginPage.login('Admin', 'admin123'); 
    await context.storageState({ path: 'storageState.json' }); // Save storage state to a file named storageState.json
    //await browser.close();
    return context;
}

export default getAuthenticatedContext;