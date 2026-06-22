module.exports = {
  default: {
    require: [
      'step-definitions/**/*.ts',
      'hooks/**/*.ts'
    ],
    requireModule: ['ts-node/register'],
    format: [
      'progress-bar',
       'allure-cucumberjs/reporter',              // ← ADD THIS
      'html:reports/cucumber-report.html',
      'json:reports/cucumber-report.json'
    ],
    formatOptions: { 
      snippetInterface: 'async-await',
      resultsDir: 'reports/allure-results'       // ← ADD THIS
    },
    parallel: 2
  }
};