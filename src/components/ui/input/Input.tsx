import React, { InputHTMLAttributes } from "react";

import "./input.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = ({ ...rest }) => {
    return <input className="my-custom-input" {...rest} />;
};

export default Input;
