/// <reference types="cypress" />

context('API tests', () => {
    beforeEach(() => {
      cy.visit('/')

    })
  
    it('POST - Add to cart', () => {
      cy.request('POST', 'https://api.demoblaze.com/addtocart', {
          body: {"id": itemId,"cookie": cookieValue,"prod_id":1,"flag":true}
        }).then((response) => {
          expect(response).property('status').to.equal(200) // Login Success
      })
    });

    it('POST - Remove item from the cart', () => {
      cy.request('POST', 'https://api.demoblaze/deleteitem', {
          body: {"id": item.id}
      })
    })

    xit('should place an order', () => {

    })

  })