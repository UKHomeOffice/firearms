@FarRegression
Feature: FAR - Firearms Shooting Clubs Supporting Documents

  Background:
    Given Test data has been created for "FARShootingClub" scenarios

  Scenario Outline: Firearms Shooting Clubs Supporting Docs - E2E
    Given I selected the data for scenario "<Scenario ID>" - "<Activity>"
    When I visit the Firearms page
    And I select Firearms "Shooting Clubs" journey to start my application
    And I fill out my answers to the Firearms 'Shooting Clubs' questionnaire
    And I check my answers for Firearms "Shooting Clubs" - "<Activity>"
    Then I am able to submit the Firearms questionnaire
    When I navigate and select "Supporting Documents" journey to start my application
    And I fill out my answers to Supporting doc questionnaire
    And I check the application details on Check your answers page
    Then I am able to submit the supporting documents
    Examples:
      | Scenario ID | Activity                                |
      | 1           | Apply for a new authority               |