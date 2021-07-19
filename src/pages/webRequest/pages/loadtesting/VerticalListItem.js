import React, {useState, useEffect, useRef} from "react";
import {useSpring, animated} from 'react-spring';
import ReactDOM from 'react-dom';

import {RequestItem} from "./styles";
import {Colors} from "../../../../app_globals";
import {Draggable} from "react-beautiful-dnd";

const Item = animated(RequestItem);

const SavedRequest = ({method, name, active, onClick, onDragStart, onDragEnd}) => {
    const [isFloating, setIsFloating] = useState(false);
    const [styles, set] = useSpring(() => ({transform: "translate(0px, 0px)"}))
    const [initialPosition, setInitialPosition] = useState(null);
    useEffect(() => {
        setIsFloating(false)
        console.clear();
    }, [])

    useEffect(() => {
        if (isFloating) {
            onDragStart();
        }
        else {
            onDragEnd()
        }

    }, [isFloating])


    const handleMouseBind = (e) => {
        e.preventDefault();
        const offset = e.target.getBoundingClientRect();
        if (!isFloating) {
            setIsFloating(true);
            setInitialPosition({ left: e.clientX - offset.width, top: e.clientY - offset.height })
        }

        if (e.pageY === 0 || e.pageX === 0)
            return;

        set({ left: e.clientX - offset.width, top: e.clientY - offset.y })
    }

    const reset = (e) => {
        e.preventDefault();
        const offset = e.target.getBoundingClientRect();
        set( {
            from:
                {left: e.pageX - offset.width, top: e.pageY - offset.height},
            to: {left: initialPosition.left, top:initialPosition.top},
            config: {duration: 250} });
        setTimeout(() => {
            setIsFloating(false);
            setInitialPosition(null);
            set({left:"", top:""})
        }, 250)

    }



    const getMethodColor = () => {
        switch (method) {
            case "GET":
                return "#4DA3F8";
            case "PUT":
                return "#F2F281";
            case "POST":
                return "green";
            case "DELETE":
                return "red";
        }
    }

    return (
        <div>
            <Draggable draggableId={"draggable"} >
                <Item
                    active={active}
                    style={{
                        pointerEvents: isFloating ? "none" : "visible",
                        touchAction: 'none',
                        userSelect: "none",
                        position: "absolute",
                        opacity: isFloating ? 1 : 0,
                        ...styles
                    }}>

                    <p style={{
                        fontSize: 18,
                        touchAction: 'none',
                        pointerEvents: "none",
                        fontWeight: "bold",
                        marginLeft: 25,
                        color: getMethodColor()
                    }}>{method}</p>
                    <p style={{fontSize: 18,touchAction: 'none', pointerEvents: "none", color: "gray", textAlign: "center"}}>{name}</p>
                </Item>
            </Draggable>

            <Item active={active} style={{
                backgroundColor: isFloating ? Colors.navHoverColor : "transparent",
                borderWidth: isFloating ? 0 : "0 0 1px 0"
            }}>

                <p style={{
                    fontSize: 18,
                    opacity: isFloating ? 0 : 1,
                    fontWeight: "bold",
                    marginLeft: 25,
                    color: getMethodColor()
                }}>{method}</p>
                <p style={{fontSize: 18, opacity: isFloating ? 0 : 1, color: "gray", textAlign: "center"}}>{name}</p>
            </Item>
        </div>

    )
}

export default SavedRequest;
