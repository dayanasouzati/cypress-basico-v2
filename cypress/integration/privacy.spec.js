/// <reference types="Cypress" />

describe('política de privavidade TAT', function () {

    beforeEach(() => {
        cy.visit('./src/privacy.html')
    })

    it('testa a página da política de privavidade de forma independente', () => {
        cy.contains('Talking About Testing').should('be.visible')
    })

})