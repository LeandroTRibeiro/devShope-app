import { SelectQuantityType } from "../types/types";

export const SelectQuantity = (Props: SelectQuantityType) => {

    return (
        <select className="bg-stone-300 h-12 rounded-md p-2 border-none outline-none" onChange={Props.onChange}>
            <option className="bg-white" value={1}>1 unidade</option>
            {Props.stock >= 2 &&
                <option className="bg-white" value={2}>2 unidades</option>
            }
            {Props.stock >= 3 &&
                <option className="bg-white" value={3}>3 unidades</option>
            }
            {Props.stock >= 4 &&
                <option className="bg-white" value={4}>4 unidades</option>
            }
            {Props.stock >=5 &&
                <option className="bg-white" value={5}>5 unidades</option>
            }
            {Props.stock > 5 &&
                <option className="bg-white" value={6}>mais de 5 unidades</option>
            }
        </select>
    );
}