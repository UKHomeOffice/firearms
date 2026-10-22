@FarRegression
Feature: FAR - Firearms Museums

  Background:
    Given Test data has been created for "FARMuseum" scenarios


  Scenario: Firearms Museum - page error validations- "Apply for a new authority"
    Given I selected the data for scenario "1" - "Apply for a new authority"
    When I visit the Firearms page
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see "Select an option" error message displayed for firearms
    And I choose Firearms "Museums" journey to start my application
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see "Select an option" error message displayed for firearms
    And I select What to do "Apply for a new authority" option and click continue
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
    When I enter a contact name and click continue
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



  Scenario: Firearms Museum - page error validations- "Renew an existing order"
    Given I selected the data for scenario "2" - "Renew existing authority"
    When I visit the Firearms page
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see "Select an option" error message displayed for firearms
    And I choose Firearms "Museums" journey to start my application
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see "Select an option" error message displayed for firearms
    And I select What to do "Renew an existing authority" option and click continue
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
    When I enter a contact name and click continue
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