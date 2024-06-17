import { test, expect } from '@playwright/test';

test('has login button and navigates to sign-in', async ({ page }) => {
  await page.goto('https://nexlearn.vercel.app/');

  // Expect a button with the text "Login" to be visible.
  const loginButton = page.locator('text=Login');
  await expect(loginButton).toBeVisible();

  // Click the login button.
  await loginButton.click();

  // Expect to have URL with "signin" and "callbackUrl"
  await expect(page).toHaveURL(/nexlearn\.vercel\.app\/api\/auth\/signin\?callbackUrl/, { timeout: 10000 });


  // Expect the text "Sign in with Github" and "Sign in with Google" to be visible
  const githubSignInButton = page.locator('text=Sign in with Github');
  await expect(githubSignInButton).toBeVisible();

  const googleSignInButton = page.locator('text=Sign in with Google');
  await expect(googleSignInButton).toBeVisible();
});
