///<reference types="cypress" />


import { prod1, prod2, prod3 } from "../fixtures/produtos"
import { cliente1 } from "../fixtures/clientes";
import { desc10Off, desc30R$, vencido, desc5Off } from "../fixtures/cupons";
import { calcDescPercSemFrete, calcDescVlr, calcDescPercComFrete } from "../support/utils";
import { frete } from "../support/enums";


describe('testes cupons', () => {

    beforeEach(() => {
        cy.clearCookies()
    });


    it('Compra com desconto total nos produtos, e com custo de frete', () => {

        const prod = [
            {nome: prod2.nome, valor: prod2.valor, qtd: 1, desc: desc10Off.desc}
        ]

        const { desc, totalComDescPerc } = calcDescPercSemFrete(prod);

        cy.prodIncluirProdutoURL(prod2.id)
        cy.carCalcularFrete(cliente1.cep)
        cy.carAplicarCupom(desc10Off.cod)
        cy.carValidarCupom(desc)
        cy.carValidarValorTotal(totalComDescPerc)

    });


    it.only('Substituir cupom de desconto e aplicar novo desconto', () => {

        const prod = [
            {nome: prod3.nome, valor: prod3.valor, qtd: 1, desc: desc10Off.desc},
        ]

        cy.prodIncluirProdutoURL(prod3.id)
        cy.carCalcularFrete(cliente1.cep)
        cy.carAplicarCupom(desc10Off.cod)

        cy.carRemovCupom()

        const descValor = desc30R$.desc;

        const {totalComDescVlr } = calcDescVlr(prod, descValor);

        cy.prodIncluirProdutoURL(prod3.id)
        cy.carCalcularFrete(cliente1.cep)
        cy.carAplicarCupom(desc30R$.cod)
        cy.carValidarValorTotal(totalComDescVlr)

    });


    it('Manter valor sem desconto ao aplicar cupom de desconto inválido', () => {

        let valorProd = prod1.valor.toFixed(2).replace('.', ',')

        cy.prodIncluirProdutoURL(prod1.id)
        cy.carAplicarCupom(vencido.cod)
        cy.carValidarValorTotal(valorProd)
        cy.carValidarCupomInvalido()

    });


    it('Recalcular desconto do cupom ao alterar a forma de entregar no checkout', () => {

        const prod = [
            {nome: prod3.nome, valor: prod3.valor, frete: prod3.frete, qtd: 1, desc: desc5Off.desc}
        ]

        const {totalComDescPercFrt } = calcDescPercComFrete(prod, prod3.frete)

        cy.prodIncluirProdutoURL(prod3.id)
        cy.carCalcularFrete(cliente1.cep)
        cy.carAplicarCupom(desc5Off.cod)
        cy.carFinalizarCompra()
        cy.chInformarEmail(Cypress.env('usuario'))
        cy.chSelTipoFrete(frete.SEDEX)
        cy.chValidarValorTotal(totalComDescPercFrt)

    });
});


