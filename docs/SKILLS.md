# Framework Skills & Technology Stack

## Core Technologies

| Technology | Version | Purpose |
|---|---|---|
| Playwright | ^1.61 | Browser automation engine |
| Cucumber.js | ^13.0 | BDD / Gherkin runner |
| TypeScript | ^6.0 | Type-safe test authoring |
| Node.js | 20 LTS | Runtime environment |
| Winston | ^3.19 | Structured, rotating log files |
| Allure | ^3.x | Rich interactive HTML reports |

## Design Patterns

| Pattern | Where Applied |
|---|---|
| Page Object Model (POM) | `pages/` — all UI interactions encapsulated |
| Abstract Base Page | `pages/base/base.page.ts` — shared behaviour |
| Singleton Logger | `utils/logger/winston.logger.ts` |
| Singleton Environment Config | `config/environment.config.ts` |
| Factory | `fixtures/base.fixture.ts` — browser factory |
| Data-Driven Testing | Scenario Outlines + `data/` JSON files |

## SOLID Principles Applied

| Principle | Implementation |
|---|---|
| Single Responsibility | Each class has exactly one purpose |
| Open / Closed | `BasePage` extended without modification |
| Liskov Substitution | All pages safely replace `BasePage` |
| Interface Segregation | `ICustomWorld`, `IEnvironmentConfig` are minimal |
| Dependency Inversion | Steps depend on page abstractions, not concretions |

## Test Strategies

| Strategy | Mechanism |
|---|---|
| BDD | Gherkin `.feature` files — living documentation |
| Data-Driven | Scenario Outlines with `Examples` tables |
| Tag-based filtering | `@smoke`, `@regression`, `@positive`, `@negative` |
| Parallel execution | Cucumber parallel workers |
| Retry on flake | Playwright `retries` + Cucumber `--retry` |
| Tracing | Playwright trace viewer on failure |
| Video recording | Configurable via `RECORD_VIDEO` env var |

## CI/CD Platforms

| Platform | File |
|---|---|
| GitHub Actions | `.github/workflows/playwright.yml` |
| Jenkins | `jenkins/Jenkinsfile` |

## Future Roadmap

- MCP integration (`mcp/`) for AI-driven browser control
- AI Agents (`agents/`) for test generation and failure analysis
- Visual regression testing with Playwright snapshots
- Accessibility testing (axe-core)
- API layer testing via Playwright `APIRequestContext`
- Performance testing integration