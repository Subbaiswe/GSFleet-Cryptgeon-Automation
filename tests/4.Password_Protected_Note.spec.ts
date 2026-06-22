import { expect, test } from '@playwright/test';

const APP_URL = 'https://onetimeshare.gsfleet.io/';
const NOTE_TEXT = `Test Note ${Date.now()}`;
const NOTE_PASSWORD = 'HappyTesting';

test.describe('One Time Share password protected note', () => {
  test('creates and reads a password protected note', async ({ page }) => {
    let generatedUrl = '';

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
      const advancedOptionsToggle = page.getByTestId('switch-advanced');
      await advancedOptionsToggle.click();
      const customPasswordToggle = page.getByTestId('custom-password');
      await customPasswordToggle.click();
      const customPasswordField = page.getByTestId('password');
      await expect(customPasswordField).toBeVisible();
      await customPasswordField.fill(NOTE_PASSWORD);
    });

    await test.step('Create the note', async () => {
      await expect(createButton).toBeEnabled();
      await createButton.click();
      const shareLink = page.getByTestId('share-link');
      await expect(shareLink).toBeVisible();
      console.log('Share link field is visible');
      generatedUrl = await shareLink.inputValue();
      console.log(`Generated URL: ${generatedUrl}`);
      expect(generatedUrl).toContain('/note/');
    });

    await test.step('Open generated note URL', async () => {
      const newPage = await page.context().newPage();
      await newPage.goto(generatedUrl);
      const viewNoteButton = newPage.getByTestId('show-note-button');
      await expect(viewNoteButton).toBeVisible();
      const passwordField = newPage.getByTestId('show-note-password');
      await expect(passwordField).toBeVisible();
      await passwordField.fill(NOTE_PASSWORD);
      await viewNoteButton.click();
      const noteContent = newPage.getByText(NOTE_TEXT);
      await expect(noteContent).toBeVisible();
    });
  });
});
