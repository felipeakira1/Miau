import { ReactNode } from "react";
import { ButtonContainer, ButtonSize, ButtonVariant } from "./styles";
import { CircularProgress } from "@mui/material";

interface ButtonProps {
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    loading?: boolean;
    children: ReactNode;
    onClick?: () => void;
    [key: string]: any;
}

export function Button({variant="green", size="big", disabled=false, loading=false, children, onClick, ...rest} : ButtonProps) {
    return <ButtonContainer variant={variant} size={size} onClick={onClick} disabled={disabled} {...rest}>
        {loading ? <CircularProgress size={24} color="inherit"/> : children}
    </ButtonContainer>
}