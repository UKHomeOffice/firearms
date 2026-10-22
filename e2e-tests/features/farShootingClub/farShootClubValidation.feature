@FarRegression
Feature: FAR - Firearms Shooting Clubs

  Scenario: Firearms Shooting Clubs - page error validations- "Apply for a new authority"
    Given Test data has been created for "FARShootingClub" scenarios
    When I selected the data for scenario "1" - "Apply for a new authority"
    When I visit the Firearms page
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see "Select an option" error message displayed for firearms
    And I choose Firearms "Shooting Clubs" journey to start my application
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see "Select an option" error message displayed for firearms
    When I select What to do "Apply for a new authority" option and click continue
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
    And I see "Select an option" error message displayed for firearms
    When I select No for a new club and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see "Enter the club name" error message displayed for firearms
    When I enter the club name and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see error message displayed for firearms
          """
          Enter details of your building and street
          Enter a town or city
          Enter your postcode or ZIP Code
         """
    When I enter the club address and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see "Enter the name of the club secretary" error message displayed for firearms
    When I enter the name of the club secretary and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see error message displayed for firearms
          """
          Enter details of your building and street
          Enter a town or city
          Enter your postcode or ZIP Code
         """
    When I enter the club secretary address and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see "Enter the club secretary's email" error message displayed for firearms
    When I enter the club email and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see "Please enter the second person's name" error message displayed for firearms
    When I enter the second person name and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see error message displayed for firearms
          """
          Enter details of your building and street
          Enter a town or city
          Enter your postcode or ZIP Code
         """
    When I enter the second person contact address and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see "Enter the second person's email" error message displayed for firearms
    When I enter the second person email and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see error message displayed for firearms
          """
          Enter details of your building and street
          Enter a town or city
          Enter your postcode or ZIP Code
         """
    When I enter the club shooting ranges address and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see "Select the categories of firearms that will be used at this range" error message displayed for firearms
    When I select firearms category to use and click continue
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see "Select an option" error message displayed for firearms
    When I select No to use another shooting range and click continue
    And I select continue
    And I select continue
    Then I see "There is a problem" error header message displayed for firearms
    And I see "Select an option" error message displayed for firearms
    When I select No to use another address for gun storage and click continue
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