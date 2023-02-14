import { loadPlugin } from 'immer/dist/internal';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { Api } from '../api/Api';
import { BannersType } from '../types/types';

let count = 0;
let time: number = 0;
let inter: number = 0;

export const Slides = () => {

    const [banners, setBanners] = useState<BannersType[]>([]);
    const [slideState, setSlideState] = useState<number[]>([]);

    const [restart, setRestart] = useState(false);

    const testRef = useRef(document.createElement("div"));

    useEffect(() => {
        getBanners() 
    },[])
    
    const slides: number[] = [];

    useEffect(() => {

        console.log('disparei o efect')
        if(count === 0 && banners.length > 0) {
            
            if(time === 0 && inter === 0 ) {
                
                console.log('nao entrei aqui')
                banners.map((item) => {
                    const slide = document.querySelector(`#${item.public_id}`);
                    const position = slide?.getBoundingClientRect();
                    if(position) {
                        slides.push(position.left);
                    }
                })

                setSlideState(slides);
        
            }

            console.log('entrei aqui')
            slideScroll();

        }

        return () => {
            clearTimeout(time);
        }

    },[banners, restart]);

    const getBanners = async () => {

        const response = await Api.getBanners();

        setBanners(response.banners);

    }

    const timetmp = () => {
        if(count === 0) {
            console.log(count);
            count = 1;
            return 4000;
        }
        if(count === 1) {
            console.log(count);
            count = 2;
            return 8000;
        }
        if(count === 2) {
            console.log(count);
            count = 3;
            return 12000;
        }
        if(count === 3) {
            console.log(count);
            count = 0;
            return 16000;
        }
    }


    const slideScroll = () => {

        if(slides.length > 0 ) {
            slides.map((item) => {
                time = setTimeout(() => {
    
    
                    testRef.current.scrollTo(item, 0)
                    console.log(item);
    
    
                    if(item === 928) {
    
                        console.log('passei')
                        restart ? setRestart(false) : setRestart(true);
                    }
    
    
                }, timetmp());
            });
        }

        if(slideState.length > 0 ) {
            slideState.map((item) => {
                time = setTimeout(() => {
    
    
                    testRef.current.scrollTo(item, 0)
                    console.log(item);
    
    
                    if(item === 928) {
    
                        console.log('passei')
                        restart ? setRestart(false) : setRestart(true);
                    }
    
    
                }, timetmp());
            });
        }

        
    }

    const handlerPauseSlide = () => {
        clearInterval(inter);
        clearTimeout(time);
    }

    return (
        <>
            <div ref={testRef} className="h-[150px] w-[100vw] pl-[5vw] pr-[5vw] gap-[5vw] flex bg-gradient-to-b from-primary to-stone-100 overflow-y-hidden scroll-pl-[5vw] snap-x scroll-smooth">
                {banners.map((item) => (
                    <Link key={item.public_id} to='/' id={item.public_id} className=" snap-start min-w-[90vw] rounded-md cursor-pointer border-2 border-primary bg-cover transition-all ease-in-out duration-200" style={{backgroundImage: `url(${item.url})`}}>
                    </Link>
                ))}
            </div>
            <div className='mt-[-22px] pb-[14px] flex justify-center gap-5'>
                {banners.map((item) => (
                    <a key={item.public_id} className='w-2 h-2 rounded-full bg-primary transition-all ease-in-out duration-200 active:opacity-0 active:scale-[4.0]' href={`#${item.public_id}`} onClick={handlerPauseSlide}></a>
                ))}
            </div>
        </>
    );

};