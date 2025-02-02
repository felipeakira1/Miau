import { Controller } from "react-hook-form";
import { DropdownContainer } from "./styles";

interface DropdownProps {
    label: string;
    name: string;
    control: any;
    options: { value: string; label: string}[];
    error?:string;
}

export function Dropdown({label, name, control, options, error } : DropdownProps) {

    return (
        <DropdownContainer>
            <label htmlFor={name}>{label}</label>
            <Controller
                name={name}
                control={control}
                render={({field}) => {
                    return <select {...field} id={name}>
                        <option value="">Selecione...</option>
                        {options.map((option) => {
                            return <option key={option.value} value={option.value}>
                                {option.label}
                            </option>;
                        })}
                    </select>;
                }}
            />
            {error && <p className="error">{error}</p>}
        </DropdownContainer>
    )
}