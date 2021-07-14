import React, { useState } from 'react'
import {ClickableX} from "./styles";
import {Image} from 'react-bootstrap';
import CancelIcon from '../../../assets/cancel.png';
import SaveIcon from '../../../assets/save.png';
import ArcButton from "../../../components/ArcButton";

const WebListView = ({items, onRemove, onChange, onAdd, onAddAuth, buttonTitle}) => {
    return (
        <div style={{flex:1, display:"flex", flexDirection:"column",  margin:15}}>
            <div style={{borderWidth:"0 0 1px 0", borderStyle:"solid"}}>
                {
                    items.map((item, index) => <ListItem item={item} key={index} index={index} onRemove={onRemove} onChange={onChange}/> )
                }
            </div>

            <div style={{display:"flex", margin:5, flex:1, justifyContent:"flex-end"}}>
                {
                    onAddAuth &&
                    <ArcButton style={{padding:5, marginRight:5}} onClick={onAddAuth}>
                        <p style={{margin:5, fontSize:16, fontWeight:"bold"}}>Add Authorization</p>
                    </ArcButton>
                }
                <ArcButton style={{padding:5}} onClick={onAdd}>
                    <p style={{margin:5, fontSize:16, fontWeight:"bold"}}>{buttonTitle}</p>
                </ArcButton>

            </div>

        </div>
    )
}

const ListItem = ({item, index, onRemove, onChange, newHeader}) => {
    const [key, setKey] = useState(item?.key ?? "No Key");
    const [value, setValue] = useState(item?.value ? item.value : (item?.key === "Authorization" ? "Bearer " : "No Value"));
    const [editKey, setEditKey] = useState(!item?.key);
    const [editValue, setEditValue] = useState(!item?.value);

    const submitChange = (type) => {
        if (type === "key") {
            item.key = key;
            onChange(item, index);
            setEditKey(false);
        }
        else {
            onChange(item, index);
            item.value = value;
            setEditValue(false);
        }
    }

    const cancelChange = (type) => {
        if (type === "key") {
            setKey(item?.key ?? "No Key");
            setEditKey(false);
        }
        else {
            setValue(item?.value ?? "No Value")
            setEditValue(false);
        }
    }
    return (
        <div style={{flexDirection:"row", display:"flex",
            backgroundColor:"rgba(201, 201, 201, 0.73)",
            borderWidth:0.5, borderStyle:"solid", borderTopWidth: 1, borderBottomWidth:0}}>
            <div style={{marginLeft:10}}>
                {
                    editKey ?
                        <div style={{display:"flex", alignItems:"center"}}>
                            <input
                                style={{margin:5}}
                                value={key}
                                onChange={(e) => setKey(e.target.value)}
                                onSubmit={() => submitChange("key")}
                                onKeyDown={(e) => e.key === "Enter" ? submitChange("key") : null}
                            />
                            <Image src={CancelIcon} onClick={() => cancelChange("key")} style={{width:20, height:20, marginRight:7, cursor:'pointer'}}/>
                            <Image src={SaveIcon} onClick={() => submitChange("key")} style={{width:20, height:20, cursor:"pointer"}}/>
                        </div>

                        :
                        <p
                            onClick={() => setEditKey(true)}
                            style={{fontSize:22, margin:0, fontWeight:"bold", cursor:"pointer"}}>
                            {item?.key ?? "No Key"}
                        </p>
                }
                {
                    editValue ?
                        <div style={{display:"flex", alignItems:"center"}}>
                            <input
                                style={{margin:5, marginLeft:25}}
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                onSubmit={submitChange}
                                onKeyDown={(e) => e.key === "Enter" ? submitChange() : null}
                            />
                            <Image src={CancelIcon} onClick={cancelChange} style={{width:20, height:20, marginRight:7, cursor:'pointer'}}/>
                            <Image src={SaveIcon} onClick={submitChange} style={{width:20, height:20, cursor:"pointer"}}/>
                        </div>
                        :
                        <p
                            onClick={() => setEditValue(true)}
                            style={{fontSize:18, margin:0, marginLeft:15, cursor:"pointer"}}>
                            {item?.value ?? "No Value"}
                        </p>
                }

            </div>
            <div  style={{flex:1, display:"flex", justifyContent:"flex-end", alignItems:"center"}}>
                <ClickableX onClick={() => onRemove(index)}>x</ClickableX>
            </div>
        </div>
    )
}

export default WebListView;
