/// <reference types="Cypress" />

describe('Central de atendimento ao cliente TAT', function () {

    beforeEach(() => {
        cy.visit('./src/index.html')
    })

    it('verifica o titulo da aplicação', function() { 
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'Amanda precisa muito de sua ajuda Amanda precisa muito de sua ajuda Amanda precisa muito de sua ajuda Amanda precisa muito de sua ajuda Amanda precisa muito de sua ajuda Amanda precisa muito de sua ajuda Amanda precisa muito de sua ajuda Amanda precisa muito de sua ajuda'
        cy.get('#firstName').type('Amanda')
        cy.get('#lastName').type('Florinda')
        cy.get('#email').type('flori@teste.com')

        // setamos um valor de delay para o texto longo ser digitado mais rapido
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.contains('Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('Amanda')
        cy.get('#lastName').type('Florinda')
        cy.get('#email').type('flori@teste,com')
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it ('campo de telefone continua vazio quando preenchido com valor não-numerico', function(){
        cy.get('#phone')
            .type('abcdf')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Amanda')
        cy.get('#lastName').type('Florinda')
        cy.get('#email').type('flori@teste.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
            .type('Amanda')
            .should('have.value', 'Amanda')
            .clear()
            .should('have.value', '')

        cy.get('#lastName')
            .type('Florinda')
            .should('have.value', 'Florinda')
            .clear()
            .should('have.value', '')

        cy.get('#email')
            .type('flori@teste.com')
            .should('have.value', 'flori@teste.com')
            .clear()
            .should('have.value', '')

        cy.get('#phone')
            .type('999999999')
            .should('have.value', '999999999')
            .clear()
            .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('select')
            .select('YouTube')
            .should('have.value', 'youtube')

    })

    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback" ', () => {
        cy.get('input[value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento e verifica', () => {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio){
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    it('marca ambos checkboxes, depois desmarca o último', () =>{
        cy.get('input[type="checkbox"]')
            .check()
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .should(function($input) {
                expect($input[0].files[0].name).to.equals('example.json')
            })
    })

    it('seleciona um arquivo simulando um drag-and-drops', () => {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
            .should(function($input) {
                expect($input[0].files[0].name).to.equals('example.json')
            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um aliass', () => {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function($input) {
                expect($input[0].files[0].name).to.equals('example.json')
            })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        //checa que o atributo target do link está como _blank
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicanco no link', () => {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()

            cy.contains('Talking About Testing').should('be.visible')
    })
    
})