# SauceDemo Playwright Framework (TypeScript)

Hybrid framework: Page Object Model, custom fixtures, data driven tests,
saved authentication state, cookie based session injection, and network control.

## Setup
    npm install
    npx playwright install
    cp .env.example .env

## Run
    npm test              all tests
    npm run test:smoke    smoke only
    npm run test:ui       Playwright UI mode
    npm run report        open HTML report

## Structure
    src/pages      page objects
    src/fixtures   custom test fixtures
    src/data       users, products, data driven cases
    tests/ui       login, inventory, cart, checkout
    tests/hybrid   cookie session, API and network tests
    tests/auth.setup.ts   logs in once and stores session
[View the latest Allure report](https://benzx21.github.io/Saucedemo-playwright/)
