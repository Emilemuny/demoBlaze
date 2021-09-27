import { forEach } from "cypress/types/lodash";


  Cypress.Commands.add('login_api', () => {
    cy.visit('/')
    cy.request('POST', 'https://api.demoblaze.com/login', {
      body: {"username": Cypress.env('username'), "password": Cypress.env('pwd')}
    }).then((response) => {
      expect(response).property('status').to.equal(200) // Login Success
    })
  })

  Cypress.Commands.add('login_ui', () => {
    cy.visit('/')
    cy.get('#login2').click()
    cy.wait(1000)
    cy.get('#loginusername').focus().type(Cypress.env('username'), { delay: 500 }).should('have.value', Cypress.env('username'))
    cy.get('#loginpassword').focus().type(Cypress.env('pwd'), { delay: 500 }).should('have.value', Cypress.env('pwd'))
    cy.get('[onclick="logIn()"]').click()
    cy.get('#nameofuser').should('have.text', 'Welcome '+ Cypress.env('username'))
  });

  Cypress.Commands.add('clearCartItems', () => {
    cy.request('POST', 'https://api.demoblaze.com/viewcart', {
      body: {"cookie": 'Cookie', "flag": true}
    }).then((response) => {
      if(response.Items){
        response.Items((item) =>{
          cy.request('POST', 'https://api.demoblaze/deleteitem', {
            body: {"id": item.id}
          })
        })
      }
    })
  });