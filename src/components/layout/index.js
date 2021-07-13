import React, {useEffect} from 'react';
import Header from "./header";
import Navigation from "./navigation";
import {connect} from "react-redux";

const Layout = ({children, router, location, windowSize}) => {
    return (
        <div style={{display: "flex", height:windowSize?.height ?? window.innerHeight, flex: 1, flexDirection: "row"}}>
            <Navigation router={router} location={location}/>
            <div style={{display:"flex", flex:1, flexDirection:"column"}}>
                <Header/>
                {children}
            </div>
        </div>
    )
}

let mapStateToProps = state => {
    return {
        windowSize: state.windowState
    }
}

export default connect(mapStateToProps)(Layout);
