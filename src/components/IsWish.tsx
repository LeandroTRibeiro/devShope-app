import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { addWish } from "../redux/reducers/wishList";
import { useAppSelector } from "../redux/hooks/useAppSelector";

import { IsWishProps } from "../types/types";

import { getCookie } from "../helpers/Cookie";

import { Api } from "../api/Api";

import { HeartIcon } from "@heroicons/react/24/outline";

export const IsWish = (Props: IsWishProps) => {

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

        <HeartIcon className={`h-[30px] text-primary cursor-pointer transition-all ease-in-out duration-200 active:opacity-0 active:scale-[4.0] ${setHeart() ? 'fill-primary' : ''}`} onClick={() => hanblerWishlist(Props.id)}/>

    );

}