@feature @supporting-documents
Feature: Firearms uploading supporting documents
    
    Scenario: I am on the Supporting-documents journey and I upload a supporting document
        Given I start the 'supporting-documents' application journey
        Then I should be on the 'reference' page showing 'Enter the reference number for your application:'
        Then I fill 'reference-number' with '12345'
        Then I select 'Continue'
        Then I should be on the 'email' page showing 'Enter the email address used for your original application:'
        Then I fill 'email' with 'test@test.com'
        Then I select 'Continue'
        Then I should be on the 'supporting-documents' page showing 'Upload supporting documents'
        Then I upload the 'testPath/test.pdf' file to 'supporting-document-upload'
        Then I submit the form to upload my file
        Then I check 'supporting-document-add-another-no'
        Then I select 'Continue'
        Then I should be on the 'confirm' page showing 'Check your answers'
        Then I select 'Continue'
        Then I should be on the 'declaration' page showing 'Important information'
        Then I submit the application

    Scenario: I am on the Supporting-documents journey and enter an invalid reference
        Given I start the 'supporting-documents' application journey
        Then I should be on the 'reference' page showing 'Enter the reference number for your application:'
        Then I fill 'reference-number' with '12345'
        Then I select 'Continue'
        Then I should be on the 'email' page showing 'Enter the email address used for your original application:'
        Then I fill 'email' with 'test2@test.com'
        Then I select 'Continue'
        Then I should see the 'The email address provided does not match the reference number' error
        
    Scenario: I am on the Supporting-documents and I want to upload an additional document
        Given I start the 'supporting-documents' application journey
        Then I should be on the 'reference' page showing 'Enter the reference number for your application:'
        Then I fill 'reference-number' with '12345'
        Then I select 'Continue'
        Then I should be on the 'email' page showing 'Enter the email address used for your original application:'
        Then I fill 'email' with 'test@test.com'
        Then I select 'Continue' 
        Then I should be on the 'supporting-documents' page showing 'Upload supporting documents'
        Then I upload the 'testPath/test.pdf' file to 'supporting-document-upload'
        Then I submit the form to upload my file
        Then I check 'supporting-document-add-another-yes'
        Then I select 'Continue'
        Then I should be on the 'supporting-documents' page showing 'Upload supporting documents'
        Then I upload the 'testPath/test.pdf' file to 'supporting-document-upload'
        Then I submit the form to upload my file
        Then I check 'supporting-document-add-another-no'
        Then I select 'Continue'
        Then I should be on the 'confirm' page showing 'Check your answers'
        Then I select 'Continue'
        Then I should be on the 'declaration' page showing 'Important information'
        Then I submit the application
   
    Scenario: I am on the Supporting-documents journey but do not fill in a reference number
        Given I start the 'supporting-documents' application journey
        Then I should be on the 'reference' page showing 'Enter the reference number for your application:'
        Then I select 'Continue' 
        Then I should see the 'Enter your application reference number' error
    
    Scenario: I am on the Supporting-documents journey but do not fill in an email address
        Given I start the 'supporting-documents' application journey
        Then I should be on the 'reference' page showing 'Enter the reference number for your application:'
        Then I fill 'reference-number' with '12345'
        Then I select 'Continue'
        Then I should be on the 'email' page showing 'Enter the email address used for your original application:'
        Then I select 'Continue' 
        Then I should see the 'Enter the email address used for your original application' error

    Scenario: I am on the Supporting-documents but do not upload a supporting document
        Given I start the 'supporting-documents' application journey
        Then I should be on the 'reference' page showing 'Enter the reference number for your application:'
        Then I fill 'reference-number' with '12345'
        Then I select 'Continue'
        Then I should be on the 'email' page showing 'Enter the email address used for your original application:'
        Then I fill 'email' with 'test@test.com'
        Then I select 'Continue' 
        Then I should be on the 'supporting-documents' page showing 'Upload supporting documents'
        Then I select 'Upload file'
        Then I should see the 'There is a problem' error