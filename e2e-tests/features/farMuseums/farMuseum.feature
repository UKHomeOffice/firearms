@FarRegression

Feature: FAR - Firearms Museums

  Background:
    Given I visit the Firearms page

  @FarRegressionCI
  Scenario Outline: Firearms Museums authority - E2E CI Test
    When I complete the Firearms "Museums" questionnaire for product "FARMuseum" pertaining to scenario "<Description>"
    Then I check my answers for Firearms "Museums" - "<Description>"
    And I am able to submit the Firearms questionnaire
    Examples:
      | Description                                         |
      | Apply for a new authority                           |
      | Apply for a new authority - Another Storage address |

  Scenario Outline: Firearms Museums - E2E
    When I complete the Firearms "Museums" questionnaire for product "FARMuseum" pertaining to scenario "<Description>"
    Then I check my answers for Firearms "Museums" - "<Description>"
    And I am able to submit the Firearms questionnaire
    Examples:
      | Description                                                |
      | Renew existing authority                                   |
      | Renew existing authority - additional Supporting doc - Yes |
      | Amend existing authority                                   |
      | Amend existing authority - additional Supporting doc - Yes |

  Scenario: Firearms Museums - Change answers for Museum details on the Check your answers page
    When I complete the Firearms "Museums" questionnaire for product "FARMuseum" pertaining to scenario "Apply for a new authority"
    Then I check my answers for Firearms "Museums" - "Apply for a new authority"
    When I change the museum name to "London Museum" and museum address number to "250" and continue
    Then I check the museum details changes "London Museum" and "250" are updated on the Check your answers page
    And I am able to submit the Firearms questionnaire
