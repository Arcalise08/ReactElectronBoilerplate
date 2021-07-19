import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis} from 'recharts';
import {connect} from "react-redux";
import {setSavedRequests} from "../../redux/actions";
import {ListItem} from "./styles";
import ArcButton from "../../components/ArcButton";

const convertResult = (r) => {
    if (!r)
        return;
    const builder = [];
    r?.results.map((result, index) => {
        const temp = {
            name: !result?.request?.name || result?.request?.name === "" ? "Untitled Request" : result.request.name,
            time:result?.completedIn/10 , failures: result?.success ? 0 : 1, performance: gradeRequest(result) }
        builder.push(temp)
    })
    return builder;
}

const gradeRequest = (request) => {
    const time = request?.completedIn;
    if (time === undefined || time === null)
        return 0;
    if (!request?.success)
        return 0;

    if (request?.request?.method === "GET") {
        return compareTime(time, 0);
    }
    else {
        const bodyLength = request?.request?.body?.length;
        if (bodyLength > 500)
            return compareTime(time, 5)
        if (bodyLength < 400 && bodyLength >= 300)
            return compareTime(time, 3)
        if (bodyLength < 300 && bodyLength >= 200)
            return compareTime(time, 2)
        if (bodyLength < 200 && bodyLength >= 100)
            return compareTime(time, 1)
        return compareTime(time, 0)
    }
}

const compareTime = (time, modifier) => {
    let score;
    if (time < 10)
        score = 10 + modifier;
    if (time >= 10 && time < 20)
        score = 8 + modifier;
    if (time >= 20 && time < 50)
        score = 5 + modifier;
    if (time >= 50)
        score = 3 + modifier;
    if (time > 60)
        score = 0 + modifier;

    if (score > 10)
        return 10;
    if (score < 0)
        return 0;
    return score;
}



const Index = ({SavedResults, windowSize}) => {
    const [activeData, setActiveData] = useState(null);

    useEffect(() => {
        switchResult(SavedResults[SavedResults?.length - 1 ?? 0]);
    }, [])

    const switchResult = (result) => {
        const re = convertResult(result);
        if (!re || !re?.length)
            setActiveData(null)
        else
            setActiveData(re);
    }

    const buildSavedRequests = () => {
        const builder = [];
        for (let i=0; i < SavedResults?.length; i++) {
            const temp =
                <ListItem key={i} onClick={() => switchResult(SavedResults[i])}>
                    <p style={{margin:0}}>Concurrent Requests : {SavedResults[i].concurrent}</p>
                    <p style={{fontWeight:"bold", textDecorationLine:"underline", margin:0}}>Ran on</p>
                    <p>{new Date(SavedResults[i].dateTime).toDateString()}</p>
                </ListItem>;
            builder.push(temp);
        }
        return builder;
    }

    const runAgain = () => {

    }


    return (
        <div style={{flex: 1, display: "flex", flexDirection: "column", overflowY: "scroll", padding:5}}>
            <h1 style={{marginLeft: 55}}>Results</h1>
            <div style={{display: "flex", flex: 1}}>
                <div style={{flex: 1, display: "flex", flexDirection:"column", height: windowSize?.height * 0.9,
                    marginLeft:15, overflowY:"scroll", overflowX:"hidden", minWidth: 250, borderWidth:1, borderStyle:"solid", marginRight:15}}>
                    {buildSavedRequests()}
                </div>
                <div style={{flex: 4, display: "flex", position:"relative", flexDirection: "column"}}>
                    {
                        activeData === null &&
                        <div style={{position:"absolute", left:0, right:0, top:0, bottom:0, display:"flex", justifyContent:"center", alignItems:"center", backgroundColor:"rgba(66, 66, 66, 0.25)"}}>
                            <p style={{fontSize:22, fontWeight:"bold"}}>No data</p>
                        </div>
                    }
                    <ResponsiveContainer width="100%" height="100%" >
                        <LineChart
                            style={{opacity: activeData === null ? 0.4 : 1}}
                            width={500}
                            height={300}
                            data={activeData}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3"/>
                            <Legend />
                            <XAxis dataKey="name"/>
                            <YAxis name={"request time"} dataKey={"performance"}/>
                            <Tooltip />


                            <Line type="monotone" dataKey="time" stroke="#8884d8" activeDot={{r: 8}}/>
                            <Line type="monotone" dataKey="failures" stroke="red"/>
                            <Line type="monotone" dataKey="performance" stroke="blue"/>
                        </LineChart>
                    </ResponsiveContainer>
                    {
                        /*
                    <div style={{display:"flex", justifyContent:"flex-end"}}>
                        <ArcButton onClick={runAgain} style={{padding:10}}>
                            <p style={{color:"white"}}>Run Again</p>
                        </ArcButton>
                    </div>
                        * */
                    }


                </div>
            </div>

        </div>

    );
}

let mapStateToProps = state => {
    return {
        SavedResults: state.SavedResults,
        windowSize: state.windowState
    }
}

export default connect(mapStateToProps, {setSavedRequests})(Index);
