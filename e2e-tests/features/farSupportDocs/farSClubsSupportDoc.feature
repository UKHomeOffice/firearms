@FarRegression
Feature: FAR - Firearms Shooting Clubs Supporting Documents


  Scenario Outline: Firearms Shooting Clubs Supporting Docs - E2E
    Given I visit the Firearms page
    When I complete the Firearms "Shooting Clubs" questionnaire for product "FARShootingClub" pertaining to scenario "<Description>" in context "journey"
    Then I check my answers for Firearms "Shooting Clubs" - "<Description>"
    And I am able to submit the Firearms questionnaire
    When I navigate and select "Supporting Documents" journey to start my application
    And I fill out my answers to Supporting doc questionnaire
    Then I check the application details on Check your answers page
    And I am able to submit the supporting documents
    Examples:
      | Description               |
      | Apply for a new authority |
