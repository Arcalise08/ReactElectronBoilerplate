import React, { useState, useEffect, useRef } from "react";
import SignalRHeader, { CONNECTION_STATES } from "./SignalRHeader";
import SendSignalR from "./SendSignalR";
import ReceiveSignalR from "./RecieveSignalR";
import { HubConnectionBuilder } from '@microsoft/signalr';
import { connect } from "react-redux";
import { setSignalR, addMessages } from "../../redux/actions";



const Index = ({Messages, SignalR, setSignalR, BaseURL, addMessages}) => {
  const [signalRHub, setSignalRHub] = useState("");
  const [triggers, setTriggers] = useState([]);
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    if (signalRHub?.length > 0)
      connect();
  }, [triggers])

  const connect = async () => {
    disconnect();
    setSignalR({message:CONNECTION_STATES.pending, connection: null});
    const tryConnection = new HubConnectionBuilder()
      .withUrl(BaseURL + signalRHub)
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

    con.onclose(() => setSignalR({message:CONNECTION_STATES.disconnected, connection : null}));
    con.onreconnected(() => setSignalR({message:CONNECTION_STATES.connected, connection : con}));
    con.onreconnecting(() => setSignalR({message:CONNECTION_STATES.pending, connection : con}));
    for (let i=0; i < triggers?.length; i++) {
      console.log(`added listener ${triggers[i]}`)
      con.on(triggers[i], (e) => addMessages({client: false, time: new Date(Date.now()), message: e, name:"Other" }))
    }
  }

  const sendMessage = (message) => {
    if (!connection){
      console.log("send execution blocked");
      return;
    }
    connection.send(message)
  }

  return (
    <div style={{display:"flex", flexDirection:"column", overflowY:"scroll", flex:1, height:"100%", marginBottom:25}}>
      <SignalRHeader
        onConnect={connect}
        onDisconnect={disconnect}
        signalRHub={signalRHub}
        setSignalRHub={(e) => setSignalRHub(e)}

      />
      <SendSignalR
        sendMessage={sendMessage}
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
  }
}

export default connect(mapStateToProps, {setSignalR, addMessages})(Index);
