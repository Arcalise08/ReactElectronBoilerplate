import React, {useState} from 'react';
import LeftArrow from '../../assets/left-arrow.png';
import RightArrow from '../../assets/right-arrow.png';
import {Image} from 'react-bootstrap';
import {Arrow, StyledInput} from "./styles";

const NumberSelector = ({value, changeValue, size}) => {
    return (
        <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
            <Arrow onClick={() => changeValue(value - 1)}>
                <Image src={LeftArrow} style={{width: size ?? 25,  height: size ?? 25}}/>
            </Arrow>
            <div style={{width:50}}>
                <StyledInput
                    value={value}
                    type={"number"}
                    onChange={(e) => changeValue(e.target.value)}
                />
            </div>

            <Arrow style={{cursor:"pointer"}} onClick={() => changeValue(value + 1)}>
                <Image src={RightArrow} style={{width: size ?? 25,  height: size ?? 25}}/>
            </Arrow>
        </div>
    )
}
export default NumberSelector
