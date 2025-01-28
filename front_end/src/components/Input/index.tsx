import { UseFormRegister } from "react-hook-form";
import { InputContainer } from "./styles";

interface InputProps {
    label?: string;
    name: string;
    register?: UseFormRegister<any>;
    error?: string;
    [key: string]: any;
}

export function Input({label, name, register, error, ...rest}: InputProps) {
    return (
        <InputContainer>
            {label && <label htmlFor={name}>{label}</label>}
            <input id={name} className={error && "errorBorder"}{...(register ? register(name) : {})} {...rest}/>
            {error && <p className="errorString">{error}</p>}
        </InputContainer>
    )
}