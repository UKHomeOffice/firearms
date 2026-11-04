@FarRegression
Feature: FAR - Firearms Shooting Clubs Supporting Documents

  Background:
    Given I visit the Firearms page
    And Test data has been created for "FARShootingClub" scenarios

  Scenario Outline: Firearms Shooting Clubs Supporting Docs - E2E
    When I select the data for scenario "<Description>"
    And I select Firearms "Shooting Clubs" journey to start my application
    And I fill out my answers to the Firearms 'Shooting Clubs' questionnaire pertaining to "<Description>"
    Then I check my answers for Firearms "Shooting Clubs" - "<Description>"
    And I am able to submit the Firearms questionnaire
    When I navigate and select "Supporting Documents" journey to start my application
    And I fill out my answers to Supporting doc questionnaire
    Then I check the application details on Check your answers page
    And I am able to submit the supporting documents
    Examples:
      | Description               |
      | Apply for a new authority |
