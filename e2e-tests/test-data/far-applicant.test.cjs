const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');
const ts = require('typescript');
const { getFarApplicant } = require('./far-applicant.ts');
const baseline = require('./far-applicant.expected.json');

for (const { product, description, context, expected } of baseline) {
  test(`${product}/${context}: ${description} retains every original answer`, () => {
    assert.deepEqual(getFarApplicant(product, description, context), expected);
  });
}

test('all eighteen normal variants and two validation variants are covered', () => {
  assert.equal(baseline.filter(entry => entry.context === 'journey').length, 18);
  assert.equal(baseline.filter(entry => entry.context === 'validation').length, 2);
});

test('invalid products, contexts, and non-exact descriptions fail explicitly', () => {
  for (const product of ['FARS5', 'FARMuseum', 'FARShootingClub']) {
    for (const description of ['', '1', 'unknown', 'apply for a new authority', 'Apply for a new authority ']) {
      assert.throws(() => getFarApplicant(product, description), /Unknown FAR scenario description/);
    }
  }
  assert.throws(() => getFarApplicant('invalid', 'Apply for a new authority'), /Unknown FAR product/);
  assert.throws(() => getFarApplicant('FARS5', 'Apply for a new authority', 'validation'), /Unsupported FAR data context/);
  assert.throws(() => getFarApplicant('FARMuseum', 'Apply for a new authority', 'invalid'), /Unsupported FAR data context/);
  assert.throws(() => getFarApplicant('FARMuseum', 'Max character'), /Unknown FAR scenario description/);
  assert.throws(() => getFarApplicant('FARMuseum', 'Amend existing authority', 'validation'), /Unknown FAR scenario description/);
});

test('each switch has unique description cases to prevent ambiguous selection', () => {
  const filename = path.join(__dirname, 'far-applicant.ts');
  const ast = ts.createSourceFile(filename, fs.readFileSync(filename, 'utf8'), ts.ScriptTarget.Latest, true);
  function visit(node) {
    if (ts.isSwitchStatement(node)) {
      const cases = node.caseBlock.clauses.filter(ts.isCaseClause).map(clause => clause.expression.text);
      assert.equal(new Set(cases).size, cases.length, 'Duplicate switch cases would make scenario selection ambiguous');
    }
    ts.forEachChild(node, visit);
  }
  visit(ast);
});
