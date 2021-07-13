import React, { useState } from "react";



const TriggerPopup = ({triggers, setTriggers, onClose, removeAt}) => {
  const [trigger, setTrigger] = useState("");

  const submitTrigger = () => {
      setTriggers([...triggers, trigger])
      setTrigger("");
  }
  return (
    <div style={{display:"flex", height:"100%", flex:1, justifyContent:"center", alignItems:"center"}}>
      <div style={{borderWidth:1,backgroundColor:"white", borderStyle:"solid",
        borderColor:"black", padding:15, width:350}}>
        <p style={{fontSize:22, fontWeight:"bold", textDecorationLine:"underline"}}>Current Listeners</p>
        <div style={{padding:15, overflowY:"scroll", height:150}}>
          {
            triggers.map((trig, i) => (
              <div key={i} style={{display:"flex", flexDirection:"row"}}>
                <p style={{overflow:"hidden"}}>{trig?.length > 30 ? trig.slice(0, 30) + "{...}" : trig}</p>
                <div style={{flex:1, display:"flex", alignItems:"center", justifyContent:"flex-end"}}>
                    <p onClick={() => removeAt(i)} style={{cursor:"pointer"}}>x</p>
                </div>
              </div>
            ))
          }
        </div>
      <div style={{marginRight:5, marginTop:10}}>
          <input
              style={{width:"100%"}}
              onChange={(e) => setTrigger(e.target.value)}
              onSubmit={submitTrigger}
              onKeyDown={(e) => e.key === "Enter" ? submitTrigger() : null}
              value={trigger}
          />
      </div>

        <div
            onClick={submitTrigger}
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
            Add Listener
          </p>
        </div>
        <div
            onClick={onClose}
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
            Close
          </p>
        </div>
      </div>
    </div>
  )
}
export default TriggerPopup;
