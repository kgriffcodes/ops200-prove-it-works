const express = require('express');
const expect = require('chai').expect;
const assert = require('chai').assert;
const path = require('path');
const Nightmare = require('nightmare');

const app = express();

app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../dist')));

const url = 'http://localhost:8888';

const nightmare = new Nightmare();

describe('End to End Tests', () => {
  let httpServer = null;
  let pageObject = null;

  before((done) => {
    httpServer = app.listen(8888);
    done();
  });

  beforeEach(() => {
    pageObject = nightmare.goto(url);
  });

  after((done) => {
    httpServer.close();
    done();
  });

  // ////////////
  // E2E TESTS//
  // ////////////

  it('should correctly calculate mortgage', () =>
    pageObject
      .wait()
      .type('input[name=principal]', 300000)
      .type('input[name=interestRate]', 3.75)
      .type('input[name=loanTerm]', 30)
      .select('select[name=period]', 12)
      .click('button#calculate')
      .wait('#output')
      .evaluate(() => document.querySelector('#output').innerText)
      .then((outputText) => {
        expect(outputText).to.equal('$1389.35');
      })).timeout(6500);

  it('should return an output of infinity when loan period is not selected', () =>
    pageObject
      .wait()
      .type('input[name=principal]', 100000)
      .type('input[name=interestRate]', 3.75)
      .select('select[name=period]', 12)
      .click('button#calculate')
      .wait('#output')
      .evaluate(() => document.querySelector('#output').innerText)
      .then((outputText) => {
        expect(outputText).to.equal('$Infinity');
      })).timeout(6500);

  it('should return an output of NaN if no inputs are selected', () =>
    pageObject
      .wait()
      .click('button#calculate')
      .wait('#output')
      .evaluate(() => document.querySelector('#output').innerText)
      .then((outputText) => {
        expect(outputText).to.equal('$NaN');
      })).timeout(6500);

  it('should return an output in the form of a string', () =>
    pageObject
      .wait()
      .click('button#calculate')
      .evaluate(() => document.querySelector('#output').innerText)
      .then((outputText) => {
        assert.typeOf(outputText, 'string');
      })).timeout(6500);

  it('should correctly calculate mortgage', () =>
    pageObject
      .wait()
      .type('input[name=principal]', 100000)
      .type('input[name=interestRate]', 4)
      .type('input[name=loanTerm]', 30)
      .select('select[name=period]', 4)
      .click('button#calculate')
      .wait('#output')
      .evaluate(() => document.querySelector('#output').innerText)
      .then((outputText) => {
        expect(outputText).to.equal('$1434.71');
      })).timeout(6500);

  it('should return an output string that starts with a dollar sign', () =>
    pageObject
      .wait()
      .click('button#calculate')
      .evaluate(() => document.querySelector('#output').innerText)
      .then((outputText) => {
        expect(outputText.startsWith('$')).to.be.true;
      })).timeout(6500);

  it('should correctly calculate mortgage when period is changed', () =>
  pageObject
    .wait()
    .type('input[name=principal]', 100000)
    .type('input[name=interestRate]', 4)
    .type('input[name=loanTerm]', 30)
    .select('select[name=period]', 4)
    .select('select[name=period]', 12)
    .click('button#calculate')
    .wait('#output')
    .evaluate(() => document.querySelector('#output').innerText)
    .then((outputText) => {
      expect(outputText).to.equal('$477.42');
    })).timeout(6500);

  it('should return an output of NaN if not enough inputs are selected', () =>
    pageObject
      .wait()
      .type('input[name=principal]', 100000)
      .type('input[name=loanTerm]', 30)
      .select('select[name=period]', 4)
      .click('button#calculate')
      .wait('#output')
      .evaluate(() => document.querySelector('#output').innerText)
      .then((outputText) => {
        expect(outputText).to.equal('$NaN');
      })).timeout(6500);
});
