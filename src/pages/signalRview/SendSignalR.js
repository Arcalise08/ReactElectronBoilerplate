import React, {useState} from 'react';
import ListView from "../../components/ListView";
import NumberSelector from "../../components/NumberSelector";
import { addMessages, clearMessages, setPopup, setQueuedMessages } from "../../redux/actions";
import { connect } from "react-redux";
import ArcButton from "../../components/ArcButton";


const SendSignalR = ({sendMessage, addMessages, setQueuedMessages, queuedMessages, disabled }) => {
  const [numberOfSends, setNumberOfSends] = useState(1);
  const [message, setMessage] = useState("");

  const AddMessage = () => {
    if (message.length > 0){
      const tempArr = [...queuedMessages];
      tempArr.push(message);
      setQueuedMessages(tempArr);
      setMessage("");
    }
  }

  const executeMessages = () => {
    sendMessage(numberOfSends);
  }

  return (
    <div>
      <p style={{fontSize:18, textAlign:"center", marginTop:15}}>
        Queue Messages
      </p>
      <ListView data={queuedMessages} setData={(e) => setQueuedMessages(e)}/>
      <div style={{display:"flex",flexDirection:"row",  margin:5}}>
        <div style={{display:"inline-block"}}>
          <p style={{fontSize:16, textAlign:"center", marginBottom:10}}>
            Executions
          </p>
          <NumberSelector value={numberOfSends} size={35} changeValue={(value) => setNumberOfSends(value)}/>
        </div>
        <div style={{display:"flex", flex:1, flexDirection:"row", marginLeft:15, alignItems:"flex-end"}}>
          <ArcButton onClick={executeMessages} disabled={disabled}>
            <p style={{fontSize:16, textAlign:"center", margin:10}}>
              Execute
            </p>
          </ArcButton>
          <div style={{display:"flex", flexDirection:"row", alignItems:"flex-end", justifyContent:"flex-end", flex:1}}>
              <input
                  style={{ textAlign:"center", width:"35%", padding:7 }}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={"Enter Message"}
              />

            <ArcButton
                style={{marginLeft:15}}
              onClick={AddMessage}>
              <p style={{fontSize:16, pAlign:"center", margin:10}}>
                Add Message
              </p>
            </ArcButton>
          </div>

        </div>

      </div>
    </div>
  )

}
let mapStateToProps = state => {
  return {
    Messages: state.Messages,
    queuedMessages: state.QueuedMessages
  }
}

export default connect(mapStateToProps, {clearMessages, setPopup, setQueuedMessages})(SendSignalR);
