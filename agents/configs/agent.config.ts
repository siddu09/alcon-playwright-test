/**
 * Configuration definitions for AI test automation agents.
 * Extend these as you integrate LLM providers (OpenAI, Anthropic, etc.)
 */
export interface IAgentConfig {
  name:        string;
  version:     string;
  model:       string;
  temperature: number;
  maxTokens:   number;
  tools:       string[];
}

/** Generates BDD feature files and step definitions from user stories */
export const TEST_GENERATOR_CONFIG: IAgentConfig = {
  name:        'test-generator',
  version:     '1.0.0',
  model:       'gpt-4o',
  temperature: 0.3,
  maxTokens:   4096,
  tools:       ['playwright', 'cucumber', 'typescript'],
};

/** Diagnoses test failures from Allure reports and Playwright traces */
export const TEST_ANALYZER_CONFIG: IAgentConfig = {
  name:        'test-analyzer',
  version:     '1.0.0',
  model:       'gpt-4o',
  temperature: 0.2,
  maxTokens:   2048,
  tools:       ['allure', 'cucumber-json', 'playwright-trace'],
};

/** Suggests resilient, accessible Playwright locator strategies */
export const SELECTOR_AGENT_CONFIG: IAgentConfig = {
  name:        'selector-agent',
  version:     '1.0.0',
  model:       'gpt-4o',
  temperature: 0.1,
  maxTokens:   1024,
  tools:       ['dom-inspector', 'playwright-locator'],
};

/** Identifies untested user journeys and coverage gaps */
export const COVERAGE_GAP_CONFIG: IAgentConfig = {
  name:        'coverage-gap-agent',
  version:     '1.0.0',
  model:       'gpt-4o',
  temperature: 0.2,
  maxTokens:   2048,
  tools:       ['allure', 'cucumber-json', 'feature-parser'],
};