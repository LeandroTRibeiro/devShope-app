import { useEffect, useState } from "react";
import { Api } from "../api/Api";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { getCookie } from "../helpers/Cookie";
import { useAppSelector } from "../redux/hooks/useAppSelector"
import { CartListType , ProductItem, ProductItemCart } from "../types/types";
import { IsWish } from "../components/IsWish";
import { Link, useNavigate } from "react-router-dom";
import { Format } from "../helpers/FormatPrice";
import { Loader } from "../components/Loader";
import { Product } from "./Product";
import { ProductPrice } from "../components/ProductPrices";
import { FaceFrownIcon, ShoppingBagIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { deleteToCart } from "../redux/reducers/cartList";
import { Button } from "../components/Button";

export const CartList = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cartList = useAppSelector(state => state.cartList.cartList.product);

    const [productsList, setProductsList] = useState<ProductItemCart[]>([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getProductCart();
    },[]);

    const getProductCart = async () => {

        const token = getCookie();

        if(token) {

            setLoading(true);

            const response = await Api.getProductCart(token);

            if(response.products) {

                setProductsList(response.products);
                setLoading(false);

            } else {
                setLoading(false);
            }

        } 
    };

    const hanblerToCart = async (product: string) => {

        const token = getCookie();

        if(token) {

            const response = await Api.deleteToCart(token, product);

            dispatch(deleteToCart(product));

            const newList: ProductItemCart[] = []

            productsList.map((item) => {
                if(item._id != product) {
                    newList.push(item);
                }
            })

            setProductsList(newList);

        } else {
            navigate('/signin');
        }

    }

    const changeQuantity = (e: React.ChangeEvent<HTMLInputElement>, id: string, amount: number, stock: number) => {

        if(+e.target.value > stock) {

            const newList = [...productsList];

            newList.map((item) => {
                if(item._id === id) {
                    item.amount = stock;
                } 
            })

            setProductsList(newList);
        } else {
            const newList = [...productsList];

            newList.map((item) => {
                if(item._id === id) {
                    item.amount = +e.target.value;
                }
            });

            setProductsList(newList);
        }

    }

    const sumQuantity = (id: string, amount: number, stock: number) => {
        if(amount === stock) {
            return;
        } else {
            const newList = [...productsList];

            newList.map((item) => {
                if(item._id === id) {
                    item.amount++
                }
            });

            setProductsList(newList);
        }
    }

    const lessQuantity = (id: string, amount: number) => {
        if(amount === 0) {
            return;
        } else {
            const newArray = [...productsList];

            newArray.map((item) => {
                if(item._id === id) {
                    item.amount--;
                }
            });

            setProductsList(newArray);
        }
    }

    if(cartList.length > 0) {
        return (
            <div>
                <Header />
                {loading &&
                    <Loader />
                }
                {!loading &&
                    <div className="grid grid-cols-1 gap-5 p-2">
                        {productsList.map((item) => (
                            <div key={item._id} className="bg-white border-2 rounded-md flex flex-col gap-2 p-2 shadow-md">
                                <div key={item._id} className=" flex  items-center gap-2 hover:bg-stone-200 transition-all ease-in-out duration-200">
                                    <Link to={`/product/${item._id}`}>
                                        <img
                                            src={item.thumbnail.url}
                                            alt={item.title}
                                            className="rounded-md w-16"
                                        />
                                    </Link>
                                    <div className=" flex-1 flex justify-between items-start">
                                        <Link to={`/product/${item._id}`} className="w-36 leading-none">
                                            <h1 className="text-stone-800 text-sm">{item.title}</h1>
                                            <ProductPrice product={item} small={true} /> 
                                            {item.freeDelivery &&
                                                <p className="text-green-500 text-xs">Frete Grátis!</p>
                                            }
                                        </Link>
                                        <TrashIcon className={`w-6 h-6 text-primary cursor-pointer transition-all ease-in-out duration-200 active:opacity-0 active:scale-[4.0]`}  onClick={() => hanblerToCart(item._id)}/>
                                    </div>
                                </div>
                                <div className="flex justify-start items-center gap-2">
                                    <label className="input-group pt-2 pb-2 pr-2">
                                        <span className="btn btn-primary btn-sm" onClick={() => lessQuantity(item._id, item.amount)}>-</span>
                                        <input
                                            type="number"
                                            value={item.amount === 0 ? '' : item.amount}
                                            placeholder={`${item.amount}`}
                                            onChange={(e) => changeQuantity(e, item._id, item.amount, item.stock)}
                                            className='w-full border-2 border-primary p-2 outline-none appearance-none h-8'
                                        />
                                        <span className="btn btn-primary btn-sm" onClick={() => sumQuantity(item._id, item.amount, item.stock)}>+</span>
                                    </label>
                                    <div className="w-full">{`${item.stock} Disponíveis`}</div>
                                </div>
                                <Link to='/' className="btn btn-info btn-outline gap-2 items-center btn-sm">
                                    <ShoppingBagIcon className="w-5" /> 
                                    <div>Comprar agora</div>
                                </Link>
                            </div>
                        ))}
                        <div>
                            <div>Frete</div>
                            <div>Frete de Produtos</div>
                        </div>
                    </div>
                }
                <Footer />
            </div>
        );
    } else {
        return (
                <>
                    <Header />
                    <div className="p-5">
                        <div className="border-2 rounded-md shadow-md p-5">
                            <div className="flex flex-col items-center gap-2 mb-5">
                                <FaceFrownIcon className="text-primary w-14" />
                                <div className="text-center">Você não tem nenhum produto em sua lista!</div>
                            </div>
                            <Button name={'Vamos mudar isso?'} onClick={() => navigate('/')} />
                        </div>
                    </div>
                </>
            );
    }
}