import { test, expect } from '@playwright/test';

test('navigation buttons display expected content, navigate correctly, and toggle theme', async ({ page }) => {
  await page.route('**/*', (route) => {
    if (route.request().url().includes('ibm.com') || route.request().url().includes('api')) {
      route.fulfill({
        status: 200,
        body: 'mocked response',
      });
    } else {
      route.continue();
    }
  });

  await page.goto('https://nexlearn.vercel.app/use/chat');

  // Test mouse hover on "Use" and check for "Quiz" and "Chat" options
  const useMenu = page.locator('text=Use');
  await useMenu.hover();
  await page.waitForTimeout(1000);
  const quizHeading = page.locator('h3:has-text("Quiz")');
  await expect(quizHeading).toBeVisible();
  const chatHeading = page.locator('h3:has-text("Chat")');
  await expect(chatHeading).toBeVisible();

  // Test mouse hover on "Learn" and check for "Recall" and "FAQ" options
  const learnMenu = page.locator('text=Learn');
  await learnMenu.hover();
  await page.waitForTimeout(1000);
  const recallHeading = page.locator('h3:has-text("Recall")');
  await expect(recallHeading).toBeVisible();
  const faqHeading = page.locator('h3:has-text("FAQ")');
  await expect(faqHeading).toBeVisible();

  // Test mouse hover on "Dev" and check for "Documentation" and "Github" options
  const devMenu = page.locator('text=Dev');
  await devMenu.hover();
  await page.waitForTimeout(1000);
  const documentationHeading = page.locator('h3:has-text("Documentation")');
  await expect(documentationHeading).toBeVisible();
  const githubHeading = page.locator('h3:has-text("Github")');
  await expect(githubHeading).toBeVisible();

  // Test Recall buttons - HERE
  await page.locator('body').hover();
  await page.waitForTimeout(500);
  const recallButton = page.locator('button[aria-label="Recall"]');
  await recallButton.click();
  const recallFieldset = page.locator('legend:has-text("Recall")');
  await expect(recallFieldset).toBeVisible();

  // Test Design button
  const designButton = page.locator('button[aria-label="Design"]');
  await designButton.click();
  const designFieldset = page.locator('legend:has-text("Chat Customization")');
  await expect(designFieldset).toBeVisible();

  // Test Role button
  const roleButton = page.locator('button[aria-label="Role"]');
  await roleButton.click();
  const roleFieldset = page.locator('legend:has-text("Define Chatbot Role")');
  await expect(roleFieldset).toBeVisible();

  // Test Settings button
  const settingsButton = page.locator('button[aria-label="Settings"]');
  await settingsButton.click();
  const settingsFieldset = page.locator('legend:has-text("Advanced Settings")');
  await expect(settingsFieldset).toBeVisible();

  // Test Documentation button
  const documentationButton = page.locator('button[aria-label="Documentation"]');
  await documentationButton.click();
  await page.waitForLoadState('domcontentloaded'); // Wait for the new page to load
  await expect(page).toHaveURL('https://dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/fm-model-parameters.html?context=wx&locale=fr');

  // Navigate back to the chat page
  await page.goto('https://nexlearn.vercel.app/use/chat');

  // Test FAQ button
  const faqButton = page.locator('button[aria-label="Help"]');
  await faqButton.click();
  await page.waitForLoadState('domcontentloaded'); // Wait for the new page to load
  await expect(page).toHaveURL('https://nexlearn.vercel.app/learn/faq');

// Test Toggle Theme and check for "Light", "Dark", and "System" options
  const themeToggle = page.getByRole('button', { name: 'Toggle theme' });
  await themeToggle.click();
  await page.waitForTimeout(1000);
  const lightOption = page.locator('text=Light');
  const darkOption = page.locator('text=Dark');
  const systemOption = page.locator('text=System');
  await expect(lightOption).toBeVisible();
  await expect(darkOption).toBeVisible();
  await expect(systemOption).toBeVisible();

  // Click on the "Dark" to verify background color
  await darkOption.click();
  await page.waitForTimeout(1000);
  const rootElement = page.locator(':root');
  const darkBackground = await rootElement.evaluate((element) => {
    return getComputedStyle(element).getPropertyValue('--background').trim();
  });
  expect(darkBackground).toBe('20 14.3% 4.1%');

  // Click on the "Light" to verify background color
  await themeToggle.click();
  await lightOption.click();
  await page.waitForTimeout(1000); 
  const lightBackground = await rootElement.evaluate((element) => {
    return getComputedStyle(element).getPropertyValue('--background').trim();
  });
  expect(lightBackground).toBe('0 0% 100%');
});
