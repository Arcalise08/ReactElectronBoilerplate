import React from 'react';
import {GenericButton} from "./styles";


const ArcButton = ({onClick, backgroundColor, onHoverColor, children, title, fontSize, disabled, style}) => {
    return (
        <GenericButton
            backgroundColor={disabled ? "gray" : backgroundColor}
            onHoverColor={disabled ? "gray" : onHoverColor}
            onClick={disabled ? () => {} : onClick}
            style={{...style}}
            >
            {
                children ?
                    children
                    :
                    <p style={{fontSize: fontSize ?? 16, textAlign:"center", margin:10}}>
                        {title}
                    </p>


            }
        </GenericButton>
    )
}

export default ArcButton
