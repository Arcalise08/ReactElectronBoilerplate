import React, {useState} from 'react';
import checked from '../../assets/checked.png';
import unchecked from '../../assets/unchecked.png';
import {Image} from 'react-bootstrap';
import {HighlightImage} from "./styles";


const RadioButton = ({disabled, size, value, children, onChange, style}) => {

    return (
        <div style={{display:"flex", flex:1, flexDirection:"column", padding:5, margin:5, opacity: disabled ? 0.5 : 1,  ...style}}>
            {children}
            {
                value ?
                    <HighlightImage disabled={disabled} size={size} onClick={disabled ? null : onChange} src={checked} />
                    :
                    <HighlightImage disabled={disabled} size={size} onClick={disabled ? null : onChange} src={unchecked} />
            }
        </div>
    )
}

export default RadioButton;
