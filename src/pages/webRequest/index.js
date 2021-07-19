import React, {useState, useEffect} from 'react';
import Header from "./header";
import RequestBuilder from "./pages/requestbuilder";
import LoadTesting from "./pages/loadtesting";
import {useHistory} from 'react-router-dom';

export const TABS = [
    "Request Builder",
    "Load Testing"
]

const Index = () => {
    const [activeTab, setActiveTab] = useState(TABS[0])
    const history = useHistory();
    useEffect(() => {
        if (history?.location?.pathname?.includes("loadtester"))
            setActiveTab(TABS[1])
    },[])

    const GetActiveTab = () => {
        switch (activeTab) {
            case TABS[0]:
                return <RequestBuilder/>;
            case TABS[1]:
                return <LoadTesting/>;
        }
    }

    return (
        <div style={{display:"flex", flex:1, flexDirection:"column", height:"100%", overflowY:"scroll", overflowX:"hidden"}}>
            <Header activeTab={activeTab} setActiveTab={(e) => setActiveTab(e)}/>
            {GetActiveTab()}
        </div>
    )
}

export default Index;
