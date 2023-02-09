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
                if(item.idProduct === action.payload) {
                    return true;
                }
            });
            
            if(index >= 0) {
                state.cartList.product[index].amout++;
            } else {
                state.cartList.product.push({
                    idProduct: action.payload,
                    amout: action.payload
                });
            }
        },
        setCart: (state, action) => {
            state.cartList = action.payload;
        }
    }
});

export const { addToCart, setCart } = slice.actions;
export default slice.reducer;