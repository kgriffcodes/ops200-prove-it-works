const express = require('express');
const expect = require('chai').expect;
const path = require('path');
const Nightmare = require('nightmare');

const app = express();

app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../dist')));

const url = 'http://localhost:8888';

const nightmare = new Nightmare();

  // /////////////
  // UNIT TESTS//
  // /////////////

  describe('React App Unit Tests', () => {
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

    it('should contain a <h1> element for the page title', () => pageObject
        .evaluate(() => document.querySelector('h1').innerText)
        .then((headerText) => {
          expect(headerText).to.not.be.null;
          expect(headerText).to.equal('Mortgage Calculator');
        }));

    // TODO: finish writing this test
    it('should contain a <select> element for loan period', () => pageObject
      .evaluate(() => document.querySelector('select'))
      .then((selector) => {
      expect(selector).to.exist;
      }
    ));

    it('should contain an <input> element with the name principal', () => pageObject
      .evaluate(() => document.getElementsByTagName('input[name=principal]'))
      .then((input) => {
        expect(input).to.exist;
      }
    ));
  });
