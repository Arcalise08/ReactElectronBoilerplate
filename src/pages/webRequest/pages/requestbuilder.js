import React, {useState} from 'react';
import {connect} from "react-redux";
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import WebListView from "../components/ListView";
import ArcButton from "../../../components/ArcButton";
import RadioButton from "../../../components/RadioButton";
import {RequestItem} from "./styles";
import {setSavedRequests} from "../../../redux/actions";

const defaultHeaders = [
    { key: "User-Agent", value: "ApiTester/0.1.0", default: true,  },
    { key: "Accept", value: "*/*", default: true,  },
    { key: "Content-Type", value: "application/json", default: true,  },
]

const defaultRequest = {
    headers: [...defaultHeaders],
    params: [],
    method: "GET",
    id: null,
    endPoint:"",
    body:"",
    name:""
}

const RequestBuilder = ({BaseURL, SavedRequests, windowSize, setSavedRequests}) => {
    const [activeRequest, setActiveRequest] = useState({...defaultRequest})

    const setRequestProperty = (type, prop) => {
        const temp = {...activeRequest}
        switch (type) {
            case "headers":
                temp.headers = prop;
                break;
            case "params":
                temp.params = prop;
                break;
            case "method":
                temp.method =prop;
                break;
            case "name":
                temp.name = prop;
                break;
            case "endpoint":
                temp.endPoint = prop;
                break;
            case "body":
                temp.body = prop;
                break;
        }
        setActiveRequest(temp);
    }

    const idGenerator = (arr) => {
        let highestId = 0;
        arr.map(x => x.id > highestId ? highestId = x.id : null);
        return highestId+1;
    }

    const addNewRequest = () => {
        const toSave = {...defaultRequest};
        const tempArr = [...SavedRequests];
        toSave.id = idGenerator(tempArr);
        setActiveRequest(toSave);
        setSavedRequests([toSave, ...tempArr])
    }

    const saveRequest = () => {
        const toSave = {...activeRequest}
        const tempArr = SavedRequests?.length ? SavedRequests : [];
        if (toSave?.id === null) {
            toSave.id = idGenerator(tempArr);
            tempArr.push(toSave);
        }
        else {
            let find=null;
            tempArr.map((item, index) => item?.id === activeRequest?.id ? find=index : null);
            if (find === null || find === undefined) {
                console.log("couldnt find request!");
                toSave.id = null;
                setActiveRequest(toSave);
                return;
            }
            tempArr[find] = toSave;
        }
        setActiveRequest(toSave);
        setSavedRequests([...tempArr]);
    }

    const deleteRequest = () => {
        if (!activeRequest?.id) {
            setActiveRequest(defaultRequest);
            return;
        }
        else {
            const toSave = {...activeRequest}
            const tempArr = [...SavedRequests];
            let find=null;
            tempArr.map((item, index) => (item?.id === toSave?.id ? (find=index) : null));
            if (find === null || find === undefined) {
                console.log("couldnt find request!");
                toSave.id = null;
                setActiveRequest(toSave);
                return;
            };
            tempArr.splice(find, 1);
            if (tempArr?.length > 0)
                setActiveRequest({...tempArr[0]})
            else
                setActiveRequest(defaultRequest);
            setSavedRequests([...tempArr]);
        }
    }

    const onJsonBodyChange = (e) => {
        if (!e.error) {
            const temp = {...activeRequest};
            temp.body = e.json;
            setActiveRequest((old) => temp);
        }
    }

    const parseJsonBody = () => {
        try {
            if (!!!activeRequest?.body)
                return { exampleObj: "Example Payload" }
            if (activeRequest.body.length === 0)
                return { exampleObj: "Example Payload" }

            return JSON.parse(activeRequest.body)
        }
        catch {
            return null;
        }

    }

    const onChangeHeaders = (header, index) => {
        const temp = {...activeRequest};
        temp.headers[index] = header;
        setActiveRequest(temp);
    }
    const onRemoveHeader = (index) => {
        const temp = {...activeRequest};
        temp.headers.splice(index, 1);
        setActiveRequest(temp);
    }
    const onAddHeader = (header) => {
        const temp = {...activeRequest};
        temp.headers = [...temp.headers, header]
        setActiveRequest(temp);
    }
    const onChangeParams = (param, index) => {
        const temp = {...activeRequest};
        temp.params[index] = param;
        setActiveRequest(temp);
    }
    const onRemoveParams = (index) => {
        const temp = {...activeRequest};
        temp.params.splice(index, 1);
        setActiveRequest(temp);
    }
    const onAddParams = (param) => {
        const temp = {...activeRequest};
        temp.params = [...temp.params, param];
        setActiveRequest(temp);
    }

    const changeViewRequest = (request) => {
        saveRequest();
        setActiveRequest(request)
    }

    const buildSavedRequests = () => {
        const builder = [];
        if (!SavedRequests?.length)
            return;
        for (let i=0; i < SavedRequests.length; i++) {
            const temp = <SavedRequest
                key={i}
                name={!SavedRequests[i]?.name || SavedRequests[i]?.name?.length === 0 ? "Untitled Request" : SavedRequests[i].name}
                method={SavedRequests[i]?.method}
                active={activeRequest?.id === SavedRequests[i]?.id}
                onClick={() => changeViewRequest(SavedRequests[i])}
            />
            builder.push(temp);
        }
        return builder;
    }

    return (
        <div style={{display:"flex", flex:1, padding:5, margin:5, flexDirection:"column"}}>
            <div style={{flexDirection:"row", display:"flex", flex:1}}>
                <div style={{flex:1, display:"flex", flexDirection:"column"}}>
                    <p style={{textAlign:"center", margin:0, fontWeight:"bold",
                        borderStyle:"solid", borderWidth:1, padding:10}}>
                        Saved Requests
                    </p>
                    <div style={{display:"flex", height:windowSize?.height, borderWidth:"0 1px 1px 1px", borderStyle:"solid", flexDirection:"column", padding:5, overflowY:"scroll"}}>
                        <RequestItem onClick={addNewRequest}><h4 style={{textAlign:'center'}}>Add New {"{...}"}</h4></RequestItem>
                        {buildSavedRequests()}
                    </div>
                </div>
                <div style={{flex:4, display:"flex", flexDirection:"column", overflowX:"hidden"}}>
                    <div style={{textAlign:"center", display:"block"}}>
                        <h4 style={{textDecorationLine:"underline"}}>Base URL</h4>
                        <p>{BaseURL}</p>
                    </div>
                    <div style={{flex:1}}>
                        <div style={{display:"flex", flex:1, justifyContent:"center", alignItems:"center"}}>
                            <div style={{flex:1, justifyContent:"center", alignItems:"center", display:"flex", flexDirection:"column"}}>
                                <h4 style={{textDecorationLine:"underline", textAlign:"center"}}>Endpoint</h4>
                                <input
                                    value={activeRequest.endPoint}
                                    onChange={(e) => setRequestProperty("endpoint", e.target.value)}
                                    style={{width:"50%", borderRadius:5, textAlign:"center"}}
                                    placeholder={"ex \"/api/sync\""}
                                />
                            </div>
                            <div style={{flex:1, justifyContent:"center", alignItems:"center", display:"flex", flexDirection:"column"}}>
                                <h4 style={{textDecorationLine:"underline", textAlign:"center"}}>Request Name</h4>
                                <input
                                    value={activeRequest.name}
                                    onChange={(e) => setRequestProperty("name", e.target.value)}
                                    style={{width:"50%", borderRadius:5, textAlign:"center"}}
                                    placeholder={"ex \"Testing Login\""}
                                />
                            </div>
                        </div>
                        <div style={{display:"flex", flex:1, padding:25, alignItems:"center"}}>
                            <div style={{borderWidth:"0 1px 0 0", flex:1, display:"flex", borderStyle:"solid"}}>
                                <h1 style={{ marginRight:10, }}>Method</h1>
                            </div>
                            <RadioButton
                                style={{borderWidth: "0 1px 0 0", marginLeft:15, borderStyle:"solid", justifyContent:"center", alignItems:"center"}}
                                value={activeRequest.method === "GET"} onChange={() => setRequestProperty("method", "GET")}>
                                <p>Get</p>
                            </RadioButton>
                            <RadioButton
                                style={{borderWidth: "0 1px 0 0", borderStyle:"solid", justifyContent:"center", alignItems:"center"}}
                                value={activeRequest.method  === "POST"}
                                onChange={() => setRequestProperty("method", "POST")}>
                                <p>Post</p>
                            </RadioButton>
                            <RadioButton
                                style={{borderWidth: "0 1px 0 0", borderStyle:"solid", justifyContent:"center", alignItems:"center"}}
                                value={activeRequest.method  === "PUT"}
                                onChange={() => setRequestProperty("method", "PUT")}>
                                <p>Put</p>
                            </RadioButton>
                            <RadioButton
                                style={{borderWidth: "0 1px 0 0", borderStyle:"solid", justifyContent:"center", alignItems:"center"}}
                                value={activeRequest.method === "DELETE"}
                                onChange={() => setRequestProperty("method", "DELETE")}>
                                <p>Delete</p>
                            </RadioButton>
                        </div>

                    </div>
                    <div>
                        <div style={{flex:1, display:"flex", flexDirection:"column"}}>
                            <h4 style={{ textAlign:"left", marginLeft:12}}>Headers</h4>
                            <WebListView
                                items={activeRequest?.headers}
                                onChange={onChangeHeaders}
                                onRemove={onRemoveHeader}
                                onAdd={() => onAddHeader({default:false, key:null, value:null})}
                                onAddAuth={() => onAddHeader({default:false, key:"Authorization", value:null})}
                                buttonTitle={"Add Header"}
                            />
                        </div>
                        {
                            activeRequest.method === "GET" &&
                            <div style={{flex:1, display:"flex", flexDirection:"column"}}>
                                <h4 style={{textAlign:"left",marginLeft:12}}>Params</h4>
                                <WebListView
                                    items={activeRequest?.params}
                                    onChange={onChangeParams}
                                    onRemove={onRemoveParams}
                                    onAdd={() => onAddParams({default:false, key:null, value:null})}
                                    buttonTitle={"Add Param"}
                                />
                            </div>
                        }

                        {
                            activeRequest.method !== "GET" &&
                            <div style={{flex:1, display:"flex", flexDirection:"column", alignItems:"center"}}>
                                <h4 style={{textAlign:"left", display:"block", width:"100%", marginLeft:25}}>Body</h4>
                                <JSONInput
                                    onChange={(e) => onJsonBodyChange(e) }
                                    placeholder={ parseJsonBody() }
                                    locale={ locale }
                                    theme={"light_mitsuketa_tribute"}
                                    style={{
                                        outerBox: { flex: 1, display:"flex", width:"95%", borderWidth:1, borderStyle:"solid"},
                                        container: {flex:1}
                                    }}
                                />
                            </div>
                        }


                    </div>
                    <div style={{display:"flex", flex:1, margin:5, justifyContent:"flex-end", alignItems:"flex-end"}}>
                        <ArcButton
                            onClick={saveRequest}
                            style={{marginRight:5, padding:10}}>
                            <p style={{fontWeight:"bold"}}>Save Request</p>
                        </ArcButton>
                        <ArcButton
                            onClick={deleteRequest}
                            onHoverColor={"rgba(248, 77, 77, 0.55)"}
                            backgroundColor={"rgba(248, 77, 77, 0.85)"}
                            style={{marginRight:5, padding:10}}>
                            <p style={{fontWeight:"bold"}}>Delete Request</p>
                        </ArcButton>
                    </div>

                </div>
            </div>
        </div>
    )
}

const SavedRequest = ({method, name, active, onClick}) => {
    const getMethodColor = () => {
        switch (method) {
            case "GET":
                return "#4DA3F8";
            case "PUT":
                return "#F2F281";
            case "POST":
                return "green";
            case "DELETE":
                return "red";
        }
    }
    return (
        <RequestItem active={active} onClick={onClick}>
            <p style={{fontSize: 18, fontWeight: "bold", marginLeft: 25, color: getMethodColor()}}>{method}</p>
            <p style={{fontSize: 18, color: "gray", textAlign: "center"}}>{name}</p>
        </RequestItem>
    )
}

let mapStateToProps = state => {
    return {
        BaseURL: state.BaseURL,
        SavedRequests: state.SavedRequests,
        windowSize: state.windowState
    }
}

export default connect(mapStateToProps, {setSavedRequests})(RequestBuilder);
