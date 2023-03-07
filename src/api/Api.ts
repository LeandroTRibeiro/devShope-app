import axios from "axios";
import { delCookie, setCookie } from "../helpers/Cookie";

const BASEAPI = 'http://localhost:2000';

export const Api = {
    signin: async (email: string, password: string) => {

        const response = await axios.post(`${BASEAPI}/user/signin`, {
            email,
            password
        });

        if(response.data.token) {
            
            setCookie(response.data.token);
        }

        return response.data;
    },
    signinAutomatic: async (token: string) => {

        const response = await axios.post(`${BASEAPI}/user/signin/token`, {
            token
        });

        if(response.data.token) {

            setCookie(response.data.token);
        }

        return response.data;
    },
    products: async () => {
        const response = await axios.get(`${BASEAPI}/ad/getlist`);

        return response.data;
    },
    addWish: async (token: string, wish: string) => {
        const response = await axios.post(`${BASEAPI}/user/add/wish`, {
            token,
            wish
        });

        return response.data;
    },
    getWishList: async (token: string) => {
        const response = await axios.post(`${BASEAPI}/user/show/wishlist`, {
            token
        });

        return response.data;
    },
    getProductsWish: async (token: string) => {
        const response = await axios.post(`${BASEAPI}/user/show/wishproducts`, {
            token
        });

        return response.data;
    },
    getBanners: async () => {
        const response = await axios.get(`${BASEAPI}/banner`);

        return response.data;
    },
    getProduct: async (id: string, token?: string) => {
        const response = await axios.post(`${BASEAPI}/ad/${id}`,{
            token
        });

        return response.data;
    },
    addToCart: async (token: string ,product: string, amount: number) => {
        const response = await axios.post(`${BASEAPI}/cart/add`, {
            token,
            product,
            amount
        });

        return response.data;
    },
    getCart: async (token: string) => {
        const response = await axios.post(`${BASEAPI}/cart/get`, {
            token
        });

        return response.data;
    },
    getProductCart: async (token: string) => {
        const response = await axios.post(`${BASEAPI}/cart/show/cartproducts`, {
            token
        });

        return response.data;
    },
    deleteToCart: async (token: string, product: string) => {
        const response = await axios.post(`${BASEAPI}/cart/del`, {
            token,
            product
        });

        return response.data;
    },
    getDeliveryPriceAndValue: async (product: string, zipCode?: string, token?: string) => {
        const response = await axios.post(`${BASEAPI}/frete`, {
            zipCode,
            token,
            product
        });

        return response.data;
    },
    getDeliveryInfo: async (zipCode: string, productId: string) => {
        const response = await axios.post(`${BASEAPI}/delivery/price`, {
            zipCode,
            productId
        });
        return response.data;
    }
};