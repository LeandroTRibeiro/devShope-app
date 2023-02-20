// P R O P S 

export type PropsButton = {

    name: string,
    style?: string,
    disabled?: boolean,
    onClick?: () => void

};

export type PropsInput = {

    type: string,
    placeholder: string,
    value: string | number,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    required?: boolean,
    disabled?: boolean

};

export type LoaderProps = {

    bg?: string

}

export type IsWishType = {

    id: string

};

export type ToShareType = {

    title: string,
    text: string,
    url: string

}

export type RatingType = {

    rating: number

}

export type SelectQuantityType = {

    stock: number,
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void

}

export type ProductPriceType = {
    product: ProductItem,
    small: boolean
}


// A P I  T Y P E S 

export type ImageTypeModel = {
    url: string,
    public_id: string
};

export type ProductItem = {
    _id: string
    idUser: string,
    dateCreated: Date,
    title: string,
    description: string,
    category: string,
    price: number,
    views: number,
    status: boolean,
    rating: {
        totalRating: number,
        grades: number[]
    },
    thumbnail: {
        url: string,
        public_id: string
    }
    images: ImageTypeModel[],
    stock: number,
    freeDelivery: boolean,
    characteristics: string[],
    discount: number,
    installment: number,
    discountWithInstallment: boolean,
    cepOrigin: string,
    weight: string,
    format: string,
    length: string,
    height: string,
    width: string,
    deliveryService: string[],
    diameter: string
    
}

export type ProductItemCart = ProductItem & {
    amount: number
}

export type WishListProductType = {
    idProduct: string,
    dateCreated?: number
}

export type WishListType = {
    idUser: string,
    product: WishListProductType[]
}

export type BannersType = {
    name: string,
    url: string,
    public_id: string,
    dateCreated: Date
}

export type CartListProductType = {
    idProduct: string,
    amout: number,
    dateCreated?: number
}

export type CartListType = {
    idUser: string,
    product: CartListProductType[]
}
