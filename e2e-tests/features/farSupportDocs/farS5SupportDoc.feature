@FarRegression
Feature: FAR - Firearms New Dealer Supporting Documents

  Background:
    Given I visit the Firearms page
    And Test data has been created for "FARS5" scenarios

  Scenario Outline: Firearms S5 Supporting Doc - E2E
    When I select the data for scenario "<Description>"
    And I select Firearms "New Dealer" journey to start my application
    And I fill out my answers to the Firearms S5 "New Dealer" questionnaire
    Then I check my answers for Firearms "New Dealer" - "<Description>"
    And I am able to submit the Firearms questionnaire
    When I navigate and select "Supporting Documents" journey to start my application
    And I fill out my answers to Supporting doc questionnaire
    Then I check the application details on Check your answers page
    And I am able to submit the supporting documents
    Examples:
      | Description               |
      | Apply for a new authority |
