import React, {useEffect, useState, useRef} from 'react';
import { connect } from "react-redux";
import { useSpring, animated } from "react-spring";
import Popup from "./Popup";

const TigerProvider = ({children, isDimBackground}) => {
    const [active, setActive] = useState(false);
    const [styles, api] = useSpring(() => ({backgroundColor:"transparent"}))

    useEffect(() => {
        if (isDimBackground && !active)
            transitionIn();
        if (!isDimBackground && active)
            transitionOut();
    }, [isDimBackground]);

    const transitionIn = () => {
        setActive(true);
        console.log("setting active");
        api.start({from: {backgroundColor:"transparent"}, to: {backgroundColor:"rgba(175, 175, 175, 0.46)"}});
    }

    const transitionOut = () => {
        console.log("setting inactive");
        api.start({from: {backgroundColor:"rgba(175, 175, 175, 0.46)"}, to: {backgroundColor:"transparent"}});

        setTimeout(() => {
            setActive(false)
        }, 250)
    }
    /*const bgInterpolation = anim.interpolate({
        inputRange: [0, 1],
        outputRange: ["transparent","rgba(175, 175, 175, 0.46)"]
    })*/

    return (
        <div style={{display:"flex", flex:1}}>
            <div style={{position:"absolute", left:0, right:0, top:0, bottom:0,  zIndex: active ? 1 : -5}}>
                <animated.div style={{...styles, height:"100%"}}/>
            </div>
            <Popup/>
            {children}
        </div>
    )
}

let mapStateToProps = state => {
    return {
        isDimBackground: state.DimBackground,
    }
}

export default connect(mapStateToProps)(TigerProvider);
