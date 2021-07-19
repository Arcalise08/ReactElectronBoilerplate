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
        console.log(navLocation);

        const newLoc = navLocation ? navLocation.replace("/", ""): "signalR"
        history.push(newLoc);
        setLocation(newLoc);
    }, [navLocation])


    const moveLocation = (loc) => {
        setNavigation(loc);
    }

    const buildNav = () => {
        const builder = [];
        for (let i=0; i < PAGES.length; i++) {
            const temp = <NavItem
                onPress={() => moveLocation(PAGES[i].name)}
                key={i}
                active={location === PAGES[i].name}
                icon={PAGES[i].navIcon}
                name={PAGES[i].friendlyName}/>
            builder.push(temp);
        }
        return builder;
    }
    return (
        <div style={{flexDirection:"column", display:"flex", flex:1, maxWidth:155, minWidth:100,
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
