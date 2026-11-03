@FarRegression @FAR-S5 @FAR-SDoc @regression2
Feature: FAR - Firearms Supporting Documents Validations

  Background:
    Given I visit the Firearms page
    And Test data has been created for "FARS5" scenarios

  @FAR-SDoc-V
  Scenario: Firearms S5 Supporting Doc Validations - E2E - "Apply for a new authority"
    When I select the data for scenario "Apply for a new authority"
    And I select Firearms "New Dealer" journey to start my application
    And I fill out my answers to the Firearms S5 "New Dealer" questionnaire
    Then I check my answers for Firearms "New Dealer" - "Apply for a new authority"
    And I am able to submit the Firearms questionnaire
    When I navigate and select "Supporting Documents" journey to start my application
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see "Enter your application reference number" error message displayed for firearms
    When I enter reference application number and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see "Enter the email address used for your original application" error message displayed for firearms
    When I enter the email "test5@test.com" not used in original application and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see "The email address provided does not match the reference number" error message displayed for firearms
    When I enter the email "sas-hof-test@digital.homeoffice.gov.uk" used in original application and click continue
    And I select 'upload file' button for firearms
    Then I see "There is a problem" error header message displayed for firearms
    And I see "Select a document" error message displayed for firearms
    When I upload Firearms evidence file and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see "Select an option" error message displayed for firearms
    When I select "No" to upload additional doc and click continue
    And I select continue
