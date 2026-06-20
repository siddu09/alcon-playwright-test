# AI Agents

Configuration and prompt templates for AI-assisted test generation,
failure analysis, coverage gap detection, and selector optimisation.

## Agents

| Agent | Config File | Purpose |
|---|---|---|
| `test-generator`  | `configs/agent.config.ts` | Generate feature files & step definitions from user stories |
| `test-analyzer`   | `configs/agent.config.ts` | Diagnose failures from Allure reports and trace files |
| `selector-agent`  | `configs/agent.config.ts` | Suggest resilient, accessible locator strategies |
| `coverage-gap`    | `configs/agent.config.ts` | Identify untested user journeys |

## Folder Structure

```
agents/
├── configs/
│   └── agent.config.ts    ← Model, temperature, and tool config per agent
├── prompts/
│   └── test-generator.md  ← Reusable prompt template for test generation
└── README.md
```

## Integration Points

- Prompts can be used directly with OpenAI, Anthropic Claude, or GitHub Copilot Chat.
- Shared prompts that span multiple agents live in the root `prompts/` folder.
- MCP server integrations (future) live in `mcp/`.