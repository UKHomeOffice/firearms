@FarRegression
Feature: FAR - Firearms Shooting Clubs

  Background:
    Given Test data has been created for "FARShootingClub" scenarios

  @FarRegressionCI
  Scenario Outline: Firearms Shooting Clubs authority - E2E CI Test
    Given I selected the data for scenario "<Scenario ID>" - "<Activity>"
    When I visit the Firearms page
    And I select Firearms "Shooting Clubs" journey to start my application
    And I fill out my answers to the Firearms 'Shooting Clubs' questionnaire
    And I check my answers for Firearms "Shooting Clubs" - "<Activity>"
    Then I am able to submit the Firearms questionnaire
    Examples:
      | Scenario ID | Activity                  |
      | 1           | Apply for a new authority |
      | 6           | Amend existing authority - additional support doc - Yes |


  Scenario Outline: Firearms Shooting Clubs - E2E
    Given I selected the data for scenario "<Scenario ID>" - "<Activity>"
    When I visit the Firearms page
    And I select Firearms "Shooting Clubs" journey to start my application
    And I fill out my answers to the Firearms 'Shooting Clubs' questionnaire
    And I check my answers for Firearms "Shooting Clubs" - "<Activity>"
    Then I am able to submit the Firearms questionnaire
    Examples:
      | Scenario ID | Activity                                                |
      | 2           | Apply for a new authority - Another Gun Storage address |
      | 3           | Renew existing authority                                |
      | 4           | Renew existing authority - additional support doc - Yes |
      | 5           | Amend existing authority                                |


  Scenario: Firearms Shooting Clubs - Change answers for Shooting Clubs details on the Check your answers page
    Given I selected the data for scenario "1" - "Apply for a new authority"
    When I visit the Firearms page
    And I select Firearms "Shooting Clubs" journey to start my application
    And I fill out my answers to the Firearms 'Shooting Clubs' questionnaire
    And I check my answers for Firearms "Shooting Clubs" - "Apply for a new authority"
    When I change the club name to "Youth Club" and club address number to "70" and continue
    Then I check the club details changes "Youth Club" and "70" are updated on the Check your answers page
    Then I am able to submit the Firearms questionnaire