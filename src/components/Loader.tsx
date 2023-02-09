import { PuffLoader } from "react-spinners";
import { LoaderProps } from "../types/types";

export const Loader = (Props: LoaderProps) => {
    return (
        <div className={`h-[100vh] flex justify-center items-center ${Props?.bg}`}>
            <PuffLoader 
                color="#4406CB"
                size={250}
            />
        </div>
    ); 
};