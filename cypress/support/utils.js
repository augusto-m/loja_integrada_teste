// Função de cálculo para somar os valores dos produtos considerando a quantidade e aplicar o desconto sobre o total
export const calcDescPercSemFrete = (produtos) => {
    let valorTotalProdutos = 0;
    let descontoTotal = 0;

    for (let i = 0; i < produtos.length; i++) {
        const produto = produtos[i];
        const valorTotalProduto = produto.valor * produto.qtd;
        const descontoProduto = valorTotalProduto * (produto.desc / 100)

        valorTotalProdutos += valorTotalProduto;
        descontoTotal += descontoProduto

    }

    const valorComDesconto = valorTotalProdutos - descontoTotal;

    return {
        totalProd: valorTotalProdutos.toFixed(2).replace('.', ','),
        desc: descontoTotal.toFixed(2).replace('.', ','),
        totalComDescPerc: valorComDesconto.toFixed(2).replace('.', ',')
    };
};


export const calcDescPercComFrete = (produtos, frete) => {
    let valorTotalProdutos = 0;
    let descontoTotal = 0;

    for (let i = 0; i < produtos.length; i++) {
        const produto = produtos[i];

        const valorTotalProduto = (produto.valor * produto.qtd) + frete
        const descontoProduto = valorTotalProduto * (produto.desc / 100)

        valorTotalProdutos += valorTotalProduto
        descontoTotal += descontoProduto
    }
    
    const valorComDesconto = valorTotalProdutos  - descontoTotal
    

    return {
        totalProdFrt: valorTotalProdutos.toFixed(2).replace('.', ','),
        desc: descontoTotal.toFixed(2).replace('.', ','),
        totalComDescPercFrt: valorComDesconto.toFixed(2).replace('.', ',')
    };
};


export const calcDescVlr = (produtos, descontoValor) => {
    let valorTotalProdutos = 0;
    let frete = 0

    for (let i = 0; i < produtos.length; i++) {
        const produto = produtos[i];
        const valorTotalProduto = produto.valor * produto.qtd

        valorTotalProdutos += valorTotalProduto
    }

    const valorComDesconto = valorTotalProdutos + frete - descontoValor
    const valorFinal = valorComDesconto < 0 ? 0 : valorComDesconto


    return {
        totalProd: valorTotalProdutos.toFixed(2).replace('.', ','),
        totalComDescVlr: valorFinal.toFixed(2).replace('.', ',')
    };
};
