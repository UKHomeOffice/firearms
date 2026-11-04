@FarRegression
Feature: FAR - Firearms Museums Supporting Documents

  Background:
    Given I visit the Firearms page
    And Test data has been created for "FARMuseum" scenarios

  Scenario Outline: Firearms Museums Supporting Doc - E2E
    When I select the data for scenario "<Description>"
    And I select Firearms "Museums" journey to start my application
    And I fill out my answers to the Firearms Museums questionnaire pertaining to "<Description>"
    Then I check my answers for Firearms "Museums" - "<Description>"
    And I am able to submit the Firearms questionnaire
    When I navigate and select "Supporting Documents" journey to start my application
    And I fill out my answers to Supporting doc questionnaire
    Then I check the application details on Check your answers page
    And I am able to submit the supporting documents
    Examples:
      | Description               |
      | Apply for a new authority |
