import { RatingType } from "../types/types";

export const Rating = (Props: RatingType) => {
    return (
        <div className="rating rating-sm">
            <input type="radio" name="rating-2" className={`mask mask-star-2 ${Props.rating >= 1 ? 'bg-orange-500' : 'bg-orange-300'}`} disabled/>
            <input type="radio" name="rating-2" className={`mask mask-star-2 ${Props.rating >= 2 ? 'bg-orange-500' : 'bg-orange-300'}`}  disabled/>
            <input type="radio" name="rating-2" className={`mask mask-star-2 ${Props.rating >= 3 ? 'bg-orange-500' : 'bg-orange-300'}`}  disabled/>
            <input type="radio" name="rating-2" className={`mask mask-star-2 ${Props.rating >= 4 ? 'bg-orange-500' : 'bg-orange-300'}`}  disabled/>
            <input type="radio" name="rating-2" className={`mask mask-star-2 ${Props.rating >= 5 ? 'bg-orange-500' : 'bg-orange-300'}`}  disabled/>
        </div>
    );
}