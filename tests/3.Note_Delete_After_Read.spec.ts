import { expect, test } from '@playwright/test';

const APP_URL = 'https://onetimeshare.gsfleet.io/';
const NOTE_TEXT = `Test Note ${Date.now()}`;

test.describe('One Time Share note delete after read', () => {
  test('creates, reads, and deletes a text note', async ({ page }) => {
    let generatedUrl = '';

    await test.step('Open the application', async () => {
      await page.goto(APP_URL);
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
    
    await test.step('Verify note is deleted after being read', async () => {
      const newPage = await page.context().newPage();
      await newPage.goto(generatedUrl);
      const deletedMessage = newPage.getByText(
        'note was not found or was already deleted.',
        { exact: false }
      );

      await expect(deletedMessage).toBeVisible();
    });
  });
});
