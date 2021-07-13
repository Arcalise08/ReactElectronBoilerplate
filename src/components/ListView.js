import React, {useState} from 'react';
import { connect } from "react-redux";
import cancelIcon from '../assets/cancel.png';
import copyIcon from '../assets/copy.png';
import saveIcon from '../assets/save.png';
import {Image} from 'react-bootstrap'

const ListView = ({windowSize, data, setData}) => {

  const copyItem = (index) => {
    const temp = [...data];
    temp.push(data[index]);
    setData(temp);
  }

  const deleteItem = (index) => {
    const temp = [...data];
    temp.splice(index, 1);
    setData(temp);
  }

  const editItem = (index, change) => {
    const temp = [...data];
    temp[index] = change;
    setData(temp);
  }

  const buildList = () => {
    const builder = []
    for (let i=0; i < data.length; i++) {
      const temp = <ListItem
        key={i}
        message={data[i]}
        onCopy={() => copyItem(i)}
        onDelete={() => deleteItem(i)}
        onEdit={(change) => editItem(i, change)}
        />;
      builder.push(temp);
    }
    return builder;
  }

  return (
    <div style={{height: windowSize.height * 0.3, minHeight:100, overflowY:"scroll", maxHeight:250, margin:5, borderColor:"black", borderStyle:"groove", borderWidth:1}}>
      <div style={{padding:5}}>
        {buildList()}
      </div>
    </div>
  )
}

const ListItem = ({message, onEdit, onCopy, onDelete}) => {
  const [editMode, setEditMode] = useState(false);
  const [tempEdit, setTempEdit] = useState(message);

  const submitEdit = () => {
    onEdit(tempEdit);
    setEditMode(false);
  }

  const changeText = (e) => {
    if (tempEdit.length > 35)
      return
    setTempEdit(e)
  }
  return (
    <div style={{
      flexDirection: "row", display:"flex", marginVertical: 3, height: 50, borderColor: "black",
      borderStyle: "solid", borderWidth: 1, alignItems: "center", backgroundColor: "#ededed"
    }}>
      {
        editMode ?
          <div style={{ marginLeft: 10, display:"flex", flexDirection:"row", overflow:"hidden" }}>
            <input
              value={tempEdit}
              onChange={(e) => changeText(e.target.value)}
              onBlur={submitEdit}
              onSubmit={submitEdit}
              onKeyDown={(e) => e.key === "Enter" ? submitEdit() : null}
            />
            <div onClick={submitEdit} style={{justifyContent:"center"}}>
              <Image src={saveIcon} style={{ width: 20, height: 20, marginLeft:5 }} />
            </div>
          </div>

          :
          <div style={{flex:5, overflow:"hidden", marginLeft:10}}>
            <p style={{ fontSize: 18, margin:0 }}
                  onClick={() => setEditMode(true)}>{message?.length > 35 ? message.slice(0, 35) : message}
            </p>
          </div>
          }

      <div style={{ flex: 1, display:"flex", justifyContent: "flex-end", flexDirection: "row", marginRight: 10 }}>
        <div onClick={onCopy}>
          <Image src={copyIcon} style={{ width: 25, height: 25 }} />
        </div>
        <div onClick={onDelete}>
          <Image src={cancelIcon} style={{ width: 25, height: 25, marginLeft: 10 }} />
        </div>
      </div>
    </div>
  )
}

let mapStateToProps = state => {
  return {
    windowSize: state.windowState
  }
}

export default connect(mapStateToProps)(ListView);
