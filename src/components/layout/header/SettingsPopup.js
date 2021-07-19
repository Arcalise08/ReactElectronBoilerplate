import React, {useState, useEffect} from "react";
import ArcButton from "../../ArcButton";
import {connect} from "react-redux";
import {setBaseURL, setPopup} from "../../../redux/actions";
import RadioButton from "../../RadioButton";

const SettingsPopup = ({baseURL, setBaseURL, setPopup}) => {
    const [url, setUrl] = useState(baseURL);
    const [clear, setClear] = useState(false);
    useEffect(() => {

    }, [])

    const onSave = () => {
        setBaseURL(url)
        if (clear) {
            localStorage.clear();
            window.location.reload();
        }

        ClosePop();
    }
    const ClosePop = () => {
        setUrl(baseURL);
        setClear(false);
        const init = {
            active: false,
            content: null
        }
        setPopup(init);
    }
    return (
        <div style={{position:"absolute", left:0, right:0, top:0, bottom:0, display:"flex", justifyContent:"center", alignItems:"center"}}>
            <div style={{width:250, height:250, display:"flex", flexDirection:"column", backgroundColor:"white", textAlign:"center", borderWidth:1, borderRadius:15, borderStyle:"solid"}}>
                <h4 style={{fontWeight:"bold"}}>Settings</h4>
                <p>Base url</p>
                <input
                    style={{textAlign:"center", marginLeft:5, marginRight:5}}
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <div style={{display:"flex", alignItems:"center", marginTop:10, marginLeft:5, marginRight:5}}>
                    <p style={{margin:0, marginBottom:5, color: clear ? "red" : "black"}}>Clear local storage</p>
                    <RadioButton value={clear} onChange={(e) => setClear(e)} style={{justifyContent:"flex-end", alignItems:"flex-end"}}/>
                </div>
                <div style={{display:"flex", flex:1, margin:5, justifyContent:"flex-end", alignItems:"flex-end"}}>
                    <ArcButton onClick={ClosePop} title={"Discard"} style={{marginRight:10}}/>
                    <ArcButton onClick={onSave} title={"Save"} style={{marginRight:10}}/>
                </div>

            </div>
        </div>
    )
}

let mapStateToProps = state => {
    return {
        baseURL: state.BaseURL
    }
}

export default connect(mapStateToProps, {setPopup, setBaseURL})(SettingsPopup);
