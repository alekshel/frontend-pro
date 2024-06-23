import React from 'react';

const Button = ({ handle, className, children }) => {
    return (
        <button className={className} onClick={handle}>
            {children}
        </button>
    );
};

export default Button;
