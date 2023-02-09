export const Format = {
    price: (price: number) => {
        return price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    },
    installment: (price: number, quantity: number) => {
        let installment = price / quantity;
        return installment.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    },
    discountPrice: (price: number, discount: number) => {
        let priceDincount = price - ((discount * price) / 100) ;
        return priceDincount.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
    }
}