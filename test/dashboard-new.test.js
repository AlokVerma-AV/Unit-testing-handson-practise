import { html, fixture, expect } from '@open-wc/testing';
import { stub } from 'sinon';
import '../src/dashboard/Dashboard-new.js';

describe('Dashboard New details', () => {
  // Write test cases inside this block
  // refer basic-details.js files
  let el;
  before( async() => {
    el = await fixture(html `<dashboard-new><dashboard-new>`);
  });
  
  it('is accessible', () => {
    expect(el).to.be.accessible;
  });

  it('component renders 4 dashboard-menu templates', () => {
    expect(Object.keys(el.shadowRoot.querySelectorAll('dashboard-menu')).length).to.equal(4);
  });
});