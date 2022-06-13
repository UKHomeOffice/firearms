@feature @museums
Feature: Firearms application for a Museum

    Scenario: I am on the Museums journey and want to apply for a new authority, there is only one address for storage and I have no purchase order.
        Given I start the 'museums' application journey
        Then I should be on the 'privacy' page showing 'Privacy Notice'
        Then I select 'Continue'
        Then I should be on the 'activity' page showing 'What do you want to do?'
        Then I check 'activity-new'
        Then I select 'Continue'
        Then I should be on the 'name' page showing 'What is the museum\'s name?'
        Then I fill 'name' with 'test museum'
        Then I select 'Continue'
        Then I should be on the 'exhibit-address' page showing 'Where will the firearms be exhibited or stored?'
        Then I fill 'exhibit-building' with '1 Test Road'
        Then I fill 'exhibit-townOrCity' with 'London'
        Then I fill 'exhibit-postcodeOrZIPCode' with 'CR0 9YA'
        Then I select 'Continue'
        Then I should be on the 'exhibit-add-another-address' page showing 'Is there another address where the firearms will be exhibited or stored?'
        Then I check 'exhibit-addresses-add-another-no'
        Then I select 'Continue'
        Then I should be on the 'contact-name' page showing 'Who should we contact about this application?'
        Then I fill 'contact-name' with 'Ronald Testman'
        Then I select 'Continue'
        Then I should be on the 'contact-details' page showing 'What are their contact details?'
        Then I fill 'contact-email' with 'test@test.com'
        Then I fill 'contact-phone' with '01234567891'
        Then I select 'Continue'
        Then I should be on the 'contact-address' page showing 'Is the contact address the same as an address previously given?'
        Then I check 'same-contact-address-yes'
        Then I select 'Continue'
        Then I should be on the 'contact-address-select' page showing 'Select the contact address'
        Then I choose '1 Test Road, London, CR09YA'
        Then I select 'Continue'
        Then I should be on the 'invoice-contact-details' page showing 'Who should we contact about the invoice?'
        Then I fill 'invoice-contact-name' with 'Donald testman'
        Then I fill 'invoice-contact-email' with 'test@test.com'
        Then I fill 'invoice-contact-phone' with '01234567891'
        Then I select 'Continue'
        Then I should be on the 'invoice-address-input' page showing 'What is their invoice address?'
        Then I fill 'invoice-building' with '2 Test Road'
        Then I fill 'invoice-townOrCity' with 'London'
        Then I fill 'invoice-postcodeOrZIPCode' with 'CR0 9YB'
        Then I select 'Continue'
        Then I should be on the 'purchase-order' page showing 'Do you have a purchase order?'
        Then I check 'purchase-order-No'
        Then I select 'Continue'
        Then I should be on the 'confirm' page showing 'Check your answers'
        Then I submit the application
    
    Scenario: I am on the Museums journey and want to apply for a new authority, there are two address for storage and I have no purchase order.
       Given I start the 'museums' application journey
        Then I should be on the 'privacy' page showing 'Privacy Notice'
        Then I select 'Continue'
        Then I should be on the 'activity' page showing 'What do you want to do?'
        Then I check 'activity-new'
        Then I select 'Continue'
        Then I should be on the 'name' page showing 'What is the museum\'s name?'
        Then I fill 'name' with 'test museum'
        Then I select 'Continue'
        Then I should be on the 'exhibit-address' page showing 'Where will the firearms be exhibited or stored?'
        Then I fill 'exhibit-building' with '1 Test Road'
        Then I fill 'exhibit-townOrCity' with 'London'
        Then I fill 'exhibit-postcodeOrZIPCode' with 'CR0 9YA'
        Then I select 'Continue'
        Then I should be on the 'exhibit-add-another-address' page showing 'Is there another address where the firearms will be exhibited or stored?'
        Then I check 'exhibit-addresses-add-another-yes'
        Then I select 'Continue'
        Then I should be on the 'exhibit-address' page showing 'Where will the firearms be exhibited or stored?'
        Then I fill 'exhibit-building' with '2 Test Road'
        Then I fill 'exhibit-townOrCity' with 'London'
        Then I fill 'exhibit-postcodeOrZIPCode' with 'CR0 9YB'
        Then I select 'Continue'
        Then I should be on the 'exhibit-add-another-address' page showing 'Is there another address where the firearms will be exhibited or stored?'
        Then I check 'exhibit-addresses-add-another-no'
        Then I select 'Continue'
        Then I should be on the 'contact-name' page showing 'Who should we contact about this application?'
        Then I fill 'contact-name' with 'Ronald Testman'
        Then I select 'Continue'
        Then I should be on the 'contact-details' page showing 'What are their contact details?'
        Then I fill 'contact-email' with 'test@test.com'
        Then I fill 'contact-phone' with '01234567891'
        Then I select 'Continue'
        Then I should be on the 'contact-address' page showing 'Is the contact address the same as an address previously given?'
        Then I check 'same-contact-address-yes'
        Then I select 'Continue'
        Then I should be on the 'contact-address-select' page showing 'Select the contact address'
        Then I choose '1 Test Road, London, CR09YA'
        Then I select 'Continue'
        Then I should be on the 'invoice-contact-details' page showing 'Who should we contact about the invoice?'
        Then I fill 'invoice-contact-name' with 'Donald testman'
        Then I fill 'invoice-contact-email' with 'test@test.com'
        Then I fill 'invoice-contact-phone' with '01234567891'
        Then I select 'Continue'
        Then I should be on the 'invoice-address-input' page showing 'What is their invoice address?'
        Then I fill 'invoice-building' with '2 Test Road'
        Then I fill 'invoice-townOrCity' with 'London'
        Then I fill 'invoice-postcodeOrZIPCode' with 'CR0 9YB'
        Then I select 'Continue'
        Then I should be on the 'purchase-order' page showing 'Do you have a purchase order?'
        Then I check 'purchase-order-No'
        Then I select 'Continue'
        Then I should be on the 'confirm' page showing 'Check your answers'
        Then I submit the application

    Scenario: I am on the Museums journey and want to apply for a new authority, there is only one address for storage but do have a purchase order.
        Given I start the 'museums' application journey
        Then I should be on the 'privacy' page showing 'Privacy Notice'
        Then I select 'Continue'
        Then I should be on the 'activity' page showing 'What do you want to do?'
        Then I check 'activity-new'
        Then I select 'Continue'
        Then I should be on the 'name' page showing 'What is the museum\'s name?'
        Then I fill 'name' with 'test museum'
        Then I select 'Continue'
        Then I should be on the 'exhibit-address' page showing 'Where will the firearms be exhibited or stored?'
        Then I fill 'exhibit-building' with '1 Test Road'
        Then I fill 'exhibit-townOrCity' with 'London'
        Then I fill 'exhibit-postcodeOrZIPCode' with 'CR0 9YA'
        Then I select 'Continue'
        Then I should be on the 'exhibit-add-another-address' page showing 'Is there another address where the firearms will be exhibited or stored?'
        Then I check 'exhibit-addresses-add-another-no'
        Then I select 'Continue'
        Then I should be on the 'contact-name' page showing 'Who should we contact about this application?'
        Then I fill 'contact-name' with 'Ronald Testman'
        Then I select 'Continue'
        Then I should be on the 'contact-details' page showing 'What are their contact details?'
        Then I fill 'contact-email' with 'test@test.com'
        Then I fill 'contact-phone' with '01234567891'
        Then I select 'Continue'
        Then I should be on the 'contact-address' page showing 'Is the contact address the same as an address previously given?'
        Then I check 'same-contact-address-yes'
        Then I select 'Continue'
        Then I should be on the 'contact-address-select' page showing 'Select the contact address'
        Then I choose '1 Test Road, London, CR09YA'
        Then I select 'Continue'
        Then I should be on the 'invoice-contact-details' page showing 'Who should we contact about the invoice?'
        Then I fill 'invoice-contact-name' with 'Donald testman'
        Then I fill 'invoice-contact-email' with 'test@test.com'
        Then I fill 'invoice-contact-phone' with '01234567891'
        Then I select 'Continue'
        Then I should be on the 'invoice-address-input' page showing 'What is their invoice address?'
        Then I fill 'invoice-building' with '2 Test Road'
        Then I fill 'invoice-townOrCity' with 'London'
        Then I fill 'invoice-postcodeOrZIPCode' with 'CR0 9YB'
        Then I select 'Continue'
        Then I should be on the 'purchase-order' page showing 'Do you have a purchase order?'
        Then I check 'purchase-order-Yes'
        Then I fill 'purchase-order-number' with 'PO123'
        Then I select 'Continue'
        Then I should be on the 'confirm' page showing 'Check your answers'
        Then I submit the application
    
    Scenario: I am on the Museums journey and want to renew an existing authority
        Given I start the 'museums' application journey
        Then I should be on the 'privacy' page showing 'Privacy Notice'
        Then I select 'Continue'
        Then I should be on the 'activity' page showing 'What do you want to do?'
        Then I check 'activity-renew'
        Then I select 'Continue'
        Then I should be on the 'existing-authority' page showing 'Upload existing authority documents'
        Then I upload the 'testPath/test.pdf' file to 'existing-authority-upload'
        Then I submit the form to upload my file
        Then I should be on the 'existing-authority-add-another' page showing 'Do you want to upload any additional existing authority documents to support your application?'
        Then I check 'existing-authority-add-another-no'
        Then I select 'Continue'
        Then I should be on the 'name' page showing 'What is the museum\'s name?'
        Then I fill 'name' with 'test museum'
        Then I select 'Continue'
        Then I should be on the 'exhibit-address' page showing 'Where will the firearms be exhibited or stored?'
        Then I fill 'exhibit-building' with '1 Test Road'
        Then I fill 'exhibit-townOrCity' with 'London'
        Then I fill 'exhibit-postcodeOrZIPCode' with 'CR0 9YA'
        Then I select 'Continue'
        Then I should be on the 'exhibit-add-another-address' page showing 'Is there another address where the firearms will be exhibited or stored?'
        Then I check 'exhibit-addresses-add-another-no'
        Then I select 'Continue'
        Then I should be on the 'contact-name' page showing 'Who should we contact about this application?'
        Then I fill 'contact-name' with 'Ronald Testman'
        Then I select 'Continue'
        Then I should be on the 'contact-details' page showing 'What are their contact details?'
        Then I fill 'contact-email' with 'test@test.com'
        Then I fill 'contact-phone' with '01234567891'
        Then I select 'Continue'
        Then I should be on the 'contact-address' page showing 'Is the contact address the same as an address previously given?'
        Then I check 'same-contact-address-yes'
        Then I select 'Continue'
        Then I choose '1 Test Road, London, CR09YA'
        Then I select 'Continue'
        Then I should be on the 'invoice-contact-details' page showing 'Who should we contact about the invoice?'
        Then I fill 'invoice-contact-name' with 'Ronald testman'
        Then I fill 'invoice-contact-email' with 'test@test.com'
        Then I fill 'invoice-contact-phone' with '01234567891'
        Then I select 'Continue'
        Then I should be on the 'invoice-address-input' page showing 'What is their invoice address?'
        Then I fill 'invoice-building' with '2 Test Road'
        Then I fill 'invoice-townOrCity' with 'London'
        Then I fill 'invoice-postcodeOrZIPCode' with 'CR0 9YA'
        Then I select 'Continue'
        Then I should be on the 'purchase-order' page showing 'Do you have a purchase order?'
        Then I check 'purchase-order-No'
        Then I select 'Continue'
        Then I should be on the 'confirm' page showing 'Check your answers'
        Then I submit the application

    Scenario: I am on the Museums journey and want to amend an existing authority
        Given I start the 'museums' application journey
        Then I should be on the 'privacy' page showing 'Privacy Notice'
        Then I select 'Continue'
        Then I should be on the 'activity' page showing 'What do you want to do?'
        Then I check 'activity-vary'
        Then I select 'Continue'
        Then I should be on the 'existing-authority' page showing 'Upload existing authority documents'
        Then I upload the 'testPath/test.pdf' file to 'existing-authority-upload'
        Then I submit the form to upload my file
        Then I should be on the 'existing-authority-add-another' page showing 'Do you want to upload any additional existing authority documents to support your application?'
        Then I check 'existing-authority-add-another-no'
        Then I select 'Continue'
        Then I should be on the 'name' page showing 'What is the museum\'s name?'
        Then I fill 'name' with 'test museum'
        Then I select 'Continue'
        Then I should be on the 'exhibit-address' page showing 'Where will the firearms be exhibited or stored?'
        Then I fill 'exhibit-building' with '1 Test Road'
        Then I fill 'exhibit-townOrCity' with 'London'
        Then I fill 'exhibit-postcodeOrZIPCode' with 'CR0 9YA'
        Then I select 'Continue'
        Then I should be on the 'exhibit-add-another-address' page showing 'Is there another address where the firearms will be exhibited or stored?'
        Then I check 'exhibit-addresses-add-another-no'
        Then I select 'Continue'
        Then I should be on the 'contact-name' page showing 'Who should we contact about this application?'
        Then I fill 'contact-name' with 'Ronald Testman'
        Then I select 'Continue'
        Then I should be on the 'contact-details' page showing 'What are their contact details?'
        Then I fill 'contact-email' with 'test@test.com'
        Then I fill 'contact-phone' with '01234567891'
        Then I select 'Continue'
        Then I should be on the 'contact-address' page showing 'Is the contact address the same as an address previously given?'
        Then I check 'same-contact-address-yes'
        Then I select 'Continue'
        Then I choose '1 Test Road, London, CR09YA'
        Then I select 'Continue'
        Then I should be on the 'invoice-contact-details' page showing 'Who should we contact about the invoice?'
        Then I fill 'invoice-contact-name' with 'Ronald testman'
        Then I fill 'invoice-contact-email' with 'test@test.com'
        Then I fill 'invoice-contact-phone' with '01234567891'
        Then I select 'Continue'
        Then I should be on the 'invoice-address-input' page showing 'What is their invoice address?'
        Then I fill 'invoice-building' with '2 Test Road'
        Then I fill 'invoice-townOrCity' with 'London'
        Then I fill 'invoice-postcodeOrZIPCode' with 'CR0 9YA'
        Then I select 'Continue'
        Then I should be on the 'purchase-order' page showing 'Do you have a purchase order?'
        Then I check 'purchase-order-No'
        Then I select 'Continue'
        Then I should be on the 'confirm' page showing 'Check your answers'
        Then I submit the application
    
    Scenario: I am on the Museums journey and don't select an option on the activity page
        Given I start the 'museums' application journey
        Then I should be on the 'privacy' page showing 'Privacy Notice'
        Then I select 'Continue'
        Then I should be on the 'activity' page showing 'What do you want to do?'
        Then I select 'Continue'
        Then I should see the 'Select an option' error

    Scenario: I am on the Museums journey and don't fill in the name of the museum on the name page
        Given I start the 'museums' application journey
        Then I should be on the 'privacy' page showing 'Privacy Notice'
        Then I select 'Continue'
        Then I should be on the 'activity' page showing 'What do you want to do?'
        Then I check 'activity-new'
        Then I select 'Continue'
        Then I should be on the 'name' page showing 'What is the museum\'s name?'
        Then I select 'Continue'
        Then I should see the 'Enter the museum name' error

    Scenario: I am on the Museums journey and don't fill in the museums address on the exhibit-address page
        Given I start the 'museums' application journey
        Then I should be on the 'privacy' page showing 'Privacy Notice'
        Then I select 'Continue'
        Then I should be on the 'activity' page showing 'What do you want to do?'
        Then I check 'activity-new'
        Then I select 'Continue'
        Then I should be on the 'name' page showing 'What is the museum\'s name?'
        Then I fill 'name' with 'test museum'
        Then I select 'Continue'
        Then I should be on the 'exhibit-address' page showing 'Where will the firearms be exhibited or stored?'
        Then I select 'Continue'
        Then I should see the 'Enter details of your building and street' error
        Then I should see the 'Enter a town or city' error
        Then I should see the 'Enter your postcode or ZIP Code' error

    Scenario: I am on the Museums journey and don't select an option on the exhibit-add-another-address page
        Given I start the 'museums' application journey
        Then I should be on the 'privacy' page showing 'Privacy Notice'
        Then I select 'Continue'
        Then I should be on the 'activity' page showing 'What do you want to do?'
        Then I check 'activity-new'
        Then I select 'Continue'
        Then I should be on the 'name' page showing 'What is the museum\'s name?'
        Then I fill 'name' with 'test museum'
        Then I select 'Continue'
        Then I should be on the 'exhibit-address' page showing 'Where will the firearms be exhibited or stored?'
        Then I fill 'exhibit-building' with '1 Test Road'
        Then I fill 'exhibit-townOrCity' with 'London'
        Then I fill 'exhibit-postcodeOrZIPCode' with 'CR0 9YA'
        Then I select 'Continue'
        Then I should be on the 'exhibit-add-another-address' page showing 'Is there another address where the firearms will be exhibited or stored?'
        Then I select 'Continue'
        Then I should see the 'Select an option' error

    Scenario: I am on the Museums journey and don't fill in a contact name on the contact-name page
        Given I start the 'museums' application journey
        Then I should be on the 'privacy' page showing 'Privacy Notice'
        Then I select 'Continue'
        Then I should be on the 'activity' page showing 'What do you want to do?'
        Then I check 'activity-new'
        Then I select 'Continue'
        Then I should be on the 'name' page showing 'What is the museum\'s name?'
        Then I fill 'name' with 'test museum'
        Then I select 'Continue'
        Then I should be on the 'exhibit-address' page showing 'Where will the firearms be exhibited or stored?'
        Then I fill 'exhibit-building' with '1 Test Road'
        Then I fill 'exhibit-townOrCity' with 'London'
        Then I fill 'exhibit-postcodeOrZIPCode' with 'CR0 9YA'
        Then I select 'Continue'
        Then I should be on the 'exhibit-add-another-address' page showing 'Is there another address where the firearms will be exhibited or stored?'
        Then I check 'exhibit-addresses-add-another-no'
        Then I select 'Continue'
        Then I should be on the 'contact-name' page showing 'Who should we contact about this application?'
        Then I select 'Continue'
        Then I should see the 'Enter a contact name' error

    Scenario: I am on the Museums journey and don't fill in contact details on the contact-details page
        Given I start the 'museums' application journey
        Then I should be on the 'privacy' page showing 'Privacy Notice'
        Then I select 'Continue'
        Then I should be on the 'activity' page showing 'What do you want to do?'
        Then I check 'activity-new'
        Then I select 'Continue'
        Then I should be on the 'name' page showing 'What is the museum\'s name?'
        Then I fill 'name' with 'test museum'
        Then I select 'Continue'
        Then I should be on the 'exhibit-address' page showing 'Where will the firearms be exhibited or stored?'
        Then I fill 'exhibit-building' with '1 Test Road'
        Then I fill 'exhibit-townOrCity' with 'London'
        Then I fill 'exhibit-postcodeOrZIPCode' with 'CR0 9YA'
        Then I select 'Continue'
        Then I should be on the 'exhibit-add-another-address' page showing 'Is there another address where the firearms will be exhibited or stored?'
        Then I check 'exhibit-addresses-add-another-no'
        Then I select 'Continue'
        Then I should be on the 'contact-name' page showing 'Who should we contact about this application?'
        Then I fill 'contact-name' with 'Ronald Testman'
        Then I select 'Continue'
        Then I should be on the 'contact-details' page showing 'What are their contact details?'
        Then I select 'Continue'
        Then I should see the 'Enter a contact email address' error

    Scenario: I am on the Museums journey and don't select an option on the contact-address page
        Given I start the 'museums' application journey
        Then I should be on the 'privacy' page showing 'Privacy Notice'
        Then I select 'Continue'
        Then I should be on the 'activity' page showing 'What do you want to do?'
        Then I check 'activity-new'
        Then I select 'Continue'
        Then I should be on the 'name' page showing 'What is the museum\'s name?'
        Then I fill 'name' with 'test museum'
        Then I select 'Continue'
        Then I should be on the 'exhibit-address' page showing 'Where will the firearms be exhibited or stored?'
        Then I fill 'exhibit-building' with '1 Test Road'
        Then I fill 'exhibit-townOrCity' with 'London'
        Then I fill 'exhibit-postcodeOrZIPCode' with 'CR0 9YA'
        Then I select 'Continue'
        Then I should be on the 'exhibit-add-another-address' page showing 'Is there another address where the firearms will be exhibited or stored?'
        Then I check 'exhibit-addresses-add-another-no'
        Then I select 'Continue'
        Then I should be on the 'contact-name' page showing 'Who should we contact about this application?'
        Then I fill 'contact-name' with 'Ronald Testman'
        Then I select 'Continue'
        Then I should be on the 'contact-details' page showing 'What are their contact details?'
        Then I fill 'contact-email' with 'test@test.com'
        Then I fill 'contact-phone' with '01234567891'
        Then I select 'Continue'
        Then I should be on the 'contact-address' page showing 'Is the contact address the same as an address previously given?'
        Then I select 'Continue'
        Then I should see the 'Select an option' error

    Scenario: I am on the Museums journey and don't select an option on the contact-address page
        Given I start the 'museums' application journey
        Then I should be on the 'privacy' page showing 'Privacy Notice'
        Then I select 'Continue'
        Then I should be on the 'activity' page showing 'What do you want to do?'
        Then I check 'activity-new'
        Then I select 'Continue'
        Then I should be on the 'name' page showing 'What is the museum\'s name?'
        Then I fill 'name' with 'test museum'
        Then I select 'Continue'
        Then I should be on the 'exhibit-address' page showing 'Where will the firearms be exhibited or stored?'
        Then I fill 'exhibit-building' with '1 Test Road'
        Then I fill 'exhibit-townOrCity' with 'London'
        Then I fill 'exhibit-postcodeOrZIPCode' with 'CR0 9YA'
        Then I select 'Continue'
        Then I should be on the 'exhibit-add-another-address' page showing 'Is there another address where the firearms will be exhibited or stored?'
        Then I check 'exhibit-addresses-add-another-no'
        Then I select 'Continue'
        Then I should be on the 'contact-name' page showing 'Who should we contact about this application?'
        Then I fill 'contact-name' with 'Ronald Testman'
        Then I select 'Continue'
        Then I should be on the 'contact-details' page showing 'What are their contact details?'
        Then I fill 'contact-email' with 'test@test.com'
        Then I fill 'contact-phone' with '01234567891'
        Then I select 'Continue'
        Then I should be on the 'contact-address' page showing 'Is the contact address the same as an address previously given?'
        Then I check 'same-contact-address-yes'
        Then I select 'Continue'
        Then I should be on the 'contact-address-select' page showing 'Select the contact address'
        Then I select 'Continue'
        Then I should see the 'Select an address' error

    Scenario: I am on the Museums journey and don't fill contact name, email and phone number on the invoice-contact-details page
        Given I start the 'museums' application journey
        Then I should be on the 'privacy' page showing 'Privacy Notice'
        Then I select 'Continue'
        Then I should be on the 'activity' page showing 'What do you want to do?'
        Then I check 'activity-new'
        Then I select 'Continue'
        Then I should be on the 'name' page showing 'What is the museum\'s name?'
        Then I fill 'name' with 'test museum'
        Then I select 'Continue'
        Then I should be on the 'exhibit-address' page showing 'Where will the firearms be exhibited or stored?'
        Then I fill 'exhibit-building' with '1 Test Road'
        Then I fill 'exhibit-townOrCity' with 'London'
        Then I fill 'exhibit-postcodeOrZIPCode' with 'CR0 9YA'
        Then I select 'Continue'
        Then I should be on the 'exhibit-add-another-address' page showing 'Is there another address where the firearms will be exhibited or stored?'
        Then I check 'exhibit-addresses-add-another-no'
        Then I select 'Continue'
        Then I should be on the 'contact-name' page showing 'Who should we contact about this application?'
        Then I fill 'contact-name' with 'Ronald Testman'
        Then I select 'Continue'
        Then I should be on the 'contact-details' page showing 'What are their contact details?'
        Then I fill 'contact-email' with 'test@test.com'
        Then I fill 'contact-phone' with '01234567891'
        Then I select 'Continue'
        Then I should be on the 'contact-address' page showing 'Is the contact address the same as an address previously given?'
        Then I check 'same-contact-address-yes'
        Then I select 'Continue'
        Then I should be on the 'contact-address-select' page showing 'Select the contact address'
        Then I choose '1 Test Road, London, CR09YA'
        Then I select 'Continue'
        Then I should be on the 'invoice-contact-details' page showing 'Who should we contact about the invoice?'
        Then I select 'Continue'
        Then I should see the 'Enter a contact name' error
        Then I should see the 'Enter a contact email address' error
    
    Scenario: I am on the Museums journey and don't fill in the address on the invoice-address-input page
        Given I start the 'museums' application journey
        Then I should be on the 'privacy' page showing 'Privacy Notice'
        Then I select 'Continue'
        Then I should be on the 'activity' page showing 'What do you want to do?'
        Then I check 'activity-new'
        Then I select 'Continue'
        Then I should be on the 'name' page showing 'What is the museum\'s name?'
        Then I fill 'name' with 'test museum'
        Then I select 'Continue'
        Then I should be on the 'exhibit-address' page showing 'Where will the firearms be exhibited or stored?'
        Then I fill 'exhibit-building' with '1 Test Road'
        Then I fill 'exhibit-townOrCity' with 'London'
        Then I fill 'exhibit-postcodeOrZIPCode' with 'CR0 9YA'
        Then I select 'Continue'
        Then I should be on the 'exhibit-add-another-address' page showing 'Is there another address where the firearms will be exhibited or stored?'
        Then I check 'exhibit-addresses-add-another-no'
        Then I select 'Continue'
        Then I should be on the 'contact-name' page showing 'Who should we contact about this application?'
        Then I fill 'contact-name' with 'Ronald Testman'
        Then I select 'Continue'
        Then I should be on the 'contact-details' page showing 'What are their contact details?'
        Then I fill 'contact-email' with 'test@test.com'
        Then I fill 'contact-phone' with '01234567891'
        Then I select 'Continue'
        Then I should be on the 'contact-address' page showing 'Is the contact address the same as an address previously given?'
        Then I check 'same-contact-address-yes'
        Then I select 'Continue'
        Then I should be on the 'contact-address-select' page showing 'Select the contact address'
        Then I choose '1 Test Road, London, CR09YA'
        Then I select 'Continue'
        Then I should be on the 'invoice-contact-details' page showing 'Who should we contact about the invoice?'
        Then I fill 'invoice-contact-name' with 'Donald testman'
        Then I fill 'invoice-contact-email' with 'test@test.com'
        Then I fill 'invoice-contact-phone' with '01234567891'
        Then I select 'Continue'
        Then I should be on the 'invoice-address-input' page showing 'What is their invoice address?'
        Then I select 'Continue'
        Then I should see the 'Enter details of your building and street' error
        Then I should see the 'Enter a town or city' error
        Then I should see the 'Enter your postcode or ZIP Code' error

    Scenario: I am on the Museums journey and don't select an option on the purchase-order page
        Given I start the 'museums' application journey
        Then I should be on the 'privacy' page showing 'Privacy Notice'
        Then I select 'Continue'
        Then I should be on the 'activity' page showing 'What do you want to do?'
        Then I check 'activity-new'
        Then I select 'Continue'
        Then I should be on the 'name' page showing 'What is the museum\'s name?'
        Then I fill 'name' with 'test museum'
        Then I select 'Continue'
        Then I should be on the 'exhibit-address' page showing 'Where will the firearms be exhibited or stored?'
        Then I fill 'exhibit-building' with '1 Test Road'
        Then I fill 'exhibit-townOrCity' with 'London'
        Then I fill 'exhibit-postcodeOrZIPCode' with 'CR0 9YA'
        Then I select 'Continue'
        Then I should be on the 'exhibit-add-another-address' page showing 'Is there another address where the firearms will be exhibited or stored?'
        Then I check 'exhibit-addresses-add-another-no'
        Then I select 'Continue'
        Then I should be on the 'contact-name' page showing 'Who should we contact about this application?'
        Then I fill 'contact-name' with 'Ronald Testman'
        Then I select 'Continue'
        Then I should be on the 'contact-details' page showing 'What are their contact details?'
        Then I fill 'contact-email' with 'test@test.com'
        Then I fill 'contact-phone' with '01234567891'
        Then I select 'Continue'
        Then I should be on the 'contact-address' page showing 'Is the contact address the same as an address previously given?'
        Then I check 'same-contact-address-yes'
        Then I select 'Continue'
        Then I should be on the 'contact-address-select' page showing 'Select the contact address'
        Then I choose '1 Test Road, London, CR09YA'
        Then I select 'Continue'
        Then I should be on the 'invoice-contact-details' page showing 'Who should we contact about the invoice?'
        Then I fill 'invoice-contact-name' with 'Donald testman'
        Then I fill 'invoice-contact-email' with 'test@test.com'
        Then I fill 'invoice-contact-phone' with '01234567891'
        Then I select 'Continue'
        Then I should be on the 'invoice-address-input' page showing 'What is their invoice address?'
        Then I fill 'invoice-building' with '2 Test Road'
        Then I fill 'invoice-townOrCity' with 'London'
        Then I fill 'invoice-postcodeOrZIPCode' with 'CR0 9YB'
        Then I select 'Continue'
        Then I should be on the 'purchase-order' page showing 'Do you have a purchase order?'
        Then I select 'Continue'
        Then I should see the 'Select if you have a purchase order' error

    Scenario: I am on the Museums journey and but don't fill in my purchase order number on the purchase-order page
        Given I start the 'museums' application journey
        Then I should be on the 'privacy' page showing 'Privacy Notice'
        Then I select 'Continue'
        Then I should be on the 'activity' page showing 'What do you want to do?'
        Then I check 'activity-new'
        Then I select 'Continue'
        Then I should be on the 'name' page showing 'What is the museum\'s name?'
        Then I fill 'name' with 'test museum'
        Then I select 'Continue'
        Then I should be on the 'exhibit-address' page showing 'Where will the firearms be exhibited or stored?'
        Then I fill 'exhibit-building' with '1 Test Road'
        Then I fill 'exhibit-townOrCity' with 'London'
        Then I fill 'exhibit-postcodeOrZIPCode' with 'CR0 9YA'
        Then I select 'Continue'
        Then I should be on the 'exhibit-add-another-address' page showing 'Is there another address where the firearms will be exhibited or stored?'
        Then I check 'exhibit-addresses-add-another-no'
        Then I select 'Continue'
        Then I should be on the 'contact-name' page showing 'Who should we contact about this application?'
        Then I fill 'contact-name' with 'Ronald Testman'
        Then I select 'Continue'
        Then I should be on the 'contact-details' page showing 'What are their contact details?'
        Then I fill 'contact-email' with 'test@test.com'
        Then I fill 'contact-phone' with '01234567891'
        Then I select 'Continue'
        Then I should be on the 'contact-address' page showing 'Is the contact address the same as an address previously given?'
        Then I check 'same-contact-address-yes'
        Then I select 'Continue'
        Then I should be on the 'contact-address-select' page showing 'Select the contact address'
        Then I choose '1 Test Road, London, CR09YA'
        Then I select 'Continue'
        Then I should be on the 'invoice-contact-details' page showing 'Who should we contact about the invoice?'
        Then I fill 'invoice-contact-name' with 'Donald testman'
        Then I fill 'invoice-contact-email' with 'test@test.com'
        Then I fill 'invoice-contact-phone' with '01234567891'
        Then I select 'Continue'
        Then I should be on the 'invoice-address-input' page showing 'What is their invoice address?'
        Then I fill 'invoice-building' with '2 Test Road'
        Then I fill 'invoice-townOrCity' with 'London'
        Then I fill 'invoice-postcodeOrZIPCode' with 'CR0 9YB'
        Then I select 'Continue'
        Then I should be on the 'purchase-order' page showing 'Do you have a purchase order?'
        Then I check 'purchase-order-Yes'
        Then I select 'Continue'
        Then I should see the 'Enter your purchase order number' error
        