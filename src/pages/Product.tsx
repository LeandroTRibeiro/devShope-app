import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Api } from "../api/Api";
import { Header } from "../components/Header";
import { DeliveryInfoType, DestinationType, ProductItem } from "../types/types";
import { ArrowUpLeftIcon, ClipboardDocumentCheckIcon, MapPinIcon, ShieldCheckIcon, TruckIcon } from "@heroicons/react/24/outline";
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import { Button } from "../components/Button";
import { getCookie } from "../helpers/Cookie";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducers/cartList";
import { useAppSelector } from "../redux/hooks/useAppSelector";
import { IsWish } from "../components/IsWish";
import { ToShare } from "../components/ToShare";
import { Footer } from "../components/Footer";
import { Loader } from "../components/Loader";
import { Rating } from "../components/Rating";
import { SelectQuantity } from "../components/SelectQuantity";
import { ProductPrice } from "../components/ProductPrices";
import { DontFreeDelivery } from "../components/DontFreeDelivery";

export const Product = () => {

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLogin = useAppSelector(state => state.isLogin.status);

    const [product, setProduct] = useState<ProductItem>();
    const [others, setOthers] = useState<ProductItem[]>([]);
    const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfoType[]>([]);
    const [destination, setDestination] = useState<DestinationType>();

    const [amount, setAmount] = useState(0);
    const [amountInput, setAmountInput] = useState(false);

    const [url, setUrl] = useState('');
    const [alt, setAlt] = useState('');

    useEffect(() => {
        getProduct();
    },[params.id])
    
    const getProduct = async () => {

        const token = getCookie();

        const response = await Api.getProduct(params.id as string, token);

        setProduct(response.product);
        setOthers(response.others);
        setDeliveryInfo(response.delivery);
        setDestination(response.destination);

    }

    const handlerChangeImage = (url: string, alt: string) => {
        setUrl(url);
        setAlt(alt);
    }

    const handlerAddToCart = async (product: string, amount: number, stock: number) => {

        if(amount === 0) {
            amount = 1;
        }

        const token = getCookie();

        if(token) {

            const response = await Api.addToCart(token, product, amount);

            dispatch(addToCart({product, amount, stock}));

        } else {
            navigate('/');
        }

    }

    const changeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if(+e.target.value === 6) {
            setAmountInput(true);
            setAmount(0);
            return;

        } else {
            setAmountInput(false)
            setAmount(+e.target.value);
        }
    }

    const changeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(product) {
            if(+e.target.value > product.stock) {
                setAmount(product.stock);
            } else {
                setAmount(+e.target.value);
            }
        }
    }

    const sumQuantity = () => {
        if(amount === product?.stock) {
            return;
        } else {
            setAmount(amount + 1);
        }
    }

    const lessQuantity = () => {
        if(amount === 0) {
            return;
        } else {
            setAmount(amount - 1);
        }
    }

    return (
        <>
            {product &&
                <>
                    <Header />
                    <div className="bg-stone-100 flex flex-col overflow-x-hidden pb-5">
                        <div className="grid grid-cols-4 gap-2 p-2">
                            <div className="col-start-1 col-end-5 flex flex-col">
                                <h1 className="text-lg font-semibold">{product.title}</h1>
                                <div className="flex justify-between items-end">
                                    <p className="text-sm">{product.description}</p>
                                    <Rating rating={product.rating.totalRating} />
                                </div>
                            </div>
                            <div className="col-start-1 col-end-5">
                                <img src={url ? url : product?.images[0].url} alt={alt ? alt : product?.images[0].public_id} className='bg-white rounded-md shadow-md p-5'/>
                            </div>
                            <div className="col-start-1 col-end-5 grid grid-cols-4 gap-2">
                                {product.images.map((item) => (
                                    <img key={item.public_id} src={item.url} alt={item.public_id} className='rounded-md opacity-80 hover:opacity-100 cursor-pointer shadow-md' onClick={() => handlerChangeImage(item.url, item.public_id)}/>
                                ))}
                            </div>
                            <div className="col-start-1 col-end-5 p-2 flex flex-col gap-2">
                                <ProductPrice product={product} small={false} />
                                {product.freeDelivery &&
                                
                                    <div className="flex gap-2">
                                        <TruckIcon className="text-green-500 w-5"/>
                                        <div className="font-semibold text-green-500">Frete Grátis!</div>
                                    </div>    

                                }
                                {!product.freeDelivery &&
                                    <DontFreeDelivery deliveryInfo={deliveryInfo} destination={destination} productId={product._id} />
                                }
                                {product.stock > 1 &&
                                    <>
                                        <div className="text-stone-800 font-semibold text-sm">{product.stock} unidades disponíveis!</div>
                                        <SelectQuantity stock={product.stock} onChange={changeSelect} />
                                    </>
                                }
                                {amountInput &&
                                    <label className="input-group">
                                        <span className="btn btn-primary" onClick={lessQuantity}>-</span>
                                        <input
                                            type="number"
                                            value={amount <= 0 ? '' : amount}
                                            placeholder={`${product.stock} disponíveis`}
                                            onChange={changeQuantity}
                                            className='w-full border-2 border-primary p-2 outline-none appearance-none	'
                                        />
                                        <span className="btn btn-primary" onClick={sumQuantity}>+</span>
                                    </label>
                                }
                                <Button name={'Comprar agora'} onClick={() => console.log(amount)} />
                                <Button name={'Adicionar ao carrinho'} style={'bg-blue-300 text-primary'} onClick={() => handlerAddToCart(product._id, amount, product.stock)}/>
                            </div>
                        </div>
                        <div className="">
                            <div className="flex items-start p-2 gap-1">
                                <ArrowUpLeftIcon className="w-[25px] text-stone-800 mt-1"/>
                                <div className="text-stone-800 text-sm"><span className="text-primary">Devolução grátis.</span> Você tem 30 dias a partir da data de recebimento.</div>
                            </div>
                            <div className="flex items-start p-2 gap-1">
                                <ShieldCheckIcon className="w-[30px] text-stone-800 mt-1"/>
                                <div className="text-stone-800 text-sm"><span className="text-primary">Compra Garantida.</span> Receba o produto que está esperando ou devolvemos o dinheiro.</div>
                            </div>
                            <div className="flex items-start p-2 gap-1">
                                <ClipboardDocumentCheckIcon className="w-[17px] text-stone-800 mt-1"/>
                                <div className="text-stone-800 text-sm">12 meses de garantia de fábrica.</div>
                            </div>
                            <div className="flex gap-2 justify-center mt-2">
                                <IsWish id={product._id} />
                                <div className="text-primary">Adicionar ao favorito</div>
                            </div>
                            <div className="flex gap-2 justify-center items-center mt-2 pb-5 border-b-2" >
                                <ToShare title={product.title} text={product.description} url={`product/${product._id}`} />
                                <div className="text-primary">Compartilhar</div>
                            </div>
                            <div className="text-stone-800 p-2">Produtos que talvez seja de seu interesse:</div>
                            <div className="flex w-[100vw] pl-[5vw] pr-[5vw] pb-2 gap-[5vw] overflow-y-hidden scroll-pl-[5vw] snap-x scroll-smooth">
                                {others.map((item) => (
                                    <div key={item._id} className="snap-start min-w-[90vw] bg-white rounded-md flex gap-2 p-1 shadow-md items-center hover:bg-stone-200 transition-all ease-in-out duration-200">
                                        <Link to={`/product/${item._id}`}>
                                            <img
                                                src={item.thumbnail.url}
                                                alt={item.title}
                                                className="rounded-md w-16"
                                            />
                                        </Link>
                                        <div className="flex-1 flex justify-between items-start">
                                            <Link to={`/product/${item._id}`} className="leading-none">
                                                <h1 className="text-stone-800 text-sm">{item.title}</h1>
                                                <ProductPrice product={item} small={true}/>
                                                {item.freeDelivery &&
                                                    <p className="text-green-500 text-xs">Frete Grátis!</p>
                                                }
                                            </Link>
                                            <IsWish id={item._id} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <ul className="p-2 mt-2 border-t-2 flex flex-col gap-2">
                                Características:
                                {product.characteristics.map((item) => (
                                    <li className="flex items-start gap-1" key={item.length}>
                                        <CheckBadgeIcon className="text-primary w-4" />
                                        <div className="flex-1 leading-4	">{item}</div>
                                    </li>
                                ))}
                            </ul>
                            <ul className="p-2 mt-2 border-t-2 flex flex-col gap-2">
                                Dimensões:
                                <li className="flex gap-2">
                                    <ClipboardDocumentCheckIcon className="text-primary w-4" />
                                    Altura: {product.height}cm
                                </li>
                                <li className="flex gap-2">
                                    <ClipboardDocumentCheckIcon className="text-primary w-4" />
                                    Largura: {product.width}cm
                                </li>
                                <li className="flex gap-2">
                                    <ClipboardDocumentCheckIcon className="text-primary w-4" />
                                    Comprimento: {product.length}cm
                                </li>
                                <li className="flex gap-2">
                                    <ClipboardDocumentCheckIcon className="text-primary w-4" />
                                    Peso: {product.weight}kg
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Footer />
                </>
            }
            {!product &&
                <Loader />
            }
        </>
    );

};