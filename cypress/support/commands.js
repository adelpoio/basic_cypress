Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    const longText = 'Teste, TESTE, teste, TeStE, tEsTe, Recomeçar...Teste, TESTE, teste, TeStE, tEsTe, Recomeçar...Teste, TESTE, teste, TeStE, tEsTe, Recomeçar...'
    cy.get('#firstName').should('be.visible').type('André').should('have.value', 'André')
    cy.get('#lastName').should('be.visible').type('Delpoio').should('have.value', 'Delpoio')
    cy.get('#email').should('be.visible').type('testeemail@teste.com').should('have.value', 'testeemail@teste.com')
    cy.get('#open-text-area').should('be.visible').type(longText, {delay: 0})
    cy.contains('button','Enviar').click()
})