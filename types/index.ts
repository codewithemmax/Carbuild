import { MouseEventHandler } from "react";

export interface CustomButtonProps {
    title: string;
    containerStyles?: string;
    handleClick?: () => MouseEventHandler<HTMLButtonElement>;
    btnType?: "button" | "submit";
    rightIcon?: string;
    isDisabled?: boolean;
}

export interface SearchManuFacturerProps {
    manufacturer: string;
    setManuFacturer: (manufacturer: string) => void;
}