# 🚀 GSFleet Cryptgeon Automation

A robust and maintainable **end-to-end test automation framework** built with **Playwright and TypeScript** to validate secure note-sharing workflows in Cryptgeon.

---

## 📖 Overview

This project automates critical user journeys of **Cryptgeon**, a secure platform used for sharing encrypted notes and files with restricted access.

The framework simulates real user interactions to ensure:
- Secure note creation  
- Reliable link sharing  
- Controlled access (views, time, password)  
- Automatic note expiration  

---

## 🎯 Key Capabilities

- End-to-end UI automation using Playwright  
- Validation of secure and time-bound workflows  
- Cross-browser execution support  
- CI-ready structure for automated pipelines  
- Minimal setup with fast execution  

---

## ⚡ Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/Subbaiswe/GSFleet-Cryptgeon-Automation.git

# 2. Navigate to the project
cd GSFleet-Cryptgeon-Automation

# 3. Install dependencies
npm install

# 4. Install Playwright browsers
npx playwright install

# 5. Run tests
npx playwright test
```

---

## 🛠 Technology Stack

- **Playwright** – Modern browser automation tool  
- **TypeScript** – Strongly typed scripting  
- **Node.js** – Runtime environment  
- **GitHub Actions** – Continuous Integration  

---

## 📂 Project Structure

```
.
├── tests/                     # Automated test scenarios
├── playwright.config.ts       # Global test configuration
├── package.json               # Dependencies & scripts
├── Imp_Commands.txt           # Helpful execution commands
└── .github/workflows/         # CI/CD pipelines
```

---

## ▶️ Running Tests

```bash
npx playwright test
```

```bash
npx playwright test --headed
```

```bash
npx playwright test tests/<file-name>.spec.ts
```

---

## ✅ Sample Test Scenarios

### 🔹 Create a Secure Note

```ts
import { test, expect } from '@playwright/test';

test('Create a secure note', async ({ page }) => {
  await page.goto('https://onetimeshare.gsfleet.io/');

  await page.getByPlaceholder('Enter your secret...').fill('Test Note');

  await page.getByRole('button', { name: 'Create' }).click();

  const link = await page.locator('input[type="text"]').inputValue();
  expect(link).toContain('http');
});
```

---

### 🔹 Access Shared Note

```ts
test('Access a shared note', async ({ page }) => {
  await page.goto('https://onetimeshare.gsfleet.io/note/abc123');

  await page.getByRole('button', { name: 'Reveal' }).click();

  await expect(page.locator('text=Test Note')).toBeVisible();
});
```

---

### 🔹 Validate Expiry Behavior

```ts
test('Verify note expires after access', async ({ page }) => {
  const link = 'https://onetimeshare.gsfleet.io/note/abc123';

  await page.goto(link);
  await page.getByRole('button', { name: 'Reveal' }).click();

  await page.goto(link);

  await expect(page.locator('text=Note not found')).toBeVisible();
});
```

---

## 🔄 Test Workflow

1. Navigate to Cryptgeon application  
2. Create a secure note  
3. Generate a shareable link  
4. Open the link in a new session  
5. Validate content visibility  
6. Verify access restrictions and expiration  

---

## 📊 Test Reports

```bash
npx playwright show-report
```

Reports include:
- Execution results  
- Screenshots for failures  
- Debugging traces  

---

## ⚙️ Configuration

Configured via `playwright.config.ts`:
- Browser setup (Chromium, Firefox, WebKit)  
- Parallel execution  
- Retry logic  
- Timeouts  

---

## 🔧 Useful Commands

Refer to `Imp_Commands.txt` for:
- Debugging commands  
- Execution shortcuts  
- Setup references  

---

## ✅ Best Practices

- Clean and readable test cases  
- Reliable locators (`getByRole`, `getByPlaceholder`)  
- Minimal setup for fast onboarding  
- Structured project layout  
- CI/CD ready  

---

## 🚧 Future Improvements

- Test data management  
- API-level validation  
- Enhanced reporting tools  
- Parallel execution tuning  

---

## 🤝 Contribution

1. Fork the repository  
2. Create a feature branch  
3. Commit changes  
4. Submit a pull request  

---

## 📜 License

MIT License

---

## 👨‍💻 Author

Automation framework for validating Cryptgeon workflows using Playwright.

There are multiple test cases in plan, however, they are being integrated one by one. Community collaboration is much appreciated.
