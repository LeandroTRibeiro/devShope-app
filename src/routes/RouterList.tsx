import { useRoutes } from 'react-router-dom';

import { useAppSelector } from '../redux/hooks/useAppSelector';

import { Home } from '../pages/Home';
import { NotFound } from '../pages/NotFound';
import { Product } from '../pages/Product';
import { Signin } from '../pages/Signin';
import { ValidateAccount } from '../pages/ValidateAccount';
import { WishList } from '../pages/WishList';
import { CartList } from '../pages/CartList';
import { ConectionError } from '../pages/ConectionError';

export const RouterList = () => {

    const isLogin = useAppSelector(state => state.isLogin);

    return useRoutes([
        {path: '*', element: <NotFound />},
        {path: '/', element: <Home />},
        {path: '/reconnection', element: <ConectionError />},
        {path: '/signin', element: <Signin />},
        {path: '/validateaccount', element: <ValidateAccount />},
        {path: '/wishlist', element: isLogin.status ? <WishList /> : <Signin />},
        {path: '/product/:id', element: <Product />},
        {path: '/cart', element: isLogin.status ? <CartList /> : <Signin />},
    ]);
};