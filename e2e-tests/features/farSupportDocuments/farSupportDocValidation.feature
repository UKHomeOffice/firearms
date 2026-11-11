@FarRegression
Feature: FAR - Firearms Supporting Documents Validations

  Scenario: Firearms New Dealer Supporting Doc Validations - E2E - "Apply for a new authority"
    Given I visit the Firearms page
    When I choose to complete Firearms application form "journey" for "New Dealer" pertaining to "Apply for a new authority"
    Then I am navigated to "Check your answers" page
    And I check my answers for Firearms "New Dealer" - "Apply for a new authority"
    When I choose to submit the Firearms application form
    Then Firearms application is successfully submitted
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
    When I enter the email "SAS_HOF_EMAIL" used in original application and click continue
    And I select 'upload file' button for firearms
    Then I see "There is a problem" error header message displayed for firearms
    And I see "Select a document" error message displayed for firearms
    When I upload Firearms evidence file and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see "Select an option" error message displayed for firearms
    When I select "No" to upload additional doc and click continue
    Then I am navigated to "Check your answers" page