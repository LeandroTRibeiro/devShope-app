import { ProductPriceProps } from "../types/types";

import { Format } from "../helpers/FormatPrice";

export const ProductPrice = (Props: ProductPriceProps) => {

    return (
        <>
            {Props.product.discount > 0 &&
                <div className="">

                    <s className={`${Props.small ? 'text-xs' : 'text-base'}`}>
                        {Format.price(Props.product.price)}
                    </s>

                    <div className={`font-semibold  tracking-tight text-stone-800 ${Props.small ? 'text-base' : 'text-3xl'}`}>
                        {Format.discountPrice(Props.product.price, Props.product.discount)}
                        <span className={`text-green-500 font-normal ${Props.small ? 'text-sm' : 'text-base'}`}> 
                            {` ${Props.product.discount}%OFF ${Props.small ? '' : 'a vista!'}`}
                        </span>
                    </div>
                    {Props.product.installment > 0 &&
                        <>
                        {Props.product.discountWithInstallment &&
                            <div className={`text-green-500 ${Props.small ? 'text-xs' : 'text-sm'}`}>
                                {`${Props.small ? '' : 'ou em até '}${Props.product.installment}x de ${Format.installmentWithDiscount(Props.product.price, Props.product.installment, Props.product.discount)}`}
                            </div>
                        }
                        {!Props.product.discountWithInstallment &&
                            <div className={`text-green-500 ${Props.small ? 'text-xs' : 'text-sm'}`}>
                                {`${Props.small ? '' : 'ou em até '}${Props.product.installment}x de ${Format.installment(Props.product.price, Props.product.installment)}`}
                            </div>
                        }
                        </>
                    }
                </div>
            }
            {Props.product.discount <= 0 &&
                <div>
                    <div className={`font-semibold tracking-tight text-stone-800 ${Props.small ? 'text-base' : 'text-3xl'}`}>
                        {Format.price(Props.product.price)}
                    </div>
                    {Props.product.installment > 0 &&
                        <div className={`text-green-500 ${Props.small ? 'text-xs' : 'text-sm'}`}>
                            {`${Props.small ? '' : 'ou em até'} ${Props.product.installment}x de ${Format.installment(Props.product.price, 10)}`}
                        </div>
                    }
                </div>
            }
        </>
    );
}