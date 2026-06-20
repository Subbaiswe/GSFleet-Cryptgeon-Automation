import { expect, test } from '@playwright/test';

const APP_URL = 'https://onetimeshare.gsfleet.io/';
const NOTE_TEXT = `Test Note ${Date.now()}`;

test.describe('One Time Share note read', () => {
  test('creates and reads a text note', async ({ page }) => {
    let generatedUrl = '';

    const noteTextField = page.getByTestId('text-field');
    const createButton = page.getByRole('button', { name: /^create$/i });
    const shareLink = page.getByTestId('share-link');

    await test.step('Open the application', async () => {
      await page.goto(APP_URL);
    });

    await test.step('Enter note content', async () => {
      await expect(noteTextField).toBeVisible();
      await noteTextField.fill(NOTE_TEXT);
      await expect(noteTextField).toHaveValue(NOTE_TEXT);
    });

    await test.step('Create the note', async () => {
      await expect(createButton).toBeEnabled();
      await createButton.click();

      await expect(shareLink).toBeVisible();

      generatedUrl = await shareLink.inputValue();

      console.log(`Generated URL: ${generatedUrl}`);

      expect(generatedUrl).toContain('/note/');
    });

    await test.step('Open generated note URL', async () => {
      await page.goto(generatedUrl);

      const viewNoteButton = page.getByTestId('show-note-button');

      await expect(viewNoteButton).toBeVisible();
      await viewNoteButton.click();

      const noteContent = page.getByText(NOTE_TEXT);

      await expect(noteContent).toBeVisible();
    });
  });
});