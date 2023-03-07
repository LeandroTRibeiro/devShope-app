import { useState } from "react";

import { Api } from "../api/Api";

import { Delivery } from "../helpers/DeliveryTime";

import { Loader } from './Loader';

import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { DeliveryInfoType, DeliveryPriceCalculateType } from "../types/types";

export const DeliveryPriceCalculate = (props: DeliveryPriceCalculateType) => {

    const [zipCode, setZipeCode] = useState('');
    const [validZipCode, setValidZipCode] = useState('');

    const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfoType[]>([]);

    const [loading, setLoading] = useState(false);


    const changeZipCode = (e: React.ChangeEvent<HTMLInputElement>) => {

        setZipeCode(e.target.value.replace(/[^0-9,-]/g,''));

    }

    const handlerDelivery = async () => {

        setLoading(true);

        const regex = /[^0-9]/g;

        const cleanZipCode = zipCode.replace(regex,'');

        if(cleanZipCode.length === 8) {

            setValidZipCode('');

            if(props.product) {

                const response = await Api.getDeliveryInfo(cleanZipCode, props.product);

                if(response.deliveryInfo.delivery) {

                    setLoading(false);
                    setValidZipCode(response.deliveryInfo.delivery);

                } else {

                    setLoading(false);
                    setDeliveryInfo(response.deliveryInfo);
                }
            }

        } else {

            setLoading(false);
            setValidZipCode('Digite um CEP valido!');

        }

    }

    return (
        <>
            {loading &&
                <Loader page="h-[100px]" size={100}/>
            }
            {deliveryInfo.length > 0 && !loading && !validZipCode &&
            
                <div className="flex flex-col gap-2 text-xs">
                    <div className="text-xs">
                        {`Chegará até você ${Delivery.getTime(deliveryInfo[0].PrazoEntrega, deliveryInfo[0].EntregaSabado)} por R$${deliveryInfo[0].Valor}`}
                    </div>  
                    ou
                    <div className="text-xs">
                        {`Chegará até você ${Delivery.getTime(deliveryInfo[1].PrazoEntrega, deliveryInfo[1].EntregaSabado)} por R$${deliveryInfo[1].Valor}`}
                    </div>
                </div>
            
            }
            <label className="flex flex-col gap-2">
                <span className="text-sm">Calcular frete:</span>
                <div className="input-group">
                    <input 
                        type="text"
                        placeholder="Digite o CEP"
                        value={zipCode}
                        className="w-full border-2 border-primary p-2 outline-none appearance-none"
                        onChange={changeZipCode}
                    />
                    <span className="btn btn-primary" onClick={handlerDelivery}>OK</span>
                </div>
                {validZipCode &&
                        <span className="flex gap-1 text-sm text-red-600">
                            <ExclamationCircleIcon className="w-5"/>
                            {validZipCode}
                        </span>
                }
            </label>
        </>
    );
};