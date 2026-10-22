const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const ts = require('typescript');
const { generateMessages } = require('@cucumber/gherkin');
const { IdGenerator } = require('@cucumber/messages');
const { CucumberExpression, ParameterTypeRegistry } = require('@cucumber/cucumber-expressions');
const { parse } = require('csv-parse/sync');
const { getApplicant } = require('../test-data/far-data.ts');

const root = path.resolve(__dirname, '..');
const source = path.resolve(process.argv[2] || process.env.SOURCE_E2E_ROOT || '../HOF');
const javaRoot = path.join(source, 'Function/src/main/java/uk/gov/ho/domain/component');
const featureRoot = path.join(source, 'Function/src/main/resources/features/ui/far');
const registry = new ParameterTypeRegistry();
const stepLibGroups = [
  ['utility-helper/common-flows.ts', 'startApplication', 'answerWhatYouWantToDoAndUploadDocs answerUploadExistingDoc answerUploadAdditionalExistingDocs'],
  ['utility-helper/common-flows.ts', 'chooseJourney', 'answerChooseAJourney chooseFirearmsJourneyToStart'],
  ['utility-helper/common-flows.ts', 'supportingUploads', 'answerUploadSupportingDocForSecretaryOfState answerUploadAdditionalDocs uploadSupportAndAdditionalDocs answerUploadSupportingDocForApproval_ShootClubs answerUploadAdditionalDocs_ShootClub answerIsClubNewClub'],
  ['utility-helper/common-flows.ts', 'invoice', 'answerInvoiceContactAddressDetailsAndPurchaseOrder answerPurchaseOrder'],
  ['steps/section-five.step.ts', 'organisationFields', 'answerSelectAuthTypeOfOrgWhatToHandleAndHowtoObtainTheItems selectOrgType'],
  ['steps/section-five.step.ts', 'pages.handle.complete', 'answerWhatToHandleHowtoObtainTheItems selectWhatWillBeHandled'],
  ['steps/section-five.step.ts', 'pages.obtain.complete', 'selectHowProhibitedItemsWillBeObtained'],
  ['steps/section-five.step.ts', 'pages.imported.complete', 'answerProhibitedItemBeImported willProhibitedItemsBeImported'],
  ['steps/section-five.step.ts', 'pages.businessStorage.complete', 'answerWillItemBeStoredInBusPremises prohibitedItemsStoredInBusPremises'],
  ['steps/section-five.step.ts', 'pages.s5Storage.complete', 'answerWhereWillItemsBeStored'],
  ['steps/section-five.step.ts', 'pages.s5AnotherStorage.answer', 'answerAnotherAddressItemsWillBeStored'],
  ['steps/section-five.step.ts', 'pages.businessActivities.complete', 'answerBusActivitiesAndWeaponsComponents selectBusinessActivities'],
  ['steps/section-five.step.ts', 'pages.ammunition.complete', 'answerAmmunitionSections selectAmmunitionOrWeaponsSection'],
  ['steps/section-five.step.ts', 'pages.individuals.answer', 'selectHowManyIndividualToBeNamed'],
  ['steps/section-five.step.ts', 'pages.holderName.complete', 'answerFullNameOfTheAuthority enterFullNameOfAuthHolder'],
  ['steps/section-five.step.ts', 'birthAndNationality', 'answerBirthAndNationalDetails'],
  ['steps/section-five.step.ts', 'pages.secondHolderName.complete', 'answerFullNameOfTheSecondAuthority'],
  ['steps/section-five.step.ts', 'pages.firstHolderName.complete', 'answerFullNameOfTheFirstAuthority'],
  ['steps/section-five.step.ts', 'pages.whoToContact.complete', 'answerWhoToContactAbtThisApplication selectWhoToContact'],
  ['steps/section-five.step.ts', 'pages.s5ContactAddress.complete', 'answerSecondContactOrSomeOneElseAddress answerAddressToContact'],
  ['steps/section-five.step.ts', 'pages.summary.change', 'changeYourAnsForS5'],
  ['steps/section-five.step.ts', 'pages.summary.sectionValues', 'getUpdatedBusDetails'],
  ['steps/section-five.step.ts', 'pages.birth.complete', 'enterDateOfBirthDetails'],
  ['steps/section-five.step.ts', 'pages.nationality.completeNationality', 'enterCountryOfNationality'],
  ['steps/section-five.step.ts', 'pages.s5ContactAddressChoice.answer', 'selectAddressForContact'],
  ['pages/address-page.ts', 'complete', 'enterMainBusinessOrInvoiceAddress'],
  ['steps/museums.step.ts', 'pages.museumName.complete', 'answerWhatIsTheMuseumsName enterMuseumName'],
  ['steps/museums.step.ts', 'pages.museumStorage.complete', 'answerWhereToStoreFirearms'],
  ['steps/museums.step.ts', 'pages.museumAnotherStorage.answer', 'answerAnotherAddressToStoreFirearms selectNoForAnotherAddress'],
  ['steps/museums.step.ts', 'pages.museumContactName.complete', 'answerWhoToContactAndTheirContactDetails selectContactName'],
  ['steps/museums.step.ts', 'pages.museumSameContact.answer', 'answerIsContactAddressSameAsPrevious selectYesForAnotherAddress'],
  ['steps/museums.step.ts', 'pages.summary.change', 'changeYourAnsForMuseum'],
  ['steps/museums.step.ts', 'pages.summary.sectionValues', 'getUpdatedMuseumDetails'],
  ['steps/museums.step.ts', 'pages.museumSelectContact.complete', 'selectAddress'],
  ['steps/shooting-clubs.step.ts', 'pages.summary.change', 'changeYourAnsForShootClub'],
  ['steps/shooting-clubs.step.ts', 'pages.summary.sectionValues', 'getUpdatedSClubDetails'],
  ['steps/shooting-clubs.step.ts', 'pages.clubName.complete', 'answerEnterClubName enterClubName'],
  ['steps/shooting-clubs.step.ts', 'pages.secretaryName.complete', 'answerEnterClubAndSecAddressDetails enterClubSecName'],
  ['steps/shooting-clubs.step.ts', 'range(pages)', 'shootingRangesAndFirearmsCategoriesToUse'],
  ['steps/shooting-clubs.step.ts', 'pages.anotherRange.answer', 'answerClubUseAnotherShootingRange selectNoAnotherShootingRange'],
  ['steps/shooting-clubs.step.ts', 'pages.storageAddresses.complete', 'answerFirearmsStorageAddress'],
  ['steps/shooting-clubs.step.ts', 'pages.clubAnotherStorage.answer', 'answerAnotherAddressForGunStorage selectNoAnotherAddressForGunStorage'],
  ['steps/shooting-clubs.step.ts', 'pages.clubStorage.complete', 'answerWhereElseGunsBeStored'],
  ['steps/shooting-clubs.step.ts', 'pages.newClub.answer', 'selectNoForNewClub'],
  ['steps/shooting-clubs.step.ts', 'pages.secretaryContact.complete', 'enterClubEmail'],
  ['steps/shooting-clubs.step.ts', 'pages.secretaryAddress.complete', 'enterClubSecAddress'],
  ['steps/shooting-clubs.step.ts', 'pages.deputyName.complete', 'enterSecondPersonName'],
  ['steps/shooting-clubs.step.ts', 'pages.deputyAddress.complete', 'enterSecondPersonContactAddress'],
  ['steps/shooting-clubs.step.ts', 'pages.deputyContact.complete', 'enterSecondPersonEmail'],
  ['steps/shooting-clubs.step.ts', 'pages.rangeAddress.complete', 'enterShootingRangesAddress'],
  ['steps/shooting-clubs.step.ts', 'pages.rangeCategories.complete', 'selectFirearmsCategory'],
  ['steps/common.step.ts', 'pages.chooseJourney.open', 'openFireArmsHomePage acceptCookies'],
  ['utility-helper/expected-answers.ts', 'checkAnswers', 'checkYourAnswers'],
  ['steps/common.step.ts', 'pages.submission.applicationComplete', 'confirmSubmission'],
  ['pages/submission-page.ts', 'reference', 'getApplicationRefNumber'],
  ['steps/supporting-documents.step.ts', 'pages.submission.uploadComplete', 'confirmSubmissionSupportingDoc'],
  ['steps/supporting-documents.step.ts', 'pages.reference.complete', 'answerEnterRefNumber enterApplicationRefNo'],
  ['steps/supporting-documents.step.ts', 'pages.originalEmail.complete', 'answerEnterEmailUsedInOriginalApplication enterApplicationEmail'],
  ['steps/supporting-documents.step.ts', 'pages.additional.answer', 'uploadAdditionalSupportingDoc'],
  ['steps/supporting-documents.step.ts', 'pages.supportingUpload.complete', 'uploadSupportingDocs'],
  ['steps/supporting-documents.step.ts', 'pages.summary.sectionValues', 'getSupportingApplicationDetails'],
  ['steps/common.step.ts', '#error-summary-title', 'getErrorSummaryHeaderText'],
  ['steps/common.step.ts', 'assertErrors', 'getErrorMessageDetailText'],
  ['steps/common.step.ts', "getByRole('link'", 'getLinkByText'],
  ['steps/common.step.ts', 'pages.activity.answer', 'selectWhatToDo'],
  ['steps/common.step.ts', 'pages.s5Upload.clickUpload', 'selectUploadFileBtn'],
  ['steps/common.step.ts', 'pages.basePage.continue', 'selectContinueBtn'],
  ['steps/common.step.ts', 'pages.basePage.choose', 'uploadAdditionalDoc'],
  ['steps/common.step.ts', 'contactPage.complete', 'answerContactDetails enterContactEmailAddress'],
  ['steps/common.step.ts', 'pages.invoiceContact.complete', 'enterContactForInvoicing'],
  ['steps/common.step.ts', 'pages.s5Upload.uploadFile', 'uploadSupportingFile'],
];
const pageGroups = [
  ['pages/base-page.ts', 'FarBeforeYouStartPage FarPrivacyNoticePage FarWhatDoYouWantToDoPage FarMuseumContactAddressSameAsPreviousPage FarS5HowManyIndividualsToBeNamedPage FarS5WhichAddressToContactYouPage FarShootClubIsTheClubNewPage'],
  ['pages/added-items-page.ts', 'FarAnotherAddressForStorage FarDoYouWantToUploadAdditionalDocsPage FarUploadAdditionalExistingDocsPage FarMuseumAnotherAddressForStoragePage FarS5AnotherAddressForStoragePage FarShootClubUseAnotherShootingRangePage FarShootClubAnotherAddressGunStoragePage'],
  ['pages/address-page.ts', 'FarWhatIsTheirInvoiceAddressPage FarMuseumWhatIsTheirContactAddressPage FarMuseumWhereWillFirearmsBeStoredPage FarS5WhatIsHolderMainBusinessPage FarS5WhatIsSomeOneElseAddressPage FarS5WhereWillProhibitedItemsBeStoredPage FarShootClubSecContactAddressPage FarShootClubShootingRangesToUsePage FarShootClubWhatIsClubAddressPage FarShootClubWhereElseWillGunBeStoredPage'],
  ['pages/text-page.ts', 'FarMuseumTheMuseumNamePage FarMuseumWhoShouldWeContactAbtThisApplicationPage FarS5FullNameOfFirstAuthorityHolderPage FarS5FullNameOfSecondAuthorityHolderPage FarS5WhatsTheFullNameOfAuthorityHolderPage FarShootClubWhatIsTheClubSecNamePage FarShootClubWhatIsTheNamePage FarShootClubWhoToContactInAbsencePage FarSupportDocAppRefNumberPage FarSupportingDocEnterEmailInOriginalAppPage'],
  ['pages/contact-details-page.ts', 'FarContactDetails FarWhatAreContactDetailsPage FarMuseumWhatAreTheirContactDetailsPage FarShootClubSecContactDetailsPage'],
  ['pages/upload-page.ts', 'FarUploadDocs FarUploadExistingAuthDocsPage FarS5UploadSupportingDocsPage FarShootClubUploadSupportingDocsPage FarSDocUploadSupportingDocsPage'],
  ['pages/summary-page.ts', 'FarCheckYourAnswersPage FarMuseumCheckYourAnswersPage FarS5CheckYourAnswersPage FarShootClubCheckYourAnswersPage FarSupportingDocCheckAnswersPage'],
  ['pages/choose-journey-page.ts', 'FarChooseAJourneyHomePage'],
  ['pages/purchase-order-page.ts', 'FarDoYouHavePurchaseOrderPage'],
  ['pages/important-information-page.ts', 'FarImportantInformationPage'],
  ['pages/submission-page.ts', 'FarSubmissionNotificationsPage'],
  ['pages/invoice-contact-page.ts', 'FarWhoShouldWeContactAbtTheInvoicePage'],
  ['pages/select-contact-address-page.ts', 'FarMuseumSelectTheContactAddressPage'],
  ['pages/ammunition-sections-page.ts', 'FarS5AmmunitionSectionsPage'],
  ['pages/weapons-sections-page.ts', 'FarS5WeaponsAndComponentsSectionPage'],
  ['pages/obtain-page.ts', 'FarS5HowWillProhibitedItemsBeObtainedPage'],
  ['pages/business-storage-page.ts', 'FarS5ProhibitedItemsStoredOnBusinessPremisesPage'],
  ['pages/birth-details-page.ts', 'FarS5WhatAreBirthDayDetailsPage'],
  ['pages/business-activities-page.ts', 'FarS5WhatBusinessActivitiesToCarryOutPage'],
  ['pages/nationality-page.ts', 'FarS5WhatIsCountryOfNationalityPage'],
  ['pages/handle-page.ts', 'FarS5WhatToHandleUnderTheAuthPage'],
  ['pages/organisation-page.ts', 'FarS5WhatTypeOfOrgIsTheAuthForPage'],
  ['pages/who-to-contact-page.ts', 'FarS5WhoDoWeContactAbtThisApplicationPage'],
  ['pages/import-page.ts', 'FarS5WillProhibitedBeImportedPage'],
  ['pages/range-categories-page.ts', 'FarShootClubFirearmsCategoriesToUsePage'],
  ['pages/storage-addresses-page.ts', 'FarShootClubFirearmsStorageAddressesPage'],
];

function files(directory, extension) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? files(file, extension) : entry.name.endsWith(extension) ? [file] : [];
  }).sort();
}

function targetLocation(file, marker) {
  const text = fs.readFileSync(path.join(root, file), 'utf8');
  const offset = marker ? text.indexOf(marker) : 0;
  assert(offset >= 0, `Missing target implementation: ${file}: ${marker}`);
  return `e2e-tests/${file}#L${text.slice(0, offset).split('\n').length}`;
}

function publicMethods(text) {
  return [...text.matchAll(/public\s+(?:static\s+)?[\w<>, ?\[\].]+\s+(\w+)\s*\([^)]*\)\s*\{/g)].map(match => match[1]);
}

const sourceStepFiles = [
  'DataSetupStepDefinitions', 'CommonStepDefinitions', 'StepDefinitionFarCommon',
  'StepDefinitionFarMuseums', 'StepDefinitionFarS5', 'StepDefinitionFarSClubs',
];
const sourceDefinitions = sourceStepFiles.flatMap(className => {
  const text = fs.readFileSync(path.join(javaRoot, `ui/steps/${className}.java`), 'utf8');
  return [...text.matchAll(/((?:\s*@(?:Given|When|Then|And)\("(?:\\.|[^"\\])*"\))+)[\s\S]*?public\s+\w+\s+(\w+)\([^)]*\)/g)].flatMap(match => {
    return [...match[1].matchAll(/@\w+\("((?:\\.|[^"\\])*)"\)/g)].map(annotation => {
      const expression = JSON.parse(`"${annotation[1]}"`);
      return { source: `${className}.${match[2]}`, expression, matcher: new CucumberExpression(expression, registry) };
    });
  });
});
const targetDefinitions = [];
for (const file of files(path.join(root, 'steps'), '.step.ts')) {
  const ast = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true);
  function visit(node) {
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && ['Given', 'When', 'Then'].includes(node.expression.text) && ts.isStringLiteral(node.arguments[0])) {
      const expression = node.arguments[0].text;
      targetDefinitions.push({ file: path.relative(root, file).replaceAll('\\', '/'), expression, matcher: new CucumberExpression(expression, registry) });
    }
    ts.forEachChild(node, visit);
  }
  visit(ast);
}

const featureAudit = [];
const scenarioMapping = [];
const phraseMapping = new Map();
const manifest = [];
let exampleCount = 0;
for (const file of files(featureRoot, '.feature')) {
  const relative = path.relative(featureRoot, file).replaceAll('\\', '/');
  const original = fs.readFileSync(file);
  assert(original.equals(fs.readFileSync(path.join(root, 'features', relative))), `Feature drift: ${relative}`);
  const envelopes = generateMessages(original.toString('utf8'), relative, 'text/x.cucumber.gherkin+plain', { newId: IdGenerator.incrementing(), includeGherkinDocument: true, includePickles: true, includeSource: false });
  assert(!envelopes.some(envelope => envelope.parseError), `Invalid source Gherkin: ${relative}`);
  const feature = envelopes.find(envelope => envelope.gherkinDocument).gherkinDocument.feature;
  const pickles = envelopes.filter(envelope => envelope.pickle).map(envelope => envelope.pickle);
  const generatedFile = `.features-gen/e2e-tests/features/${relative}.spec.js`;
  const ast = ts.createSourceFile(generatedFile, fs.readFileSync(path.resolve(root, '..', generatedFile), 'utf8'), ts.ScriptTarget.Latest, true);
  const testLines = [];
  function visitTests(node) {
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === 'test') testLines.push(ast.getLineAndCharacterOfPosition(node.getStart(ast)).line + 1);
    ts.forEachChild(node, visitTests);
  }
  visitTests(ast);
  assert.equal(testLines.length, pickles.length, `Expanded case drift: ${relative}`);
  for (const child of feature.children.filter(item => item.scenario)) {
    const scenario = child.scenario;
    const examples = scenario.examples.flatMap(example => example.tableBody);
    exampleCount += examples.length;
    scenarioMapping.push({ file: relative, feature: feature.name, scenario: scenario.name, sourceLine: scenario.location.line, exampleRows: examples.length, target: `e2e-tests/features/${relative}`, status: 'MAPPED' });
  }
  for (const [index, pickle] of pickles.entries()) {
    const caseId = `case-${String(manifest.length + 1).padStart(3, '0')}`;
    const selector = `e2e-tests/features/${relative}.spec.js:${testLines[index]}`;
    const selection = pickle.steps.find(step => step.text.startsWith('I selected the data for scenario '));
    manifest.push({ id: caseId, scenario: pickle.name, dataSelection: selection?.text, feature: relative, selector, command: `yarn playwright test "${selector}" --project=chromium --workers=1 --retries=0`, result: 'NOT_RUN' });
    for (const step of pickle.steps) {
      const sourceMatches = sourceDefinitions.filter(definition => definition.matcher.match(step.text));
      const targetMatches = targetDefinitions.filter(definition => definition.matcher.match(step.text));
      assert.equal(sourceMatches.length, 1, `Ambiguous/missing source binding: ${step.text}`);
      assert.equal(targetMatches.length, 1, `Ambiguous/missing target binding: ${step.text}`);
      phraseMapping.set(step.text, { phrase: step.text, sourceMethod: sourceMatches[0].source, sourceExpression: sourceMatches[0].expression, target: targetMatches[0].file, targetExpression: targetMatches[0].expression });
    }
  }
  featureAudit.push({ file: relative, title: feature.name, sha256: crypto.createHash('sha256').update(original).digest('hex'), status: 'BYTE_IDENTICAL', expandedCases: pickles.length });
}
assert.equal(files(path.join(root, 'features'), '.feature').length, featureAudit.length, 'Extra target feature files');

const stepLibMapping = files(path.join(javaRoot, 'ui/stepLib'), 'StepLib.java').filter(file => /^Far/.test(path.basename(file))).flatMap(file => {
  return publicMethods(fs.readFileSync(file, 'utf8')).map(method => {
    const groups = stepLibGroups.filter(group => group[2].split(' ').includes(method));
    assert.equal(groups.length, 1, `Unmapped/duplicate StepLib method: ${method}`);
    return { source: `${path.basename(file, '.java')}.${method}`, target: targetLocation(groups[0][0], groups[0][1]) };
  });
});
const pageMapping = files(path.join(javaRoot, 'ui/pages/far'), '.java').map(file => {
  const className = path.basename(file, '.java');
  const groups = pageGroups.filter(group => group[1].split(' ').includes(className));
  assert.equal(groups.length, 1, `Unmapped/duplicate page object: ${className}`);
  return { source: className, methods: publicMethods(fs.readFileSync(file, 'utf8')), target: targetLocation(groups[0][0]), routeInstances: 'e2e-tests/fixture/fixtures.ts' };
});

const columns = {
  'Variation No.': 'id', 'What do you want to do?': 'activity',
  'Do you want to upload any additional existing authority documents to support your application?': 'additionalExisting',
  'Do you want to upload any additional documents to support your application?': 'additional',
  "What is the museum's name?": 'museumName',
  'Is there another address where the firearms will be exhibited or stored?': 'anotherStorage',
  'Who should we contact about this application?': 'museumContact',
  'Is the contact address the same as an address previously given?': 'sameContactAddress',
  'What type of organisation is the authority for?': 'organisation',
  'Will any of the prohibited items be imported?': 'imported',
  "Will the prohibited items be stored on the business's premises in the UK?": 'businessStorage',
  'Is there another address where the prohibited items will be stored?': 'anotherStorage',
  'Weapons or Components Sections': 'weapons', 'Ammunition Sections': 'ammunition',
  'How many individuals will be named on the authority?': 'individuals',
  "What's the full name of the first authority holder?": 'firstHolder',
  "What's the full name of the authority holder?": 'holder',
  "What's the full name of the second authority holder?": 'secondHolder',
  'Who do we contact about this application?': 'contact',
  'Which address should we use to contact test?': 'contactAddress',
  'Do you have a purchase order?': 'purchaseOrder',
  'Is the club a new club?': 'newClub',
  'Will the club use another shooting range?': 'anotherRange',
  'At which of these addresses, if any, will the firearms be stored?': 'storageAddress',
  'Is there another address where the guns will be stored?': 'anotherStorage',
};
let dataRows = 0;
for (const [product, filename] of [['FARMuseum', 'farMuseum-applicant.csv'], ['FARS5', 'farS5-applicant.csv'], ['FARShootingClub', 'farShootClub-applicant.csv']]) {
  const records = parse(fs.readFileSync(path.join(source, 'Function/src/main/resources/test-data/applicant-data', filename)), { bom: true, skip_empty_lines: true });
  const [headers, ...rows] = records;
  for (const row of rows) {
    const applicant = getApplicant(product, row[0]);
    for (const [index, header] of headers.entries()) {
      const key = header === 'Will the club use another shooting range?' ? (headers.indexOf(header) === index ? 'firstRangeAnswer' : 'secondRangeAnswer') : columns[header];
      assert(key, `Unmapped CSV column: ${header}`);
      assert.equal(applicant[key], row[index], `${product}/${row[0]}: ${header}`);
    }
    if (product === 'FARShootingClub') assert.equal(applicant.anotherRange, applicant.secondRangeAnswer);
    dataRows++;
  }
}
for (const name of ['VPN_Guide_7.36MB.pdf', 'largeText.txt']) {
  assert(fs.readFileSync(path.join(source, 'Function/src/main/resources/test-data', name)).equals(fs.readFileSync(path.join(root, 'test-data', name))), `Evidence fixture drift: ${name}`);
}

const compliance = {
  source_scenarios_inventory_count: scenarioMapping.length,
  source_active_example_row_count: exampleCount,
  source_step_phrases_inventory_count: phraseMapping.size,
  source_step_definition_methods_inventory_count: new Set([...phraseMapping.values()].map(item => item.sourceMethod)).size,
  source_steplib_methods_inventory_count: stepLibMapping.length,
  source_page_objects_inventory_count: pageMapping.length,
  mapped_scenarios_count: scenarioMapping.length,
  mapped_active_example_row_count: exampleCount,
  mapped_step_phrases_count: phraseMapping.size,
  mapped_step_definition_methods_count: new Set([...phraseMapping.values()].map(item => item.sourceMethod)).size,
  mapped_steplib_methods_count: stepLibMapping.length,
  mapped_source_pages_count: pageMapping.length,
  unmapped_scenarios: [], feature_title_drift: 0, scenario_title_drift: 0, active_example_row_drift: 0,
  unmapped_step_phrases: [], unmapped_step_definition_methods: [], unmapped_steplib_methods: [], unmapped_source_pages: [],
  refactored_duplicates_with_equivalence_rationale: 'See MIGRATION.md; each route remains a distinct fixture instance with its own expected title; shared control helpers preserve source inputs, branching and assertions.',
  decision: 'PASS', remediation_actions: [],
  scope: 'Static traceability and exact feature/data checks; not proof of browser behavior. StepLib/page inventory conservatively includes all service methods/classes, even unused helpers.',
};
const report = { sourceRoot: source, compliance, featureAudit, scenarioMapping, stepDefinitions: [...phraseMapping.values()], stepLibMapping, pageMapping, dataRows, expandedCases: manifest.length };
fs.writeFileSync(path.join(root, 'source-parity.json'), JSON.stringify(report, null, 2) + '\n');
fs.writeFileSync(path.join(root, 'validation-manifest.json'), JSON.stringify({ sourceFeatureHashes: featureAudit, cases: manifest, fullRunCommand: 'yarn test:e2e --project=chromium --workers=1 --retries=0', fullRunResult: 'NOT_RUN' }, null, 2) + '\n');
console.log(JSON.stringify({ compliance, features: featureAudit.length, expandedCases: manifest.length, dataRows }, null, 2));