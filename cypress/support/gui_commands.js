///<reference types="cypress" />


//------------------------- // loja //--------------------------
//-----------------------------//-----------------------------


Cypress.Commands.add('prodIncluirProdutoURL', (idProduto) => {
    cy.visit(`carrinho/produto/${idProduto}/adicionar`)

})


//----------------------- // carrinho //-----------------------
//-----------------------------//-----------------------------

Cypress.Commands.add('carCalcularFrete', (frete) => {
    cy.get('#calcularFrete').clear().type(frete).type('{enter}')
})


Cypress.Commands.add('carAplicarCupom', (cupom) => {
    cy.get('#usarCupom').clear().type(cupom).type('{enter}')
})


Cypress.Commands.add('carContinuarComprando', () => {
    cy.contains('a', 'Ir para o carrinho').should('be.visible').click();
})


Cypress.Commands.add('carFinalizarCompra', () => {
    cy.contains('.botao', 'Finalizar compra').should('be.visible').click()
})


Cypress.Commands.add('carAlterarQuantidade', (idProd, novaQtd) => {
    cy.get(`tr[data-produto-id="${idProd}"]`)
        .find('input[name="quantidade"]')
        .clear()
        .type(novaQtd)
        .type('{enter}')
})

Cypress.Commands.add('carRemovCupom', () => {
    cy.get('a.remover-cupom').should('be.visible').click();
})

Cypress.Commands.add('carSalvarValorFrete', () => {
    cy.get('input[data-code="SEDEX"]')
        .invoke('attr', 'data-valor')
        .then((valor) => {
            Cypress.env('freteArmaz', valor)
        });
})


Cypress.Commands.add('carValidarCupom', (descontoCupom) => {
    cy.get('span[data-desconto-valor-real]')
    .should('be.visible')
    .and('have.text', descontoCupom)
})


Cypress.Commands.add('carValidarValorSubTotal', (valorSubtotal) => {
    cy.get('.subtotal').should('have.text', 'R$ ' + valorSubtotal).debug()
})


Cypress.Commands.add('carValidarValorTotal', (valorTotal) => {
    cy.get('[data-total-valor]').should('have.text', 'R$ ' + valorTotal)
})

Cypress.Commands.add('carValidarCupomInvalido', () => {
    cy.get('.alert.alert-danger.alert-geral')
    .should('be.visible')
    .and('contain.text', 'O cupom não é válido')
})

//----------------------- // checkout //-----------------------
//-----------------------------//-----------------------------


Cypress.Commands.add('chInformarEmail', (email) => {
    cy.get('#id_email_login')
        .should('be.visible')
        .clear()
        .type(email)
        .type('{enter}')
})

Cypress.Commands.add('chValidarValorTotal', (valorTotal) => {
    cy.get('.total .preco-carrinho-total').contains(valorTotal)
})


Cypress.Commands.add('chSelTipoFrete', (tipoFrete) => {
    cy.get(`#${tipoFrete}`).should('be.visible').check()
    cy.get(`#${tipoFrete}`).should('be.checked')
    

})