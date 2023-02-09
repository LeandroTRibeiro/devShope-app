import { Menu } from "./Menu";

import { Link } from 'react-router-dom';

import { UserCircleIcon, ShoppingCartIcon, MagnifyingGlassIcon, HeartIcon } from '@heroicons/react/24/outline';
import { useAppSelector } from "../redux/hooks/useAppSelector";

export const Header = () => {

    const isLoin = useAppSelector(state => state.isLogin);
    const wishList = useAppSelector(state => state.wishList.wishList.product);
    const cartList = useAppSelector(state => state.cartList.cartList.product);

    return (
        <div className="flex justify-between items-center h-12 bg-primary gap-1 overflow-hidden">
            <div className="ml-1">
                <Menu />
            </div>
            <div className="flex-1">
                <Link to="/" className="bg-white pr-3 pl-3 pt-1 pb-1 rounded-md flex gap-1">
                    <MagnifyingGlassIcon className="text-stone-800 w-5"/>
                    <div>Buscar no devShope</div>
                </Link>
            </div>
            <div className="mr-1 flex">
                {isLoin.status &&
                    <>
                    <Link to='/wishlist'>
                        {wishList.length === 0 &&
                            <HeartIcon className="w-7 text-stone-800" />
                                
                        }
                        {wishList.length > 0 &&
                            <div className="flex justify-center items-center">
                                <HeartIcon className="w-7 text-stone-800 fill-stone-800" />
                                <span className="absolute text-xs text-white">{wishList.length}</span>
                            </div>
                        }
                    </Link>
                    <Link to='/cart'>
                        {cartList.length === 0 &&
                            <ShoppingCartIcon className="w-7 text-stone-800" />
                        }
                        {cartList.length > 0 &&
                            <div className="flex justify-center items-center">
                                <ShoppingCartIcon className="w-7 text-stone-800 fill-stone-800" />
                                <span className="absolute text-xs text-white">{cartList.length}</span>
                            </div>
                        }
                    </Link>
                    </>
                }
                {!isLoin.status &&
                    <Link to='/signin'>
                        <UserCircleIcon className="w-8 text-stone-800" />
                    </Link>
                }
            </div>
        </div>
    );
};