import React, {useState, useEffect} from 'react';
import {connect} from "react-redux";
import NumberSelector from "../../../../components/NumberSelector";
import ArcButton from "../../../../components/ArcButton";
import spinner from '../../../../assets/loading.gif';
import {Image} from 'react-bootstrap';
// eslint-disable-next-line import/no-webpack-loader-syntax
import ConcurrentWebWorker from 'worker-loader!../../../../WebWorkers/concurrent.worker.js';
import HorizontalListView from "./HorizontalListView";
import {setThreadRequests, setSavedResults, setNavigation} from "../../../../redux/actions";

const electron = window.require("electron").remote;
const {dialog, Notification, app} = electron;

const Index = ({BaseURL, SavedRequests, windowSize, setSavedResults, setNavigation, setThreadRequest, threadRequests}) => {
    const [concurrent, setConcurrent] = useState(1);
    const [requests, setRequests] = useState([]);
    const [executions, setExecutions] = useState(1);
    const [loading, setLoading] = useState(false);

    let threadResponse = [];

    useEffect(() => {
        setLoading(false);
    },[])

    useEffect(() => {
        setConcurrent(threadRequests?.concurrent ?? 1);
        setRequests(threadRequests?.requests ?? []);
        setExecutions(threadRequests?.executions ?? 1);
    },[threadRequests])


    const sendRequests = () => {
        if (requests?.length === 0) {
            new Notification({title: "Send Request Failed!", body: "There was an error sending your requests"}).show();
            dialog.showErrorBox("No Requests Queued", "At least one request must be queued before dispatching!")
            return;
        }
        setLoading(true);
        //attachListeners();
        const builder = [];
        console.clear();
        for (let i=0; i < concurrent; i++) {
            const e = new ConcurrentWebWorker()
            e.addEventListener("message", globalListener)
            console.log("creating worker on thread " + i);
            builder.push(e);
        }
        builder.map((thread, index) => {
            const reqs = requests.filter(x => x.thread === index)
            const builder = [];
            for (let index=0; index < reqs?.length; index++) {
                for (let exec = 0; exec < executions; exec++) {
                    console.log(`pushing`)
                    console.log(reqs[index]);
                    builder.push(reqs[index]);
                }
            }
            thread.postMessage({status: "begin", requests: builder, threadName: index })
        })
        setTimeout(() => {
            builder.map((thread, index) => {
                thread.removeEventListener("message", globalListener);
                thread.terminate();
            })
            setLoading(false);

        }, 10500)

    }

    const addRequest = (request) => {
        if (request === null || request === undefined) {
            console.log("Thread not specified for request to add.")
            return;
        }
        const temp = [...requests];
        temp.push(request);
        setRequests(temp);
    }

    const removeRequest = () => {
        console.log("not implemented");
    }



    const globalListener = (msg) => {
        const results = [...threadResponse];
        results.push(msg.data);
        if (results.length === concurrent) {
            setLoading(false);
            const toSave = {};
            toSave["executions"] = executions;
            toSave["dateTime"] = Date.now();
            toSave["concurrent"] = concurrent;
            const savedResults = [];
            results.map(result => {
                result.results.map(re => {
                    savedResults.push(re)
                });
            })
            toSave["results"] = savedResults;
            toSave["requests"] = requests;
            const e= new Notification({title: "Load Test Complete!", body: "Click here to go to results!"});
            e.on('click', () => setNavigation("/results"))
            e.show();
            setSavedResults(toSave);

        }
        threadResponse = results;
    }


    return (
        <div style={{display:"flex", flex:1, padding:5, margin:5, flexDirection:"column"}}>
            {
                loading &&
                <div style={{position:"absolute", left:0, right:0, top:0, bottom:0, display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:"rgba(191, 191, 191, 0.52)"}}>
                    <div style={{width:350, height:350, backgroundColor:"white", borderStyle:"solid", borderWidth:1, borderRadius:25, display:"flex", alignItems:"center",
                    flexDirection:"column", padding:5, justifyContent:"center"}}>
                        <h4>
                            Processing Requests
                        </h4>
                        <Image src={spinner}/>
                    </div>
                </div>
            }
            <div style={{flexDirection:"row", display:"flex", flex:1}}>
                <div style={{flex:4, display:"flex", flexDirection:"column", overflowX:"hidden"}}>
                    <div style={{display:"flex",flexDirection:"row", margin:10}}>
                        <div style={{flex:1, display:"flex", justifyContent:"center", alignItems:"center"}}>
                            <p style={{fontWeight:"bold", fontSize:22}}>Saved Requests</p>
                        </div>
                        <div style={{display:"flex", flex:3}}>
                            <div style={{display:"flex", flex:1, flexDirection:"column", justifyContent:"center", alignItems:"flex-start"}}>
                                <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                                    <h4>Concurrent Requests</h4>
                                    <NumberSelector value={concurrent} changeValue={(e) => setConcurrent(e < 1 ? 1 : e > 6 ? 6 : e)}/>
                                </div>

                            </div>
                            <div style={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                                <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                                    <h4>Executions</h4>
                                    <NumberSelector value={executions} changeValue={(e) => setExecutions(e < 1 ? 1 : e > 99 ? 99 : e)}/>
                                </div>

                            </div>
                        </div>

                    </div>
                    <div style={{flex:1, display:"flex", margin:5, flexDirection:"column"}}>
                        <HorizontalListView
                            addRequest={addRequest}
                            removeRequest={removeRequest}
                            concurrentRequests={concurrent}
                            requests={requests}/>
                        <div style={{display:"flex", justifyContent:"flex-end", alignItems:"center"}}>
                            <ArcButton title={"Send Requests"} onClick={sendRequests}/>
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
        SavedRequests: state.SavedRequests,
        windowSize: state.windowState,
        threadRequests: state.ThreadRequests
    }
}

export default connect(mapStateToProps, {setSavedResults, setNavigation, setThreadRequests})(Index);

