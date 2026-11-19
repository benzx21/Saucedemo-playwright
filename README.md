# Saucedemo Playwright Framework

![Playwright Tests](https://github.com/benzx21/Saucedemo-playwright/actions/workflows/playwright.yml/badge.svg)

An automated test framework for [saucedemo.com](https://www.saucedemo.com) built with Playwright and TypeScript. It combines UI and API testing, uses the Page Object Model, and runs in CI with a live Allure report.

**Live Allure report:** https://benzx21.github.io/Saucedemo-playwright/

## Tech Stack

1. Playwright
2. TypeScript
3. Allure Report
4. GitHub Actions and GitHub Pages
5. dotenv for environment config

## Framework Highlights

1. Page Object Model with a shared BasePage
2. Custom fixtures that inject page objects into tests
3. Data driven tests using a central users file
4. Saved authentication state so tests skip repeated logins
5. Hybrid UI and API testing
6. Cross browser coverage for login tests (Chromium and Firefox)
7. Screenshots, video and traces captured on failure
8. CI on every push and pull request, plus a nightly run at 8pm UK time
9. Allure report published to GitHub Pages after every run on main

## Project Structure

```
.github/workflows/
  playwright.yml        CI pipeline, nightly schedule and Pages deploy
src/
  data/                 Test data (users)
  fixtures/             Custom Playwright fixtures
  pages/                Page Object Model classes
    BasePage.ts
    LoginPage.ts
    InventoryPage.ts
    CartPage.ts
    CheckoutPage.ts
tests/
  auth.setup.ts         Logs in once and saves the session
  ui/                   Login, inventory, cart and checkout tests
  hybrid/               Hybrid UI and API session tests
playwright.config.ts
.env.example
```

## Prerequisites

1. Node.js 20 or newer
2. Git
3. Java 11 or newer (only needed to view the Allure report locally)

## Setup

```
git clone https://github.com/benzx21/Saucedemo-playwright.git
cd Saucedemo-playwright
npm install
npx playwright install --with-deps
```

Optionally copy the example environment file:

```
cp .env.example .env
```

On Windows PowerShell use `copy .env.example .env`.

## Environment Variables

| Variable | Purpose | Default |
| --- | --- | --- |
| `BASE_URL` | Application under test | https://www.saucedemo.com |

If `.env` is missing, the config falls back to the default URL.

## Running the Tests

| Command | What it does |
| --- | --- |
| `npm test` | Runs all tests headless |
| `npm run test:headed` | Runs tests in a visible browser |
| `npm run test:ui` | Opens Playwright UI mode |
| `npm run test:smoke` | Runs only tests tagged @smoke |
| `npx playwright test tests/ui/login.spec.ts` | Runs a single file |
| `npx playwright test --project=chromium` | Runs one project only |
| `npx playwright test --debug` | Runs in debug mode |
| `npm run lint` | Type checks the code with TypeScript |

## Reports

**Playwright HTML report**

```
npm run report
```

**Allure report (local)**

```
npm run allure:serve
```

This builds the report from `allure-results` and opens it in your browser.

To generate a saved report folder instead:

```
npm run allure:generate
npm run allure:open
```

**Allure report (live)**

[View the latest Allure report](https://benzx21.github.io/Saucedemo-playwright/)
## CI/CD

The GitHub Actions workflow runs:

1. On every push and pull request
2. Every night at 8pm UK time (handles GMT and BST)
3. On demand from the Actions tab using **Run workflow**

Each run uploads the Playwright report and Allure results as artifacts. Runs on main also deploy the Allure report to GitHub Pages.


## Author

Benson


