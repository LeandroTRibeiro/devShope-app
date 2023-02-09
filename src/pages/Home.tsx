import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import { Link } from 'react-router-dom';

import { Api } from "../api/Api";

import { Header } from "../components/Header";
import { Loader } from "../components/Loader";
import { Slides } from "../components/Slides";
import { IsWish } from "../components/IsWish";

import { Format } from "../helpers/FormatPrice";

import { ProductItem } from "../types/types";

export const Home = () => {

    const [productList, setProductList] = useState<ProductItem[]>([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        products();
    },[])

    const products = async () => {
        setLoading(true);
        const response = await Api.products();
        setLoading(false);
        setProductList(response.ads);
        
    }

    return (
        <div className="">
            <Header />
            <Slides />
            <div className="bg-stone-100 overflow-x-hidden p-3">
                {loading &&
                    <Loader bg={"bg-stone-100"} />
                }
                {!loading &&
                    <div className="grid grid-cols-1 gap-5">
                        {productList.map((item) => (
                            <div key={item._id} className="bg-white rounded-md flex gap-2 p-1 shadow-md items-center hover:bg-stone-200 transition-all ease-in-out duration-200">
                                <Link to={`/product/${item._id}`}>
                                    <img
                                        src={item.thumbnail.url}
                                        alt={item.title}
                                        className="rounded-md w-16"
                                    />
                                </Link>
                                <div className=" flex-1 flex justify-between items-start">
                                    <Link to={`/product/${item._id}`} className="">
                                        <h1 className="text-stone-800 text-sm">{item.title}</h1>
                                        <p className="text-stone-800 text-base font-semibold">{Format.price(item.price)}</p>
                                        <p className="text-green-500 text-xs">10x {Format.installment(item.price, 10)}</p>
                                        {item.freeDelivery &&
                                            <p className="text-green-500 text-xs">Frete Grátis!</p>
                                        }
                                    </Link>
                                    <IsWish id={item._id} />
                                </div>
                            </div>
                        ))}
                    </div>
                }
            </div>
        </div>
    );
};