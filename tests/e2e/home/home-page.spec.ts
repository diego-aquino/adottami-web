import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test('page should have the correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Adottami/);
  });
});
