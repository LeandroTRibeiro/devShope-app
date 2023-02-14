import { createSlice } from "@reduxjs/toolkit";
import { CartListType, ProductItem } from "../../types/types";

export const slice = createSlice({
    name: 'cartList',
    initialState: {
        cartList: {
            idUser: '',
            product: [
                { idProduct: '', amout: 0 }
            ]
        } as CartListType
    },
    reducers: {
        addToCart: (state, action) => {
            const index = state.cartList.product.findIndex((item) => {
                if(item.idProduct === action.payload.product) {
                    return true;
                }
            });
            
            if(index >= 0) {
                state.cartList.product[index].amout = action.payload.stock < (state.cartList.product[index].amout + action.payload.amount) ? action.payload.stock : state.cartList.product[index].amout + action.payload.amount;
            } else {
                state.cartList.product.push({
                    idProduct: action.payload.product,
                    amout: action.payload.stock < action.payload.amount ? action.payload.stock : action.payload.amount
                });
            }
        },
        setCart: (state, action) => {
            state.cartList = action.payload;
        },
        deleteToCart: (state, action) => {
            const index = state.cartList.product.findIndex((item) => {
                if(item.idProduct === action.payload) {
                    return true;
                }
            });

            if(index >= 0) {
                state.cartList.product.splice(index, 1);
            }
        }
    }
});

export const { addToCart, setCart, deleteToCart } = slice.actions;
export default slice.reducer;