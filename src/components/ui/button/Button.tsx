import { ButtonHTMLAttributes } from "react";

import "./button.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    outlined?: boolean;
    btnType?:
        | "primary"
        | "secondary"
        | "info"
        | "dark"
        | "light"
        | "danger"
        | "success"
        | "warning";
}

const Button = ({ btnType = "primary", outlined, ...props }: ButtonProps) => {
    const colorVariant = btnType?.toLowerCase() || "primary";
    return (
        <button
            {...props}
            className={`custom-button base-btn-class ${
                outlined ? `outlined-${colorVariant}` : `${colorVariant}`
            } ${props.className}`}>
            {props.children}
        </button>
    );
};

export default Button;
