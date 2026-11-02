@FarRegression

Feature: FAR - Firearms Museums

  Background:
    Given Test data has been created for "FARMuseum" scenarios

  @FarRegressionCI
  Scenario Outline: Firearms Museums authority - E2E CI Test
    Given I selected the data for scenario "<Scenario ID>" - "<Activity>"
    When I visit the Firearms page
    And I select Firearms "Museums" journey to start my application
    And I fill out my answers to the Firearms Museums questionnaire
    And I check my answers for Firearms "Museums" - "<Activity>"
    Then I am able to submit the Firearms questionnaire
    Examples:
      | Scenario ID | Activity                                            |
      | 1           | Apply for a new authority                           |
      | 2           | Apply for a new authority - Another Storage address |


  Scenario Outline: Firearms Museums - E2E
    Given I selected the data for scenario "<Scenario ID>" - "<Activity>"
    When I visit the Firearms page
    And I select Firearms "Museums" journey to start my application
    And I fill out my answers to the Firearms Museums questionnaire
    And I check my answers for Firearms "Museums" - "<Activity>"
    Then I am able to submit the Firearms questionnaire
    Examples:
      | Scenario ID | Activity                                                   |
      | 3           | Renew existing authority                                   |
      | 4           | Renew existing authority - additional Supporting doc - Yes |
      | 5           | Amend existing authority                                   |
      | 6           | Amend existing authority - additional Supporting doc - Yes |


  Scenario: Firearms Museums - Change answers for Museum details on the Check your answers page
    Given I selected the data for scenario "1" - "Apply for a new authority"
    When I visit the Firearms page
    And I select Firearms "Museums" journey to start my application
    And I fill out my answers to the Firearms Museums questionnaire
    And I check my answers for Firearms "Museums" - "Apply for a new authority"
    When I change the museum name to "London Museum" and museum address number to "250" and continue
    Then I check the museum details changes "London Museum" and "250" are updated on the Check your answers page
    Then I am able to submit the Firearms questionnaire