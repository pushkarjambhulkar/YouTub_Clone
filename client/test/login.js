import { Builder, By, Key, until } from 'selenium-webdriver';
//import chrome from 'selenium-webdriver/chrome';

async function testLogin() {
    let driver = await new Builder().forBrowser('chrome').build(); // Change 'chrome' to your browser of choice

    try {
        await driver.get("http://localhost:5173/login");
        const usernameInput = await driver.findElement(By.name("username"));
        const passwordInput = await driver.findElement(By.name("password"));
        const loginButton = await driver.findElement(By.id("loginButton"));
    
        await usernameInput.sendKeys("pushkarjambhulkar200@gmail.com");
        await passwordInput.sendKeys("123456");
        await loginButton.click();
    
        // Wait for the navigation to complete
        await driver.wait(until.urlIs('http://localhost:5173/'), 10000); // Wait for up to 10 seconds

        // Verify that the user is logged in by checking for the logout button in the sidebar
        const logoutButton = await driver.wait(until.elementLocated(By.xpath("//span[text()='Logout']")), 10000); // Wait for the logout button
        const isDisplayed = await logoutButton.isDisplayed();
        
        if (isDisplayed) {
            console.log("Login Test Passed: Logout button is displayed.");
        } else {
            console.error("Login Test Failed: Logout button is NOT displayed.");
        }
    } catch (error) {
        console.error("Login Test Failed:", error);
    } finally {
        await driver.quit(); // Close the browser
    }
    // Verify that the user is logged in by checking for the logout button in the sidebar
const logoutButton = await driver.wait(until.elementLocated(By.xpath("//span[text()='Logout']")), 15000);
const isDisplayed = await logoutButton.isDisplayed();

if (isDisplayed) {
    console.log("Login Test Passed: Logout button is displayed.");

    // Click the logout button
    await logoutButton.click();

    // Wait for navigation to home page after logout
    await driver.wait(until.urlIs('http://localhost:5173/'), 15000); // Replace with your home page URL after logout

    // Check that the logout button is no longer displayed
    try {
        await driver.wait(until.elementLocated(By.xpath("//span[text()='Logout']")), 5000);
        console.error("Logout Test Failed: Logout button is still displayed after logout.");
    } catch {
        console.log("Logout Test Passed: Logout button is not displayed after logout.");
    }

    // Verify if redirected to the login page after logout
    await driver.wait(until.urlIs('http://localhost:5173/login'), 15000); // Check if redirected to login page
    console.log("Successfully logged out and redirected to the login page.");
} else {
    console.error("Login Test Failed: Logout button is NOT displayed.");
}

}

testLogin();
