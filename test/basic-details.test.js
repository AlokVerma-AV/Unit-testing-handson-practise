import { html, fixture, expect } from '@open-wc/testing';
import { triggerFocusFor, triggerBlurFor } from '@open-wc/testing';
import Sinon, { stub } from 'sinon';
import { Router } from '@vaadin/router';
import '../src/LoanBasicDetails/BasicDetails.js';

describe('Basic details', () => {
  // Write test cases inside this block
  // refer basic-details.js files
  let el;
  before( async() => {
    el = await fixture(html `<basic-details><basic-details>`);
  });

  it('it should accessible the component', () => {
    expect(el).to.be.accessible;
  });

  it('it should not accessible the component', () => {
    let el;
    before( async() => {
      el = await fixture(html `<basic-details><basic-details>`);
    });
    expect(el).not.to.be.accessible;
  });

  it('_numToWord() method called to convert number into word from "Amount" input field', () => {
    const spy = Sinon.spy(el, '_numToWord');
    el._numToWord();
    el.shadowRoot.querySelector('.amount').value = 10000;
    expect(spy).to.have.called;
    expect(el.shadowRoot.querySelector('#word').innerHTML.trim()).to.equal('ten thousand');
    spy.restore();
  });

  it('_captureDetails() - makes a post request with the inputs', ()=>{
    const spy = Sinon.spy(window, 'fetch');
    el.shadowRoot.querySelector('.type').value = 'Personal Loan';
    el.shadowRoot.querySelector('.amount').value = '10000';
    el.shadowRoot.querySelector('.period').value = '10';
    el._captureDetails();
    expect(spy.args[0][1].method).to.equal('POST');
    expect(spy.args[0][1].body).deep.equal('{"name":"Personal Loan","amount":"10000","period":"10"}');
    expect(spy).to.have.called;
    spy.restore();
  });

  it('_captureDetails() - doesnt makes a post request as amount is less than 10k', ()=>{
    const spy = Sinon.spy(window, 'fetch');
    el.shadowRoot.querySelector('.type').value = 'Personal Loan';
    el.shadowRoot.querySelector('.amount').value = '8000';
    el.shadowRoot.querySelector('.period').value = '10';
    el._captureDetails();
    expect([...el.shadowRoot.querySelector('.amount').classList].indexOf('e-handle')).to.not.equal(-1);
    expect(spy).to.not.have.called;
    spy.restore();
  });

  it('_toDashboard()- called Router global() to navigate to dashboard', () => {
    const spy = Sinon.spy(Router, 'go');
    el._toDashboard();
    expect(spy).to.have.called;
    expect(spy.firstCall.args[0]).to.equal('/');
    spy.restore();
  });
});