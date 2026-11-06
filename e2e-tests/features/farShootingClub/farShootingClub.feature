@FarRegression
Feature: FAR - Firearms Shooting Clubs

  Background:
    Given I visit the Firearms page

  @FarRegressionCI
  Scenario Outline: Firearms Shooting Clubs authority - E2E CI Test
    When I choose to complete Firearms application form "journey" for "Shooting Clubs" pertaining to "<Description>"
    Then I am navigated to "Check your answers" page
    And I check my answers for Firearms "Shooting Clubs" - "<Description>"
    When I choose to submit the Firearms application form
    Then Firearms application is successfully submitted
    Examples:
      | Description                                             |
      | Apply for a new authority                               |
      | Amend existing authority - additional support doc - Yes |

  Scenario Outline: Firearms Shooting Clubs - E2E
    When I choose to complete Firearms application form "journey" for "Shooting Clubs" pertaining to "<Description>"
    Then I am navigated to "Check your answers" page
    And I check my answers for Firearms "Shooting Clubs" - "<Description>"
    When I choose to submit the Firearms application form
    Then Firearms application is successfully submitted
    Examples:
      | Description                                             |
      | Apply for a new authority - Another Gun Storage address |
      | Renew existing authority                                |
      | Renew existing authority - additional support doc - Yes |
      | Amend existing authority                                |

  Scenario: Firearms Shooting Clubs - Change answers for Shooting Clubs details on the Check your answers page
    When I choose to complete Firearms application form "journey" for "Shooting Clubs" pertaining to "Apply for a new authority"
    Then I am navigated to "Check your answers" page
    And I check my answers for Firearms "Shooting Clubs" - "Apply for a new authority"
    When I change the club name to "Youth Club" and club address number to "70" and continue
    Then I check the club details changes "Youth Club" and "70" are updated on the Check your answers page
    When I choose to submit the Firearms application form
    Then Firearms application is successfully submitted
