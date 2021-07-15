import React, {useState, useEffect} from 'react';


const HorizontalListView = ({requestToAdd}) => {
    useEffect(() => {

    })

    return (
        <div onPointerOverCapture={() => console.log("mouse has entered the sceneeee")} onPointerOver={() => console.log("mouse has entered the sceneeee")} onDragEnter={() => console.log("mouse has entered the sceneeee")}
            style={{flex:1, display:"flex", maxHeight:125, pointerEvents:"visible", borderWidth:1, borderStyle:"solid"}}>
            <p>list view</p>
        </div>
    )
}

export default HorizontalListView
