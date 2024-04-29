describe('Central de Atendimento ao Cliente TAT',function() {
  beforeEach(function (){
    cy.visit('./src/index.html')
  })


  it('Verifica o título da aplicação', function() {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })


  it('Preenche os campos obrigatórios e envia o formulário', function() {
    const longText = 'Teste, TESTE, teste, TeStE, tEsTe, Recomeçar...Teste, TESTE, teste, TeStE, tEsTe, Recomeçar...Teste, TESTE, teste, TeStE, tEsTe, Recomeçar...'
    cy.get('#firstName').should('be.visible').type('André').should('have.value', 'André')
    cy.get('#lastName').should('be.visible').type('Delpoio').should('have.value', 'Delpoio')
    cy.get('#email').should('be.visible').type('testeemail@teste.com').should('have.value', 'testeemail@teste.com')
    cy.get('#open-text-area').should('be.visible').type(longText, {delay: 0})
    
    cy.contains('button','Enviar').click()
    cy.get('.success > strong').should('contain.text', 'Mensagem enviada com sucesso')

  })

  it('Exibe mensagem de erro ao submeter o formulário com um e-mail com formatação inválida', function() {
    cy.get('#firstName').should('be.visible').type('André')
    cy.get('#lastName').should('be.visible').type('Delpoio')
    cy.get('#email').should('be.visible').type('testeemail@teste,com')
    cy.get('#open-text-area').should('be.visible').type('Teste do texto')
    
    cy.contains('button','Enviar').click()
    cy.get('.error').should('be.visible')

  })

  it('Campo telefone continua vazio quando preenchido com valor não-númerico', function() {
    cy.get('#phone').type('abcdefghij').should('have.value', '')
  })

  it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
    cy.get('#firstName').should('be.visible').type('André')
    cy.get('#lastName').should('be.visible').type('Delpoio')
    cy.get('#email').should('be.visible').type('testeemail@teste,com')
    cy.get('#open-text-area').should('be.visible').type('Teste do texto')
    
    cy.get('#phone-checkbox').check()
    cy.contains('button','Enviar').click()
    cy.get('.error').should('be.visible')

  })

  it('Preenche e limpa os campos nome, sobrenome, email e telefone', function() {
    cy.get('#firstName').type('André').should('have.value', 'André')
    cy.get('#lastName').type('Delpoio').should('have.value', 'Delpoio')
    cy.get('#email').type('testeemail@teste.com').should('have.value', 'testeemail@teste.com')
    cy.get('#phone').type('987654321').should('have.value', '987654321')
    cy.get('#open-text-area').type('Teste do texto').should('have.value', 'Teste do texto')
    cy.get('#phone-checkbox').check()

    //Limpando os dados:
    cy.get('#firstName').clear().should('have.value', '')
    cy.get('#lastName').clear().should('have.value', '')
    cy.get('#email').clear().should('have.value', '')
    cy.get('#phone').clear().should('have.value', '')
    cy.get('#open-text-area').clear().should('have.value', '')
    cy.get('#phone-checkbox').check()

  })

  it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
    cy.contains('button','Enviar').click()
    cy.get('.error').should('be.visible')
  })
  
  it('Envia o formulário com sucesso usando um comando customizado', function() {
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
  })

  it('Seleciona um produto (YouTube) por seu texto', function() {
    cy.get('#product').select('YouTube').should('have.value', 'youtube')
  })

  it('Seleciona um produto (Mentoria) pelo seu valor', function() {
    cy.get('#product').select('mentoria').should('have.value', 'mentoria')
  })

  it('Seleciona um produto (Blog) pelo seu índice', function() {
    cy.get('#product').select(1).should('have.value', 'blog')
  })

  it('Marca o tipo de atendimento "Feedback"', function() {
    cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
  
  })

  it('Marca cada tipo de atendimento', function() {
    cy.get('input[type="radio"]')
    .should('have.length', 3)
    .each(function($radio) {
      cy.wrap($radio).check()
      cy.wrap($radio).should('be.checked')
    })
  })

  it('Marca ambos os checkboxes, depois desmarca o último', function() {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked') 
  })

  it('Seleciona um arquivo da pasta Fixtures', function() {
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json')
      .should(function($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('Seleciona um arquivo simulando um drag-and-drop', function() {
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .then(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('Seleciona um arquivo utilizando uma fixture para a qual foi dado um alias', function() {
    cy.fixture('example.json', { encoding: null }).as('exampleFile')
    cy.get('input[type="file"]')
      .selectFile('@exampleFile')
      .then(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })


  it('Verifica que a politica de privacidade abre em outra aba sem a necessidade de um clique', function() {
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
      
  })

  // it('Acessa a pagina da politica de privacidade removendo o target e então clicando', function(){
  //   cy.get('#privacy a')
  //   .invoke('removeAttr', 'target')
  //   .click()
  // })
  
})
