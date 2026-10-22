@FarRegression
Feature: FAR - Firearms New Dealer Supporting Documents

  Background:
    Given Test data has been created for "FARS5" scenarios

  Scenario Outline: Firearms S5 Supporting Doc - E2E
    Given I selected the data for scenario "<Scenario ID>" - "<Activity>"
    When I visit the Firearms page
    And I select Firearms "New Dealer" journey to start my application
    And I fill out my answers to the Firearms S5 "New Dealer" questionnaire
    And I check my answers for Firearms "New Dealer" - "<Activity>"
    Then I am able to submit the Firearms questionnaire
    When I navigate and select "Supporting Documents" journey to start my application
    And I fill out my answers to Supporting doc questionnaire
    And I check the application details on Check your answers page
    Then I am able to submit the supporting documents
    Examples:
      | Scenario ID | Activity                                |
      | 1           | Apply for a new authority               |
