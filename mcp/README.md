# MCP (Model Context Protocol) Integration

Reserved for future MCP server and tool definitions that expose
test-automation capabilities to AI assistants.

## Planned MCP Servers

| Server | Capability |
|---|---|
| `playwright-server` | Drive the browser via MCP tool calls |
| `allure-server`     | Query test result history and trends |
| `cucumber-server`   | Parse, create, and validate feature files |

## Folder Structure

```
mcp/
├── servers/   ← MCP server implementations (future)
├── tools/     ← Reusable MCP tool definitions (future)
└── README.md
```

## References
- [MCP Specification](https://modelcontextprotocol.io)
- [Playwright MCP](https://github.com/microsoft/playwright-mcp)