import { createSlice } from "@reduxjs/toolkit";
import { WishListType } from "../../types/types";

export const slice = createSlice({
    name: 'wishList',
    initialState: {
        wishList: {
            idUser: '',
            product: [
                { idProduct: '' }
            ]
        } as WishListType
    },
    reducers: {
        addWish: (state, action) => {

            const index = state.wishList.product.findIndex((item) => {
                if(item.idProduct === action.payload) {
                    return true;
                }
            });

            if(index >= 0) {

                state.wishList.product.splice(index, 1);

            } else {
                state.wishList.product.push({
                    idProduct: action.payload
                });
            }

        },
        setWishList: (state, action) => {
            state.wishList = action.payload;
        },

    }
});

export const { addWish, setWishList } = slice.actions;
export default slice.reducer;