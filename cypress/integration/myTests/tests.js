import {Login, PageElements} from '../pageObjects/objectElements'

const login = new Login();
const element = new PageElements();


let fillingLogin = () => {
    expect(Cypress.env('login')).to.be.a('string');
    login.userName().type(Cypress.env('login'));
    login.password().type(Cypress.env('password'));
    login.logInButton().click();
}

describe('login test', ()=>{
    it('launch the site', login.launch)

    it('filling up the login form', fillingLogin)
})


describe('checking presents of elements', ()=> {
    it('checking elements', ()=> {
        element.form().should('be.visible');
        element.img().should('have.id', 'logomini').should('have.css', 'width', '189px')
        element.h1().contains('QA Portal Login').should('have.css', 'margin-top', '25px');
        element.helpBlock().should('have.css', 'display', 'block');
        element.input().first().should('have.class', 'form-control').and('have.attr', 'placeholder', 'Username');
        element.input().eq(1).should('have.class', 'form-control').should('have.css', 'line-height', '14px');
        element.input().last().should('have.class', 'btn btn-success').contains('Login')
    })
})


describe('error messages', ()=> {
    let formSubmit = (inputInfo, secondPar)=> {
        cy.get('form').within(()=> {
            login.userName().should('have.attr', 'placeholder', 'Username');
            login.password().should('have.attr', 'placeholder', 'Password');
            inputInfo ? inputInfo: null;
            secondPar ? secondPar : null 
            cy.root().submit();
        })
    }

    it('userName error', ()=> {
        login.launch();
        formSubmit(login.password().type(Cypress.env('password')));
        element.helpBlock().should('contain', 'Please enter username.');
    })

    it('password error', ()=> {
        login.launch();
        formSubmit(login.userName().type(Cypress.env('login')));
        element.helpBlock().should('have.text', 'Please enter your password.')
    })

    it('no account error', ()=> {
        login.launch();
        formSubmit(login.userName().type(Cypress.env('login')), login.password().type(Cypress.env('password')))
        element.helpBlock().should('contain', 'No account found with that username')
    })

    it('empty fields error', ()=> {
        login.launch();
        formSubmit()
        element.helpBlock().first().should('contain', 'Please enter username.')
        element.helpBlock().last().should('contain', 'Please enter your password.')
    })
})


describe('unsuccessful login', ()=> {
    it('launch the site', login.launch)
    it('filling up the login form', fillingLogin)
    it('fail login', ()=> {
        cy.location().should((loc) => {
            expect(loc.pathname).to.eq('/qa-portal/registerlogin/users/john')
        })
    })
})