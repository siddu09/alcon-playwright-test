@order @smoke @regression
Feature: Individual order for DAILIES TOTAL1 Astigmatism
  As a B2B user
  I want to configure and add an individual order to cart
  So that I can place the required trial lenses

  Scenario: Configure random lens values and add trial pack to cart
    Given I open the MyAlcon Japan store login page
    When I login to MyAlcon with email "marloint.test+b2b2cnewuser@alconlabs.com" and password "Bangalore##88"
    And I create a new individual order
    And I select product "DAILIES TOTAL1® for Astigmatism" from Daily Contact Lenses
    And I configure random lens values for both eyes
    And I select pack size as Trial 5
    Then Add to cart should be enabled
    When I add configured product to cart
    And I navigate to your cart from home header
    Then I should see product "DAILIES TOTAL1® for Astigmatism" in cart
