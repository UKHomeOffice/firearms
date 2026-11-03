@FarRegression
Feature: FAR - Firearms New Dealer

  Background:
    Given I visit the Firearms page
    And Test data has been created for "FARS5" scenarios

  @FarRegressionCI
  Scenario Outline: Firearms S5 - E2E CI Test
    When I select the data for scenario "<Description>"
    And I select Firearms "New Dealer" journey to start my application
    And I fill out my answers to the Firearms S5 "New Dealer" questionnaire
    Then I check my answers for Firearms "New Dealer" - "<Description>"
    And I am able to submit the Firearms questionnaire
    Examples:
      | Description                                                |
      | Apply for a new authority                                  |
      | Renew existing authority - additional Supporting doc - Yes |

  Scenario Outline: Firearms S5 - E2E
    When I select the data for scenario "<Description>"
    And I select Firearms "New Dealer" journey to start my application
    And I fill out my answers to the Firearms S5 "New Dealer" questionnaire
    Then I check my answers for Firearms "New Dealer" - "<Description>"
    And I am able to submit the Firearms questionnaire
    Examples:
      | Description                                                |
      | Renew existing authority                                   |
      | Amend existing authority                                   |
      | Amend existing authority - additional Supporting doc - Yes |
      # | Max character                                              |

  Scenario: Firearms S5 - Change answers in the Check your answers page
    When I select the data for scenario "Apply for a new authority"
    And I select Firearms "New Dealer" journey to start my application
    And I fill out my answers to the Firearms S5 "New Dealer" questionnaire
    Then I check my answers for Firearms "New Dealer" - "Apply for a new authority"
    When I change the company name to "Auto Company Ltd" and company house number to "150" and continue
    Then I check the company details changes "Auto Company Ltd" and "150" are updated on the Check your answers page
    And I am able to submit the Firearms questionnaire
