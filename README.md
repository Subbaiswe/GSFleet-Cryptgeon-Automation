# GSFleet Cryptgeon Automation

## Project Overview

Automated end-to-end tests for [One Time Share](https://onetimeshare.gsfleet.io) — a secure, self-destructing note sharing app. Built with [Playwright](https://playwright.dev/) and TypeScript, covering note creation, reading, self-destruction, password protection, and invalid password handling.

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- [Git](https://git-scm.com/downloads)

---

## Installation

```bash
# 1. Clone the repo
git clone https://github.com/Subbaiswe/GSFleet-Cryptgeon-Automation.git
cd GSFleet-Cryptgeon-Automation

# 2. Install dependencies
npm install

# 3. Install Playwright browsers (run once)
npx playwright install
```

---

## Run All Tests

```bash
npx playwright test
```

To run in a specific browser:

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

To see the browser while tests run, add `--headed`:

```bash
npx playwright test --headed
```

After running, open the HTML report with:

```bash
npx playwright show-report
```

---

## Run Individual Tests

```bash
npx playwright test tests/Note_Creation.spec.ts
npx playwright test tests/Note_Read.spec.ts
npx playwright test tests/Note_Delete_After_Read.spec.ts
npx playwright test tests/Password_Protected_Note.spec.ts
npx playwright test tests/Invalid_Password.spec.ts
```

---

## Test Scenarios Covered

| Test File | Scenario | What it Validates |
|---|---|---|
| `Note_Creation.spec.ts` | TS001 | Creates a note and verifies a share link is generated |
| `Note_Read.spec.ts` | TS002 | Creates a note, opens the share link, and confirms content is visible |
| `Note_Delete_After_Read.spec.ts` | TS003 | Confirms the note is permanently deleted after being read once |
| `Password_Protected_Note.spec.ts` | TS006 / TS007 | Creates a password-protected note and reads it with the correct password |
| `Invalid_Password.spec.ts` | TS017 | Enters a wrong password and verifies the error message is displayed |
