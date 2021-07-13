import React, {useState} from 'react';
import {connect} from "react-redux";
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';

const defaultHeaders = [
    { header: {key: "User-Agent", value: "ApiTester/0.1.0"}, default: true,  }
]
const RequestBuilder = ({BaseURL}) => {
    const [headers, setHeaders] = useState([...defaultHeaders])
    return (
        <div style={{display:"flex", flex:1, padding:5, margin:5, flexDirection:"column", overflowY:"scroll"}}>

            <div style={{flexDirection:"row", display:"flex", flex:1}}>
                <div style={{flex:1, display:"flex", flexDirection:"column", backgroundColor:"red"}}>
                    <p style={{textAlign:"center", margin:0, fontWeight:"bold",
                        borderStyle:"solid", borderWidth:"0 0 1px 0", padding:10}}>
                        Saved Requests
                    </p>
                    <div style={{display:"flex", flex:1, backgroundColor:"purple"}}>
                        {/* SAVED REQUEST */}
                    </div>
                </div>
                <div style={{flex:4, display:"flex", flexDirection:"column", overflowX:"hidden"}}>
                    <div style={{textAlign:"center", display:"block"}}>
                        <h4 style={{textDecorationLine:"underline"}}>Base URL</h4>
                        <p>{BaseURL}</p>
                    </div>
                    <div>
                        <h4 style={{ textAlign:"left", marginLeft:12}}>Headers</h4>
                        <h4 style={{textAlign:"left",marginLeft:12}}>Params</h4>
                        <div style={{flex:1, display:"flex", flexDirection:"column", alignItems:"center"}}>
                            <h4 style={{textAlign:"left", display:"block", width:"100%", marginLeft:25}}>Body</h4>
                            <JSONInput
                                placeholder={ {exampleObj: "nice"}}
                                locale={ locale }
                                theme={"light_mitsuketa_tribute"}
                                style={{
                                    outerBox: { flex: 1, display:"flex", width:"95%", borderWidth:1, borderStyle:"solid"},
                                    container: {flex:1}
                                }}
                            />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

let mapStateToProps = state => {
    return {
        BaseURL: state.BaseURL,
    }
}

export default connect(mapStateToProps)(RequestBuilder);
