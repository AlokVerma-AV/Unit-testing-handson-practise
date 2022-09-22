import { html, fixture, expect } from '@open-wc/testing';
import Sinon, { stub } from 'sinon';

import '../loan-application.js';

describe('LoanApplication', () => {
  // Write test cases inside this block
  let el;
  before( async() => {
    el = await fixture(html `<loan-application><loan-application>`);
  });
  
  it('is accessible', () => {
    expect(el).to.be.accessible;
  });

  it('__increment() called', () => {
    el.__increment();
    expect(el.counter).to.equal(6)
  });
});
