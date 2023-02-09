import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Api } from '../api/Api';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Loader } from '../components/Loader';
import { setStatus } from '../redux/reducers/isLogin';

export const Signin = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handlerSignin = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        setLoading(true);
        setDisabled(true);
        setEmailError('');
        setPasswordError('');

        try {

            const response = await Api.signin(email, password);

            if(response.token) {

                setDisabled(false);
                setLoading(false);
                dispatch(setStatus(true));
                navigate('/');
            }

        } catch(error: any) {

            setDisabled(false);
            setLoading(false); 
            
            if(error.response.data.error.email) {
                setEmailError(error.response.data.error.email.msg);
                return;
            }

            if(error.response.data.error.password) {
                setPasswordError(error.response.data.error.password.msg);
                return;
            }

            if(error.response.data.error.login) {
                setEmailError(error.response.data.error.login.msg);
                setPasswordError(error.response.data.error.login.msg);
                return;
            }

            if(error.response.data.error.validated) {
                navigate('/validateaccount');
                return;
            }
            
        }


        


    };

    return (
        <>
            {loading &&
                <Loader />
            }
            {!loading &&
                <div className="h-[100vh] flex justify-center items-center">
                    <form className="w-[90vw] border-2 rounded-md shadow-md p-5 flex flex-col justify-center items-center gap-5" onSubmit={handlerSignin}>  
                        <div className="text-center">
                            <h1 className="text-3xl font-bold text-primary">devShope</h1>
                            <p className="text-stone-800 font-semibold">Faça o Login</p>
                        </div>
                        <label className="flex flex-col justify-center w-full">
                            <span className="text-stone-800 font-semibold">E-mail</span>
                            <Input type={'Email'} placeholder={'Digite seu E-mail'} value={email} onChange={changeEmail} required={true} disabled={disabled} />
                            {emailError &&
                                <span className='text-red-600 text-sm'>{emailError}</span>
                            }
                        </label>
                        <label className="flex flex-col justify-center w-full">
                            <div className='flex justify-between items-center'>
                                <span className="text-stone-800 font-semibold">Senha</span>
                                <Link to='/recover' className='text-primary text-sm'>Esqueceu a Senha?</Link>
                            </div>
                            <div className='flex items-center justify-end'>
                                {showPassword &&
                                    <EyeSlashIcon className='w-5 absolute mr-2 cursor-pointer' onClick={() => setShowPassword(false)}/>
                                }
                                {!showPassword &&
                                    <EyeIcon className='w-5 absolute mr-2 cursor-pointer' onClick={() => setShowPassword(true)}/>
                                }
                                <Input type={`${showPassword ? 'text' : 'password'}`} placeholder={'Digite sua Senha'} value={password} onChange={changePassword} required={true} disabled={disabled} />
                            </div>
                            {passwordError &&
                                <span className='text-red-600 text-sm'>{passwordError}</span>
                            }
                        </label>
                        <Button name={'Entrar'} disabled={disabled} />
                        <p>Não tem conta? <Link to='/register' className='text-primary'>Cadastre-se</Link></p>
                    </form>
                </div>
            }
        </>
    );
};