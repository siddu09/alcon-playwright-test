@dashboard @smoke @regression
Feature: Product Dashboard
  As an authenticated user
  I want to view the product dashboard
  So that I can browse available products

  Background:
    Given I am logged in as a standard user

  @positive @sanity
  Scenario: Dashboard displays product inventory
    Then I should see the product dashboard
    And  the product count should be greater than 0

  @positive
  Scenario: Dashboard page title is correct
    Then the dashboard title should be "Products"

  @positive
  Scenario: User can log out from the dashboard
    When I log out from the application
    Then I should be redirected to the login page