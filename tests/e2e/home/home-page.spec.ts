import { test, expect } from '@playwright/test';

import createUser from '@/models/user/__tests__/factories/user-factory';
import AdottamiClient from '@/services/adottami-client/adottami-client';
import { saveUserIfNecessary } from '@tests/utils/e2e/users';

test.describe('Home page', () => {
  const adottami = new AdottamiClient(null);

  const user = createUser();
  const password = 'password';

  test.beforeAll(async () => {
    await saveUserIfNecessary(adottami, user, password);
  });

  test('page should have the correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Adottami/);
  });

  test('page should show a sign up link in the header, if initially not authenticated', async ({ page }) => {
    await page.goto('/');

    const signInLink = page.getByRole('link', { name: 'Entrar' });
    await expect(signInLink).toBeVisible();
  });

  test('page should show the user name in the header, if authenticated', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Entrar' }).click();
    await page.getByRole('textbox', { name: 'E-mail' }).fill(user.email());
    await page.getByRole('textbox', { name: 'Senha' }).fill(password);
    await page.getByRole('button', { name: 'Entrar' }).click();

    await page.goto('/');

    const userNameLink = page.getByRole('link', { name: user.name() });
    await expect(userNameLink).toBeVisible();
  });

  test('page should show a sign up link in the header, after logout', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Entrar' }).click();
    await page.getByRole('textbox', { name: 'E-mail' }).fill(user.email());
    await page.getByRole('textbox', { name: 'Senha' }).fill(password);
    await page.getByRole('button', { name: 'Entrar' }).click();

    await page.goto('/');

    const userNameLink = page.getByRole('link', { name: user.name() });
    await expect(userNameLink).toBeVisible();

    await page.getByRole('button', { name: 'Abrir menu do usuário' }).hover();
    await page.getByRole('link', { name: 'Sair' }).click();

    const signInLink = page.getByRole('link', { name: 'Entrar' });
    await expect(signInLink).toBeVisible();
  });
});
