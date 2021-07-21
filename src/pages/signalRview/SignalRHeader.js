import React, {useState, useEffect} from 'react';
import { connect } from "react-redux";
import ArcButton from "../../components/ArcButton";

export const CONNECTION_STATES = {
  disconnected: "Disconnected",
  pending: "Connecting...",
  connected: "Connected",
  failed: "Failed"
}


const SignalRHeader = ({signalRHub, setSignalRHub, onConnect, onDisconnect, Status}) => {
  const [connectMessage, setConnectMessage] = useState(CONNECTION_STATES.disconnected);

  useEffect(() => {
    setConnectMessage(Status?.message ?? CONNECTION_STATES.disconnected);
  }, [Status])

  const getMsgColor = () => {
    switch (connectMessage) {
      case CONNECTION_STATES.disconnected:
        return "red";
      case CONNECTION_STATES.failed:
        return "red";
      case CONNECTION_STATES.pending:
        return "yellow";
      case CONNECTION_STATES.connected:
        return "green";
    }
  }

  const isConnected = () => {
    return connectMessage === CONNECTION_STATES.connected;
  }

  return (
    <div style={{ display:"flex", flexDirection: "row", marginTop: 15 }}>
      <div style={{ flex: 2, borderStyle: "solid", padding: 10, borderWidth: 1, margin: 5, borderColor: "gray" }}>
        <p style={{ fontSize: 22, fontWeight: "bold", marginVertical: 10, textAlign: "center" }}>
          Connection Status
        </p>
        <p style={{
          fontSize: 18,
          fontStyle: "italic",
          textAlign: "center",
          color: getMsgColor()
        }}>{connectMessage}
        </p>
      </div>
      <div style={{ flex: 6, display:"flex",maxHeight:"35%",  flexDirection: "row", margin: 5 }}>
        <div style={{ flex: 6, display:"flex",  marginLeft: 5, justifyContent: "flex-end" }}>
          <input
              style={{ textAlign: "center", flex:1 }}
              value={signalRHub}
              disabled={isConnected()}
              onChange={(e) => setSignalRHub(e.target.value)}
              placeholder={"Enter SignalR Hub Endpoint"}
          />
        </div>
        <div style={{ flex: 1, display:"flex", marginLeft:10, justifyContent: "flex-end" }}>
          {
            connectMessage === CONNECTION_STATES.connected ?
                <ArcButton
                    onClick={onDisconnect}
                    onHoverColor={"rgba(255, 20, 20, 0.5)"}
                    backgroundColor={"rgb(255, 20, 20)"}
                    style={{
                      flex:1, justifyContent:"center",
                      alignItems: "center", display:"flex", borderRadius: 8, cursor:"pointer"
                    }}>
                  <p style={{ fontSize: 14, fontWeight:"bold", margin:0, color: "white" }}>
                    Disconnect
                  </p>
                </ArcButton>
                :
                <ArcButton
                    onClick={onConnect}
                    onHoverColor={"rgba(0, 0, 0, 0.51)"}
                    backgroundColor={"black"}
                    style={{
                      flex:1, justifyContent:"center",
                      alignItems: "center", display:"flex", borderRadius: 8, cursor:"pointer"
                    }}>
                  <p style={{ fontSize: 14, fontWeight:"bold", margin:0, color: "white" }}>
                    Connect
                  </p>
                </ArcButton>
          }

        </div>
      </div>
    </div>
  )
}

let mapStateToProps = state => {
  return {
    windowSize: state.windowState,
    Messages: state.Messages,
    Colors: state.Colors,
    Status: state.SignalR
  }
}

export default connect(mapStateToProps)(SignalRHeader);
