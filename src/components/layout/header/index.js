import React, {useState, useEffect} from 'react';
import SettingsIcon from '../../../assets/settings.png'
import {version as appVersion} from '../../../../package.json';
import {Image} from 'react-bootstrap';
import {SettingsButton} from "./styles";
import {connect} from "react-redux";
import {setPopup, setBaseURL} from "../../../redux/actions";
import SettingsPopup from "./SettingsPopup";

const Header = ({setPopup, baseURL}) => {

    const [url, setUrl] = useState(baseURL);

    const Pop = () => {
        const context = [url, setUrl]
        const init = {
            active: true,
            content: <SettingsPopup/>
            }
        setPopup(init);
    }





    return (
        <div style={{flex:1, display:"flex", maxHeight:80, flexDirection:"column", marginTop:5,
            marginRight:15, alignItems:"flex-end", justifyContent:"center"}}>
            <SettingsButton onClick={Pop}>
                <Image src={SettingsIcon} style={{width:35, height:35, marginRight:5}}/>
            </SettingsButton>
            <p style={{fontSize:12, color:"gray", marginTop:5}}>{`v${appVersion}`}</p>
        </div>
    )
}
let mapStateToProps = state => {
    return {
        baseURL: state.BaseURL
    }
}

export default connect(mapStateToProps, {setPopup})(Header);
