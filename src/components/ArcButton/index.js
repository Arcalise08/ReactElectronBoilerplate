import React from 'react';
import {GenericButton} from "./styles";


const ArcButton = ({onClick, backgroundColor, onHoverColor, children, title, fontSize, style}) => {
    return (
        <GenericButton
            backgroundColor={backgroundColor}
            onHoverColor={onHoverColor}
            onClick={onClick}
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
