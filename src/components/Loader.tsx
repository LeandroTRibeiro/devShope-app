import { PuffLoader } from "react-spinners";
import { LoaderProps } from "../types/types";

export const Loader = (Props: LoaderProps) => {
    return (
        <div className={`flex justify-center items-center ${Props?.bg} ${Props.page ? Props.page : 'h-[100vh]'}`}>
            <PuffLoader 
                color="#4406CB"
                size={Props.size ? Props.size : 250}
            />
        </div>
    ); 
};