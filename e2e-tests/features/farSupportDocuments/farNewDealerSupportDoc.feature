@FarRegression
Feature: FAR - Firearms New Dealer Supporting Documents


  Scenario Outline: Firearms New Dealer Supporting Doc - E2E
    Given I visit the Firearms page
    When I choose to complete Firearms application form "journey" for "New Dealer" pertaining to "<Description>"
    Then I am navigated to "Check your answers" page
    And I check my answers for Firearms "New Dealer" - "<Description>"
    When I choose to submit the Firearms application form
    Then Firearms application is successfully submitted
    When I navigate and select "Supporting Documents" journey to start my application
    And I fill out my answers to Supporting doc application form
    Then I check the application details on Check your answers page
    When I choose to submit the Firearms application form
    Then I am able to submit the supporting documents
    Examples:
      | Description               |
      | Apply for a new authority |
