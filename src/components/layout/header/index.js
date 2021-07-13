import React from 'react';
import SettingsIcon from '../../../assets/settings.png'
import {version as appVersion} from '../../../../package.json';
import {Image} from 'react-bootstrap';
import {SettingsButton} from "./styles";

const Header = () => {
    return (
        <div style={{flex:1, display:"flex", maxHeight:80, flexDirection:"column", marginTop:5,
            marginRight:15, alignItems:"flex-end", justifyContent:"center"}}>
            <SettingsButton>
                <Image src={SettingsIcon} style={{width:35, height:35, marginRight:5}}/>
            </SettingsButton>
            <p style={{fontSize:12, color:"gray", marginTop:5}}>{`v${appVersion}`}</p>
        </div>
    )
}

export default Header;
