# Shared Prompt Templates

Reusable prompt templates for AI-assisted test automation tasks.
Used by agents in `agents/` and any future MCP tool integrations.

## Templates

| File | Purpose |
|---|---|
| `test-generator.md`   | Generate BDD tests from user stories |
| `failure-analysis.md` | Analyse Playwright / Allure failure output |
| `coverage-gap.md`     | Identify untested user journeys |
| `selector-helper.md`  | Suggest resilient locator strategies |

## Usage
Copy any template into your AI assistant chat, fill in the **Input** section
with your specific scenario, and let the agent generate the code.