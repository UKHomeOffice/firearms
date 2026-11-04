@FarRegression
Feature: FAR - Firearms New Dealer

  Background:
    Given I visit the Firearms page

  @FarRegressionCI
  Scenario Outline: Firearms S5 - E2E CI Test
    When I complete the Firearms "New Dealer" questionnaire for product "FARS5" pertaining to scenario "<Description>" in context "journey"
    Then I check my answers for Firearms "New Dealer" - "<Description>"
    And I am able to submit the Firearms questionnaire
    Examples:
      | Description                                                |
      | Apply for a new authority                                  |
      | Renew existing authority - additional Supporting doc - Yes |

  Scenario Outline: Firearms S5 - E2E
    When I complete the Firearms "New Dealer" questionnaire for product "FARS5" pertaining to scenario "<Description>" in context "journey"
    Then I check my answers for Firearms "New Dealer" - "<Description>"
    And I am able to submit the Firearms questionnaire
    Examples:
      | Description                                                |
      | Renew existing authority                                   |
      | Amend existing authority                                   |
      | Amend existing authority - additional Supporting doc - Yes |
      # | Max character                                              |

  Scenario: Firearms S5 - Change answers in the Check your answers page
    When I complete the Firearms "New Dealer" questionnaire for product "FARS5" pertaining to scenario "Apply for a new authority" in context "journey"
    Then I check my answers for Firearms "New Dealer" - "Apply for a new authority"
    When I change the company name to "Auto Company Ltd" and company house number to "150" and continue
    Then I check the company details changes "Auto Company Ltd" and "150" are updated on the Check your answers page
    And I am able to submit the Firearms questionnaire
