// Importing necessary modules from Selenium WebDriver
import { Builder, By, until } from 'selenium-webdriver';

async function testLogout() {
    // Initialize the WebDriver instance for the Chrome browser
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Navigate to the login page URL
        await driver.get("http://localhost:5173/login");

        // Locate the input fields and login button by their attributes
        const usernameInput = await driver.findElement(By.name("username"));
        const passwordInput = await driver.findElement(By.name("password"));
        const loginButton = await driver.findElement(By.id("loginButton"));

        // Enter valid credentials in the username and password fields
        await usernameInput.sendKeys("pushkarjambhulkar200@gmail.com");
        await passwordInput.sendKeys("123456");

        // Click the login button to attempt login
        await loginButton.click();

        // Wait until the page redirects to the homepage URL after login
        await driver.wait(until.urlIs('http://localhost:5173/'), 40000);

        // Wait until the logout button appears and check its visibility
        const logoutButton = await driver.wait(until.elementLocated(By.xpath("//span[text()='Logout']")), 40000);
        const isDisplayed = await logoutButton.isDisplayed();

        // Verify if the logout button is displayed, confirming successful login
        if (isDisplayed) {
            console.log("Login Test Passed: Logout button is displayed.");

            // Click the logout button to log out
            await logoutButton.click();

            // Wait until the page redirects back to the login or home page after logout
            await driver.wait(until.urlIs('http://localhost:5173/'), 3000);

            // Check if the "Login" text is displayed, indicating a successful logout
            try {
                const loginText = await driver.wait(until.elementLocated(By.xpath("//span[text()='Logout']")), 40000);
                const isLoginDisplayed = await loginText.isDisplayed();

                // Confirm if the "Login" text appears in the navbar, verifying logout success
                if (isLoginDisplayed) {
                    console.log("Logout Test Passed: 'Login' text is visible in the navbar after logout.");
                } else {
                    console.error("Logout Test Failed: 'Login' text is NOT displayed after logout.");
                }
            } catch {
                console.error("Logout Test Failed: 'Login' text is not found after logout.");
            }
        } else {
            console.error("Login Test Failed: Logout button is NOT displayed.");
        }
    } catch (error) {
        // Catch and log any errors that occur during the test
        console.error("Logout Test Failed:", error);
    } finally {
        // Close the browser to end the test session
        await driver.quit();
    }
}

// Run the testLogout function to execute the test
testLogout();
