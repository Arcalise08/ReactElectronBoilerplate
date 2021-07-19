import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {connect} from "react-redux";
import SavedRequest from "../requestbuilder/SavedRequest";
import {RequestItem} from "./styles";

const HorizontalListView = ({SavedRequests, addRequest, removeRequest, concurrentRequests, requests, windowSize}) => {
    const onDragEnd = (e) => {
        if (
            e?.source?.index === null
            || e?.source?.index === undefined
            || e?.destination?.index === null
            || e?.destination?.index === undefined
        )
            return;
        if (e.reason === "DROP") {
            const save = {...SavedRequests[e.source.index]}
            const thread = e.destination.droppableId.replace("droppable-", "")
            save.thread = parseInt(thread);
            addRequest(save);
        }
    }

    const filterRequests = (i) => {
        const key = requests.filter(x => x.thread === i)
        return key;
    }

    const buildLists = () => {
        const builder = [];
        for (let i=0; i < concurrentRequests ?? 1; i++) {
            const temp = <Droppable key={i} droppableId={`droppable-${i}`} direction="horizontal">
                {(provided, snapshot) => (
                    <div
                        style={{width: windowSize.width * 0.6, display:"flex", height:150,  borderWidth:1, margin: 10,borderStyle:"solid", overflowX:"scroll", overflowY:"hidden"}}
                        ref={provided.innerRef}>
                        {
                            filterRequests(i).map((item, index) => (
                                <Draggable
                                    key={index}
                                    draggableId={"droppable-" + index}
                                    index={index}
                                >
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={{userSelect:"none", width:250, height:150, margin:5, ...provided.draggableProps.style, ...snapshot.isDragging}}
                                        >
                                            <SavedRequest center={true} name={!item?.name || item?.name?.length === 0 ? "Untitled Request" : item.name} method={item.method}/>
                                        </div>
                                    )}
                                </Draggable>

                            ))
                        }

                        {provided.placeholder}
                    </div>
                )}
            </Droppable>;
            builder.push(temp);
        }
        return builder;
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div style={{flex:1, display:"flex", flexDirection:"row"}}>
                <div style={{flex:1, minWidth:250, display:"flex", overflowY:"scroll"}}>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
                            <div
                                style={{display:"flex", flex:1, height:windowSize?.height * 0.5, flexDirection:"column"}}
                                ref={provided.innerRef}>
                                {
                                    SavedRequests.map((item, index) => (
                                        <Draggable
                                            key={index}
                                            draggableId={"draggable-" + index}
                                            index={index}
                                        >
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={{userSelect:"none", padding: 15, ...provided.draggableProps.style, ...snapshot.isDragging}}
                                                >
                                                    <SavedRequest name={!item?.name || item?.name?.length === 0 ? "Untitled Request" : item.name} method={item.method}/>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))
                                }

                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
                <div style={{flex:3, display:"flex", flexDirection:"column"}}>
                    {buildLists()}
                </div>

            </div>

        </DragDropContext>
    );

}

let mapStateToProps = state => {
    return {
        BaseURL: state.BaseURL,
        SavedRequests: state.SavedRequests,
        windowSize: state.windowState
    }
}

export default connect(mapStateToProps)(HorizontalListView);

