import { expect, test } from '@playwright/test';

const APP_URL = 'https://onetimeshare.gsfleet.io/';
const NOTE_TEXT = `Test Note ${Date.now()}`;

test.describe('One Time Share note creation', () => {
  test('creates a text note with advanced options enabled', async ({ page }) => {
    await test.step('Open the application', async () => {
      await page.goto(APP_URL);
      await expect(page).toHaveURL(APP_URL);
    });

    const noteTextField = page.getByTestId('text-field');
    const advancedOptionsSwitch = page.getByTestId('switch-advanced');
    const createButton = page.getByRole('button', { name: /^create$/i });

    await test.step('Enter note content', async () => {
      await expect(noteTextField).toBeVisible();
      await noteTextField.fill(NOTE_TEXT);
      await expect(noteTextField).toHaveValue(NOTE_TEXT);
    });

    await test.step('Enable advanced options', async () => {
      // Click the control by test id so the test is resilient to DOM structure changes.
      await expect(advancedOptionsSwitch).toBeVisible();
      await advancedOptionsSwitch.click();
    });

    await test.step('Create the note', async () => {
      await expect(createButton).toBeEnabled();
      await createButton.click();
      //await page.waitForTimeout(10000);
      const shareLink = page.getByTestId('share-link');

      await expect(shareLink).toBeVisible();
      console.log('Share link field is visible');

      await page.waitForTimeout(5000);
    });
  });
});
