import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { setDimBackground } from "../redux/actions";
import {animated, useSpring} from 'react-spring'

const PopUp = ({popupInfo, setDimBackground}) => {
    const [active, setActive] = useState(false);
    const [styles, api] = useSpring(() => ({opacity: 0}));

    useEffect(() => {
        if (popupInfo?.active && !active)
            transitionIn()
        if (!popupInfo?.active && active)
            transitionOut()
    }, [popupInfo]);

    const transitionIn = () => {
        setDimBackground(true);
        setActive(true);
        api.set(() => ({opacity: 1}) )
        api.start()
    }

    const transitionOut = () => {
        setDimBackground(false)
        api.set(() => ({opacity: 0}) )
        api.start()

        setTimeout(() => {
            setActive(false)
        }, 250)
    }

    const buildPopup = () => {
        if (!popupInfo.content)
            return <div/>
        else
            return popupInfo.content;
    }

    return (
        <div style={{position: "absolute", left: 0, right: 0, top: 0, bottom: 0, zIndex: active ? 2 : -5}}>
            {buildPopup()}
        </div>
    )
}

let mapStateToProps = state => {
    return {
        popupInfo: state.Popup
    }
}

export default connect(mapStateToProps, {setDimBackground})(PopUp);
