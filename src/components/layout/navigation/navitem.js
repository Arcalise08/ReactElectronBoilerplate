import React from 'react';
import {Image} from 'react-bootstrap';
import {NavigationItem} from "./styles";

const NavItem = ({name, icon, active, onPress}) => (
    <NavigationItem
        active={active}
        onClick={active ? () => {} : onPress}>
        <div style={{display:"flex", flex:1,flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
            <Image src={icon} style={{width:55, height:55}}/>
            <p style={{marginTop:15}}>{name}</p>
        </div>
    </NavigationItem >
)

export default NavItem;
