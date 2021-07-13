import React, {useEffect, useState} from 'react';
import {PAGES} from '../../../app_globals';
import NavItem from './navitem';
import {useHistory} from 'react-router-dom';

const Navigation = () => {
    const [location, setLocation] = useState("signalR");
    const history = useHistory();

    useEffect(() => {
        const loc = history?.location?.pathname;
        const newLoc = loc ? loc.replace("/", ""): "signalR"
        setLocation(newLoc);
        console.log(newLoc);
    }, [history])


    const moveLocation = (loc) => {
        history.push(loc);
        setLocation(loc);
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
        <div style={{flexDirection:"column", display:"flex", flex:1, maxWidth:155,
            borderStyle:"solid", borderWidth:0, borderRightWidth:1, borderColor:"gray"}}>
            {buildNav()}
        </div>
    )
}





export default Navigation;
