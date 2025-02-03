import { useState } from "react";
import { Controller } from "react-hook-form";
import styled from "styled-components";

interface AutoCompleteProps {
    label: string;
    name: string;
    control: any;
    options: { value: string; label: string }[];
    error?: string;
    disabled?: boolean;
}

export function AutoComplete({ label, name, control, options, error, disabled }: AutoCompleteProps) {
    const [search, setSearch] = useState(""); // Estado para armazenar o texto digitado
    const [showSuggestions, setShowSuggestions] = useState(false); // Controla exibição da lista

    const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Container>
            <label htmlFor={name}>{label}</label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <div className="autocomplete">
                        <input
                            type="text"
                            id={name}
                            placeholder="Digite para buscar..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                field.onChange(e.target.value);
                                setShowSuggestions(true);
                            }}
                            onFocus={() => setShowSuggestions(true)}
                            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                            disabled={disabled}
                        />
                        {showSuggestions && filteredOptions.length > 0 && (
                            <SuggestionsList>
                                {filteredOptions.map((option) => (
                                    <li
                                        key={option.value}
                                        onClick={() => {
                                            field.onChange(option.value);
                                            setSearch(option.label);
                                            setShowSuggestions(false);
                                        }}
                                    >
                                        {option.label}
                                    </li>
                                ))}
                            </SuggestionsList>
                        )}
                    </div>
                )}
            />
            {error && <p className="error">{error}</p>}
        </Container>
    );
}

// 🔥 Estilização do AutoComplete
const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;

    label {
        font-weight: bold;
    }
    
    input {
        width: 100%;
        padding: 10px 16px;
        border: 1px solid transparent;
        border-radius: 5px;
        background-color: #F0F0F0;
        outline: none;
    }

    .error {
        color: red;
        font-size: 12px;
    }
`;

const SuggestionsList = styled.ul`
    position: absolute;
    width: 100%;
    background: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    list-style: none;
    padding: 0;
    margin-top: 4px;
    max-height: 150px;
    overflow-y: auto;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    
    li {
        padding: 8px;
        cursor: pointer;
        &:hover {
            background-color: #F0F0F0;
        }
    }
`;
