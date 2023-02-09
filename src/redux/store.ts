import { configureStore } from '@reduxjs/toolkit';
import cartList from './reducers/cartList';
import isLogin from './reducers/isLogin';
import wishList from './reducers/wishList';

export const store = configureStore({
    reducer: {
        isLogin: isLogin,
        wishList: wishList,
        cartList: cartList
    }
});

export type RootState = ReturnType<typeof store.getState>;