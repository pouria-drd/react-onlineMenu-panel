import { InputHTMLAttributes } from "react";

import "./input.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ ...props }: InputProps) => {
    return (
        <input
            {...props}
            className={`my-custom-input ss02 r2l ${props.className}`}
        />
    );
};

export default Input;
