import React, { useState, useEffect, useRef } from "react";
import SignalRHeader, { CONNECTION_STATES } from "./SignalRHeader";
import SendSignalR from "./SendSignalR";
import ReceiveSignalR from "./ReceiveSignalR";
import { HubConnectionBuilder } from '@microsoft/signalr';
import { connect } from "react-redux";
import {setSignalR, addMessages, setMessages} from "../../redux/actions";
// eslint-disable-next-line import/no-webpack-loader-syntax
import Worker from 'worker-loader!../../WebWorkers/signalr.worker.js';


const Index = ({Messages, SignalR, setSignalR, BaseURL, addMessages, queuedMessages}) => {
  const [signalRHub, setSignalRHub] = useState("");
  const [triggers, setTriggers] = useState([]);
  const [connection, setConnection] = useState(null);
  const [executionInProgress, setExecutionInProgress] = useState(false);

  useEffect(() => {
    const hub = localStorage.getItem("hub") ?? "";
    const lastConnected = localStorage.getItem("connected");
    setSignalRHub(hub);
    console.log(hub?.length > 0 && lastConnected === "true")
    if (hub?.length > 0 && lastConnected === "true") {
      connect({hub});
    }
    else {
      if (SignalR?.connection)
        try {
          SignalR.connection?.stop();
          setConnection(null);
        }
        catch{}
      setSignalR({message: CONNECTION_STATES.disconnected, connection: null})
    }

  }, [triggers])




  const connect = async (props) => {
    setSignalR({message:CONNECTION_STATES.pending, connection: null});
    if (connection !== null) {
      setSignalR({message:CONNECTION_STATES.connected, connection: connection})
      if (connection?.connectionState !== "Connected")
        connection.start();
      runBasicTriggers(connection);
      return;
    }

    const base = !props?.hub ? BaseURL + signalRHub : BaseURL + props.hub

    const tryConnection = new HubConnectionBuilder()
      .withUrl(base)
      .withAutomaticReconnect()
      .build();
    try {
      await tryConnection.start();
      setSignalR({message:CONNECTION_STATES.connected, connection: tryConnection})
      setConnection(tryConnection)
      runBasicTriggers(tryConnection);
    }
    catch {
      setSignalR({message:CONNECTION_STATES.failed, connection: null});
    }
  }

  const disconnect = () => {
    try {
      if (connection) {
        connection?.stop();
        setConnection(null);
      }
      if (SignalR?.connection) {
        SignalR?.connection?.stop()
      }
    }
    catch {

    }
  }

  const runBasicTriggers = (con) => {
    if (!con){
      console.log("trigger execution blocked");
      return;
    }
    disposeBasicTriggers(con);

    con.onclose(() => setSignalR({message:CONNECTION_STATES.disconnected, connection : null}));
    con.onreconnected(() => setSignalR({message:CONNECTION_STATES.connected, connection : con}));
    con.onreconnecting(() => setSignalR({message:CONNECTION_STATES.pending, connection : con}));
    for (let i=0; i < triggers?.length; i++) {
      console.log(`added listener ${triggers[i]}`)
      con.on(triggers[i], (e) => addMessages({client: false, time: new Date(Date.now()), message: e, name:"Other" }))
    }
  }

  const disposeBasicTriggers = (con) => {
    if (!con){
      console.log("trigger disposal blocked");
      return;
    }
    con.onclose(() => setSignalR({message:CONNECTION_STATES.disconnected, connection : null}));
    con.onreconnected(() => setSignalR({message:CONNECTION_STATES.connected, connection : con}));
    con.onreconnecting(() => setSignalR({message:CONNECTION_STATES.pending, connection : con}));
    for (let i=0; i < triggers?.length; i++) {
      console.log(`removed listener ${triggers[i]}`)
      con.off(triggers[i], (e) => addMessages({client: false, time: new Date(Date.now()), message: e, name:"Other" }))
    }
  }


  const sendMessages = async (numberOfSends) => {
    if (!connection){
      console.log("send execution blocked");
      return;
    }
    console.log(numberOfSends);
    const messages = queuedMessages;
    for (let i=0; i < messages?.length; i++) {
      for (let a=0; a < numberOfSends; a++) {
        const constructMessage = {
          client: true,
          time: new Date(Date.now()),
          message: messages[i],
          name:"You",
          success: true,
          status: "message"
        }
        addMessages(constructMessage);
        await connection.send(messages[i]);
      }
    }
  }

  const splitLoad = (arr, split) => {
    if (arr?.length === 0)
      return arr;

    const splitBy = split ?? 100;

    const number = Math.ceil(arr.length/splitBy);
    const builder = [];
    for (let a = 0; a < number; a++) {
      builder.push([]);
      for (let i =0; i < splitBy; i++) {
        const item = arr[(a * splitBy) + i]
        if (item)
          builder[a].push(item)
      }
    }
    return builder;
  }

  const globalListener = (msg, work) => {
    if (msg?.data?.status === "message")
      addMessages(msg?.data);
    if (msg?.data?.status === "end") {
      work.removeEventListener("message", (e) => globalListener(e, work));
      work.terminate();
    }

  }

  return (
    <div style={{display:"flex", flexDirection:"column", overflowY:"scroll", flex:1, height:"100%", marginBottom:25}}>
      <SignalRHeader
        onConnect={() => {
          localStorage.setItem("connected", true);
          connect();
        }}
        onDisconnect={() => {
          localStorage.setItem("connected", false);
          disconnect();
        }}
        signalRHub={signalRHub}
        setSignalRHub={(e) => {
          setSignalRHub(e)
          localStorage.setItem("hub", e);
        }}

      />
      <SendSignalR
        sendMessage={sendMessages}
        disabled={executionInProgress}
      />
      <ReceiveSignalR
        triggers={triggers}
        setTriggers={(e) => setTriggers(e)}
      />
    </div>
    )

}


let mapStateToProps = state => {
  return {
    Messages: state.Messages,
    SignalR: state.SignalR,
    BaseURL: state.BaseURL,
    queuedMessages: state.QueuedMessages
  }
}

export default connect(mapStateToProps, {setSignalR, addMessages})(Index);
