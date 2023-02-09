import { PropsButton } from "../types/types";

export const Button = (Props: PropsButton) => {
    return (
        <button 
            className={`w-full ${Props.style ? Props.style : 'bg-primary'} p-2 rounded-md text-white tracking-wider hover:opacity-75 transition-all ease-in-out duration-300 active:primary active:scale-90`}
            disabled={Props.disabled}
            onClick={Props.onClick}
        >
            {Props.name}
        </button>
    );
};