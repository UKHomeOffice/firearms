@FarRegression
Feature: FAR - Firearms New Dealer Supporting Documents


  Scenario Outline: Firearms S5 Supporting Doc - E2E
    Given I visit the Firearms page
    When I choose to complete Firearms questionnaire "journey" for "New Dealer" pertaining to "<Description>"
    Then I check my answers for Firearms "New Dealer" - "<Description>"
    When I choose to submit the Firearms questionnaire
    Then I am able to submit the Firearms questionnaire
    When I navigate and select "Supporting Documents" journey to start my application
    And I fill out my answers to Supporting doc questionnaire
    Then I check the application details on Check your answers page
    When I choose to submit the Firearms questionnaire
    Then I am able to submit the supporting documents
    Examples:
      | Description               |
      | Apply for a new authority |
