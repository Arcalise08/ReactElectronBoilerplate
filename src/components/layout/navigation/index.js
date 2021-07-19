import React, {useEffect, useState} from 'react';
import {PAGES} from '../../../app_globals';
import NavItem from './navitem';
import {useHistory} from 'react-router-dom';
import {connect} from "react-redux";
import {setSavedRequests, setNavigation} from "../../../redux/actions";

const Navigation = ({navLocation, setNavigation}) => {
    const [location, setLocation] = useState("signalR");
    const history = useHistory();

    useEffect(() => {
        moveLocation();
    }, [navLocation])


    const moveLocation = () => {
        const newLoc = navLocation ? navLocation : "/signalR"
        history.push(newLoc);
        setLocation(newLoc);
    }

    const buildNav = () => {
        const builder = [];
        for (let i=0; i < PAGES.length; i++) {
            const temp = <NavItem
                onPress={() => setNavigation( "/" + PAGES[i].name)}
                key={i}
                active={location.includes(PAGES[i].name)}
                icon={PAGES[i].navIcon}
                name={PAGES[i].friendlyName}/>
            builder.push(temp);
        }
        return builder;
    }
    return (
        <div style={{flexDirection:"column", display:"flex", flex:1, maxWidth:175, minWidth:150,
            borderStyle:"solid", borderWidth:0, borderRightWidth:1, borderColor:"gray"}}>
            {buildNav()}
        </div>
    )
}





let mapStateToProps = state => {
    return {
        navLocation: state.NavLocation
    }
}

export default connect(mapStateToProps, {setSavedRequests, setNavigation})(Navigation);
