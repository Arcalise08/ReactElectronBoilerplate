import React,{useRef, useState,useEffect} from 'react';
import { connect } from "react-redux";
import { clearMessages, setPopup } from "../../redux/actions";
import TriggerPopup from "./TriggerPopup";

const initialMessageLength = {incoming: 0, outgoing: 0}
const ReceiveSignalR = ({windowSize, Messages, Colors, setPopup, triggers, setTriggers, clearMessages}) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [messagesLength, setMessageLength] = useState(initialMessageLength)

    useEffect(() => {
        if (isPopupOpen)
            Pop();
    }, [triggers])
    useEffect(() => {
        if (Messages?.length)
            getMessageLength();
        else
            setMessageLength(initialMessageLength);
    }, [Messages])

    const Pop = () => {
        setIsPopupOpen(true);
        const init = {
            active: true,
            content: <TriggerPopup
                removeAt={(index) => removeTriggerAt(index)}
                setTriggers={setTriggers}
                triggers={triggers}
                onClose={() => {
                    setPopup({active: false, content: null});
                    setIsPopupOpen(false);
                }}/>
        }
        setPopup(init);
    }

    const removeTriggerAt = (index) => {
        const temp = [...triggers];
        temp.splice(index, 1);
        setTriggers(temp);
    }

    const BuildMessageLog = () => {
        const builder = [];
        if (Messages?.length === 0)
            return <div/>;
        const sortedMessages = Messages?.sort((a, b) => b.time - a.time)
        for (let i = 0; i < sortedMessages?.length; i++) {
            let time = "";
            try {
                time = sortedMessages[i]?.time?.toDateString()
            }
            catch {
                try {
                    time = new Date(sortedMessages[i].time).toDateString();
                }
                catch {
                    time = "Unknown Time"
                }
            }
            const temp = <ChatItem
                key={i}
                name={sortedMessages[i].name}
                message={sortedMessages[i].message}
                time={time}
                isClient={sortedMessages[i].client}
                Colors={Colors}
            />
            builder.push(temp);
        }
        if (builder.length === 0) {
            const temp = <div key={1} style={{
                height: windowSize.height * 0.2,
                minHeight: 100,
                maxHeight: 250,
                display:"flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <p style={{fontSize: 22, fontStyle: "italic"}}>No Messages</p>
            </div>
            builder.push(temp);
        }
        return builder;
    }

    const getMessageLength = () => {
        let incoming = 0;
        let outgoing = 0;
        Messages.map(mes => mes?.client ? outgoing++ : incoming++);
        setMessageLength({incoming, outgoing})

    }


    return (
        <div style={{display: "flex", flex:1, flexDirection: "column"}}>
            <p style={{fontSize: 18, marginTop:15, textAlign: "center"}}>
                Live Message View
            </p>
            <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
                marginRight: 15
            }}>
                <p style={{marginRight: 15}}>Received : {messagesLength.incoming}</p>
                <p>Sent : {messagesLength.outgoing}</p>
            </div>
            <div style={{
                height: windowSize.height * 0.3,
                minHeight: 100,
                maxHeight: 250,
                margin: 5,
                borderColor: "black",
                borderStyle: "solid",
                borderWidth: 1,
                overflowY:"scroll"
            }}>
                {BuildMessageLog()}
            </div>
            <div style={{justifyContent: "flex-end", display: "flex", flexDirection: "row"}}>
                <div
                    onClick={Pop}
                    style={{
                        backgroundColor: "rgba(26, 131, 223, 0.47)",
                        marginTop: 5,
                        marginRight: 5,
                        display: "flex",
                        maxHeight: 45,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 8
                    }}>
                    <p style={{fontSize: 16,cursor:"pointer", textAlign: "center", margin: 10}}>
                        Modify Listeners
                    </p>
                </div>
                <div
                    onClick={() => clearMessages()}
                    style={{
                        backgroundColor: "rgba(26, 131, 223, 0.47)",
                        display: "flex",
                        marginTop: 5,
                        marginRight: 5,
                        maxHeight: 45,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 8
                    }}>
                    <p style={{fontSize: 16, cursor:"pointer", textAlign: "center", margin: 10}}>
                        Clear Messages
                    </p>
                </div>
            </div>
        </div>
    )
}

const ChatItem = ({name, isClient, message, time, Colors}) => (
  <div style={{padding:5, display:"flex", flexDirection:"column", alignItems:isClient ? "flex-end" : "flex-start",
    backgroundColor: isClient ? Colors.ClientChatColor : Colors.IncomingChatColor,
    borderColor:"gray", borderTopWidth:1, borderBottomWidth:1, borderStyle:"solid"
  }}>
      <p style={{fontSize:16, textAlign:"center", margin:5, textDecorationLine:"underline"}}>{isClient ? "You" : name}</p>
      <p style={{fontSize:12, color:"gray", margin:0, fontStyle:"italic"}}>{time}</p>
      <p style={{fontSize:18, fontWeight:"bold", margin:5}}>{message}</p>
  </div>
)



let mapStateToProps = state => {
  return {
    windowSize: state.windowState,
    Messages: state.Messages,
    Colors: state.Colors
  }
}

export default connect(mapStateToProps, {clearMessages, setPopup})(ReceiveSignalR);
