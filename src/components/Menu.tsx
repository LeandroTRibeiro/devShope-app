import { ArrowLeftOnRectangleIcon, ArrowRightOnRectangleIcon, HeartIcon, HomeIcon, ShoppingCartIcon, UserIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { delCookie } from "../helpers/Cookie";
import { useAppSelector } from "../redux/hooks/useAppSelector";
import { setStatus } from "../redux/reducers/isLogin";

export const Menu = () => {

    const dispatch = useDispatch();

    const isLogin = useAppSelector(state => state.isLogin);

    const [menu, setMenu] = useState(false);

    const hanlderLogout = () => {
        delCookie();
        dispatch(setStatus(false));
    }

    return (
        <div className="flex justify-center items-center">
            <label className={`swap swap-rotate z-50 transition-all ease-in-out duration-700 ${menu ? 'left-[72vw]' : 'left-0'}`}>
                <input 
                    type="checkbox" 
                    onChange={() => menu ? setMenu(false) : setMenu(true)}
                />
                    <svg className="swap-off fill-stone-800" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512">
                        <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"/>
                    </svg>
                    <svg className="swap-on fill-stone-800" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512">
                        <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"/>
                    </svg>
            </label>
            <nav className={`z-40 flex flex-col bg-primary h-[100vh] w-[85vw] absolute top-0 transition-all ease-in-out duration-500 ${menu ? 'left-0' : 'left-[-85vw]'}`}>

                <Link to='/' className={'flex gap-5 p-5 hover:bg-primary-focus transition-all ease-in-out duration-300 hover:scale-x-[1.02]'}>
                    <HomeIcon className={'w-5 text-stone-800'} />
                    Início
                </Link>
                {!isLogin.status &&
                    <Link to='/signin' className={'flex gap-5 p-5 hover:bg-primary-focus transition-all ease-in-out duration-300 hover:scale-x-[1.02]'}>
                        <ArrowRightOnRectangleIcon className={'w-5 text-stone-800'} />
                        Entrar
                    </Link>
                }

                {isLogin.status &&
                    <div>
                        <Link to='/wishlist' className={'flex gap-5 p-5 hover:bg-primary-focus transition-all ease-in-out duration-300 hover:scale-x-[1.02]'}>
                            <HeartIcon className={'w-5 text-stone-800'} />
                            Lista de Desejos
                        </Link>
                        <Link to='/cart' className={'flex gap-5 p-5 hover:bg-primary-focus transition-all ease-in-out duration-300 hover:scale-x-[1.02]'}>
                            <ShoppingCartIcon className={'w-5 text-stone-800'} />
                            Carrinho de Compras
                        </Link>
                        <Link to='/' className={'flex gap-5 p-5 hover:bg-primary-focus transition-all ease-in-out duration-300 hover:scale-x-[1.02]'}>
                            <UserIcon className={'w-5 text-stone-800'} />
                            Perfil
                        </Link>
                        <div 
                            className={'flex gap-5 p-5 hover:bg-primary-focus transition-all ease-in-out duration-300 hover:scale-x-[1.02]'}
                            onClick={hanlderLogout}
                        >
                            <ArrowLeftOnRectangleIcon className={'w-5 text-stone-800'}/>
                            Sair
                        </div>
                    </div>
                }
            </nav>
        </div>
    );
};