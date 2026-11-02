@FarRegression
Feature: FAR - Firearms New Dealer

  Background:
    Given Test data has been created for "FARS5" scenarios

  @FarRegressionCI
  Scenario Outline: Firearms S5 - E2E CI Test
    Given I selected the data for scenario "<Scenario ID>" - "<Activity>"
    When I visit the Firearms page
    And I select Firearms "New Dealer" journey to start my application
    And I fill out my answers to the Firearms S5 "New Dealer" questionnaire
    And I check my answers for Firearms "New Dealer" - "<Activity>"
    Then I am able to submit the Firearms questionnaire
    Examples:
      | Scenario ID | Activity                                                   |
      | 1           | Apply for a new authority                                  |
      | 3           | Renew existing authority - additional Supporting doc - Yes |


  Scenario Outline: Firearms S5 - E2E
    Given I selected the data for scenario "<Scenario ID>" - "<Activity>"
    When I visit the Firearms page
    And I select Firearms "New Dealer" journey to start my application
    And I fill out my answers to the Firearms S5 "New Dealer" questionnaire
    And I check my answers for Firearms "New Dealer" - "<Activity>"
    Then I am able to submit the Firearms questionnaire
    Examples:
      | Scenario ID | Activity                                                   |
      | 2           | Renew existing authority                                   |
      | 4           | Amend existing authority                                   |
      | 5           | Amend existing authority - additional Supporting doc - Yes |
#      | 6           | Max character                                              |


  Scenario: Firearms S5 - Change answers in the Check your answers page
    Given I selected the data for scenario "1" - "Apply for a new authority"
    When I visit the Firearms page
    And I select Firearms "New Dealer" journey to start my application
    And I fill out my answers to the Firearms S5 "New Dealer" questionnaire
    And I check my answers for Firearms "New Dealer" - "Apply for a new authority"
    When I change the company name to "Auto Company Ltd" and company house number to "150" and continue
    Then I check the company details changes "Auto Company Ltd" and "150" are updated on the Check your answers page
    Then I am able to submit the Firearms questionnaire
