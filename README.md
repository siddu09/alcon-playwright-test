# 🎭 Alcon Playwright BDD Framework

Enterprise-grade test automation built with **Playwright**, **Cucumber.js BDD**, and **TypeScript**.

---

## ⚡ Quick Start

```bash
# 1. Install dependencies
npm ci

# 2. Install Playwright browsers
npx playwright install --with-deps

# 3. Copy the environment template
cp .env.example .env

# 4. Run smoke tests against QA
npm run test:qa
```

---

## 📁 Project Structure

```
alcon-playwright-test/
│
├── .github/
│   └── workflows/
│       └── playwright.yml                    ← GitHub Actions CI/CD pipeline
│
├── agents/
│   ├── configs/
│   │   └── agent.config.ts                   ← AI agent model & tool config
│   ├── prompts/
│   │   └── test-generator.md                 ← Prompt template for test generation
│   └── README.md                             ← Agents documentation
│
├── config/
│   ├── environments/
│   │   ├── dev.env                           ← Dev environment variables
│   │   ├── qa.env                            ← QA environment variables
│   │   └── prod.env                          ← Prod environment variables
│   └── environment.config.ts                 ← Singleton env config loader
│
├── data/
│   ├── users/
│   │   └── users.json                        ← All user test data (all roles)
│   ├── products/
│   │   └── products.json                     ← Product catalog test data
│   └── checkout/
│       └── checkout.json                     ← Checkout form test data
│
├── docs/
│   └── SKILLS.md                             ← Tech stack & design patterns doc
│
├── features/
│   ├── auth/
│   │   └── login.feature                     ← Login BDD scenarios
│   └── dashboard/
│       └── dashboard.feature                 ← Dashboard BDD scenarios
│
├── fixtures/
│   ├── base.fixture.ts                       ← Browser/context/page factory
│   └── page.fixture.ts                       ← Page object factory
│
├── hooks/
│   ├── world.ts                              ← CustomWorld (Cucumber shared state)
│   ├── browser.hooks.ts                      ← Before/After browser lifecycle hooks
│   └── report.hooks.ts                       ← Step logging & Allure env hooks
│
├── jenkins/
│   └── Jenkinsfile                           ← Jenkins declarative pipeline
│
├── mcp/
│   ├── servers/                              ← MCP server stubs (future)
│   ├── tools/                                ← MCP tool stubs (future)
│   └── README.md                             ← MCP integration docs
│
├── pages/
│   ├── base/
│   │   └── base.page.ts                      ← Abstract BasePage (all POM inherit this)
│   ├── auth/
│   │   └── login.page.ts                     ← Login Page Object
│   └── dashboard/
│       └── dashboard.page.ts                 ← Dashboard/Inventory Page Object
│
├── prompts/
│   └── README.md                             ← Shared AI prompt template index
│
├── reports/                                  ← Generated at runtime — gitignored
│   ├── allure-results/                       ← Raw Allure JSON results
│   ├── allure-report/                        ← Built Allure HTML report
│   ├── logs/                                 ← Winston daily-rotating log files
│   ├── screenshots/                          ← Failure screenshots (PNG)
│   ├── traces/                               ← Playwright trace ZIPs
│   ├── videos/                               ← Test session recordings
│   ├── cucumber-report.html                  ← Cucumber HTML report
│   └── cucumber-report.json                  ← Cucumber JSON report
│
├── src/
│   ├── constants/
│   │   ├── timeouts.constants.ts             ← All timeout values (ms)
│   │   └── selectors.constants.ts            ← All CSS/data-test selectors
│   └── types/
│       ├── environment.types.ts              ← IEnvironmentConfig, Environment types
│       └── world.types.ts                    ← ICustomWorld, IScenarioResult types
│
├── step-definitions/
│   ├── auth/
│   │   └── login.steps.ts                    ← Login step implementations
│   └── common/
│       ├── dashboard.steps.ts                ← Dashboard & auth shared steps
│       └── common.steps.ts                   ← Reusable generic steps
│
├── tests/                                    ← Playwright Test (non-BDD) specs
│   └── login.spec.ts                         ← Playwright login test suite
│
├── utils/
│   ├── data/
│   │   ├── data-loader.ts                    ← JSON file reader with caching
│   │   └── test-data.manager.ts              ← Typed accessors for all test data
│   ├── helpers/
│   │   ├── browser.helper.ts                 ← Browser/context/page factory helpers
│   │   ├── element.helper.ts                 ← Advanced element interactions
│   │   └── wait.helper.ts                    ← Wait, poll, retry helpers
│   ├── logger/
│   │   └── winston.logger.ts                 ← Singleton Winston logger
│   └── reporters/
│       └── allure.reporter.ts                ← Allure environment & attachment helper
│
├── .env.example                              ← Environment variable template
├── .eslintrc.json                            ← ESLint rules
├── .gitignore                                ← Git ignore rules
├── .prettierrc                               ← Prettier formatting config
├── cucumber.config.js                        ← Cucumber profiles (default/parallel/smoke)
├── package.json                              ← NPM scripts & dependencies
├── playwright.config.ts                      ← Playwright Test configuration
├── README.md                                 ← Full project documentation
└── tsconfig.json                             ← TypeScript compiler config