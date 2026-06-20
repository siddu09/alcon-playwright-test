@login @smoke @regression
Feature: User Authentication
  As a registered user
  I want to authenticate into the application
  So that I can access protected features

  Background:
    Given I am on the login page

  @positive @sanity
  Scenario: Successful login with valid credentials
    When I enter username "standard_user"
    And  I enter password "secret_sauce"
    And  I click the login button
    Then I should be logged in successfully
    And  I should see the product dashboard

  @negative
  Scenario: Login fails with incorrect password
    When I enter username "standard_user"
    And  I enter password "wrong_password"
    And  I click the login button
    Then I should see the login error "Epic sadface: Username and password do not match any user in this service"

  @negative
  Scenario: Login fails with empty username
    When I enter username ""
    And  I enter password "secret_sauce"
    And  I click the login button
    Then I should see the login error "Epic sadface: Username is required"

  @negative
  Scenario: Login fails with empty password
    When I enter username "standard_user"
    And  I enter password ""
    And  I click the login button
    Then I should see the login error "Epic sadface: Password is required"

  @negative @data-driven
  Scenario Outline: Data-driven invalid login attempts
    When I enter username "<username>"
    And  I enter password "<password>"
    And  I click the login button
    Then I should see the login error "<error_message>"

    Examples:
      | username        | password     | error_message                                                               |
      | locked_out_user | secret_sauce | Epic sadface: Sorry, this user has been locked out.                         |
      |                 | secret_sauce | Epic sadface: Username is required                                          |
      | standard_user   |              | Epic sadface: Password is required                                          |