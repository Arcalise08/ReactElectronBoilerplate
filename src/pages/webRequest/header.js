import React from 'react';
import {NavigationItem} from "./styles";
import {TABS} from "./index";
import {Colors} from "../../app_globals";


const Header = ({activeTab, setActiveTab}) => {

    const getPosition = (index, maxIndex) => {
        if (index === 0)
            return "left";
        if (index === maxIndex - 1)
            return "right";
        return null;
    }

    const buildNav = () => {
        const builder = [];
        for (let i=0; i < TABS.length; i++) {
            const temp = <NavItem
                name={TABS[i]}
                key={i}
                position={getPosition(i, TABS.length)}
                active={activeTab === TABS[i]}
                onClick={() => setActiveTab(TABS[i])}
            />
            builder.push(temp);
        }
        return builder;
    }
    return (
        <div style={{
            height: 50,
            display: "flex",
            borderWidth: "1px 0 0 0",
            borderStyle: "solid",
            flexDirection: "row",
            borderColor:"gray"
        }}>
            {buildNav()}
        </div>
    )
}

const NavItem = ({name, position, active, onClick}) => (
    <NavigationItem
        backgroundColor={Colors.navItemColor}
        onHoverColor={Colors.navItemColor}
        position={position}
        active={active}
        onClick={onClick}
    >
        <p style={{margin:0, fontWeight:"bold"}}>{name}</p>
    </NavigationItem>
)
export default Header;
