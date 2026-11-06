@FarRegression
Feature: FAR - Firearms New Dealer 

  Background:
    Given I visit the Firearms page

  @FarRegressionCI
  Scenario Outline: Firearms New Dealer - E2E CI Test
    When I choose to complete Firearms application form "journey" for "New Dealer" pertaining to "<Description>"
    Then I am navigated to "Check your answers" page
    And I check my answers for Firearms "New Dealer" - "<Description>"
    When I choose to submit the Firearms application form
    Then Firearms application is successfully submitted
    Examples:
      | Description                                                |
      | Apply for a new authority                                  |
      | Renew existing authority - additional Supporting doc - Yes |

  Scenario Outline: Firearms New Dealer - E2E
    When I choose to complete Firearms application form "journey" for "New Dealer" pertaining to "<Description>"
    Then I am navigated to "Check your answers" page
    And I check my answers for Firearms "New Dealer" - "<Description>"
    When I choose to submit the Firearms application form
    Then Firearms application is successfully submitted
    Examples:
      | Description                                                |
      | Renew existing authority                                   |
      | Amend existing authority                                   |
      | Amend existing authority - additional Supporting doc - Yes |
      # | Max character                                              |

  Scenario: Firearms New Dealer - Change answers in the Check your answers page
    When I choose to complete Firearms application form "journey" for "New Dealer" pertaining to "Apply for a new authority"
    Then I am navigated to "Check your answers" page
    And I check my answers for Firearms "New Dealer" - "Apply for a new authority"
    When I change the company name to "Auto Company Ltd" and company house number to "150" and continue
    Then I check the company details changes "Auto Company Ltd" and "150" are updated on the Check your answers page
    When I choose to submit the Firearms application form
    Then Firearms application is successfully submitted
