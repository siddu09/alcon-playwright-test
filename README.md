# 🎭 Alcon Playwright BDD Automation Framework

<div align="center">

![Playwright](https://img.shields.io/badge/Playwright-1.61.0-45ba4b?style=for-the-badge&logo=playwright)
![Cucumber](https://img.shields.io/badge/Cucumber-13.0.0-23d96c?style=for-the-badge&logo=cucumber)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0.3-3178c6?style=for-the-badge&logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-20_LTS-339933?style=for-the-badge&logo=nodedotjs)
![Allure](https://img.shields.io/badge/Allure-3.x-orange?style=for-the-badge)
![License](https://img.shields.io/badge/License-Apache_2.0-blue?style=for-the-badge)

### **Enterprise-Grade Test Automation Framework**
### **Playwright · Cucumber BDD · TypeScript · Allure**

*Authored by · **Siddesh Belura***

</div>

---

## 📋 Table of Contents

| # | Section |
|---|---|
| 1 | [Framework Overview](#-framework-overview) |
| 2 | [Technology Stack](#-technology-stack) |
| 3 | [Project Structure](#-project-structure) |
| 4 | [Prerequisites](#-prerequisites) |
| 5 | [Installation — Step by Step](#-installation--step-by-step) |
| 6 | [Environment Configuration](#-environment-configuration) |
| 7 | [NPM Scripts Reference](#-npm-scripts-reference) |
| 8 | [Running BDD Cucumber Tests](#-running-bdd-cucumber-tests) |
| 9 | [Running Playwright Test Specs](#-running-playwright-test-specs) |
| 10 | [Allure Reports](#-allure-reports) |
| 11 | [Playwright Reports & Traces](#-playwright-reports--traces) |
| 12 | [Code Quality](#-code-quality) |
| 13 | [Debugging](#-debugging) |
| 14 | [CI/CD Pipelines](#-cicd-pipelines) |
| 15 | [Adding New Tests](#-adding-new-tests) |
| 16 | [Framework Architecture](#-framework-architecture) |
| 17 | [Design Patterns](#-design-patterns) |
| 18 | [Troubleshooting](#-troubleshooting) |
| 19 | [Quick Reference Cheat Sheet](#-quick-reference-cheat-sheet) |

---

## 🎯 Framework Overview

The **Alcon Playwright BDD Framework** is a production-ready, enterprise-grade automation
framework designed for end-to-end web application testing. It combines the power of
**Playwright's** fast and reliable browser automation with **Cucumber's** human-readable
BDD approach and **TypeScript's** strict type safety.

### ✨ Key Capabilities

| Capability | Description |
|---|---|
| ✅ **Multi-Browser Testing** | Chromium, Firefox, WebKit (Safari) |
| ✅ **BDD / Gherkin** | Human-readable scenarios via Cucumber.js |
| ✅ **Parallel Execution** | Configurable worker count for fast CI pipelines |
| ✅ **Multi-Environment** | Dev / QA / Prod isolated environment configs |
| ✅ **Rich Reporting** | Allure interactive reports + Cucumber HTML reports |
| ✅ **Structured Logging** | Winston daily-rotating log files per environment |
| ✅ **Screenshot on Failure** | Auto-captured and embedded into Allure reports |
| ✅ **Trace Recording** | Playwright trace ZIPs for root-cause analysis |
| ✅ **Video Recording** | Optional test session MP4 recordings |
| ✅ **Data-Driven Testing** | Scenario Outlines + typed JSON test data files |
| ✅ **Type Safety** | Strict TypeScript throughout the entire codebase |
| ✅ **CI/CD Ready** | GitHub Actions + Jenkins pipelines included |
| ✅ **AI Agent Ready** | Agent configs, prompt templates, and MCP stubs |
| ✅ **Page Object Model** | Abstract BasePage + feature-level Page Objects |
| ✅ **Code Quality** | ESLint + Prettier + strict tsconfig enforced |

---

## 🛠 Technology Stack

| Technology | Version | Purpose |
|---|---|---|
| [Playwright](https://playwright.dev) | ^1.61.0 | Browser automation engine |
| [@playwright/test](https://playwright.dev/docs/api/class-test) | ^1.61.0 | Playwright native test runner |
| [Cucumber.js](https://cucumber.io) | ^13.0.0 | BDD test runner & Gherkin parser |
| [TypeScript](https://typescriptlang.org) | ^6.0.3 | Type-safe test authoring |
| [Node.js](https://nodejs.org) | 20 LTS | JavaScript runtime |
| [Winston](https://github.com/winstonjs/winston) | ^3.19.0 | Structured logging |
| [winston-daily-rotate-file](https://github.com/winstonjs/winston-daily-rotate-file) | ^5.0.0 | Log file rotation |
| [allure-cucumberjs](https://github.com/allure-framework/allure-js) | ^3.0.0 | Allure ↔ Cucumber bridge |
| [allure-playwright](https://github.com/allure-framework/allure-js) | ^3.0.0 | Allure ↔ Playwright bridge |
| [allure-commandline](https://github.com/allure-framework/allure2) | ^2.32.0 | Allure CLI to build HTML reports |
| [dotenv](https://github.com/motdotla/dotenv) | ^17.4.2 | Environment variable loader |
| [ts-node](https://typestrong.org/ts-node) | ^10.9.2 | TypeScript direct execution |
| [ESLint](https://eslint.org) | ^8.57.0 | Code linting |
| [Prettier](https://prettier.io) | ^3.2.5 | Code formatting |
| [rimraf](https://github.com/isaacs/rimraf) | ^6.0.1 | Cross-platform rm -rf |

---

## 📁 Project Structure

```
alcon-playwright-test/
│
├── .github/
│   └── workflows/
│       └── playwright.yml              ← GitHub Actions CI/CD pipeline
│
├── agents/
│   ├── configs/
│   │   └── agent.config.ts             ← AI agent model & tool configuration
│   ├── prompts/
│   │   └── test-generator.md           ← Prompt template for AI test generation
│   └── README.md                       ← Agent documentation
│
├── config/
│   ├── environments/
│   │   ├── dev.env                     ← Development environment variables
│   │   ├── qa.env                      ← QA environment variables
│   │   └── prod.env                    ← Production environment variables
│   └── environment.config.ts           ← Singleton environment config loader
│
├── data/
│   ├── users/
│   │   └── users.json                  ← User credentials for all roles
│   ├── products/
│   │   └── products.json               ← Product catalog test data
│   └── checkout/
│       └── checkout.json               ← Checkout form test data
│
├── docs/
│   └── SKILLS.md                       ← Tech stack & design patterns document
│
├── features/
│   ├── auth/
│   │   └── login.feature               ← Login BDD scenarios
│   └── dashboard/
│       └── dashboard.feature           ← Dashboard BDD scenarios
│
├── fixtures/
│   ├── base.fixture.ts                 ← Browser / context / page factory
│   └── page.fixture.ts                 ← Page Object factory
│
├── hooks/
│   ├── world.ts                        ← CustomWorld — Cucumber shared state
│   ├── browser.hooks.ts                ← Before/After browser lifecycle hooks
│   └── report.hooks.ts                 ← Step logging & Allure env hooks
│
├── jenkins/
│   └── Jenkinsfile                     ← Jenkins declarative pipeline
│
├── mcp/
│   ├── servers/                        ← MCP server stubs (future integration)
│   ├── tools/                          ← MCP tool stubs (future integration)
│   └── README.md                       ← MCP integration documentation
│
├── pages/
│   ├── base/
│   │   └── base.page.ts                ← Abstract BasePage (all POMs extend this)
│   ├── auth/
│   │   └── login.page.ts               ← Login Page Object Model
│   └── dashboard/
│       └── dashboard.page.ts           ← Dashboard / Inventory Page Object Model
│
├── prompts/
│   └── README.md                       ← Shared AI prompt template index
│
├── reports/                            ← Runtime generated — gitignored
│   ├── allure-results/                 ← Raw Allure JSON result files
│   ├── allure-report/                  ← Built Allure HTML report
│   ├── logs/                           ← Winston daily-rotating log files
│   ├── screenshots/                    ← Failure screenshots (PNG)
│   ├── traces/                         ← Playwright trace ZIP files
│   ├── videos/                         ← Test session MP4 recordings
│   ├── cucumber-report.html            ← Cucumber HTML report
│   └── cucumber-report.json            ← Cucumber JSON report
│
├── src/
│   ├── constants/
│   │   ├── timeouts.constants.ts       ← All timeout values in milliseconds
│   │   └── selectors.constants.ts      ← All CSS / data-test-id selectors
│   └── types/
│       ├── environment.types.ts        ← IEnvironmentConfig, Environment types
│       └── world.types.ts              ← ICustomWorld, IScenarioResult types
│
├── step-definitions/
│   ├── auth/
│   │   └── login.steps.ts              ← Login feature step implementations
│   └── common/
│       ├── dashboard.steps.ts          ← Dashboard & shared auth steps
│       └── common.steps.ts             ← Reusable generic steps
│
├── tests/
│   └── login.spec.ts                   ← Playwright Test (non-BDD) specs
│
├── utils/
│   ├── data/
│   │   ├── data-loader.ts              ← JSON file reader with caching
│   │   └── test-data.manager.ts        ← Typed accessors for all test data
│   ├── helpers/
│   │   ├── browser.helper.ts           ← Browser / context / page factory helpers
│   │   ├── element.helper.ts           ← Advanced element interaction helpers
│   │   └── wait.helper.ts              ← Wait, poll & retry helpers
│   ├── logger/
│   │   └── winston.logger.ts           ← Singleton Winston logger instance
│   └── reporters/
│       └── allure.reporter.ts          ← Allure environment & attachment helper
│
├── .env.example                        ← Environment variable template
├── .eslintrc.json                      ← ESLint rules and configuration
├── .gitignore                          ← Git ignore rules
├── .prettierrc                         ← Prettier formatting configuration
├── cucumber.config.js                  ← Cucumber profiles (default/parallel/smoke)
├── package.json                        ← NPM scripts and dependencies
├── playwright.config.ts                ← Playwright Test configuration
├── README.md                           ← This file
└── tsconfig.json                       ← TypeScript compiler configuration
```

---

## ✅ Prerequisites

### Required Software

| Software | Minimum Version | Recommended | Check Command |
|---|---|---|---|
| **Node.js** | v18.0.0 | v20 LTS | `node --version` |
| **npm** | v9.0.0 | v10.x | `npm --version` |
| **Git** | v2.x | Latest | `git --version` |
| **Java JDK** | v11 | v17 LTS | `java --version` |
| **Allure CLI** | v2.x | v2.32+ | `allure --version` |

### ✅ Check All Prerequisites at Once

```bash
echo "======================================" && \
echo "       PREREQUISITE CHECK             " && \
echo "======================================" && \
echo "Node.js : $(node --version  2>/dev/null || echo '❌ NOT INSTALLED')" && \
echo "npm     : $(npm --version   2>/dev/null || echo '❌ NOT INSTALLED')" && \
echo "Git     : $(git --version   2>/dev/null || echo '❌ NOT INSTALLED')" && \
echo "Java    : $(java --version  2>&1 | head -1 || echo '❌ NOT INSTALLED')" && \
echo "Allure  : $(allure --version 2>/dev/null || echo '❌ NOT INSTALLED')" && \
echo "======================================"
```

---

## 🚀 Installation — Step by Step

> **Follow every step in order for a clean setup.**

---

### STEP 1 — Install Homebrew (Mac Package Manager)

```bash
# Check if Homebrew is already installed
brew --version

# If NOT installed, run this command
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# For Apple Silicon (M1/M2/M3) — add to PATH
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zshrc
source ~/.zshrc

# Verify Homebrew
brew --version
```

---

### STEP 2 — Install Node.js via NVM (Recommended)

> NVM lets you manage multiple Node.js versions easily.

```bash
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Reload shell configuration
source ~/.zshrc

# Verify NVM installed
nvm --version

# Install Node.js LTS (Long Term Support)
nvm install --lts

# Use the LTS version
nvm use --lts

# Set LTS as default
nvm alias default node

# Verify Node.js and npm
node --version    # Should show v20.x.x or higher
npm --version     # Should show 10.x.x or higher
```

#### OR — Install Node.js via Homebrew

```bash
brew install node

node --version
npm --version
```

---

### STEP 3 — Install Java JDK (Required for Allure HTML Reports)

```bash
# Install OpenJDK 17 via Homebrew
brew install openjdk@17

# Add Java to your PATH permanently
echo 'export PATH="/opt/homebrew/opt/openjdk@17/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# Verify Java installation
java --version
# Expected output: openjdk 17.x.x ...
```

---

### STEP 4 — Install Allure CLI (For Interactive HTML Reports)

```bash
# Install Allure via Homebrew
brew install allure

# Verify Allure installation
allure --version
# Expected output: 2.32.x or higher
```

---

### STEP 5 — Clone or Navigate to the Project

```bash
# Option A — Clone from Git repository
git clone <your-repository-url>
cd alcon-playwright-test

# Option B — Navigate to existing project
cd /Users/sid/Documents/PlaywrightAutomation/alcon-playwright-test

# Verify you are in the right directory
pwd
ls -la
```

---

### STEP 6 — Create All Required Project Directories

```bash
mkdir -p \
  .github/workflows \
  agents/configs \
  agents/prompts \
  config/environments \
  data/users \
  data/products \
  data/checkout \
  docs \
  features/auth \
  features/dashboard \
  fixtures \
  hooks \
  jenkins \
  mcp/servers \
  mcp/tools \
  pages/base \
  pages/auth \
  pages/dashboard \
  prompts \
  reports/allure-results \
  reports/allure-report \
  reports/logs \
  reports/screenshots \
  reports/traces \
  reports/videos \
  src/constants \
  src/types \
  step-definitions/auth \
  step-definitions/common \
  tests \
  utils/data \
  utils/helpers \
  utils/logger \
  utils/reporters

echo "✅ All directories created successfully"
```

---

### STEP 7 — Add .gitkeep Placeholders to Empty Directories

> Git does not track empty directories. `.gitkeep` ensures they appear in source control.

```bash
touch \
  reports/allure-results/.gitkeep \
  reports/allure-report/.gitkeep \
  reports/logs/.gitkeep \
  reports/screenshots/.gitkeep \
  reports/traces/.gitkeep \
  reports/videos/.gitkeep \
  mcp/servers/.gitkeep \
  mcp/tools/.gitkeep

echo "✅ .gitkeep files added"
```

---

### STEP 8 — Verify the Directory Structure

```bash
find . -type d \
  -not -path '*/node_modules/*' \
  -not -path '*/.git/*' \
  | sort
```

---

### STEP 9 — Install Node.js Dependencies

```bash
# ── Recommended: clean install from package-lock.json
npm ci

# ── OR: Fresh install (if no lock file exists yet)
npm install

# Verify all packages installed correctly
npm list --depth=0
```

#### Manual Install (If package.json needs to be recreated)

```bash
# Core Runtime Dependencies
npm install \
  @cucumber/cucumber \
  @cucumber/html-formatter \
  @cucumber/pretty-formatter \
  allure-cucumberjs \
  allure-playwright \
  dotenv \
  playwright \
  winston \
  winston-daily-rotate-file

# Dev Dependencies
npm install --save-dev \
  @playwright/test \
  @types/node \
  @typescript-eslint/eslint-plugin \
  @typescript-eslint/parser \
  allure-commandline \
  eslint \
  prettier \
  rimraf \
  ts-node \
  typescript
```

---

### STEP 10 — Install Playwright Browsers

```bash
# ── Install ALL browsers with system dependencies (Recommended — First Time Setup)
npx playwright install --with-deps

# ── OR install specific browsers only
npx playwright install chromium --with-deps   # Google Chrome engine
npx playwright install firefox  --with-deps   # Mozilla Firefox
npx playwright install webkit   --with-deps   # Apple Safari engine

# Verify browser installation
npx playwright --version

# List installed browser binaries
ls ~/Library/Caches/ms-playwright/
```

---

### STEP 11 — Setup Environment Configuration File

```bash
# Copy the template to create your .env file
cp .env.example .env

# Open in VS Code to edit values
code .env

# OR edit directly in terminal with nano
nano .env

# OR edit with vim
vim .env
```

---

### STEP 12 — Verify Full Installation

```bash
echo "======================================" && \
echo "       INSTALLATION VERIFICATION      " && \
echo "======================================" && \

# TypeScript compilation check
echo "1. TypeScript check..." && \
npm run type-check && echo "   ✅ TypeScript: PASSED" && \

# ESLint check
echo "2. ESLint check..." && \
npm run lint && echo "   ✅ ESLint: PASSED" && \

# List Playwright tests
echo "3. Playwright test list..." && \
npx playwright test --list && \

# Cucumber dry run
echo "4. Cucumber dry run..." && \
npx cucumber-js --dry-run && echo "   ✅ Cucumber: PASSED" && \

echo "======================================" && \
echo "   ✅ ALL CHECKS PASSED — READY!      " && \
echo "======================================"
```

---

## ⚙️ Environment Configuration

### .env File — All Variables

```bash
# ── Target Environment ────────────────────────────────────────────────────────
ENV=qa                                    # dev | qa | prod

# ── Application URLs ─────────────────────────────────────────────────────────
BASE_URL=https://www.saucedemo.com        # Application under test URL
API_URL=https://api-qa.example.com        # API base URL (optional)

# ── Test Credentials ─────────────────────────────────────────────────────────
TEST_USERNAME=standard_user               # Default test username
TEST_PASSWORD=secret_sauce                # Default test password

# ── Browser Settings ─────────────────────────────────────────────────────────
BROWSER=chromium                          # chromium | firefox | webkit
HEADLESS=true                             # true = no UI | false = visible browser
SLOW_MO=0                                 # Delay between actions in ms (0 = off)

# ── Timeouts (milliseconds) ───────────────────────────────────────────────────
TIMEOUT=30000                             # Default action timeout
NAVIGATION_TIMEOUT=60000                  # Page navigation timeout

# ── Parallel Execution ────────────────────────────────────────────────────────
PARALLEL_WORKERS=1                        # Number of parallel workers

# ── Logging ───────────────────────────────────────────────────────────────────
LOG_LEVEL=info                            # error | warn | info | debug | verbose
LOG_CONSOLE=true                          # true = print logs to terminal

# ── Recording ─────────────────────────────────────────────────────────────────
RECORD_VIDEO=false                        # true = record test session videos
RECORD_TRACE=false                        # true = save Playwright traces

# ── Report Directories ────────────────────────────────────────────────────────
ALLURE_RESULTS_DIR=reports/allure-results
SCREENSHOTS_DIR=reports/screenshots
TRACES_DIR=reports/traces
VIDEOS_DIR=reports/videos
LOGS_DIR=reports/logs
```

### Environment-Specific Config Files

```
config/environments/dev.env    ← Auto-loaded when ENV=dev
config/environments/qa.env     ← Auto-loaded when ENV=qa  (default)
config/environments/prod.env   ← Auto-loaded when ENV=prod
```

### Verify Environment Loads Correctly

```bash
node -e "
  require('dotenv').config({ path: 'config/environments/qa.env' });
  console.log('ENV               :', process.env.ENV);
  console.log('BASE_URL          :', process.env.BASE_URL);
  console.log('BROWSER           :', process.env.BROWSER);
  console.log('HEADLESS          :', process.env.HEADLESS);
  console.log('TIMEOUT           :', process.env.TIMEOUT);
  console.log('PARALLEL_WORKERS  :', process.env.PARALLEL_WORKERS);
  console.log('LOG_LEVEL         :', process.env.LOG_LEVEL);
"
```

---

## 📜 NPM Scripts Reference

| Script | Command | Description |
|---|---|---|
| `test` | `npm test` | Run all BDD tests (default env) |
| `test:dev` | `npm run test:dev` | Run tests against dev environment |
| `test:qa` | `npm run test:qa` | Run tests against qa environment |
| `test:prod` | `npm run test:prod` | Run tests against prod environment |
| `test:smoke` | `npm run test:smoke` | Run @smoke tagged scenarios only |
| `test:regression` | `npm run test:regression` | Run @regression tagged scenarios |
| `test:headed` | `npm run test:headed` | Run with visible browser |
| `test:parallel` | `npm run test:parallel` | Run in parallel mode |
| `test:playwright` | `npm run test:playwright` | Run Playwright Test specs |
| `test:playwright:headed` | `npm run test:playwright:headed` | Playwright specs with visible browser |
| `test:playwright:ui` | `npm run test:playwright:ui` | Playwright interactive UI mode |
| `allure:generate` | `npm run allure:generate` | Generate Allure HTML report |
| `allure:open` | `npm run allure:open` | Open Allure HTML report |
| `allure:serve` | `npm run allure:serve` | Serve Allure report live |
| `report` | `npm run report` | Open Playwright HTML report |
| `lint` | `npm run lint` | Run ESLint checks |
| `lint:fix` | `npm run lint:fix` | Auto-fix ESLint issues |
| `format` | `npm run format` | Run Prettier formatter |
| `type-check` | `npm run type-check` | TypeScript strict check |
| `clean` | `npm run clean` | Remove all generated artefacts |

---

## 🧪 Running BDD Cucumber Tests

### By Environment

```bash
# Run all tests with default .env settings
npm test

# Target specific environments
npm run test:dev         # Development environment
npm run test:qa          # QA environment (recommended for daily runs)
npm run test:prod        # Production environment (smoke only recommended)
```

### By Tag

```bash
# Built-in tag profiles
npm run test:smoke       # Run @smoke tagged scenarios only
npm run test:regression  # Run @regression tagged scenarios only

# Custom tag expressions via CLI
npx cucumber-js --tags "@smoke"
npx cucumber-js --tags "@positive"
npx cucumber-js --tags "@negative"

# Combine tags with AND
npx cucumber-js --tags "@smoke and @positive"
npx cucumber-js --tags "@regression and @critical"

# Combine tags with OR
npx cucumber-js --tags "@smoke or @regression"

# Exclude a tag
npx cucumber-js --tags "not @skip"
npx cucumber-js --tags "not @wip"

# Complex combinations
npx cucumber-js --tags "@regression and not @skip"
npx cucumber-js --tags "(@smoke or @regression) and not @wip"

# Pass tags as environment variable
TAGS="@smoke" npm test
TAGS="@smoke and not @skip" npm test
```

### By Browser

```bash
BROWSER=chromium npm test        # Chromium / Google Chrome engine
BROWSER=firefox  npm test        # Mozilla Firefox
BROWSER=webkit   npm test        # WebKit / Apple Safari engine
```

### By Execution Mode

```bash
# Headed mode — visible browser window
npm run test:headed
HEADLESS=false npm test

# Parallel execution
npm run test:parallel
PARALLEL_WORKERS=2 npm run test:parallel
PARALLEL_WORKERS=4 npm run test:parallel
PARALLEL_WORKERS=8 npm run test:parallel

# Custom Cucumber profiles
npx cucumber-js --profile default
npx cucumber-js --profile smoke
npx cucumber-js --profile regression
npx cucumber-js --profile parallel
```

### By Feature File or Scenario

```bash
# Run a specific feature file
npx cucumber-js features/auth/login.feature
npx cucumber-js features/dashboard/dashboard.feature

# Run all features inside a folder
npx cucumber-js features/auth/
npx cucumber-js features/

# Run a specific scenario by name (partial match supported)
npx cucumber-js --name "Successful login"
npx cucumber-js --name "Login with invalid"

# Run a specific line number in a feature file
npx cucumber-js features/auth/login.feature:10
npx cucumber-js features/auth/login.feature:25
```

### With Recording Options

```bash
RECORD_VIDEO=true npm test                         # Record session videos
RECORD_TRACE=true npm test                         # Save Playwright traces
RECORD_VIDEO=true RECORD_TRACE=true npm test       # Both enabled
```

### With Slow Motion (Demo / Debugging)

```bash
SLOW_MO=500  HEADLESS=false npm test               # 500ms delay between actions
SLOW_MO=1000 HEADLESS=false npm test               # 1 second delay
SLOW_MO=2000 HEADLESS=false npm run test:smoke     # 2 second delay
```

### With Retry on Failure

```bash
npx cucumber-js --retry 1                          # Retry failed scenarios once
npx cucumber-js --retry 2                          # Retry failed scenarios twice
npx cucumber-js --retry 3 --retry-tag-filter @flaky # Retry only @flaky tagged
```

### Dry Run (Validate Steps — No Browser)

```bash
npx cucumber-js --dry-run                          # Validate all step definitions
npx cucumber-js --dry-run --format usage           # Show step usage statistics
```

### Combined Environment + Tag + Browser Commands

```bash
# QA — Smoke — Chromium — Headless (Recommended CI run)
ENV=qa BROWSER=chromium HEADLESS=true npm run test:smoke

# QA — Regression — Firefox — Headless
ENV=qa BROWSER=firefox HEADLESS=true npm run test:regression

# QA — Regression — Firefox — Headed (Visible)
ENV=qa BROWSER=firefox HEADLESS=false npm run test:regression

# Dev — All Tests — Parallel 4 Workers
ENV=dev PARALLEL_WORKERS=4 npm run test:parallel

# QA — Smoke — With Video and Trace Recording
ENV=qa RECORD_VIDEO=true RECORD_TRACE=true npm run test:smoke

# QA — Smoke — Slow Motion for Demos
ENV=qa SLOW_MO=1000 HEADLESS=false npm run test:smoke

# Prod — Smoke Only — WebKit
ENV=prod BROWSER=webkit npm run test:smoke

# QA — All tests — Verbose debug logging
ENV=qa LOG_LEVEL=debug npm test

# Debug Single Feature File — Headed — Debug Logs
ENV=qa HEADLESS=false LOG_LEVEL=debug \
  npx cucumber-js features/auth/login.feature

# CI Simulation — Run All Browsers Sequentially
HEADLESS=true CI=true BROWSER=chromium npm run test:regression && \
HEADLESS=true CI=true BROWSER=firefox  npm run test:regression && \
HEADLESS=true CI=true BROWSER=webkit   npm run test:regression

# QA — Specific tag — All browsers in sequence
ENV=qa BROWSER=chromium npx cucumber-js --tags "@smoke" && \
ENV=qa BROWSER=firefox  npx cucumber-js --tags "@smoke" && \
ENV=qa BROWSER=webkit   npx cucumber-js --tags "@smoke"
```

---

## 🎭 Running Playwright Test Specs

### Basic Runs

```bash
npm run test:playwright             # All Playwright specs (all configured browsers)
npm run test:playwright:headed      # Visible browser window
npm run test:playwright:ui          # Interactive UI mode with time-travel debugging
```

### By Spec File or Test Name

```bash
# Specific spec file
npx playwright test tests/login.spec.ts

# Specific test by name (partial match)
npx playwright test --grep "should login with valid credentials"
npx playwright test --grep "positive"

# Exclude tests by name
npx playwright test --grep-invert "negative"
```

### By Browser Project

```bash
# Run on specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run on multiple browsers
npx playwright test --project=chromium --project=firefox
npx playwright test --project=chromium --project=firefox --project=webkit
```

### With Execution Options

```bash
# Set number of workers
npx playwright test --workers=1          # Sequential
npx playwright test --workers=2          # 2 parallel workers
npx playwright test --workers=4          # 4 parallel workers

# Set retry count
npx playwright test --retries=1
npx playwright test --retries=2

# Set timeout override
npx playwright test --timeout=60000

# Run with full trace
npx playwright test --trace on

# Run with screenshots on failure
npx playwright test --screenshot on-failure

# Run with video
npx playwright test --video on

# Run in headed mode
npx playwright test --headed

# Run in debug mode
npx playwright test --debug

# Run and update snapshots
npx playwright test --update-snapshots
```

### List All Configured Tests

```bash
npx playwright test --list
npx playwright test --list --project=chromium
```

### Show Last HTML Report

```bash
npm run report
npx playwright show-report
npx playwright show-report playwright-report
```

---

## 📊 Allure Reports

### Generate and View

```bash
# Step 1 — Generate Allure HTML report from raw results
npm run allure:generate

# Step 2 — Open the report in your browser
npm run allure:open

# OR — Serve live directly from results (combines both steps)
npm run allure:serve

# Generate and Open in one command
npm run allure:generate && npm run allure:open
```

### Full Clean Run with Fresh Report

```bash
# 1. Clean all old report data
rm -rf reports/allure-results reports/allure-report

# 2. Run the tests
npm run test:qa

# 3. Generate the HTML report
npm run allure:generate

# 4. Open the report
npm run allure:open
```

### Allure Report Sections

| Section | What You'll See |
|---|---|
| **Overview** | Pass/fail summary, trend charts, execution stats |
| **Suites** | Tests organised by feature and scenario |
| **Graphs** | Duration distribution, severity, status pie charts |
| **Timeline** | Parallel execution visual timeline |
| **Behaviors** | BDD hierarchy — Epics → Features → Stories |
| **Environment** | Target env, browser, base URL, Node.js version |
| **Categories** | Custom failure grouping (broken, failed, skipped) |
| **Attachments** | Screenshots, HTML snapshots, log snippets, traces |

---

## 🔬 Playwright Reports & Traces

```bash
# Show last Playwright HTML report
npm run report
npx playwright show-report

# Open from a specific report directory
npx playwright show-report playwright-report

# View a specific Playwright trace file
npx playwright show-trace reports/traces/<trace-file>.zip

# Example with actual file
npx playwright show-trace reports/traces/login-trace.zip
```

---

## 🔧 Code Quality

### Linting

```bash
# Check for ESLint errors
npm run lint

# Auto-fix ESLint issues
npm run lint:fix

# Lint a specific file
npx eslint pages/auth/login.page.ts

# Lint a specific directory
npx eslint step-definitions/ --ext .ts

# Lint with output to file
npx eslint . --ext .ts --output-file reports/lint-report.txt
```

### Formatting

```bash
# Format all TypeScript files with Prettier
npm run format

# Check formatting without modifying files
npx prettier --check "**/*.ts"

# Format a specific file
npx prettier --write pages/auth/login.page.ts

# Format an entire directory
npx prettier --write "pages/**/*.ts"
```

### TypeScript Checks

```bash
# Strict TypeScript check — no file emission
npm run type-check

# Compile TypeScript and emit to dist/
npx tsc

# Watch mode for development
npx tsc --watch

# Check specific tsconfig
npx tsc --project tsconfig.json --noEmit
```

### Run All Quality Checks Together

```bash
npm run lint && \
npm run type-check && \
echo "========================================" && \
echo "  ✅ All quality checks passed!          " && \
echo "========================================"
```

---

## 🐛 Debugging

### Playwright Debugging Tools

```bash
# Open Playwright Inspector — step through tests interactively
PWDEBUG=1 npx playwright test tests/login.spec.ts

# Debug mode — pauses on each action
npx playwright test --debug tests/login.spec.ts

# Pause at a specific point (add to test code)
# await page.pause();

# Playwright Codegen — record new tests by clicking in browser
npx playwright codegen https://www.saucedemo.com

# Codegen with specific browser
npx playwright codegen --browser=firefox   https://www.saucedemo.com
npx playwright codegen --browser=chromium  https://www.saucedemo.com
npx playwright codegen --browser=webkit    https://www.saucedemo.com

# Codegen with custom viewport size
npx playwright codegen --viewport-size=1440,900 https://www.saucedemo.com

# Codegen and save to file
npx playwright codegen --output=tests/recorded.spec.ts https://www.saucedemo.com

# View a trace file in the trace viewer
npx playwright show-trace reports/traces/<trace-file>.zip
```

### Cucumber BDD Debugging

```bash
# Full verbose output for all events
DEBUG=* npm test

# Run single scenario — headed — debug logging — slow motion
ENV=qa \
HEADLESS=false \
LOG_LEVEL=debug \
SLOW_MO=500 \
  npx cucumber-js \
  --name "Successful login with valid credentials" \
  features/auth/login.feature

# List all step definitions and their usage
npx cucumber-js --dry-run --format usage

# Show all features, scenarios and steps
npx cucumber-js --dry-run --format progress

# Verify steps match feature file (dry run)
npx cucumber-js features/auth/login.feature --dry-run

# Print full stack traces on error
npx cucumber-js --backtrace
```

### Winston Logger — Change Log Level on the Fly

```bash
LOG_LEVEL=error   npm test      # Only error messages
LOG_LEVEL=warn    npm test      # Warnings and errors
LOG_LEVEL=info    npm test      # Info + above (default)
LOG_LEVEL=debug   npm test      # Full debug output
LOG_LEVEL=verbose npm test      # Maximum verbosity
```

---

## 🧹 Cleanup Commands

```bash
# Clean all generated artefacts using npm script
npm run clean

# Clean manually — remove all report directories
rm -rf \
  reports/allure-results \
  reports/allure-report \
  reports/logs \
  reports/screenshots \
  reports/traces \
  reports/videos \
  reports/cucumber-report.html \
  reports/cucumber-report.json \
  reports/playwright-results.json \
  test-results \
  playwright-report \
  dist

# Clean only node_modules
rm -rf node_modules

# Clean node_modules AND lock file (full reset)
rm -rf node_modules package-lock.json

# Full clean and reinstall everything
rm -rf node_modules package-lock.json dist && \
npm ci && \
npx playwright install --with-deps && \
echo "✅ Full clean reinstall complete"
```

---

## 🔄 CI/CD Pipelines

### GitHub Actions

The pipeline file is located at `.github/workflows/playwright.yml`.

It automatically runs on:
- Push to `main` or `develop` branches
- Pull Requests targeting `main`

```bash
# Trigger pipeline manually via GitHub CLI
gh workflow run playwright.yml

# View workflow runs
gh run list --workflow=playwright.yml

# Watch live run logs
gh run watch
```

### Jenkins

The Jenkins pipeline file is at `jenkins/Jenkinsfile`.

```bash
# Trigger Jenkins build via CLI (example)
java -jar jenkins-cli.jar \
  -s http://localhost:8080 \
  build alcon-playwright-pipeline \
  -p ENV=qa \
  -p BROWSER=chromium

# View build logs
java -jar jenkins-cli.jar \
  -s http://localhost:8080 \
  console alcon-playwright-pipeline
```

---

## ➕ Adding New Tests

### STEP 1 — Write a Gherkin Feature File

```gherkin
# features/checkout/checkout.feature

@regression @checkout
Feature: Checkout Process

  Background:
    Given I am logged in as "standard_user"
    And I have items in my cart

  @smoke @positive
  Scenario: Complete checkout with valid details
    When I proceed to checkout
    And I enter shipping details
      | firstName | lastName | postalCode |
      | John      | Doe      | 12345      |
    And I confirm the order
    Then I should see the order confirmation page

  @negative
  Scenario Outline: Checkout fails with missing fields
    When I proceed to checkout
    And I leave "<field>" empty
    Then I should see error "<error>"

    Examples:
      | field      | error                    |
      | firstName  | First Name is required   |
      | lastName   | Last Name is required    |
      | postalCode | Postal Code is required  |
```

### STEP 2 — Create the Page Object

```typescript
// pages/checkout/checkout.page.ts
import { BasePage } from '../base/base.page';

export class CheckoutPage extends BasePage {
  // Define locators
  private readonly firstNameInput = '#first-name';
  private readonly lastNameInput  = '#last-name';
  private readonly postalCodeInput = '#postal-code';
  private readonly continueButton = '#continue';
  private readonly finishButton   = '#finish';
  private readonly confirmTitle   = '.complete-header';

  async fillShippingDetails(first: string, last: string, zip: string) {
    await this.fill(this.firstNameInput, first);
    await this.fill(this.lastNameInput, last);
    await this.fill(this.postalCodeInput, zip);
    await this.click(this.continueButton);
  }

  async confirmOrder() {
    await this.click(this.finishButton);
  }

  async getConfirmationTitle(): Promise<string> {
    return this.getText(this.confirmTitle);
  }
}
```

### STEP 3 — Implement Step Definitions

```typescript
// step-definitions/checkout/checkout.steps.ts
import { Given, When, Then, DataTable } from '@cucumber/cucumber';
import { ICustomWorld } from '../../src/types/world.types';

When('I proceed to checkout', async function (this: ICustomWorld) {
  await this.checkoutPage!.proceedToCheckout();
});

When('I enter shipping details', async function (this: ICustomWorld, table: DataTable) {
  const { firstName, lastName, postalCode } = table.hashes()[0];
  await this.checkoutPage!.fillShippingDetails(firstName, lastName, postalCode);
});

Then('I should see the order confirmation page', async function (this: ICustomWorld) {
  const title = await this.checkoutPage!.getConfirmationTitle();
  expect(title).toContain('Thank you');
});
```

### STEP 4 — Add Test Data

```json
// data/checkout/checkout.json
{
  "validShipping": {
    "firstName": "John",
    "lastName": "Doe",
    "postalCode": "12345"
  },
  "invalidShipping": {
    "missingFirstName": { "firstName": "", "lastName": "Doe", "postalCode": "12345" },
    "missingLastName":  { "firstName": "John", "lastName": "", "postalCode": "12345" }
  }
}
```

### STEP 5 — Run Your New Tests

```bash
# Run only the new checkout feature
npx cucumber-js features/checkout/checkout.feature

# Run with checkout tag
npx cucumber-js --tags "@checkout"

# Dry run to validate steps
npx cucumber-js features/checkout/checkout.feature --dry-run

# Run with debug
ENV=qa HEADLESS=false LOG_LEVEL=debug \
  npx cucumber-js features/checkout/checkout.feature
```

---

## 🏗 Framework Architecture

```
Gherkin Feature Files (.feature)
         │
         ▼
Step Definitions (step-definitions/)
         │  Uses CustomWorld (hooks/world.ts)
         ▼
Page Object Model (pages/)
    BasePage (abstract)
         │
    ┌────┴──────┐
    │           │
LoginPage   DashboardPage  (+ more feature pages)
         │
         ▼
Playwright Browser API
         │
    ┌────┴──────────────┐
    │                   │
Chromium  Firefox   WebKit
```

### Dependency Flow

```
hooks/world.ts ──────────────────────────────────────────────────────┐
    └── hooks/browser.hooks.ts   (BrowserHelper, envConfig, logger)  │
    └── hooks/report.hooks.ts    (AllureReporter, envConfig, logger)  │
                                                                      │
config/environment.config.ts                                          │
    └── src/types/environment.types.ts (IEnvironmentConfig)          │
                                                                      │
pages/base/base.page.ts  ◄──── All page objects extend BasePage      │
    └── pages/auth/login.page.ts                                     │
    └── pages/dashboard/dashboard.page.ts                            │
                                                                      │
utils/logger/winston.logger.ts  ◄──── Singleton used everywhere      │
utils/data/data-loader.ts                                             │
    └── utils/data/test-data.manager.ts                              │
                                                                      │
step-definitions/ ◄──── uses pages/ + utils/ + hooks/world.ts ───────┘
fixtures/         ◄──── uses pages/ + config/ + utils/
```

---

## 🎨 Design Patterns

| Pattern | Location | Purpose |
|---|---|---|
| **Page Object Model (POM)** | `pages/` | Encapsulate page-specific locators and actions |
| **Abstract Base Class** | `pages/base/base.page.ts` | Shared browser actions for all page objects |
| **Singleton** | `utils/logger/`, `config/environment.config.ts` | Single shared instance across all tests |
| **Factory** | `fixtures/`, `utils/helpers/browser.helper.ts` | Create browser, context, page instances |
| **Custom World** | `hooks/world.ts` | Shared state container between Cucumber steps |
| **Data Transfer Object** | `src/types/` | Typed interfaces for all data structures |
| **Repository / Data Manager** | `utils/data/` | Centralised access to all test data files |
| **Decorator / Hooks** | `hooks/` | Cross-cutting concerns — logging, reporting, screenshots |
| **Strategy** | `config/environments/` | Environment-specific configuration strategies |
| **Builder** | `utils/helpers/browser.helper.ts` | Fluent browser / context / page construction |

---

## 🔨 Troubleshooting

### ❌ `npm ci` fails — missing package-lock.json

```bash
# Solution: Use npm install instead
npm install
```

### ❌ `npx playwright install` fails — permission error

```bash
# Solution: Fix npm permissions
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) ~/Library/Caches/ms-playwright

# Then retry
npx playwright install --with-deps
```

### ❌ `allure: command not found`

```bash
# Solution: Install via Homebrew
brew install allure

# Verify PATH includes Homebrew bin
echo $PATH | grep -o '/opt/homebrew/bin'

# If missing, add to .zshrc
echo 'export PATH="/opt/homebrew/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

### ❌ `java: command not found` — Allure report fails to open

```bash
# Solution: Install OpenJDK via Homebrew
brew install openjdk@17

# Add to PATH
echo 'export PATH="/opt/homebrew/opt/openjdk@17/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# Verify
java --version
```

### ❌ TypeScript errors — `Cannot find module`

```bash
# Solution: Reinstall dependencies
rm -rf node_modules
npm ci

# Verify tsconfig paths are correct
cat tsconfig.json
```

### ❌ `Error: No test files found` — Cucumber cannot find features

```bash
# Check your cucumber.config.js paths
cat cucumber.config.js

# Verify feature files exist
ls -la features/**/*.feature

# Run with explicit path
npx cucumber-js features/**/*.feature
```

### ❌ Browser fails to launch in CI

```bash
# Solution: Always use --with-deps in CI environments
npx playwright install --with-deps

# Also set these env vars for CI
export CI=true
export HEADLESS=true
export PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=0
```

### ❌ Tests flaky / timing issues

```bash
# Increase global timeout in .env
TIMEOUT=60000
NAVIGATION_TIMEOUT=90000

# Add retry count
npx cucumber-js --retry 2

# Add slow motion for debugging
SLOW_MO=500 HEADLESS=false npm test
```

### ❌ `ENOENT: no such file or directory` — reports folder missing

```bash
# Recreate all report directories
mkdir -p \
  reports/allure-results \
  reports/allure-report \
  reports/logs \
  reports/screenshots \
  reports/traces \
  reports/videos

touch reports/allure-results/.gitkeep
```

### ❌ ESLint rule violations blocking tests

```bash
# Quick fix — auto-fix all fixable issues
npm run lint:fix

# Disable specific rule inline (add to the offending line)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
```

---

## 🔁 End-to-End Setup Workflow

> **Complete clean setup from zero to first passing test.**

```bash
# ── 1. Install system dependencies ──────────────────────────────────
brew install node openjdk@17 allure

# ── 2. Install NVM and Node.js LTS ──────────────────────────────────
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.zshrc
nvm install --lts && nvm use --lts

# ── 3. Navigate to project ───────────────────────────────────────────
cd /Users/sid/Documents/PlaywrightAutomation/alcon-playwright-test

# ── 4. Install Node.js dependencies ──────────────────────────────────
npm ci

# ── 5. Install Playwright browsers ───────────────────────────────────
npx playwright install --with-deps

# ── 6. Setup environment file ─────────────────────────────────────────
cp .env.example .env
# Edit .env with your values — code .env

# ── 7. Verify TypeScript ──────────────────────────────────────────────
npm run type-check

# ── 8. Lint check ─────────────────────────────────────────────────────
npm run lint

# ── 9. Clean old reports ─────────────────────────────────────────────
npm run clean

# ── 10. Run smoke tests ───────────────────────────────────────────────
npm run test:smoke

# ── 11. Generate Allure report ────────────────────────────────────────
npm run allure:generate

# ── 12. Open the report ───────────────────────────────────────────────
npm run allure:open

echo "✅ Framework is fully installed and working!"
```

---

## ⚡ Quick Reference Cheat Sheet

```bash
# ═══════════════════════════════════════════════════════════════════
#   INSTALL
# ═══════════════════════════════════════════════════════════════════
npm ci                                        # Install all dependencies
npx playwright install --with-deps            # Install all browsers
cp .env.example .env                          # Setup environment file

# ═══════════════════════════════════════════════════════════════════
#   VERIFY
# ═══════════════════════════════════════════════════════════════════
npm run type-check                            # TypeScript strict check
npm run lint                                  # ESLint check
npx playwright test --list                    # List all Playwright tests
npx cucumber-js --dry-run                     # List all BDD scenarios

# ═══════════════════════════════════════════════════════════════════
#   BDD CUCUMBER TESTS
# ═══════════════════════════════════════════════════════════════════
npm test                                      # All BDD tests
npm run test:smoke                            # @smoke tag only
npm run test:regression                       # @regression tag only
npm run test:headed                           # Visible browser
npm run test:parallel                         # Parallel execution
npm run test:dev                              # Dev environment
npm run test:qa                               # QA environment
npm run test:prod                             # Prod environment

# ═══════════════════════════════════════════════════════════════════
#   PLAYWRIGHT TESTS
# ═══════════════════════════════════════════════════════════════════
npm run test:playwright                       # All Playwright specs
npm run test:playwright:headed                # Visible browser
npm run test:playwright:ui                    # Interactive UI mode
npm run report                                # Show Playwright HTML report

# ═══════════════════════════════════════════════════════════════════
#   ALLURE REPORTS
# ═══════════════════════════════════════════════════════════════════
npm run allure:generate                       # Build HTML report
npm run allure:open                           # Open in browser
npm run allure:serve                          # Live serve from results

# ═══════════════════════════════════════════════════════════════════
#   CODE QUALITY
# ═══════════════════════════════════════════════════════════════════
npm run lint                                  # ESLint check
npm run lint:fix                              # Auto-fix lint issues
npm run format                                # Prettier format
npm run type-check                            # TypeScript check

# ═══════════════════════════════════════════════════════════════════
#   BROWSER SELECTION
# ═══════════════════════════════════════════════════════════════════
BROWSER=chromium npm test                     # Chrome engine
BROWSER=firefox  npm test                     # Firefox
BROWSER=webkit   npm test                     # Safari engine

# ═══════════════════════════════════════════════════════════════════
#   DEBUGGING
# ═══════════════════════════════════════════════════════════════════
npx playwright codegen <url>                  # Record new test
PWDEBUG=1 npx playwright test <spec>          # Playwright inspector
npx playwright test --debug <spec>            # Debug mode
npx playwright show-trace <file.zip>          # View trace
LOG_LEVEL=debug npm test                      # Verbose logs

# ═══════════════════════════════════════════════════════════════════
#   CLEANUP
# ═══════════════════════════════════════════════════════════════════
npm run clean                                 # Remove all artefacts
rm -rf node_modules && npm ci                 # Reinstall dependencies
```

---

## 📞 Support

| Item | Details |
|---|---|
| **Author** | Siddesh Belura |
| **Framework Version** | 1.0.0 |
| **Last Updated** | June 2026 |
| **Node.js Requirement** | v18.0.0 minimum / v20 LTS recommended |
| **OS Support** | macOS · Linux · Windows (WSL2 recommended) |

---

<div align="center">

**Built with ❤️ using Playwright · Cucumber · TypeScript**

*Alcon Playwright BDD Automation Framework — v1.0.0*

</div>