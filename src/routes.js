import React, {useEffect} from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import {connect} from "react-redux";
import {setWindow} from "./redux/actions";

//Pages;
import Results from './pages/results';
import SignalR from './pages/signalRview';
import Request from './pages/webRequest';
import Layout from "./components/layout";

const Routes = ({ setWindow }) => {
    useEffect(() => {
        window.addEventListener("resize", resize )
        return () => {
            window.removeEventListener("resize", resize )
        }
    }, [])

    const resize = (e) => {
        const win = {width: e.target.innerWidth, height: e.target.innerHeight}
        setWindow(win);
    }

    return (
        <Router>
            <Layout>
                <Switch>
                    <Route path={"/results"} component={Results}/>
                    <Route path={"/requests"} component={Request}/>
                    <Route path={"/"} component={SignalR}/>
                </Switch>
            </Layout>
        </Router>
    )
}

export default connect(null,{ setWindow })(Routes);
