/// <reference types="cypress" />

context('Product Category Filtering', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should filter product by Phones/Laptops/Monitors', () => {
    cy.get('[onclick="byCat(\'notebook\')"]').click()
    cy.get('.card > .card-block > .card-title > .hrefch').contains('contain','Sony')
  });

})