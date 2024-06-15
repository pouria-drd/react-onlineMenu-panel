import React, { ButtonHTMLAttributes } from "react";

import "./button.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    outlined?: boolean;
    colorVariant?:
        | "primary"
        | "secondary"
        | "info"
        | "dark"
        | "light"
        | "danger"
        | "success"
        | "warning";
}

const Button: React.FC<ButtonProps> = ({
    colorVariant = "primary",
    outlined,
    ...props
}) => {
    const buttonVariant = colorVariant?.toLowerCase() || "primary";
    return (
        <button
            {...props}
            className={`custom-button base-btn-class ${
                outlined ? `outlined-${buttonVariant}` : `${buttonVariant}`
            } ${props.className}`}>
            {props.children}
        </button>
    );
};

export default Button;
