@FarRegression
@FarRegressionCI
Feature: FAR - Firearms Museums

  Background:
    Given I visit the Firearms page

  Scenario: Firearms Museum - page error validations- "Apply for a new authority"
    When I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see "Select an option" error message displayed for firearms
    When I choose Firearms "Museums" journey to start my application
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see "Select an option" error message displayed for firearms
    When I select What to do "Apply for a new authority" option and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see "Enter the museum name" error message displayed for firearms
    When I enter museum name and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see error message displayed for firearms
      """
      Enter details of your building and street
      Enter a town or city
      Enter your postcode or ZIP Code
      """
    When I enter exhibition or storage address and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see "Select an option" error message displayed for firearms
    When I select No to another address to store or exhibit firearms and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see "Enter a contact name" error message displayed for firearms
    When I enter a museum contact name for scenario "Apply for a new authority" in context "validation" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see "Enter a contact email address" error message displayed for firearms
    When I enter contact email address and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see "Select an option" error message displayed for firearms
    When I select Yes to contact address same as previous and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see "Select an address" error message displayed for firearms
    When I select address and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see error message displayed for firearms
      """
      Enter a contact name
      Enter a contact email address
      """
    When I enter invoice contact email "invalid@email.c" and click continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see "Enter an email in the correct format, like name@example.com" error message displayed for firearms
    When I enter invoice contact details "hof-test@test.com" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see error message displayed for firearms
      """
      Enter details of your building and street
      Enter a town or city
      Enter your postcode or ZIP Code
      """
    When I enter invoice address and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see "Select if you have a purchase order" error message displayed for firearms



  Scenario: Firearms Museum - page error validations- "Renew an existing order"
    When I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see "Select an option" error message displayed for firearms
    When I choose Firearms "Museums" journey to start my application
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see "Select an option" error message displayed for firearms
    When I select What to do "Renew an existing authority" option and click continue
    And I select 'upload file' button for firearms
    Then I see "There is a problem" error header message displayed for firearms
    And I see "Upload a file" error message displayed for firearms
    When I upload Firearms evidence file and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see "Select an option" error message displayed for firearms
    When I select "No" to upload additional doc and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see "Enter the museum name" error message displayed for firearms
    When I enter museum name and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see error message displayed for firearms
      """
      Enter details of your building and street
      Enter a town or city
      Enter your postcode or ZIP Code
      """
    When I enter exhibition or storage address and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see "Select an option" error message displayed for firearms
    When I select "No" to upload additional doc and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see "Enter a contact name" error message displayed for firearms
    When I enter a museum contact name for scenario "Renew existing authority" in context "validation" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see "Enter a contact email address" error message displayed for firearms
    When I enter contact email address and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see "Select an option" error message displayed for firearms
    When I select Yes to contact address same as previous and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see "Select an address" error message displayed for firearms
    When I select address and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see error message displayed for firearms
      """
      Enter a contact name
      Enter a contact email address
      """
    When I enter invoice contact email "invalid@email.c" and click continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see "Enter an email in the correct format, like name@example.com" error message displayed for firearms
    When I enter invoice contact details "hof-test@test.com" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see error message displayed for firearms
      """
      Enter details of your building and street
      Enter a town or city
      Enter your postcode or ZIP Code
      """
    When I enter invoice address and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see "Select if you have a purchase order" error message displayed for firearms
