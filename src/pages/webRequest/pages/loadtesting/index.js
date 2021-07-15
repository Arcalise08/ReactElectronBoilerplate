import React, {useState, useEffect} from 'react';
import {connect} from "react-redux";
import VerticalListItem from "./VerticalListItem";
import NumberSelector from "../../../../components/NumberSelector";
import ArcButton from "../../../../components/ArcButton";
import _ from 'lodash';
// eslint-disable-next-line import/no-webpack-loader-syntax
import concurrentWebWorker from 'worker-loader!../../../../WebWorkers/concurrent.worker.js';
import HorizontalListView from "./HorizontalListView";

const mockRequests = [
    {thread: 0, url: "https://jsonplaceholder.typicode.com/todos/1", method:"GET", params:"", headers:[{key: "accept", value: "*/*" }, {key:"content-type", value:"application/json"}]},
    {thread: 0, url: "https://jsonplaceholder.typicode.com/todos/1", method:"GET", params:"", headers:[{key: "accept", value: "*/*" }, {key:"content-type", value:"application/json"}]},
    {thread: 0, url: "https://jsonplaceholder.typicode.com/todos/1", method:"GET", params:"", headers:[{key: "accept", value: "*/*" }, {key:"content-type", value:"application/json"}]},
    {thread: 0, url: "https://jsonplaceholder.typicode.com/todos/1", method:"GET", params:"", headers:[{key: "accept", value: "*/*" }, {key:"content-type", value:"application/json"}]},
]

const Index = ({BaseURL, SavedRequests, windowSize}) => {
    const [concurrent, setConcurrent] = useState(1);
    const [threads, setThreads] = useState([]);
    const [requests, setRequests] = useState([...mockRequests]);

    const [clickedRequest, setClickedRequest] = useState(null);

    useEffect(() => {
        const builder = [];
        terminateWorkers();
        console.clear();
        for (let i=0; i < concurrent; i++) {
            const e = new concurrentWebWorker()
            console.log("creating worker on thread " + i);
            builder.push(e);
        }
        setThreads(builder);
    }, [concurrent])

    useEffect(() => {
        onmessage = (msg) => {
            console.log("--------------not web worker-----------------------")
            console.log(msg)
            console.log("---------------------------------------------------")
        };
    },[])


    const terminateWorkers = () => {
        disposeListeners();
        threads.map(worker => worker?.terminate())
    }

    const sendRequests = () => {
        attachListeners();
        threads.map((thread, index) => {
            const reqs = requests.filter(x => x.thread === index)
            if (reqs?.length > 0)
                thread.postMessage({status: "begin", requests: reqs, threadName: index })
        })
    }

    const attachListeners = () => {
        threads.map((thread, index) => {
            console.log('adding listener to thread ' + index)
            thread.addEventListener('message', globalListener)
        })
    }

    const disposeListeners = () => {
        threads.map((thread, index) => {
            console.log('disposing listener on thread ' + index)
            thread.removeEventListener('message', globalListener)
        })
    }

    const globalListener = (msg) => {
        console.log("--------------not web worker-----------------------")
        console.log(msg)
        console.log("---------------------------------------------------")
    }

    const setActiveClickedRequest = (caller, active) => {
        if (active) {
            setClickedRequest(caller);
            return;
        }
        if (_.isEqual(caller, clickedRequest))
            setClickedRequest(null);

    }

    const buildSavedRequests = () => {
        const builder = [];
        if (!SavedRequests?.length)
            return;
        for (let i=0; i < SavedRequests.length; i++) {
            const temp = <VerticalListItem
                onDragStart={() => setActiveClickedRequest(SavedRequests[i], true)}
                onDragEnd={() => setActiveClickedRequest(SavedRequests[i], false)}
                key={i}
                name={!SavedRequests[i]?.name || SavedRequests[i]?.name?.length === 0 ? "Untitled Request" : SavedRequests[i].name}
                method={SavedRequests[i]?.method}
            />
            builder.push(temp);
        }
        return builder;
    }

    return (
        <div style={{display:"flex", flex:1, padding:5, margin:5, flexDirection:"column"}}>
            <div style={{flexDirection:"row", display:"flex", flex:1}}>
                <div style={{flex:1, display:"flex", flexDirection:"column", minWidth:"30%", position:"relative"}}>
                    <p style={{textAlign:"center", margin:0, fontWeight:"bold",
                        borderStyle:"solid", borderWidth:1, padding:10}}>
                        Saved Requests
                    </p>
                    <div style={{display:"flex", height:windowSize?.height, borderWidth:"0 1px 1px 1px", borderStyle:"solid", flexDirection:"column", padding:5, overflowY:"scroll"}}>
                        {buildSavedRequests()}
                    </div>
                </div>
                <div style={{flex:4, display:"flex", flexDirection:"column", overflowX:"hidden"}}>
                    <div style={{display:"flex",flexDirection:"column", alignItems:"flex-end", margin:10}}>
                        <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                            <h4>Concurrent Requests</h4>
                            <NumberSelector value={concurrent} changeValue={(e) => setConcurrent(e)}/>
                        </div>
                    </div>
                    <div style={{flex:1, display:"flex", margin:5, flexDirection:"column"}}>
                        <HorizontalListView requestToAdd={clickedRequest} />
                        <ArcButton title={"Send Requests"} onClick={sendRequests}/>
                    </div>


                </div>
            </div>
        </div>
    )
}

let mapStateToProps = state => {
    return {
        BaseURL: state.BaseURL,
        SavedRequests: state.SavedRequests,
        windowSize: state.windowState
    }
}

export default connect(mapStateToProps)(Index);

