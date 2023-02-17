import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Api } from "../api/Api";
import { Header } from "../components/Header";
import { Loader } from "../components/Loader";
import { getCookie } from "../helpers/Cookie";
import { Format } from "../helpers/FormatPrice";
import { ProductItem } from "../types/types";
import { ArrowLongLeftIcon, FaceFrownIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { addWish } from '../redux/reducers/wishList';
import { Button } from "../components/Button";
import { ProductPrice } from "../components/ProductPrices";

export const WishList = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [productList, setProductsList] = useState<ProductItem[]>([]);

    useEffect(() => {
        getProducts();
    },[]);

    const getProducts = async () => {

        const token = getCookie();

        if(token) {

            const response = await Api.getProductsWish(token);

            if(response.products) {

                setProductsList(response.products);
                setLoading(false);

            } else {
                setLoading(false);
            }
        }
    };

    const hanblerWishlist = async (wish: string) => {

        const token = getCookie();

        if(token) {

            const response = await Api.addWish(token, wish);

            dispatch(addWish(wish));

            const newList = [] as ProductItem[];

            productList.map((item) => {
                if(item._id != wish) {
                    newList.push(item);
                }
            })

            setProductsList(newList);
    

        } else {
            navigate('/signin');
        }
    }

    return (
        <div>
            <Header />
            {loading &&
                <Loader />
            }
            {!loading &&

                <>
                    {productList.length > 0 &&
                    
                        <>
                        
                            {productList &&
                                <div className="grid grid-cols-1 gap-5 bg-stone-100 overflow-x-hidden p-3">
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
                                                    <ProductPrice product={item} small={true} />
                                                    {item.freeDelivery &&
                                                        <p className="text-green-500 text-xs">Frete Grátis!</p>
                                                    }
                                                </Link>
                                                <TrashIcon className={`w-6 h-6 text-primary cursor-pointer transition-all ease-in-out duration-200 active:opacity-0 active:scale-[4.0]`}  onClick={() => hanblerWishlist(item._id)}/>
                                            </div>
                                        </div>
                                    ))}
                                </div>   
                            }

                        </>

                    }

                    {productList.length === 0 &&
                    
                        <div className="p-5">
                            <div className="border-2 rounded-md shadow-md p-5">
                                <div className="flex flex-col items-center gap-2 mb-5">
                                    <FaceFrownIcon className="text-primary w-14" />
                                    <div className="text-center">Você não tem nenhum produto em sua lista!</div>
                                </div>
                                <Button name={'Vamos mudar isso?'} onClick={() => navigate('/')} />
                            </div>
                        </div>

                    }

                </>
            }
        </div>
    );
};