import { ReactNode } from "react";
import { X } from "phosphor-react";
import { Content, Header, ModalContainer, Overlay } from "./styles";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
    if (!isOpen) return null;

    return (
        <Overlay onClick={onClose}>
            <ModalContainer onClick={(e) => e.stopPropagation()}> {/* Prevent close on inner clicks */}
                <Header>
                    <h1>{title}</h1>
                    <X onClick={onClose} size={24} style={{ cursor: "pointer" }} />
                </Header>
                <Content>{children}</Content>
            </ModalContainer>
        </Overlay>
    );
}