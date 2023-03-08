import { Link } from 'react-router-dom';

import { useAppSelector } from "../redux/hooks/useAppSelector";

import { Delivery } from "../helpers/DeliveryTime";

import { DontFreeDeliveryProps } from "../types/types";

import { DeliveryPriceCalculate } from "../components/DeliveryPriceCalculate";
import { MapPinIcon } from '@heroicons/react/24/outline';

export const DontFreeDelivery = (Props: DontFreeDeliveryProps) => {

    const isLogin = useAppSelector(state => state.isLogin.status);

    return (
        <>
        {isLogin &&
            <div className="flex flex-col gap-2 text-xs">
                <div className="text-xs">
                    {`Chegará até você ${Delivery.getTime(Props.deliveryInfo[0].PrazoEntrega, Props.deliveryInfo[0].EntregaSabado)} por R$${Props.deliveryInfo[0].Valor}`}
                </div>  
                ou
                <div className="text-xs">
                    {`Chegará até você ${Delivery.getTime(Props.deliveryInfo[1].PrazoEntrega, Props.deliveryInfo[1].EntregaSabado)} por R$${Props.deliveryInfo[1].Valor}`}
                </div>
                <Link to='/' className="flex">
                    <MapPinIcon className="w-5 text-green-500"/>
                    <div className="text-green-500 text-sm">{`${Props.destination?.zipCode} - Rua ${Props.destination?.street}`}</div>
                </Link>
            </div>
        }
        {!isLogin &&
            <DeliveryPriceCalculate product={Props.productId}/>
        }
    </>
    );
};