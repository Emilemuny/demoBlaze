/// <reference types="cypress" />

const fake = require('faker')
import * as productInfo from '../fixtures/product.json'

let ccDetails = {
    name: fake.name.firstName(),
    country: 'US',
    city: fake.address.city(),
    ccNumber: fake.finance.creditCardNumber(),
    ccMonth: '04',
    ccYear: '2025'
}

context('Checkout Item', () => {
  beforeEach(() => {
    cy.login_ui()
    //cy.clearCartItems() // Not working. Needs to handle the cookie in the method properly
  })

  it('Add Item to Cart', () => {
    cy.get(':nth-child(2) > .card > .card-block > .card-title > .hrefch').click()
    cy.wait(500)
    cy.contains('Add to cart').click()
    cy.get('#cartur').click()
    cy.get('.success > :nth-child(2)').should('have.text', productInfo.name)
    cy.get('.success > :nth-child(3)').should('have.text', productInfo.price)
    cy.get('#totalp').should('have.text', productInfo.price)
  });

  it('Place Order', () => {
    cy.get('#cartur').click()
    cy.contains('Place Order').click()
    cy.get('#totalm').should('have.text', 'Total: '+productInfo.price)
    cy.get('#name').type(ccDetails.name).should('have.value',ccDetails.name)
    cy.get('#country').type(ccDetails.country).should('have.value', ccDetails.country)
    cy.get('#city').type(ccDetails.city).should('have.value', ccDetails.city)
    cy.get('#card').type(ccDetails.ccNumber).should('have.value', ccDetails.ccNumber)
    cy.get('#month').type(ccDetails.ccMonth).should('have.value', ccDetails.ccMonth)
    cy.get('#year').type(ccDetails.ccYear).should('have.value', ccDetails.ccYear)
    cy.contains('Purchase').click()
    cy.get('[class="sweet-alert  showSweetAlert visible"] > h2').should('contain', "Thank you for your purchase!")
    cy.contains('OK').click()
  })

})
