/// <reference types="cypress" />

const fake = require('faker')

let newUser = {
  userName: fake.internet.userName(),
  pwd: fake.internet.password()
}

context('SignUp/Login/Logout', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should signup a new user', () => {
    cy.get('#signin2').click()
    cy.wait(1000)
    cy.get('#sign-username').focus().type(newUser.userName, { delay: 500 }).should('have.value', newUser.userName)
    cy.get('#sign-password').focus().type(newUser.pwd, { delay: 500 }).should('have.value', newUser.pwd)
    cy.get('[onclick="register()"]').click()
  });

  it('should login w/ valid user credentials', () => {
    cy.get('#login2').click()
    cy.wait(1000)
    cy.get('#loginusername').focus().type(Cypress.env('username'), { delay: 500 }).should('have.value', Cypress.env('username'))
    cy.get('#loginpassword').focus().type(Cypress.env('pwd'), { delay: 500 }).should('have.value', Cypress.env('pwd'))
    cy.get('[onclick="logIn()"]').click()
    cy.get('#nameofuser').should('have.text', 'Welcome '+ Cypress.env('username'))
  })

  it('should login w/ invalid user credentials', () => {
    cy.get('#login2').click()
    cy.wait(1000)
    cy.get('#loginusername').type(Cypress.env('username'), { delay: 500 }).should('have.value', Cypress.env('username'))
    cy.get('#loginpassword').type('pwd_Invalid1', { delay: 500 }).should('have.value', 'pwd_Invalid1')
    cy.get('[onclick="logIn()"]').click()
    cy.on("window:alert", (str) => {
        expect(str).to.equal("Wrong password");
      cy.get('[name="alert"]').click();
      });
  })

  it('should logout a user', () => {
    cy.login_ui()
    cy.wait(500)
    cy.get('#logout2').click()
    cy.get('#nameofuser').should('not.be.visible')
  })

})
