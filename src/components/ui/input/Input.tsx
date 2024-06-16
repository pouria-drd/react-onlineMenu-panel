import { InputHTMLAttributes } from "react";

import "./input.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ ...props }: InputProps) => {
    return (
        <input {...props} className={`my-custom-input ${props.className}`} />
    );
};

export default Input;
