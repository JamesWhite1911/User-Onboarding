//tests in this file

describe ('', () => {
    beforeEach(() => {
        //before tests
        cy.visit('http://localhost:3000')
    })

    //sanity test
    it('Am I sane?', () => {
        expect (2+2).to.equal(4)
    })

    //tests
    it('MVP Passed?', () => {
        cy
        //get name
        .get('input[name="name"]')
        //type a name in
        .type('TestName')
        //check if text contains the name with .should
        .should('have.value', "TestName")
        //get email
        .get('input[name="email"]')
        //type an email in
        .type('Email@test.com')
        //get password
        .get('input[name="password"]')
        //type password
        .type('Password')
        //check if user can click tos checkbox
        .get('input[name="tos"]')
        .click()
        //check if user can submit form
        .get('button')
        .contains('Submit')
        .click()
        //see if error text comes up when a box is left empty
        .get('input[name="tos"]')
        .click()
        .get('.error')
        .should('exist')
    })
})