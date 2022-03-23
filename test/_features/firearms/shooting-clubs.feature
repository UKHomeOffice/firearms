@feature @shooting-clubs
Feature: Fireams application for Shooting clubs

    Scenario: I am on the Shooting-clubs journey but I don't select an option on the activity page
        Given I start the 'shooting-clubs' application journey
        Then I should be on the 'privacy' page showing 'Privacy Notice'
        Then I select 'Continue'
        Then I should be on the 'activity' page showing 'What do you want to do?'
        Then I select 'Continue'
        Then I should see the 'Select an option' error

    Scenario: I am on the Shooting-clubs journey but I don't select an option on the new-club page
        Given I start the 'shooting-clubs' application journey
        Then I should be on the 'privacy' page showing 'Privacy Notice'
        Then I select 'Continue'
        Then I should be on the 'activity' page showing 'What do you want to do?'
        Then I select 'Continue'
        Then I should see the 'Select an option' error
        Then I check 'activity-new'
        Then I select 'Continue'
        Then I should be on the 'new-club' page showing 'Is the club a new club?'
        Then I select 'Continue'
        Then I should see the 'Select an option' error

    Scenario: I am on the Shooting-clubs journey but I don't enter the clubs name on the club-name page
        Given I start the 'shooting-clubs' application journey
        Then I should be on the 'privacy' page showing 'Privacy Notice'
        Then I select 'Continue'
        Then I should be on the 'activity' page showing 'What do you want to do?'
        Then I select 'Continue'
        Then I should see the 'Select an option' error
        Then I check 'activity-new'
        Then I select 'Continue'
        Then I should be on the 'new-club' page showing 'Is the club a new club?'
        Then I select 'Continue'
        Then I should see the 'Select an option' error
        Then I check 'new-club-yes'
        Then I select 'Continue'
        Then I should be on the 'club-name' page showing 'What is the club\'s name?'
        Then I select 'Continue'
        Then I should see the 'Enter the club name' error

    Scenario: I am on the Shooting-clubs journey but I don't fill out the address on the club-address page
        Given I start the 'shooting-clubs' application journey
        Then I should be on the 'privacy' page showing 'Privacy Notice'
        Then I select 'Continue'
        Then I should be on the 'activity' page showing 'What do you want to do?'
        Then I select 'Continue'
        Then I should see the 'Select an option' error
        Then I check 'activity-new'
        Then I select 'Continue'
        Then I should be on the 'new-club' page showing 'Is the club a new club?'
        Then I select 'Continue'
        Then I should see the 'Select an option' error
        Then I check 'new-club-yes'
        Then I select 'Continue'
        Then I should be on the 'club-name' page showing 'What is the club\'s name?'
        Then I select 'Continue'
        Then I should see the 'Enter the club name' error
        Then I fill 'club-name' with 'Test club'
        Then I select 'Continue'
        Then I should be on the 'club-address' page showing 'What is the club\'s address?'
        Then I select 'Continue'
        Then I should see the 'Enter details of your building and street' error
        Then I should see the 'Enter a town or city' error
        Then I should see the 'Enter your postcode or ZIP Code' error

    Scenario: I am on the Shooting-clubs journey but I don't fill in a name on the club-secretary-name page
        Given I start the 'shooting-clubs' application journey
        Then I should be on the 'privacy' page showing 'Privacy Notice'
        Then I select 'Continue'
        Then I should be on the 'activity' page showing 'What do you want to do?'
        Then I select 'Continue'
        Then I should see the 'Select an option' error
        Then I check 'activity-new'
        Then I select 'Continue'
        Then I should be on the 'new-club' page showing 'Is the club a new club?'
        Then I select 'Continue'
        Then I should see the 'Select an option' error
        Then I check 'new-club-yes'
        Then I select 'Continue'
        Then I should be on the 'club-name' page showing 'What is the club\'s name?'
        Then I select 'Continue'
        Then I should see the 'Enter the club name' error
        Then I fill 'club-name' with 'Test club'
        Then I select 'Continue'
        Then I should be on the 'club-address' page showing 'What is the club\'s address?'
        Then I select 'Continue'
        Then I should see the 'Enter details of your building and street' error
        Then I should see the 'Enter a town or city' error
        Then I should see the 'Enter your postcode or ZIP Code' error
        Then I fill 'club-building' with '1'
        Then I fill 'club-street' with 'Test road'
        Then I fill 'club-townOrCity' with 'London'
        Then I fill 'club-postcodeOrZIPCode' with 'TE5 7TE'
        Then I select 'Continue'
        Then I should be on the 'club-secretary-name' page showing 'What is the club secretary\'s name?'
        Then I select 'Continue'
        Then I should see the 'Enter the name of the club secretary' error

    Scenario: I am on the Shooting-clubs journey but I don't fill in an address on the club-secretary-address page
        Given I start the 'shooting-clubs' application journey
        Then I should be on the 'privacy' page showing 'Privacy Notice'
        Then I select 'Continue'
        Then I should be on the 'activity' page showing 'What do you want to do?'
        Then I select 'Continue'
        Then I should see the 'Select an option' error
        Then I check 'activity-new'
        Then I select 'Continue'
        Then I should be on the 'new-club' page showing 'Is the club a new club?'
        Then I select 'Continue'
        Then I should see the 'Select an option' error
        Then I check 'new-club-yes'
        Then I select 'Continue'
        Then I should be on the 'club-name' page showing 'What is the club\'s name?'
        Then I select 'Continue'
        Then I should see the 'Enter the club name' error
        Then I fill 'club-name' with 'Test club'
        Then I select 'Continue'
        Then I should be on the 'club-address' page showing 'What is the club\'s address?'
        Then I select 'Continue'
        Then I should see the 'Enter details of your building and street' error
        Then I should see the 'Enter a town or city' error
        Then I should see the 'Enter your postcode or ZIP Code' error
        Then I fill 'club-building' with '1'
        Then I fill 'club-street' with 'Test road'
        Then I fill 'club-townOrCity' with 'London'
        Then I fill 'club-postcodeOrZIPCode' with 'TE5 7TE'
        Then I select 'Continue'
        Then I should be on the 'club-secretary-name' page showing 'What is the club secretary\'s name?'
        Then I select 'Continue'
        Then I should see the 'Enter the name of the club secretary' error
        Then I fill 'club-secretary-name' with 'Ronald Testman'
        Then I select 'Continue'
        Then I should be on the 'club-secretary-address' page showing 'What is Ronald Testman\'s contact address?'
        Then I select 'Continue'
        Then I should see the 'Enter details of your building and street' error
        Then I should see the 'Enter a town or city' error
        Then I should see the 'Enter your postcode or ZIP Code' error

    Scenario: I am on the Shooting-clubs journey but I don't fill in contact details on the club-secretary-email page
        Given I start the 'shooting-clubs' application journey
        Then I should be on the 'privacy' page showing 'Privacy Notice'
        Then I select 'Continue'
        Then I should be on the 'activity' page showing 'What do you want to do?'
        Then I select 'Continue'
        Then I should see the 'Select an option' error
        Then I check 'activity-new'
        Then I select 'Continue'
        Then I should be on the 'new-club' page showing 'Is the club a new club?'
        Then I select 'Continue'
        Then I should see the 'Select an option' error
        Then I check 'new-club-yes'
        Then I select 'Continue'
        Then I should be on the 'club-name' page showing 'What is the club\'s name?'
        Then I select 'Continue'
        Then I should see the 'Enter the club name' error
        Then I fill 'club-name' with 'Test club'
        Then I select 'Continue'
        Then I should be on the 'club-address' page showing 'What is the club\'s address?'
        Then I select 'Continue'
        Then I should see the 'Enter details of your building and street' error
        Then I should see the 'Enter a town or city' error
        Then I should see the 'Enter your postcode or ZIP Code' error
        Then I fill 'club-building' with '1'
        Then I fill 'club-street' with 'Test road'
        Then I fill 'club-townOrCity' with 'London'
        Then I fill 'club-postcodeOrZIPCode' with 'TE5 7TE'
        Then I select 'Continue'
        Then I should be on the 'club-secretary-name' page showing 'What is the club secretary\'s name?'
        Then I select 'Continue'
        Then I should see the 'Enter the name of the club secretary' error
        Then I fill 'club-secretary-name' with 'Ronald Testman'
        Then I select 'Continue'
        Then I should be on the 'club-secretary-address' page showing 'What is Ronald Testman\'s contact address?'
        Then I select 'Continue'
        Then I should see the 'Enter details of your building and street' error
        Then I should see the 'Enter a town or city' error
        Then I should see the 'Enter your postcode or ZIP Code' error
        Then I fill 'club-secretary-building' with '2'
        Then I fill 'club-secretary-street' with 'Test road'
        Then I fill 'club-secretary-townOrCity' with 'London'
        Then I fill 'club-secretary-postcodeOrZIPCode' with 'TE5 7ER'
        Then I select 'Continue'
        Then I should be on the 'club-secretary-email' page showing 'What are Ronald Testman\'s contact details?'
        Then I select 'Continue'
        Then I should see the 'Enter the club secretary\'s email' error
        Then I should see the 'Enter the club secretary\'s phone number' error

    Scenario: I am on the Shooting-clubs journey but I don't fill in contact details on the club-secretary-email page
        Given I start the 'shooting-clubs' application journey
        Then I should be on the 'privacy' page showing 'Privacy Notice'
        Then I select 'Continue'
        Then I should be on the 'activity' page showing 'What do you want to do?'
        Then I select 'Continue'
        Then I should see the 'Select an option' error
        Then I check 'activity-new'
        Then I select 'Continue'
        Then I should be on the 'new-club' page showing 'Is the club a new club?'
        Then I select 'Continue'
        Then I should see the 'Select an option' error
        Then I check 'new-club-yes'
        Then I select 'Continue'
        Then I should be on the 'club-name' page showing 'What is the club\'s name?'
        Then I select 'Continue'
        Then I should see the 'Enter the club name' error
        Then I fill 'club-name' with 'Test club'
        Then I select 'Continue'
        Then I should be on the 'club-address' page showing 'What is the club\'s address?'
        Then I select 'Continue'
        Then I should see the 'Enter details of your building and street' error
        Then I should see the 'Enter a town or city' error
        Then I should see the 'Enter your postcode or ZIP Code' error
        Then I fill 'club-building' with '1'
        Then I fill 'club-street' with 'Test road'
        Then I fill 'club-townOrCity' with 'London'
        Then I fill 'club-postcodeOrZIPCode' with 'TE5 7TE'
        Then I select 'Continue'
        Then I should be on the 'club-secretary-name' page showing 'What is the club secretary\'s name?'
        Then I select 'Continue'
        Then I should see the 'Enter the name of the club secretary' error
        Then I fill 'club-secretary-name' with 'Ronald Testman'
        Then I select 'Continue'
        Then I should be on the 'club-secretary-address' page showing 'What is Ronald Testman\'s contact address?'
        Then I select 'Continue'
        Then I should see the 'Enter details of your building and street' error
        Then I should see the 'Enter a town or city' error
        Then I should see the 'Enter your postcode or ZIP Code' error
        Then I fill 'club-secretary-building' with '2'
        Then I fill 'club-secretary-street' with 'Test road'
        Then I fill 'club-secretary-townOrCity' with 'London'
        Then I fill 'club-secretary-postcodeOrZIPCode' with 'TE5 7ER'
        Then I select 'Continue'
        Then I should be on the 'club-secretary-email' page showing 'What are Ronald Testman\'s contact details?'
        Then I select 'Continue'
        Then I should see the 'Enter the club secretary\'s email' error
        Then I should see the 'Enter the club secretary\'s phone number' error

    Scenario: I am on the Shooting-clubs journey but I don't fill in the name on the second-contact-name page
        Given I start the 'shooting-clubs' application journey
        Then I should be on the 'privacy' page showing 'Privacy Notice'
        Then I select 'Continue'
        Then I should be on the 'activity' page showing 'What do you want to do?'
        Then I select 'Continue'
        Then I should see the 'Select an option' error
        Then I check 'activity-new'
        Then I select 'Continue'
        Then I should be on the 'new-club' page showing 'Is the club a new club?'
        Then I select 'Continue'
        Then I should see the 'Select an option' error
        Then I check 'new-club-yes'
        Then I select 'Continue'
        Then I should be on the 'club-name' page showing 'What is the club\'s name?'
        Then I select 'Continue'
        Then I should see the 'Enter the club name' error
        Then I fill 'club-name' with 'Test club'
        Then I select 'Continue'
        Then I should be on the 'club-address' page showing 'What is the club\'s address?'
        Then I select 'Continue'
        Then I should see the 'Enter details of your building and street' error
        Then I should see the 'Enter a town or city' error
        Then I should see the 'Enter your postcode or ZIP Code' error
        Then I fill 'club-building' with '1'
        Then I fill 'club-street' with 'Test road'
        Then I fill 'club-townOrCity' with 'London'
        Then I fill 'club-postcodeOrZIPCode' with 'TE5 7TE'
        Then I select 'Continue'
        Then I should be on the 'club-secretary-name' page showing 'What is the club secretary\'s name?'
        Then I select 'Continue'
        Then I should see the 'Enter the name of the club secretary' error
        Then I fill 'club-secretary-name' with 'Ronald Testman'
        Then I select 'Continue'
        Then I should be on the 'club-secretary-address' page showing 'What is Ronald Testman\'s contact address?'
        Then I select 'Continue'
        Then I should see the 'Enter details of your building and street' error
        Then I should see the 'Enter a town or city' error
        Then I should see the 'Enter your postcode or ZIP Code' error
        Then I fill 'club-secretary-building' with '2'
        Then I fill 'club-secretary-street' with 'Test road'
        Then I fill 'club-secretary-townOrCity' with 'London'
        Then I fill 'club-secretary-postcodeOrZIPCode' with 'TE5 7ER'
        Then I select 'Continue'
        Then I should be on the 'club-secretary-email' page showing 'What are Ronald Testman\'s contact details?'
        Then I select 'Continue'
        Then I should see the 'Enter the club secretary\'s email' error
        Then I should see the 'Enter the club secretary\'s phone number' error
        Then I fill 'club-secretary-email' with 'test@test.com'
        Then I fill 'club-secretary-phone' with '01234567891'
        Then I select 'Continue'
        Then I should be on the 'second-contact-name' page showing 'Who should we contact in Ronald Testman\'s absence?'
        Then I select 'Continue'
        Then I should see the 'Please enter the second person\'s name' error

    Scenario: I am on the Shooting-clubs journey but I don't fill in the address on the second-contact-address page
        Given I start the 'shooting-clubs' application journey
        Then I should be on the 'privacy' page showing 'Privacy Notice'
        Then I select 'Continue'
        Then I should be on the 'activity' page showing 'What do you want to do?'
        Then I select 'Continue'
        Then I should see the 'Select an option' error
        Then I check 'activity-new'
        Then I select 'Continue'
        Then I should be on the 'new-club' page showing 'Is the club a new club?'
        Then I select 'Continue'
        Then I should see the 'Select an option' error
        Then I check 'new-club-yes'
        Then I select 'Continue'
        Then I should be on the 'club-name' page showing 'What is the club\'s name?'
        Then I select 'Continue'
        Then I should see the 'Enter the club name' error
        Then I fill 'club-name' with 'Test club'
        Then I select 'Continue'
        Then I should be on the 'club-address' page showing 'What is the club\'s address?'
        Then I select 'Continue'
        Then I should see the 'Enter details of your building and street' error
        Then I should see the 'Enter a town or city' error
        Then I should see the 'Enter your postcode or ZIP Code' error
        Then I fill 'club-building' with '1'
        Then I fill 'club-street' with 'Test road'
        Then I fill 'club-townOrCity' with 'London'
        Then I fill 'club-postcodeOrZIPCode' with 'TE5 7TE'
        Then I select 'Continue'
        Then I should be on the 'club-secretary-name' page showing 'What is the club secretary\'s name?'
        Then I select 'Continue'
        Then I should see the 'Enter the name of the club secretary' error
        Then I fill 'club-secretary-name' with 'Ronald Testman'
        Then I select 'Continue'
        Then I should be on the 'club-secretary-address' page showing 'What is Ronald Testman\'s contact address?'
        Then I select 'Continue'
        Then I should see the 'Enter details of your building and street' error
        Then I should see the 'Enter a town or city' error
        Then I should see the 'Enter your postcode or ZIP Code' error
        Then I fill 'club-secretary-building' with '2'
        Then I fill 'club-secretary-street' with 'Test road'
        Then I fill 'club-secretary-townOrCity' with 'London'
        Then I fill 'club-secretary-postcodeOrZIPCode' with 'TE5 7ER'
        Then I select 'Continue'
        Then I should be on the 'club-secretary-email' page showing 'What are Ronald Testman\'s contact details?'
        Then I select 'Continue'
        Then I should see the 'Enter the club secretary\'s email' error
        Then I should see the 'Enter the club secretary\'s phone number' error
        Then I fill 'club-secretary-email' with 'test@test.com'
        Then I fill 'club-secretary-phone' with '01234567891'
        Then I select 'Continue'
        Then I should be on the 'second-contact-name' page showing 'Who should we contact in Ronald Testman\'s absence?'
        Then I select 'Continue'
        Then I should see the 'Please enter the second person\'s name' error
        Then I fill 'second-contact-name' with 'Ronald Testman'
        Then I select 'Continue'
        Then I should be on the 'second-contact-address' page showing 'What is Ronald Testman\'s contact address?'
        Then I select 'Continue'
        Then I should see the 'Enter details of your building and street' error
        Then I should see the 'Enter a town or city' error
        Then I should see the 'Enter your postcode or ZIP Code' error

    Scenario: I am on the Shooting-clubs journey but I don't fill in the email or phone number on the second-contact-email page
        Given I start the 'shooting-clubs' application journey
        Then I should be on the 'privacy' page showing 'Privacy Notice'
        Then I select 'Continue'
        Then I should be on the 'activity' page showing 'What do you want to do?'
        Then I select 'Continue'
        Then I should see the 'Select an option' error
        Then I check 'activity-new'
        Then I select 'Continue'
        Then I should be on the 'new-club' page showing 'Is the club a new club?'
        Then I select 'Continue'
        Then I should see the 'Select an option' error
        Then I check 'new-club-yes'
        Then I select 'Continue'
        Then I should be on the 'club-name' page showing 'What is the club\'s name?'
        Then I select 'Continue'
        Then I should see the 'Enter the club name' error
        Then I fill 'club-name' with 'Test club'
        Then I select 'Continue'
        Then I should be on the 'club-address' page showing 'What is the club\'s address?'
        Then I select 'Continue'
        Then I should see the 'Enter details of your building and street' error
        Then I should see the 'Enter a town or city' error
        Then I should see the 'Enter your postcode or ZIP Code' error
        Then I fill 'club-building' with '1'
        Then I fill 'club-street' with 'Test road'
        Then I fill 'club-townOrCity' with 'London'
        Then I fill 'club-postcodeOrZIPCode' with 'TE5 7TE'
        Then I select 'Continue'
        Then I should be on the 'club-secretary-name' page showing 'What is the club secretary\'s name?'
        Then I select 'Continue'
        Then I should see the 'Enter the name of the club secretary' error
        Then I fill 'club-secretary-name' with 'Ronald Testman'
        Then I select 'Continue'
        Then I should be on the 'club-secretary-address' page showing 'What is Ronald Testman\'s contact address?'
        Then I select 'Continue'
        Then I should see the 'Enter details of your building and street' error
        Then I should see the 'Enter a town or city' error
        Then I should see the 'Enter your postcode or ZIP Code' error
        Then I fill 'club-secretary-building' with '2'
        Then I fill 'club-secretary-street' with 'Test road'
        Then I fill 'club-secretary-townOrCity' with 'London'
        Then I fill 'club-secretary-postcodeOrZIPCode' with 'TE5 7ER'
        Then I select 'Continue'
        Then I should be on the 'club-secretary-email' page showing 'What are Ronald Testman\'s contact details?'
        Then I select 'Continue'
        Then I should see the 'Enter the club secretary\'s email' error
        Then I should see the 'Enter the club secretary\'s phone number' error
        Then I fill 'club-secretary-email' with 'test@test.com'
        Then I fill 'club-secretary-phone' with '01234567891'
        Then I select 'Continue'
        Then I should be on the 'second-contact-name' page showing 'Who should we contact in Ronald Testman\'s absence?'
        Then I select 'Continue'
        Then I should see the 'Please enter the second person\'s name' error
        Then I fill 'second-contact-name' with 'Ronald Testman'
        Then I select 'Continue'
        Then I should be on the 'second-contact-address' page showing 'What is Ronald Testman\'s contact address?'
        Then I select 'Continue'
        Then I should see the 'Enter details of your building and street' error
        Then I should see the 'Enter a town or city' error
        Then I should see the 'Enter your postcode or ZIP Code' error
        Then I fill 'second-contact-building' with '3'
        Then I fill 'second-contact-street' with 'Test road'
        Then I fill 'second-contact-townOrCity' with 'London'
        Then I fill 'second-contact-postcodeOrZIPCode' with 'TE5 7SR'
        Then I select 'Continue'
        Then I should be on the 'second-contact-email' page showing 'What are Ronald Testman\'s contact details?'
        Then I select 'Continue'
        Then I should see the 'Enter the second person\'s email' error
        Then I should see the 'Enter the second person\'s phone number' error

    Scenario: I am on the Shooting-clubs journey but I don't fill in the address on the location-address page
        Given I start the 'shooting-clubs' application journey
        Then I should be on the 'privacy' page showing 'Privacy Notice'
        Then I select 'Continue'
        Then I should be on the 'activity' page showing 'What do you want to do?'
        Then I select 'Continue'
        Then I should see the 'Select an option' error
        Then I check 'activity-new'
        Then I select 'Continue'
        Then I should be on the 'new-club' page showing 'Is the club a new club?'
        Then I select 'Continue'
        Then I should see the 'Select an option' error
        Then I check 'new-club-yes'
        Then I select 'Continue'
        Then I should be on the 'club-name' page showing 'What is the club\'s name?'
        Then I select 'Continue'
        Then I should see the 'Enter the club name' error
        Then I fill 'club-name' with 'Test club'
        Then I select 'Continue'
        Then I should be on the 'club-address' page showing 'What is the club\'s address?'
        Then I select 'Continue'
        Then I should see the 'Enter details of your building and street' error
        Then I should see the 'Enter a town or city' error
        Then I should see the 'Enter your postcode or ZIP Code' error
        Then I fill 'club-building' with '1'
        Then I fill 'club-street' with 'Test road'
        Then I fill 'club-townOrCity' with 'London'
        Then I fill 'club-postcodeOrZIPCode' with 'TE5 7TE'
        Then I select 'Continue'
        Then I should be on the 'club-secretary-name' page showing 'What is the club secretary\'s name?'
        Then I select 'Continue'
        Then I should see the 'Enter the name of the club secretary' error
        Then I fill 'club-secretary-name' with 'Ronald Testman'
        Then I select 'Continue'
        Then I should be on the 'club-secretary-address' page showing 'What is Ronald Testman\'s contact address?'
        Then I select 'Continue'
        Then I should see the 'Enter details of your building and street' error
        Then I should see the 'Enter a town or city' error
        Then I should see the 'Enter your postcode or ZIP Code' error
        Then I fill 'club-secretary-building' with '2'
        Then I fill 'club-secretary-street' with 'Test road'
        Then I fill 'club-secretary-townOrCity' with 'London'
        Then I fill 'club-secretary-postcodeOrZIPCode' with 'TE5 7ER'
        Then I select 'Continue'
        Then I should be on the 'club-secretary-email' page showing 'What are Ronald Testman\'s contact details?'
        Then I select 'Continue'
        Then I should see the 'Enter the club secretary\'s email' error
        Then I should see the 'Enter the club secretary\'s phone number' error
        Then I fill 'club-secretary-email' with 'test@test.com'
        Then I fill 'club-secretary-phone' with '01234567891'
        Then I select 'Continue'
        Then I should be on the 'second-contact-name' page showing 'Who should we contact in Ronald Testman\'s absence?'
        Then I select 'Continue'
        Then I should see the 'Please enter the second person\'s name' error
        Then I fill 'second-contact-name' with 'Ronald Testman'
        Then I select 'Continue'
        Then I should be on the 'second-contact-address' page showing 'What is Ronald Testman\'s contact address?'
        Then I select 'Continue'
        Then I should see the 'Enter details of your building and street' error
        Then I should see the 'Enter a town or city' error
        Then I should see the 'Enter your postcode or ZIP Code' error
        Then I fill 'second-contact-building' with '3'
        Then I fill 'second-contact-street' with 'Test road'
        Then I fill 'second-contact-townOrCity' with 'London'
        Then I fill 'second-contact-postcodeOrZIPCode' with 'TE5 7SR'
        Then I select 'Continue'
        Then I should be on the 'second-contact-email' page showing 'What are Ronald Testman\'s contact details?'
        Then I select 'Continue'
        Then I should see the 'Enter the second person\'s email' error
        Then I should see the 'Enter the second person\'s phone number' error
        Then I fill 'second-contact-email' with 'test@test.com'
        Then I fill 'second-contact-phone' with '01234567891'
        Then I select 'Continue'
        Then I should be on the 'location-address' page showing 'Which shooting ranges will the club use?'
        Then I select 'Continue'
        Then I should see the 'Enter details of your building and street' error
        Then I should see the 'Enter a town or city' error
        Then I should see the 'Enter your postcode or ZIP Code' error

    Scenario: I am on the Shooting-clubs journey but I don't select an option on the location-address-category page
        Given I start the 'shooting-clubs' application journey
        Then I should be on the 'privacy' page showing 'Privacy Notice'
        Then I select 'Continue'
        Then I should be on the 'activity' page showing 'What do you want to do?'
        Then I select 'Continue'
        Then I should see the 'Select an option' error
        Then I check 'activity-new'
        Then I select 'Continue'
        Then I should be on the 'new-club' page showing 'Is the club a new club?'
        Then I select 'Continue'
        Then I should see the 'Select an option' error
        Then I check 'new-club-yes'
        Then I select 'Continue'
        Then I should be on the 'club-name' page showing 'What is the club\'s name?'
        Then I select 'Continue'
        Then I should see the 'Enter the club name' error
        Then I fill 'club-name' with 'Test club'
        Then I select 'Continue'
        Then I should be on the 'club-address' page showing 'What is the club\'s address?'
        Then I select 'Continue'
        Then I should see the 'Enter details of your building and street' error
        Then I should see the 'Enter a town or city' error
        Then I should see the 'Enter your postcode or ZIP Code' error
        Then I fill 'club-building' with '1'
        Then I fill 'club-street' with 'Test road'
        Then I fill 'club-townOrCity' with 'London'
        Then I fill 'club-postcodeOrZIPCode' with 'TE5 7TE'
        Then I select 'Continue'
        Then I should be on the 'club-secretary-name' page showing 'What is the club secretary\'s name?'
        Then I select 'Continue'
        Then I should see the 'Enter the name of the club secretary' error
        Then I fill 'club-secretary-name' with 'Ronald Testman'
        Then I select 'Continue'
        Then I should be on the 'club-secretary-address' page showing 'What is Ronald Testman\'s contact address?'
        Then I select 'Continue'
        Then I should see the 'Enter details of your building and street' error
        Then I should see the 'Enter a town or city' error
        Then I should see the 'Enter your postcode or ZIP Code' error
        Then I fill 'club-secretary-building' with '2'
        Then I fill 'club-secretary-street' with 'Test road'
        Then I fill 'club-secretary-townOrCity' with 'London'
        Then I fill 'club-secretary-postcodeOrZIPCode' with 'TE5 7ER'
        Then I select 'Continue'
        Then I should be on the 'club-secretary-email' page showing 'What are Ronald Testman\'s contact details?'
        Then I select 'Continue'
        Then I should see the 'Enter the club secretary\'s email' error
        Then I should see the 'Enter the club secretary\'s phone number' error
        Then I fill 'club-secretary-email' with 'test@test.com'
        Then I fill 'club-secretary-phone' with '01234567891'
        Then I select 'Continue'
        Then I should be on the 'second-contact-name' page showing 'Who should we contact in Ronald Testman\'s absence?'
        Then I select 'Continue'
        Then I should see the 'Please enter the second person\'s name' error
        Then I fill 'second-contact-name' with 'Ronald Testman'
        Then I select 'Continue'
        Then I should be on the 'second-contact-address' page showing 'What is Ronald Testman\'s contact address?'
        Then I select 'Continue'
        Then I should see the 'Enter details of your building and street' error
        Then I should see the 'Enter a town or city' error
        Then I should see the 'Enter your postcode or ZIP Code' error
        Then I fill 'second-contact-building' with '3'
        Then I fill 'second-contact-street' with 'Test road'
        Then I fill 'second-contact-townOrCity' with 'London'
        Then I fill 'second-contact-postcodeOrZIPCode' with 'TE5 7SR'
        Then I select 'Continue'
        Then I should be on the 'second-contact-email' page showing 'What are Ronald Testman\'s contact details?'
        Then I select 'Continue'
        Then I should see the 'Enter the second person\'s email' error
        Then I should see the 'Enter the second person\'s phone number' error
        Then I fill 'second-contact-email' with 'test@test.com'
        Then I fill 'second-contact-phone' with '01234567891'
        Then I select 'Continue'
        Then I should be on the 'location-address' page showing 'Which shooting ranges will the club use?'
        Then I select 'Continue'
        Then I should see the 'Enter details of your building and street' error
        Then I should see the 'Enter a town or city' error
        Then I should see the 'Enter your postcode or ZIP Code' error
        Then I fill 'location-building' with '4'
        Then I fill 'location-street' with 'Test road'
        Then I fill 'location-townOrCity' with 'London'
        Then I fill 'location-postcodeOrZIPCode' with 'TE5 7SS'
        Then I select 'Continue'
        Then I should be on the 'location-address-category' page showing 'Which categories of firearms will be used at this range?'
        Then I select 'Continue'
        Then I should see the 'Select the categories of firearms that will be used at this range' error
        Then I select 'Continue'
        Then I should see the 'Select the categories of firearms that will be used at this range' error

    Scenario: I am on the Shooting-clubs journey but I don't select an option on the location-add-another-address page
        Given I start the 'shooting-clubs' application journey
        Then I should be on the 'privacy' page showing 'Privacy Notice'
        Then I select 'Continue'
        Then I should be on the 'activity' page showing 'What do you want to do?'
        Then I select 'Continue'
        Then I should see the 'Select an option' error
        Then I check 'activity-new'
        Then I select 'Continue'
        Then I should be on the 'new-club' page showing 'Is the club a new club?'
        Then I select 'Continue'
        Then I should see the 'Select an option' error
        Then I check 'new-club-yes'
        Then I select 'Continue'
        Then I should be on the 'club-name' page showing 'What is the club\'s name?'
        Then I select 'Continue'
        Then I should see the 'Enter the club name' error
        Then I fill 'club-name' with 'Test club'
        Then I select 'Continue'
        Then I should be on the 'club-address' page showing 'What is the club\'s address?'
        Then I select 'Continue'
        Then I should see the 'Enter details of your building and street' error
        Then I should see the 'Enter a town or city' error
        Then I should see the 'Enter your postcode or ZIP Code' error
        Then I fill 'club-building' with '1'
        Then I fill 'club-street' with 'Test road'
        Then I fill 'club-townOrCity' with 'London'
        Then I fill 'club-postcodeOrZIPCode' with 'TE5 7TE'
        Then I select 'Continue'
        Then I should be on the 'club-secretary-name' page showing 'What is the club secretary\'s name?'
        Then I select 'Continue'
        Then I should see the 'Enter the name of the club secretary' error
        Then I fill 'club-secretary-name' with 'Ronald Testman'
        Then I select 'Continue'
        Then I should be on the 'club-secretary-address' page showing 'What is Ronald Testman\'s contact address?'
        Then I select 'Continue'
        Then I should see the 'Enter details of your building and street' error
        Then I should see the 'Enter a town or city' error
        Then I should see the 'Enter your postcode or ZIP Code' error
        Then I fill 'club-secretary-building' with '2'
        Then I fill 'club-secretary-street' with 'Test road'
        Then I fill 'club-secretary-townOrCity' with 'London'
        Then I fill 'club-secretary-postcodeOrZIPCode' with 'TE5 7ER'
        Then I select 'Continue'
        Then I should be on the 'club-secretary-email' page showing 'What are Ronald Testman\'s contact details?'
        Then I select 'Continue'
        Then I should see the 'Enter the club secretary\'s email' error
        Then I should see the 'Enter the club secretary\'s phone number' error
        Then I fill 'club-secretary-email' with 'test@test.com'
        Then I fill 'club-secretary-phone' with '01234567891'
        Then I select 'Continue'
        Then I should be on the 'second-contact-name' page showing 'Who should we contact in Ronald Testman\'s absence?'
        Then I select 'Continue'
        Then I should see the 'Please enter the second person\'s name' error
        Then I fill 'second-contact-name' with 'Ronald Testman'
        Then I select 'Continue'
        Then I should be on the 'second-contact-address' page showing 'What is Ronald Testman\'s contact address?'
        Then I select 'Continue'
        Then I should see the 'Enter details of your building and street' error
        Then I should see the 'Enter a town or city' error
        Then I should see the 'Enter your postcode or ZIP Code' error
        Then I fill 'second-contact-building' with '3'
        Then I fill 'second-contact-street' with 'Test road'
        Then I fill 'second-contact-townOrCity' with 'London'
        Then I fill 'second-contact-postcodeOrZIPCode' with 'TE5 7SR'
        Then I select 'Continue'
        Then I should be on the 'second-contact-email' page showing 'What are Ronald Testman\'s contact details?'
        Then I select 'Continue'
        Then I should see the 'Enter the second person\'s email' error
        Then I should see the 'Enter the second person\'s phone number' error
        Then I fill 'second-contact-email' with 'test@test.com'
        Then I fill 'second-contact-phone' with '01234567891'
        Then I select 'Continue'
        Then I should be on the 'location-address' page showing 'Which shooting ranges will the club use?'
        Then I select 'Continue'
        Then I should see the 'Enter details of your building and street' error
        Then I should see the 'Enter a town or city' error
        Then I should see the 'Enter your postcode or ZIP Code' error
        Then I fill 'location-building' with '4'
        Then I fill 'location-street' with 'Test road'
        Then I fill 'location-townOrCity' with 'London'
        Then I fill 'location-postcodeOrZIPCode' with 'TE5 7SS'
        Then I select 'Continue'
        Then I should be on the 'location-address-category' page showing 'Which categories of firearms will be used at this range?'
        Then I select 'Continue'
        Then I should see the 'Select the categories of firearms that will be used at this range' error
        Then I check 'location-address-category-full-bore-rifles'
        Then I select 'Continue'
        Then I should be on the 'location-add-another-address' page showing 'Will the club use another shooting range?'
        Then I select 'Continue'
        Then I should see the 'Select an option' error

    Scenario: I am on the Shooting-clubs journey but I don't select an option on the storage-address page
        Given I start the 'shooting-clubs' application journey
        Then I should be on the 'privacy' page showing 'Privacy Notice'
        Then I select 'Continue'
        Then I should be on the 'activity' page showing 'What do you want to do?'
        Then I select 'Continue'
        Then I should see the 'Select an option' error
        Then I check 'activity-new'
        Then I select 'Continue'
        Then I should be on the 'new-club' page showing 'Is the club a new club?'
        Then I select 'Continue'
        Then I should see the 'Select an option' error
        Then I check 'new-club-yes'
        Then I select 'Continue'
        Then I should be on the 'club-name' page showing 'What is the club\'s name?'
        Then I select 'Continue'
        Then I should see the 'Enter the club name' error
        Then I fill 'club-name' with 'Test club'
        Then I select 'Continue'
        Then I should be on the 'club-address' page showing 'What is the club\'s address?'
        Then I select 'Continue'
        Then I should see the 'Enter details of your building and street' error
        Then I should see the 'Enter a town or city' error
        Then I should see the 'Enter your postcode or ZIP Code' error
        Then I fill 'club-building' with '1'
        Then I fill 'club-street' with 'Test road'
        Then I fill 'club-townOrCity' with 'London'
        Then I fill 'club-postcodeOrZIPCode' with 'TE5 7TE'
        Then I select 'Continue'
        Then I should be on the 'club-secretary-name' page showing 'What is the club secretary\'s name?'
        Then I select 'Continue'
        Then I should see the 'Enter the name of the club secretary' error
        Then I fill 'club-secretary-name' with 'Ronald Testman'
        Then I select 'Continue'
        Then I should be on the 'club-secretary-address' page showing 'What is Ronald Testman\'s contact address?'
        Then I select 'Continue'
        Then I should see the 'Enter details of your building and street' error
        Then I should see the 'Enter a town or city' error
        Then I should see the 'Enter your postcode or ZIP Code' error
        Then I fill 'club-secretary-building' with '2'
        Then I fill 'club-secretary-street' with 'Test road'
        Then I fill 'club-secretary-townOrCity' with 'London'
        Then I fill 'club-secretary-postcodeOrZIPCode' with 'TE5 7ER'
        Then I select 'Continue'
        Then I should be on the 'club-secretary-email' page showing 'What are Ronald Testman\'s contact details?'
        Then I select 'Continue'
        Then I should see the 'Enter the club secretary\'s email' error
        Then I should see the 'Enter the club secretary\'s phone number' error
        Then I fill 'club-secretary-email' with 'test@test.com'
        Then I fill 'club-secretary-phone' with '01234567891'
        Then I select 'Continue'
        Then I should be on the 'second-contact-name' page showing 'Who should we contact in Ronald Testman\'s absence?'
        Then I select 'Continue'
        Then I should see the 'Please enter the second person\'s name' error
        Then I fill 'second-contact-name' with 'Ronald Testman'
        Then I select 'Continue'
        Then I should be on the 'second-contact-address' page showing 'What is Ronald Testman\'s contact address?'
        Then I select 'Continue'
        Then I should see the 'Enter details of your building and street' error
        Then I should see the 'Enter a town or city' error
        Then I should see the 'Enter your postcode or ZIP Code' error
        Then I fill 'second-contact-building' with '3'
        Then I fill 'second-contact-street' with 'Test road'
        Then I fill 'second-contact-townOrCity' with 'London'
        Then I fill 'second-contact-postcodeOrZIPCode' with 'TE5 7SR'
        Then I select 'Continue'
        Then I should be on the 'second-contact-email' page showing 'What are Ronald Testman\'s contact details?'
        Then I select 'Continue'
        Then I should see the 'Enter the second person\'s email' error
        Then I should see the 'Enter the second person\'s phone number' error
        Then I fill 'second-contact-email' with 'test@test.com'
        Then I fill 'second-contact-phone' with '01234567891'
        Then I select 'Continue'
        Then I should be on the 'location-address' page showing 'Which shooting ranges will the club use?'
        Then I select 'Continue'
        Then I should see the 'Enter details of your building and street' error
        Then I should see the 'Enter a town or city' error
        Then I should see the 'Enter your postcode or ZIP Code' error
        Then I fill 'location-building' with '4'
        Then I fill 'location-street' with 'Test road'
        Then I fill 'location-townOrCity' with 'London'
        Then I fill 'location-postcodeOrZIPCode' with 'TE5 7SS'
        Then I select 'Continue'
        Then I should be on the 'location-address-category' page showing 'Which categories of firearms will be used at this range?'
        Then I select 'Continue'
        Then I should see the 'Select the categories of firearms that will be used at this range' error
        Then I check 'location-address-category-full-bore-rifles'
        Then I select 'Continue'
        Then I should be on the 'location-add-another-address' page showing 'Will the club use another shooting range?'
        Then I select 'Continue'
        Then I should see the 'Select an option' error
        Then I check 'location-addresses-add-another-no'
        Then I select 'Continue'
        Then I should be on the 'storage-address' page showing 'At which of these addresses, if any, will the firearms be stored?'
        Then I select 'Continue'
        Then I should be on the 'storage-add-another-address' page showing 'Is there another address where the guns will be stored?'
     
    Scenario: I am on the Shooting-clubs journey but I don't select an option on the storage-add-another-address page
        Given I start the 'shooting-clubs' application journey
        Then I should be on the 'privacy' page showing 'Privacy Notice'
        Then I select 'Continue'
        Then I should be on the 'activity' page showing 'What do you want to do?'
        Then I select 'Continue'
        Then I should see the 'Select an option' error
        Then I check 'activity-new'
        Then I select 'Continue'
        Then I should be on the 'new-club' page showing 'Is the club a new club?'
        Then I select 'Continue'
        Then I should see the 'Select an option' error
        Then I check 'new-club-yes'
        Then I select 'Continue'
        Then I should be on the 'club-name' page showing 'What is the club\'s name?'
        Then I select 'Continue'
        Then I should see the 'Enter the club name' error
        Then I fill 'club-name' with 'Test club'
        Then I select 'Continue'
        Then I should be on the 'club-address' page showing 'What is the club\'s address?'
        Then I select 'Continue'
        Then I should see the 'Enter details of your building and street' error
        Then I should see the 'Enter a town or city' error
        Then I should see the 'Enter your postcode or ZIP Code' error
        Then I fill 'club-building' with '1'
        Then I fill 'club-street' with 'Test road'
        Then I fill 'club-townOrCity' with 'London'
        Then I fill 'club-postcodeOrZIPCode' with 'TE5 7TE'
        Then I select 'Continue'
        Then I should be on the 'club-secretary-name' page showing 'What is the club secretary\'s name?'
        Then I select 'Continue'
        Then I should see the 'Enter the name of the club secretary' error
        Then I fill 'club-secretary-name' with 'Ronald Testman'
        Then I select 'Continue'
        Then I should be on the 'club-secretary-address' page showing 'What is Ronald Testman\'s contact address?'
        Then I select 'Continue'
        Then I should see the 'Enter details of your building and street' error
        Then I should see the 'Enter a town or city' error
        Then I should see the 'Enter your postcode or ZIP Code' error
        Then I fill 'club-secretary-building' with '2'
        Then I fill 'club-secretary-street' with 'Test road'
        Then I fill 'club-secretary-townOrCity' with 'London'
        Then I fill 'club-secretary-postcodeOrZIPCode' with 'TE5 7ER'
        Then I select 'Continue'
        Then I should be on the 'club-secretary-email' page showing 'What are Ronald Testman\'s contact details?'
        Then I select 'Continue'
        Then I should see the 'Enter the club secretary\'s email' error
        Then I should see the 'Enter the club secretary\'s phone number' error
        Then I fill 'club-secretary-email' with 'test@test.com'
        Then I fill 'club-secretary-phone' with '01234567891'
        Then I select 'Continue'
        Then I should be on the 'second-contact-name' page showing 'Who should we contact in Ronald Testman\'s absence?'
        Then I select 'Continue'
        Then I should see the 'Please enter the second person\'s name' error
        Then I fill 'second-contact-name' with 'Ronald Testman'
        Then I select 'Continue'
        Then I should be on the 'second-contact-address' page showing 'What is Ronald Testman\'s contact address?'
        Then I select 'Continue'
        Then I should see the 'Enter details of your building and street' error
        Then I should see the 'Enter a town or city' error
        Then I should see the 'Enter your postcode or ZIP Code' error
        Then I fill 'second-contact-building' with '3'
        Then I fill 'second-contact-street' with 'Test road'
        Then I fill 'second-contact-townOrCity' with 'London'
        Then I fill 'second-contact-postcodeOrZIPCode' with 'TE5 7SR'
        Then I select 'Continue'
        Then I should be on the 'second-contact-email' page showing 'What are Ronald Testman\'s contact details?'
        Then I select 'Continue'
        Then I should see the 'Enter the second person\'s email' error
        Then I should see the 'Enter the second person\'s phone number' error
        Then I fill 'second-contact-email' with 'test@test.com'
        Then I fill 'second-contact-phone' with '01234567891'
        Then I select 'Continue'
        Then I should be on the 'location-address' page showing 'Which shooting ranges will the club use?'
        Then I select 'Continue'
        Then I should see the 'Enter details of your building and street' error
        Then I should see the 'Enter a town or city' error
        Then I should see the 'Enter your postcode or ZIP Code' error
        Then I fill 'location-building' with '4'
        Then I fill 'location-street' with 'Test road'
        Then I fill 'location-townOrCity' with 'London'
        Then I fill 'location-postcodeOrZIPCode' with 'TE5 7SS'
        Then I select 'Continue'
        Then I should be on the 'location-address-category' page showing 'Which categories of firearms will be used at this range?'
        Then I select 'Continue'
        Then I should see the 'Select the categories of firearms that will be used at this range' error
        Then I check 'location-address-category-full-bore-rifles'
        Then I select 'Continue'
        Then I should be on the 'location-add-another-address' page showing 'Will the club use another shooting range?'
        Then I select 'Continue'
        Then I should see the 'Select an option' error
        Then I check 'location-addresses-add-another-no'
        Then I select 'Continue'
        Then I should be on the 'storage-address' page showing 'At which of these addresses, if any, will the firearms be stored?'       
        Then I choose '4, Test road, London, TE57SS'
        Then I select 'Continue'
        Then I should be on the 'storage-add-another-address' page showing 'Is there another address where the guns will be stored?'
        Then I select 'Continue'
        Then I should see the 'Select an option' error

    Scenario: I am on the Shooting-clubs journey but I don't fill in the address on the invoice-contact-details page
        Given I start the 'shooting-clubs' application journey
        Then I should be on the 'privacy' page showing 'Privacy Notice'
        Then I select 'Continue'
        Then I should be on the 'activity' page showing 'What do you want to do?'
        Then I select 'Continue'
        Then I should see the 'Select an option' error
        Then I check 'activity-new'
        Then I select 'Continue'
        Then I should be on the 'new-club' page showing 'Is the club a new club?'
        Then I select 'Continue'
        Then I should see the 'Select an option' error
        Then I check 'new-club-yes'
        Then I select 'Continue'
        Then I should be on the 'club-name' page showing 'What is the club\'s name?'
        Then I select 'Continue'
        Then I should see the 'Enter the club name' error
        Then I fill 'club-name' with 'Test club'
        Then I select 'Continue'
        Then I should be on the 'club-address' page showing 'What is the club\'s address?'
        Then I select 'Continue'
        Then I should see the 'Enter details of your building and street' error
        Then I should see the 'Enter a town or city' error
        Then I should see the 'Enter your postcode or ZIP Code' error
        Then I fill 'club-building' with '1'
        Then I fill 'club-street' with 'Test road'
        Then I fill 'club-townOrCity' with 'London'
        Then I fill 'club-postcodeOrZIPCode' with 'TE5 7TE'
        Then I select 'Continue'
        Then I should be on the 'club-secretary-name' page showing 'What is the club secretary\'s name?'
        Then I select 'Continue'
        Then I should see the 'Enter the name of the club secretary' error
        Then I fill 'club-secretary-name' with 'Ronald Testman'
        Then I select 'Continue'
        Then I should be on the 'club-secretary-address' page showing 'What is Ronald Testman\'s contact address?'
        Then I select 'Continue'
        Then I should see the 'Enter details of your building and street' error
        Then I should see the 'Enter a town or city' error
        Then I should see the 'Enter your postcode or ZIP Code' error
        Then I fill 'club-secretary-building' with '2'
        Then I fill 'club-secretary-street' with 'Test road'
        Then I fill 'club-secretary-townOrCity' with 'London'
        Then I fill 'club-secretary-postcodeOrZIPCode' with 'TE5 7ER'
        Then I select 'Continue'
        Then I should be on the 'club-secretary-email' page showing 'What are Ronald Testman\'s contact details?'
        Then I select 'Continue'
        Then I should see the 'Enter the club secretary\'s email' error
        Then I should see the 'Enter the club secretary\'s phone number' error
        Then I fill 'club-secretary-email' with 'test@test.com'
        Then I fill 'club-secretary-phone' with '01234567891'
        Then I select 'Continue'
        Then I should be on the 'second-contact-name' page showing 'Who should we contact in Ronald Testman\'s absence?'
        Then I select 'Continue'
        Then I should see the 'Please enter the second person\'s name' error
        Then I fill 'second-contact-name' with 'Ronald Testman'
        Then I select 'Continue'
        Then I should be on the 'second-contact-address' page showing 'What is Ronald Testman\'s contact address?'
        Then I select 'Continue'
        Then I should see the 'Enter details of your building and street' error
        Then I should see the 'Enter a town or city' error
        Then I should see the 'Enter your postcode or ZIP Code' error
        Then I fill 'second-contact-building' with '3'
        Then I fill 'second-contact-street' with 'Test road'
        Then I fill 'second-contact-townOrCity' with 'London'
        Then I fill 'second-contact-postcodeOrZIPCode' with 'TE5 7SR'
        Then I select 'Continue'
        Then I should be on the 'second-contact-email' page showing 'What are Ronald Testman\'s contact details?'
        Then I select 'Continue'
        Then I should see the 'Enter the second person\'s email' error
        Then I should see the 'Enter the second person\'s phone number' error
        Then I fill 'second-contact-email' with 'test@test.com'
        Then I fill 'second-contact-phone' with '01234567891'
        Then I select 'Continue'
        Then I should be on the 'location-address' page showing 'Which shooting ranges will the club use?'
        Then I select 'Continue'
        Then I should see the 'Enter details of your building and street' error
        Then I should see the 'Enter a town or city' error
        Then I should see the 'Enter your postcode or ZIP Code' error
        Then I fill 'location-building' with '4'
        Then I fill 'location-street' with 'Test road'
        Then I fill 'location-townOrCity' with 'London'
        Then I fill 'location-postcodeOrZIPCode' with 'TE5 7SS'
        Then I select 'Continue'
        Then I should be on the 'location-address-category' page showing 'Which categories of firearms will be used at this range?'
        Then I select 'Continue'
        Then I should see the 'Select the categories of firearms that will be used at this range' error
        Then I check 'location-address-category-full-bore-rifles'
        Then I select 'Continue'
        Then I should be on the 'location-add-another-address' page showing 'Will the club use another shooting range?'
        Then I select 'Continue'
        Then I should see the 'Select an option' error
        Then I check 'location-addresses-add-another-no'
        Then I select 'Continue'
        Then I should be on the 'storage-address' page showing 'At which of these addresses, if any, will the firearms be stored?'       
        Then I choose '4, Test road, London, TE57SS'
        Then I select 'Continue'
        Then I should be on the 'storage-add-another-address' page showing 'Is there another address where the guns will be stored?'
        Then I check 'all-storage-addresses-add-another-no'
        Then I select 'Continue'
        Then I should be on the 'invoice-contact-details' page showing 'Who should we contact about the invoice?'
        Then I select 'Continue'
        Then I should see the 'Enter a contact name' error
        Then I should see the 'Enter a contact email address' error
        Then I should see the 'Enter a contact phone number' error

    Scenario: I am on the Shooting-clubs journey but I don't fill in the address on the invoice-address-input page
        Given I start the 'shooting-clubs' application journey
        Then I should be on the 'privacy' page showing 'Privacy Notice'
        Then I select 'Continue'
        Then I should be on the 'activity' page showing 'What do you want to do?'
        Then I select 'Continue'
        Then I should see the 'Select an option' error
        Then I check 'activity-new'
        Then I select 'Continue'
        Then I should be on the 'new-club' page showing 'Is the club a new club?'
        Then I select 'Continue'
        Then I should see the 'Select an option' error
        Then I check 'new-club-yes'
        Then I select 'Continue'
        Then I should be on the 'club-name' page showing 'What is the club\'s name?'
        Then I select 'Continue'
        Then I should see the 'Enter the club name' error
        Then I fill 'club-name' with 'Test club'
        Then I select 'Continue'
        Then I should be on the 'club-address' page showing 'What is the club\'s address?'
        Then I select 'Continue'
        Then I should see the 'Enter details of your building and street' error
        Then I should see the 'Enter a town or city' error
        Then I should see the 'Enter your postcode or ZIP Code' error
        Then I fill 'club-building' with '1'
        Then I fill 'club-street' with 'Test road'
        Then I fill 'club-townOrCity' with 'London'
        Then I fill 'club-postcodeOrZIPCode' with 'TE5 7TE'
        Then I select 'Continue'
        Then I should be on the 'club-secretary-name' page showing 'What is the club secretary\'s name?'
        Then I select 'Continue'
        Then I should see the 'Enter the name of the club secretary' error
        Then I fill 'club-secretary-name' with 'Ronald Testman'
        Then I select 'Continue'
        Then I should be on the 'club-secretary-address' page showing 'What is Ronald Testman\'s contact address?'
        Then I select 'Continue'
        Then I should see the 'Enter details of your building and street' error
        Then I should see the 'Enter a town or city' error
        Then I should see the 'Enter your postcode or ZIP Code' error
        Then I fill 'club-secretary-building' with '2'
        Then I fill 'club-secretary-street' with 'Test road'
        Then I fill 'club-secretary-townOrCity' with 'London'
        Then I fill 'club-secretary-postcodeOrZIPCode' with 'TE5 7ER'
        Then I select 'Continue'
        Then I should be on the 'club-secretary-email' page showing 'What are Ronald Testman\'s contact details?'
        Then I select 'Continue'
        Then I should see the 'Enter the club secretary\'s email' error
        Then I should see the 'Enter the club secretary\'s phone number' error
        Then I fill 'club-secretary-email' with 'test@test.com'
        Then I fill 'club-secretary-phone' with '01234567891'
        Then I select 'Continue'
        Then I should be on the 'second-contact-name' page showing 'Who should we contact in Ronald Testman\'s absence?'
        Then I select 'Continue'
        Then I should see the 'Please enter the second person\'s name' error
        Then I fill 'second-contact-name' with 'Ronald Testman'
        Then I select 'Continue'
        Then I should be on the 'second-contact-address' page showing 'What is Ronald Testman\'s contact address?'
        Then I select 'Continue'
        Then I should see the 'Enter details of your building and street' error
        Then I should see the 'Enter a town or city' error
        Then I should see the 'Enter your postcode or ZIP Code' error
        Then I fill 'second-contact-building' with '3'
        Then I fill 'second-contact-street' with 'Test road'
        Then I fill 'second-contact-townOrCity' with 'London'
        Then I fill 'second-contact-postcodeOrZIPCode' with 'TE5 7SR'
        Then I select 'Continue'
        Then I should be on the 'second-contact-email' page showing 'What are Ronald Testman\'s contact details?'
        Then I select 'Continue'
        Then I should see the 'Enter the second person\'s email' error
        Then I should see the 'Enter the second person\'s phone number' error
        Then I fill 'second-contact-email' with 'test@test.com'
        Then I fill 'second-contact-phone' with '01234567891'
        Then I select 'Continue'
        Then I should be on the 'location-address' page showing 'Which shooting ranges will the club use?'
        Then I select 'Continue'
        Then I should see the 'Enter details of your building and street' error
        Then I should see the 'Enter a town or city' error
        Then I should see the 'Enter your postcode or ZIP Code' error
        Then I fill 'location-building' with '4'
        Then I fill 'location-street' with 'Test road'
        Then I fill 'location-townOrCity' with 'London'
        Then I fill 'location-postcodeOrZIPCode' with 'TE5 7SS'
        Then I select 'Continue'
        Then I should be on the 'location-address-category' page showing 'Which categories of firearms will be used at this range?'
        Then I select 'Continue'
        Then I should see the 'Select the categories of firearms that will be used at this range' error
        Then I check 'location-address-category-full-bore-rifles'
        Then I select 'Continue'
        Then I should be on the 'location-add-another-address' page showing 'Will the club use another shooting range?'
        Then I select 'Continue'
        Then I should see the 'Select an option' error
        Then I check 'location-addresses-add-another-no'
        Then I select 'Continue'
        Then I should be on the 'storage-address' page showing 'At which of these addresses, if any, will the firearms be stored?'       
        Then I choose '4, Test road, London, TE57SS'
        Then I select 'Continue'
        Then I should be on the 'storage-add-another-address' page showing 'Is there another address where the guns will be stored?'
        Then I check 'all-storage-addresses-add-another-no'
        Then I select 'Continue'
        Then I should be on the 'invoice-contact-details' page showing 'Who should we contact about the invoice?'
        Then I select 'Continue'
        Then I should see the 'Enter a contact name' error
        Then I should see the 'Enter a contact email address' error
        Then I should see the 'Enter a contact phone number' error
        Then I fill 'invoice-contact-name' with 'Bonnie Testman'
        Then I fill 'invoice-contact-email' with 'bonnie@testman.com'
        Then I fill 'invoice-contact-phone' with '01234567898'
        Then I select 'Continue'
        Then I should be on the 'invoice-address-input' page showing 'What is their invoice address?'
        Then I select 'Continue'
        Then I should see the 'Enter details of your building and street' error
        Then I should see the 'Enter a town or city' error
        Then I should see the 'Enter your postcode or ZIP Code' error
 
    Scenario: I am on the Shooting-clubs journey but I don't select an option on the purchase-order page
        Given I start the 'shooting-clubs' application journey
        Then I should be on the 'privacy' page showing 'Privacy Notice'
        Then I select 'Continue'
        Then I should be on the 'activity' page showing 'What do you want to do?'
        Then I select 'Continue'
        Then I should see the 'Select an option' error
        Then I check 'activity-new'
        Then I select 'Continue'
        Then I should be on the 'new-club' page showing 'Is the club a new club?'
        Then I select 'Continue'
        Then I should see the 'Select an option' error
        Then I check 'new-club-yes'
        Then I select 'Continue'
        Then I should be on the 'club-name' page showing 'What is the club\'s name?'
        Then I select 'Continue'
        Then I should see the 'Enter the club name' error
        Then I fill 'club-name' with 'Test club'
        Then I select 'Continue'
        Then I should be on the 'club-address' page showing 'What is the club\'s address?'
        Then I select 'Continue'
        Then I should see the 'Enter details of your building and street' error
        Then I should see the 'Enter a town or city' error
        Then I should see the 'Enter your postcode or ZIP Code' error
        Then I fill 'club-building' with '1'
        Then I fill 'club-street' with 'Test road'
        Then I fill 'club-townOrCity' with 'London'
        Then I fill 'club-postcodeOrZIPCode' with 'TE5 7TE'
        Then I select 'Continue'
        Then I should be on the 'club-secretary-name' page showing 'What is the club secretary\'s name?'
        Then I select 'Continue'
        Then I should see the 'Enter the name of the club secretary' error
        Then I fill 'club-secretary-name' with 'Ronald Testman'
        Then I select 'Continue'
        Then I should be on the 'club-secretary-address' page showing 'What is Ronald Testman\'s contact address?'
        Then I select 'Continue'
        Then I should see the 'Enter details of your building and street' error
        Then I should see the 'Enter a town or city' error
        Then I should see the 'Enter your postcode or ZIP Code' error
        Then I fill 'club-secretary-building' with '2'
        Then I fill 'club-secretary-street' with 'Test road'
        Then I fill 'club-secretary-townOrCity' with 'London'
        Then I fill 'club-secretary-postcodeOrZIPCode' with 'TE5 7ER'
        Then I select 'Continue'
        Then I should be on the 'club-secretary-email' page showing 'What are Ronald Testman\'s contact details?'
        Then I select 'Continue'
        Then I should see the 'Enter the club secretary\'s email' error
        Then I should see the 'Enter the club secretary\'s phone number' error
        Then I fill 'club-secretary-email' with 'test@test.com'
        Then I fill 'club-secretary-phone' with '01234567891'
        Then I select 'Continue'
        Then I should be on the 'second-contact-name' page showing 'Who should we contact in Ronald Testman\'s absence?'
        Then I select 'Continue'
        Then I should see the 'Please enter the second person\'s name' error
        Then I fill 'second-contact-name' with 'Ronald Testman'
        Then I select 'Continue'
        Then I should be on the 'second-contact-address' page showing 'What is Ronald Testman\'s contact address?'
        Then I select 'Continue'
        Then I should see the 'Enter details of your building and street' error
        Then I should see the 'Enter a town or city' error
        Then I should see the 'Enter your postcode or ZIP Code' error
        Then I fill 'second-contact-building' with '3'
        Then I fill 'second-contact-street' with 'Test road'
        Then I fill 'second-contact-townOrCity' with 'London'
        Then I fill 'second-contact-postcodeOrZIPCode' with 'TE5 7SR'
        Then I select 'Continue'
        Then I should be on the 'second-contact-email' page showing 'What are Ronald Testman\'s contact details?'
        Then I select 'Continue'
        Then I should see the 'Enter the second person\'s email' error
        Then I should see the 'Enter the second person\'s phone number' error
        Then I fill 'second-contact-email' with 'test@test.com'
        Then I fill 'second-contact-phone' with '01234567891'
        Then I select 'Continue'
        Then I should be on the 'location-address' page showing 'Which shooting ranges will the club use?'
        Then I select 'Continue'
        Then I should see the 'Enter details of your building and street' error
        Then I should see the 'Enter a town or city' error
        Then I should see the 'Enter your postcode or ZIP Code' error
        Then I fill 'location-building' with '4'
        Then I fill 'location-street' with 'Test road'
        Then I fill 'location-townOrCity' with 'London'
        Then I fill 'location-postcodeOrZIPCode' with 'TE5 7SS'
        Then I select 'Continue'
        Then I should be on the 'location-address-category' page showing 'Which categories of firearms will be used at this range?'
        Then I select 'Continue'
        Then I should see the 'Select the categories of firearms that will be used at this range' error
        Then I check 'location-address-category-full-bore-rifles'
        Then I select 'Continue'
        Then I should be on the 'location-add-another-address' page showing 'Will the club use another shooting range?'
        Then I select 'Continue'
        Then I should see the 'Select an option' error
        Then I check 'location-addresses-add-another-no'
        Then I select 'Continue'
        Then I should be on the 'storage-address' page showing 'At which of these addresses, if any, will the firearms be stored?'       
        Then I choose '4, Test road, London, TE57SS'
        Then I select 'Continue'
        Then I should be on the 'storage-add-another-address' page showing 'Is there another address where the guns will be stored?'
        Then I check 'all-storage-addresses-add-another-no'
        Then I select 'Continue'
        Then I should be on the 'invoice-contact-details' page showing 'Who should we contact about the invoice?'
        Then I select 'Continue'
        Then I should see the 'Enter a contact name' error
        Then I should see the 'Enter a contact email address' error
        Then I should see the 'Enter a contact phone number' error
        Then I fill 'invoice-contact-name' with 'Bonnie Testman'
        Then I fill 'invoice-contact-email' with 'bonnie@testman.com'
        Then I fill 'invoice-contact-phone' with '01234567898'
        Then I select 'Continue'
        Then I should be on the 'invoice-address-input' page showing 'What is their invoice address?'
        Then I select 'Continue'
        Then I should see the 'Enter details of your building and street' error
        Then I should see the 'Enter a town or city' error
        Then I should see the 'Enter your postcode or ZIP Code' error
        Then I fill 'invoice-building' with '5'
        Then I fill 'invoice-street' with 'Test road'
        Then I fill 'invoice-townOrCity' with 'London'
        Then I fill 'invoice-postcodeOrZIPCode' with 'TE5 7ST'
        Then I select 'Continue'
        Then I should be on the 'purchase-order' page showing 'Do you have a purchase order?'
        Then I select 'Continue'
        Then I should see the 'Select if you have a purchase order' error

    Scenario: I am on the Shooting-clubs journey on the purchase-order page but don't input a PO number when prompted
        Given I start the 'shooting-clubs' application journey
        Then I should be on the 'privacy' page showing 'Privacy Notice'
        Then I select 'Continue'
        Then I should be on the 'activity' page showing 'What do you want to do?'
        Then I select 'Continue'
        Then I should see the 'Select an option' error
        Then I check 'activity-new'
        Then I select 'Continue'
        Then I should be on the 'new-club' page showing 'Is the club a new club?'
        Then I select 'Continue'
        Then I should see the 'Select an option' error
        Then I check 'new-club-yes'
        Then I select 'Continue'
        Then I should be on the 'club-name' page showing 'What is the club\'s name?'
        Then I select 'Continue'
        Then I should see the 'Enter the club name' error
        Then I fill 'club-name' with 'Test club'
        Then I select 'Continue'
        Then I should be on the 'club-address' page showing 'What is the club\'s address?'
        Then I select 'Continue'
        Then I should see the 'Enter details of your building and street' error
        Then I should see the 'Enter a town or city' error
        Then I should see the 'Enter your postcode or ZIP Code' error
        Then I fill 'club-building' with '1'
        Then I fill 'club-street' with 'Test road'
        Then I fill 'club-townOrCity' with 'London'
        Then I fill 'club-postcodeOrZIPCode' with 'TE5 7TE'
        Then I select 'Continue'
        Then I should be on the 'club-secretary-name' page showing 'What is the club secretary\'s name?'
        Then I select 'Continue'
        Then I should see the 'Enter the name of the club secretary' error
        Then I fill 'club-secretary-name' with 'Ronald Testman'
        Then I select 'Continue'
        Then I should be on the 'club-secretary-address' page showing 'What is Ronald Testman\'s contact address?'
        Then I select 'Continue'
        Then I should see the 'Enter details of your building and street' error
        Then I should see the 'Enter a town or city' error
        Then I should see the 'Enter your postcode or ZIP Code' error
        Then I fill 'club-secretary-building' with '2'
        Then I fill 'club-secretary-street' with 'Test road'
        Then I fill 'club-secretary-townOrCity' with 'London'
        Then I fill 'club-secretary-postcodeOrZIPCode' with 'TE5 7ER'
        Then I select 'Continue'
        Then I should be on the 'club-secretary-email' page showing 'What are Ronald Testman\'s contact details?'
        Then I select 'Continue'
        Then I should see the 'Enter the club secretary\'s email' error
        Then I should see the 'Enter the club secretary\'s phone number' error
        Then I fill 'club-secretary-email' with 'test@test.com'
        Then I fill 'club-secretary-phone' with '01234567891'
        Then I select 'Continue'
        Then I should be on the 'second-contact-name' page showing 'Who should we contact in Ronald Testman\'s absence?'
        Then I select 'Continue'
        Then I should see the 'Please enter the second person\'s name' error
        Then I fill 'second-contact-name' with 'Ronald Testman'
        Then I select 'Continue'
        Then I should be on the 'second-contact-address' page showing 'What is Ronald Testman\'s contact address?'
        Then I select 'Continue'
        Then I should see the 'Enter details of your building and street' error
        Then I should see the 'Enter a town or city' error
        Then I should see the 'Enter your postcode or ZIP Code' error
        Then I fill 'second-contact-building' with '3'
        Then I fill 'second-contact-street' with 'Test road'
        Then I fill 'second-contact-townOrCity' with 'London'
        Then I fill 'second-contact-postcodeOrZIPCode' with 'TE5 7SR'
        Then I select 'Continue'
        Then I should be on the 'second-contact-email' page showing 'What are Ronald Testman\'s contact details?'
        Then I select 'Continue'
        Then I should see the 'Enter the second person\'s email' error
        Then I should see the 'Enter the second person\'s phone number' error
        Then I fill 'second-contact-email' with 'test@test.com'
        Then I fill 'second-contact-phone' with '01234567891'
        Then I select 'Continue'
        Then I should be on the 'location-address' page showing 'Which shooting ranges will the club use?'
        Then I select 'Continue'
        Then I should see the 'Enter details of your building and street' error
        Then I should see the 'Enter a town or city' error
        Then I should see the 'Enter your postcode or ZIP Code' error
        Then I fill 'location-building' with '4'
        Then I fill 'location-street' with 'Test road'
        Then I fill 'location-townOrCity' with 'London'
        Then I fill 'location-postcodeOrZIPCode' with 'TE5 7SS'
        Then I select 'Continue'
        Then I should be on the 'location-address-category' page showing 'Which categories of firearms will be used at this range?'
        Then I select 'Continue'
        Then I should see the 'Select the categories of firearms that will be used at this range' error
        Then I check 'location-address-category-full-bore-rifles'
        Then I select 'Continue'
        Then I should be on the 'location-add-another-address' page showing 'Will the club use another shooting range?'
        Then I select 'Continue'
        Then I should see the 'Select an option' error
        Then I check 'location-addresses-add-another-no'
        Then I select 'Continue'
        Then I should be on the 'storage-address' page showing 'At which of these addresses, if any, will the firearms be stored?'       
        Then I choose '4, Test road, London, TE57SS'
        Then I select 'Continue'
        Then I should be on the 'storage-add-another-address' page showing 'Is there another address where the guns will be stored?'
        Then I check 'all-storage-addresses-add-another-no'
        Then I select 'Continue'
        Then I should be on the 'invoice-contact-details' page showing 'Who should we contact about the invoice?'
        Then I select 'Continue'
        Then I should see the 'Enter a contact name' error
        Then I should see the 'Enter a contact email address' error
        Then I should see the 'Enter a contact phone number' error
        Then I fill 'invoice-contact-name' with 'Bonnie Testman'
        Then I fill 'invoice-contact-email' with 'bonnie@testman.com'
        Then I fill 'invoice-contact-phone' with '01234567898'
        Then I select 'Continue'
        Then I should be on the 'invoice-address-input' page showing 'What is their invoice address?'
        Then I select 'Continue'
        Then I should see the 'Enter details of your building and street' error
        Then I should see the 'Enter a town or city' error
        Then I should see the 'Enter your postcode or ZIP Code' error
        Then I fill 'invoice-building' with '5'
        Then I fill 'invoice-street' with 'Test road'
        Then I fill 'invoice-townOrCity' with 'London'
        Then I fill 'invoice-postcodeOrZIPCode' with 'TE5 7ST'
        Then I select 'Continue'
        Then I should be on the 'purchase-order' page showing 'Do you have a purchase order?'
        Then I select 'Continue'
        Then I should see the 'Select if you have a purchase order' error
        Then I check 'purchase-order-Yes'
        Then I select 'Continue'
        Then I should see the 'Enter your purchase order number' error

    Scenario: I am on the Shooting-clubs journey and want to apply for a new authority for a new club
        Given I start the 'shooting-clubs' application journey
        Then I should be on the 'privacy' page showing 'Privacy Notice'
        Then I select 'Continue'
        Then I should be on the 'activity' page showing 'What do you want to do?'
        Then I check 'activity-new'
        Then I select 'Continue'
        Then I should be on the 'new-club' page showing 'Is the club a new club?'
        Then I check 'new-club-yes'
        Then I select 'Continue'
        Then I should be on the 'club-name' page showing 'What is the club\'s name?'
        Then I fill 'club-name' with 'Test club'
        Then I select 'Continue'
        Then I should be on the 'club-address' page showing 'What is the club\'s address?'
        Then I fill 'club-building' with '1'
        Then I fill 'club-street' with 'Test road'
        Then I fill 'club-townOrCity' with 'London'
        Then I fill 'club-postcodeOrZIPCode' with 'TE5 7TE'
        Then I select 'Continue'
        Then I should be on the 'club-secretary-name' page showing 'What is the club secretary\'s name?'
        Then I fill 'club-secretary-name' with 'Ronald Testman'
        Then I select 'Continue'
        Then I should be on the 'club-secretary-address' page showing 'What is Ronald Testman\'s contact address?'
        Then I fill 'club-secretary-building' with '2'
        Then I fill 'club-secretary-street' with 'Test road'
        Then I fill 'club-secretary-townOrCity' with 'London'
        Then I fill 'club-secretary-postcodeOrZIPCode' with 'TE5 7ER'
        Then I select 'Continue'
        Then I should be on the 'club-secretary-email' page showing 'What are Ronald Testman\'s contact details?'
        Then I fill 'club-secretary-email' with 'test@test.com'
        Then I fill 'club-secretary-phone' with '01234567891'
        Then I select 'Continue'
        Then I should be on the 'second-contact-name' page showing 'Who should we contact in Ronald Testman\'s absence?'
        Then I fill 'second-contact-name' with 'Ronald Testman'
        Then I select 'Continue'
        Then I should be on the 'second-contact-address' page showing 'What is Ronald Testman\'s contact address?'
        Then I fill 'second-contact-building' with '3'
        Then I fill 'second-contact-street' with 'Test road'
        Then I fill 'second-contact-townOrCity' with 'London'
        Then I fill 'second-contact-postcodeOrZIPCode' with 'TE5 7SR'
        Then I select 'Continue'
        Then I should be on the 'second-contact-email' page showing 'What are Ronald Testman\'s contact details?'
        Then I fill 'second-contact-email' with 'test@test.com'
        Then I fill 'second-contact-phone' with '01234567891'
        Then I select 'Continue'
        Then I should be on the 'location-address' page showing 'Which shooting ranges will the club use?'
        Then I fill 'location-building' with '4'
        Then I fill 'location-street' with 'Test road'
        Then I fill 'location-townOrCity' with 'London'
        Then I fill 'location-postcodeOrZIPCode' with 'TE5 7SS'
        Then I select 'Continue'
        Then I should be on the 'location-address-category' page showing 'Which categories of firearms will be used at this range?'
        Then I check 'location-address-category-full-bore-rifles'
        Then I select 'Continue'
        Then I should be on the 'location-add-another-address' page showing 'Will the club use another shooting range?'
        Then I check 'location-addresses-add-another-no'
        Then I select 'Continue'
        Then I should be on the 'storage-address' page showing 'At which of these addresses, if any, will the firearms be stored?'
        Then I choose '4, Test road, London, TE57SS'
        Then I select 'Continue'
        Then I should be on the 'storage-add-another-address' page showing 'Is there another address where the guns will be stored?'
        Then I check 'all-storage-addresses-add-another-no'
        Then I select 'Continue'
        Then I should be on the 'invoice-contact-details' page showing 'Who should we contact about the invoice?'
        Then I fill 'invoice-contact-name' with 'Bonnie Testman'
        Then I fill 'invoice-contact-email' with 'bonnie@testman.com'
        Then I fill 'invoice-contact-phone' with '01234567898'
        Then I select 'Continue'
        Then I should be on the 'invoice-address-input' page showing 'What is their invoice address?'
        Then I fill 'invoice-building' with '5'
        Then I fill 'invoice-street' with 'Test road'
        Then I fill 'invoice-townOrCity' with 'London'
        Then I fill 'invoice-postcodeOrZIPCode' with 'TE5 7ST'
        Then I select 'Continue'
        Then I should be on the 'purchase-order' page showing 'Do you have a purchase order?'
        Then I check 'purchase-order-No'
        Then I select 'Continue'
        Then I should be on the 'confirm' page showing 'Check your answers'
        Then I select 'Continue'

    Scenario: I am on the Shooting-clubs journey and want to amend an exixting authority
        Given I start the 'shooting-clubs' application journey
        Then I should be on the 'privacy' page showing 'Privacy Notice'
        Then I select 'Continue'
        Then I should be on the 'activity' page showing 'What do you want to do?'
        Then I check 'activity-new'
        Then I select 'Continue'
        Then I should be on the 'new-club' page showing 'Is the club a new club?'
        Then I check 'new-club-yes'
        Then I select 'Continue'
        Then I should be on the 'club-name' page showing 'What is the club\'s name?'
        Then I fill 'club-name' with 'test club'
        Then I select 'Continue'
        Then I should be on the 'club-address' page showing 'What is the club\'s address?'
        Then I fill 'club-building' with '1'
        Then I fill 'club-street' with 'Test road'
        Then I fill 'club-townOrCity' with 'London'
        Then I fill 'club-postcodeOrZIPCode' with 'TE5 7ER'
        Then I select 'Continue'
        Then I should be on the 'club-secretary-name' page showing 'What is the club secretary\'s name?'
        Then I fill 'club-secretary-name' with 'Ronald Testman'
        Then I select 'Continue'
        Then I should be on the 'club-secretary-address' page showing 'What is Ronald Testman\'s contact address?'
        Then I fill 'club-secretary-building' with '2'
        Then I fill 'club-secretary-street' with 'Test road'
        Then I fill 'club-secretary-townOrCity' with 'London'
        Then I fill 'club-secretary-postcodeOrZIPCode' with 'TE5 7RR'
        Then I select 'Continue'
        Then I should be on the 'club-secretary-email' page showing 'What are Ronald Testman\'s contact details?'
        Then I fill 'club-secretary-email' with 'ronald@test.com'
        Then I fill 'club-secretary-phone' with '01234567891'
        Then I select 'Continue'
        Then I should be on the 'second-contact-name' page showing 'Who should we contact in Ronald Testman\'s absence?'
        Then I fill 'second-contact-name' with 'Donald Testman'
        Then I select 'Continue'
        Then I should be on the 'second-contact-address' page showing 'What is Donald Testman\'s contact address?'
        Then I fill 'second-contact-building' with '3'
        Then I fill 'second-contact-street' with 'Test road'
        Then I fill 'second-contact-townOrCity' with 'London'
        Then I fill 'second-contact-postcodeOrZIPCode' with 'TE5 7SR'
        Then I select 'Continue'
        Then I should be on the 'second-contact-email' page showing 'What are Donald Testman\'s contact details?'
        Then I fill 'second-contact-email' with 'test@test.com'
        Then I fill 'second-contact-phone' with '01234567891'
        Then I select 'Continue'
        Then I should be on the 'location-address' page showing 'Which shooting ranges will the club use?'
        Then I fill 'location-building' with '4'
        Then I fill 'location-street' with 'Test road'
        Then I fill 'location-townOrCity' with 'London'
        Then I fill 'location-postcodeOrZIPCode' with 'TE5 7SS'
        Then I select 'Continue'
        Then I should be on the 'location-address-category' page showing 'Which categories of firearms will be used at this range?'
        Then I check 'location-address-category-full-bore-rifles'
        Then I select 'Continue'
        Then I should be on the 'location-add-another-address' page showing 'Will the club use another shooting range?'
        Then I check 'location-addresses-add-another-no'
        Then I select 'Continue'
        Then I should be on the 'storage-address' page showing 'At which of these addresses, if any, will the firearms be stored?'
        Then I choose '4, Test road, London, TE57SS'
        Then I select 'Continue'
        Then I should be on the 'storage-add-another-address' page showing 'Is there another address where the guns will be stored?'
        Then I check 'all-storage-addresses-add-another-no'
        Then I select 'Continue'
        Then I should be on the 'invoice-contact-details' page showing 'Who should we contact about the invoice?'
        Then I fill 'invoice-contact-name' with 'Bonnie Testman'
        Then I fill 'invoice-contact-email' with 'bonnie@testman.com'
        Then I fill 'invoice-contact-phone' with '01234567898'
        Then I select 'Continue'
        Then I should be on the 'invoice-address-input' page showing 'What is their invoice address?'
        Then I fill 'invoice-building' with '5'
        Then I fill 'invoice-street' with 'Test road'
        Then I fill 'invoice-townOrCity' with 'London'
        Then I fill 'invoice-postcodeOrZIPCode' with 'TE5 7ST'
        Then I select 'Continue'
        Then I should be on the 'purchase-order' page showing 'Do you have a purchase order?'
        Then I check 'purchase-order-No'
        Then I select 'Continue'
        Then I should be on the 'confirm' page showing 'Check your answers'
        Then I select 'Continue'