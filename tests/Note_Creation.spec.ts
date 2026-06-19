import { expect, test } from '@playwright/test';

const APP_URL = 'https://onetimeshare.gsfleet.io/';
const NOTE_TEXT = `Test Note ${Date.now()}`;

test.describe('One Time Share note creation', () => {
  test('creates a text note', async ({ page }) => {
    await test.step('Open the application', async () => {
      await page.goto(APP_URL);
      await expect(page).toHaveURL(APP_URL);
    });

    const noteTextField = page.getByTestId('text-field');
    const createButton = page.getByRole('button', { name: /^create$/i });

    await test.step('Enter note content', async () => {
      await expect(noteTextField).toBeVisible();
      await noteTextField.fill(NOTE_TEXT);
      await expect(noteTextField).toHaveValue(NOTE_TEXT);
    });

    await test.step('Create the note', async () => {
      await expect(createButton).toBeEnabled();
      await createButton.click();
      const shareLink = page.getByTestId('share-link');
      await expect(shareLink).toBeVisible();
      const generatedUrl = await shareLink.inputValue();
      console.log(`Generated URL: ${generatedUrl}`);
      expect(generatedUrl).toContain('/note/');
    });
  });
});
