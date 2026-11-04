@FarRegression
Feature: FAR - Firearms Shooting Clubs

  Background:
    Given I visit the Firearms page

  @FarRegressionCI
  Scenario Outline: Firearms Shooting Clubs authority - E2E CI Test
    When I complete the Firearms "Shooting Clubs" questionnaire for product "FARShootingClub" pertaining to scenario "<Description>" in context "journey"
    Then I check my answers for Firearms "Shooting Clubs" - "<Description>"
    And I am able to submit the Firearms questionnaire
    Examples:
      | Description                                             |
      | Apply for a new authority                               |
      | Amend existing authority - additional support doc - Yes |

  Scenario Outline: Firearms Shooting Clubs - E2E
    When I complete the Firearms "Shooting Clubs" questionnaire for product "FARShootingClub" pertaining to scenario "<Description>" in context "journey"
    Then I check my answers for Firearms "Shooting Clubs" - "<Description>"
    And I am able to submit the Firearms questionnaire
    Examples:
      | Description                                             |
      | Apply for a new authority - Another Gun Storage address |
      | Renew existing authority                                |
      | Renew existing authority - additional support doc - Yes |
      | Amend existing authority                                |

  Scenario: Firearms Shooting Clubs - Change answers for Shooting Clubs details on the Check your answers page
    When I complete the Firearms "Shooting Clubs" questionnaire for product "FARShootingClub" pertaining to scenario "Apply for a new authority" in context "journey"
    Then I check my answers for Firearms "Shooting Clubs" - "Apply for a new authority"
    When I change the club name to "Youth Club" and club address number to "70" and continue
    Then I check the club details changes "Youth Club" and "70" are updated on the Check your answers page
    And I am able to submit the Firearms questionnaire
