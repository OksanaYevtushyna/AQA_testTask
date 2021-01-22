export class Login {
    userName() {
        return cy.get('input[name="username"]');
    }
    password() {
        return cy.get('input[name="password"]');
    }
    logInButton() {
        return cy.get('input[type="submit"]').contains('Login').should('be.visible');
    }
    launch () {
        cy.visit(Cypress.config('url'));
        cy.title().should('eq', 'Login');
    }
}


export class PageElements {
    form() {
        return cy.get('.wrapper>form');
    }
    input() {
        return cy.get('form').find('input');
    }
    helpBlock() {
        return cy.get('.help-block');
    }
    img() {
        return cy.get('img');
    }
    h1() {
        return cy.get('h1');
    }
}