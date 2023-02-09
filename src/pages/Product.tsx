import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Api } from "../api/Api";
import { Header } from "../components/Header";
import { ProductItem } from "../types/types";
import { Format } from "../helpers/FormatPrice";
import { ArrowUpLeftIcon, ClipboardDocumentCheckIcon, ShieldCheckIcon, TruckIcon } from "@heroicons/react/24/outline";
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

export const Product = () => {

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [product, setProduct] = useState<ProductItem>();
    const [others, setOthers] = useState<ProductItem[]>([]);

    const [quantity, setQuantity] = useState(0);
    const [quantityInput, setQuantityInput] = useState(false);
    const [stockFail, setStockFail] = useState(false);

    const [url, setUrl] = useState('');
    const [alt, setAlt] = useState('');

    useEffect(() => {
        getProduct();
    },[params.id])

    const getProduct = async () => {

        const response = await Api.getProduct(params.id as string);

        setProduct(response.product);
        setOthers(response.others);
    }

    const handlerChangeImage = (url: string, alt: string) => {
        setUrl(url);
        setAlt(alt);
    }

    const handlerAddToCart = async (product: string, quantity: number) => {

        const token = getCookie();

        if(token) {

            const response = await Api.addToCart(token, product);
            dispatch(addToCart(product, quantity));

        } else {
            navigate('/');
        }

    }

    const changeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if(+e.target.value === 6) {
            setQuantityInput(true);
            setQuantity(0);
            return;

        } else {
            setQuantityInput(false)
            setQuantity(+e.target.value);
        }
    }

    const changeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(product) {
            if(+e.target.value > product.stock) {
                setQuantity(product.stock);
            } else {
                setQuantity(+e.target.value);
            }
        }
    }

    const sumQuantity = () => {
        if(quantity === product?.stock) {
            return;
        } else {
            setQuantity(quantity + 1);
        }
    }

    const lessQuantity = () => {
        if(quantity === 0) {
            return;
        } else {
            setQuantity(quantity - 1);
        }
    }

    if(product) {
        return (
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
                            <div>
                                <span><s>{Format.price(product.price)}</s></span>
                                <div className="font-semibold text-3xl tracking-tight text-stone-800">{Format.discountPrice(product.price, product.discount)}<span className="text-green-500 text-base font-normal"> {product.discount}%OFF a vista!</span></div>
                                <div className="text-sm text-green-500">ou em até 10x de {Format.installment(product.price, 10)}</div>
                            </div>
                            {product.freeDelivery &&
                            
                                <div className="flex gap-2">
                                    <TruckIcon className="text-green-500 w-5"/>
                                    <div className="font-semibold text-green-500">Frete Grátis!</div>
                                </div>    

                            }
                            {product.stock > 1 &&
                                <>
                                    <div className="text-stone-800 font-semibold text-sm">{product.stock} unidades disponíveis!</div>
                                    <SelectQuantity stock={product.stock} onChange={changeSelect} />
                                </>
                            }
                            {quantityInput &&
                                <label className="input-group">
                                    <span className="btn btn-primary" onClick={lessQuantity}>-</span>
                                    <input
                                        type="number"
                                        value={quantity <= 0 ? '' : quantity}
                                        placeholder={`${product.stock} disponíveis`}
                                        onChange={changeQuantity}
                                        className='w-full border-2 border-primary p-2 outline-none appearance-none	'
                                    />
                                    <span className="btn btn-primary" onClick={sumQuantity}>+</span>
                                </label>
                            }
                            <Button name={'Comprar agora'} onClick={() => console.log(quantity)} />
                            <Button name={'Adicionar ao carrinho'} style={'bg-blue-300 text-primary'} onClick={() => handlerAddToCart(product._id, quantity)}/>
                        </div>
                    </div>
                    <div className="p-2">
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
                        <ul className="p-2 mt-2 border-t-2 flex flex-col gap-2">
                            Características:
                            {product.characteristics.map((item) => (
                                <li className="flex items-start gap-1" key={item.length}>
                                    <CheckBadgeIcon className="text-primary w-4" />
                                    <div className="flex-1 leading-4	">{item}</div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <Footer />
            </>
        );
    } else {
        return (
          <Loader />  
        );
    };
};