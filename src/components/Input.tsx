import { PropsInput } from "../types/types";

export const Input = (Props: PropsInput) => {
    return (
        <input 
            className="p-2 w-full rounded-md outline-none shadow-md border border-primary"
            type={Props.type}
            placeholder={Props.placeholder}
            value={Props.value}
            onChange={Props.onChange}
            required={Props.required}
            autoComplete={'Senha deve ter no mínimo 6 caracteres'}
            disabled={Props.disabled}
        />
    );
}