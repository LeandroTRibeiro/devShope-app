import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Api } from '../api/Api';
import { BannersType } from '../types/types';

let count = 0;

let time: number = 0;
let inter: number = 0;

export const Slides = () => {

    const [banners, setBanners] = useState<BannersType[]>([]);

    useEffect(() => {
        getBanners() 
    },[])

    useEffect(() => {
        if(count === 0 && banners.length > 0 && inter === 0 && time === 0) {
            slideScroll();
            inter = setInterval(() => {
                slideScroll();
            }, 16000)
        }
    },[banners]);

    const getBanners = async () => {

        const response = await Api.getBanners();

        setBanners(response.banners);

    }

    const timetmp = () => {
        if(count === 0) {
            count = 1;
            return 4000;
        }
        if(count === 1) {
            count = 2;
            return 8000;
        }
        if(count === 2) {
            count = 3;
            return 12000;
        }
        if(count === 3) {
            count = 0;
            return 16000;
        }
    }

    const slideScroll = () => {

        banners.map((item) => {

            time = setTimeout(() => {
                const slide = document.querySelector(`#${item.public_id}`);
                slide?.scrollIntoView();
            }, timetmp())

        })

    }

    const handlerPauseSlide = () => {
        clearInterval(inter);
        clearTimeout(time);
    }

    return (
        <>
            <div className="h-[150px] w-[100vw] pl-[5vw] pr-[5vw] gap-[5vw] flex bg-gradient-to-b from-primary to-stone-100 overflow-y-hidden scroll-pl-[5vw] snap-x scroll-smooth">
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