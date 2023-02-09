import { ShareIcon } from "@heroicons/react/24/outline";
import { ToShareType } from "../types/types";

export const ToShare = (Props: ToShareType) => {

    const share = async (title: string, text: string, url: string) => {
        if(navigator.share != undefined) {
            try {
                await navigator.share({
                    title,
                    text,
                    url
                });
            } catch(error) {
                console.log(error);
            }
        }
    }

    return (
        <ShareIcon className="text-primary w-5 cursor-pointer" onClick={() => share(Props.title, Props.text, `http://127.0.0.1:5173/${Props.url}`)}/>
    );
}