/* eslint-disable react/prop-types */
import React from 'react'
import "./index.scss"

function Button({ variant = "default", buttonText, customColor, borderStyle, onClick, width, padding, height }) {
    return (
        <button className={`button button--${variant}`} onClick={onClick}
            style={{
                whiteSpace: 'pre',
                backgroundColor: variant === "custom2" ? customColor : null,
                border: borderStyle,
                width: width, // Set border style directly in the style object
                padding: padding,
                height: height,
            }}
        >
            {buttonText}
        </button>
    )
}

export default Button
