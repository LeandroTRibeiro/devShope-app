import { RouterList } from "./routes/RouterList";

import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { setCart } from "./redux/reducers/cartList";

import { setStatus } from "./redux/reducers/isLogin";
import { setWishList } from "./redux/reducers/wishList";

import { getCookie } from "./helpers/Cookie";
import { Api } from "./api/Api";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    isLogin();
  },[]);

  const isLogin = async () => {

    const token =  getCookie();

    if(token) {

        try {
            const response = await Api.signinAutomatic(token);
        
            if(response.token) {
                dispatch(setStatus(true));
                getWishList(response.token);
                getCartList(response.token);
            };

        } catch(error) {
            dispatch(setStatus(false));
        };
    };

  };

  const getWishList = async (token: string) => {

    const response = await Api.getWishList(token);

    if(response.wishList) {
        dispatch(setWishList(response.wishList));
    };

  };

  const getCartList = async (token: string) => {
    const response = await Api.getCart(token);

    if(response.cartList) {
      dispatch(setCart(response.cartList));
    };

  };

  return (
    <div>
      <RouterList />
    </div>
  );
};

export default App;
