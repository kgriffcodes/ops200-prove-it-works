const expect = require('chai').expect;
const assert = require('chai').assert;
const Mortgage = require('../../src/js/lib/Mortgage');

describe('Mortgage Calculator', () => {
  let calculator = null;
  let calculator2 = null;

  beforeEach(() => {
    calculator = new Mortgage(100000, 25, 30, 5);
    calculator2 = new Mortgage(200000, 10, 30, 3);
  });

  it('should have a monthly payment function', () => {
	  expect(calculator.monthlyPayment).to.exist;
	});

  it('monthly payment should equal 5003.32 when given principal of 100000, interest of 25, term of 30, and period of 5', () => {
	  expect(calculator.monthlyPayment()).to.equal('5003.32');
	});

  it('monthly payment should equal  when given principal of 200000, interest of 10, term of 30, and period of 3', () => {
	  expect(calculator2.monthlyPayment()).to.equal('7034.45');
	});

  it('new items made from Mortgage class should be objects', () => {
    assert.typeOf(calculator, 'object');
  });
});
