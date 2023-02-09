import { IsWishType } from "../types/types";
import { getCookie } from "../helpers/Cookie";
import { Api } from "../api/Api";
import { addWish } from "../redux/reducers/wishList";

import { HeartIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks/useAppSelector";
import { useEffect, useState } from "react";

export const IsWish = (Props: IsWishType) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const wishList = useAppSelector(state => state.wishList.wishList);

    const setHeart = () => {
        const index = wishList.product.findIndex((item) => {
            if(item.idProduct === Props.id) {
                return true;
            }
        });

        if(index >= 0) {
            return true;
        } else {
            return false;
        }
    }

    const hanblerWishlist = async (wish: string) => {

        const token = getCookie();

        if(token) {

            const response = await Api.addWish(token, wish);   
            dispatch(addWish(wish)); 

        } else {
            navigate('/signin');
        }
    }

    return (

        <HeartIcon className={`w-7 h-7 text-primary cursor-pointer transition-all ease-in-out duration-200 active:opacity-0 active:scale-[4.0] ${setHeart() ? 'fill-primary' : ''}`} onClick={() => hanblerWishlist(Props.id)}/>

    );

}