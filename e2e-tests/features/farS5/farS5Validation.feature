@FarRegression
Feature: FAR - Firearms New Dealer



  Scenario: Firearms S5 - page error validations- "Apply for a new authority"
    Given Test data has been created for "FARS5" scenarios
    When I selected the data for scenario "1" - "Apply for a new authority"
    And I visit the Firearms page
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see "Select an option" error message displayed for firearms
    And I choose Firearms "New Dealer" journey to start my application
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see "Select an option" error message displayed for firearms
    And I select What to do "Apply for a new authority" option and click continue
    And I select 'upload file' button for firearms
    Then I see "There is a problem" error header message displayed for firearms
    And I see "Upload a file" error message displayed for firearms
    And I upload Firearms evidence file and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see "Select an option" error message displayed for firearms
    When I select "No" to upload additional doc and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see "Select the type of organisation the authority is for" error message displayed for firearms
    When I select the organisation type "Company" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see "Select what the company will handle" error message displayed for firearms
    When I select what will be handled under the authority and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see "Select at least one option" error message displayed for firearms
    When I select how the prohibited items will be obtained and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see "Select an option" error message displayed for firearms
    When I select import prohibited items and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see "Select an option" error message displayed for firearms
    When I answer will prohibited items be stored in business premises and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see "Select at least one option" error message displayed for firearms
    When I select what business activities to be carried out and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see "Select at least one option" error message displayed for firearms
    When I select weapons sections and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see "Select at least one option" error message displayed for firearms
    When I select ammunition sections and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see "Select an option" error message displayed for firearms
    When I answer how many individual will be named "One" and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see "Enter the full name of the authority holder" error message displayed for firearms
    When I enter full name of authority holder and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see error message displayed for firearms
          """
          Enter a date of birth
          Enter a town or city of birth
          Enter a country of birth
         """
    When I enter birth details and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see "Enter nationality" error message displayed for firearms
    When I enter country of nationality and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see error message displayed for firearms
          """
          Enter details of your building and street
          Enter a town or city
          Enter your postcode or ZIP Code
         """
    When I enter main business address and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see "Tell us who we should contact about this application" error message displayed for firearms
    When I select who to contact and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see "Enter contact's email address" error message displayed for firearms
    When I enter contact email address and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see "Select an option" error message displayed for firearms
    When I select address to use and click continue
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
    When I enter invoice contact details "sas-hof-test@digital.homeoffice.gov.uk" and click continue
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
