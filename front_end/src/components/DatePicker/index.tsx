import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller } from "react-hook-form";
import { DatePickerContainer } from "./styles";

interface DatePickerProps {
    label: string;
    name: string;
    control: any;
    error?: string;
}

export function CustomDatePicker({ label, name, control, error }: DatePickerProps) {
    return (
        <DatePickerContainer>
            <label>{label}</label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <DatePicker
                        className="datepicker"
                        selected={field.value ? new Date(field.value) : null}
                        onChange={(date) => field.onChange(date)}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Selecione a data"
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={100}
                    />
                )}
            />
            {error && <p className="error">{error}</p>}
        </DatePickerContainer>
    );
}
