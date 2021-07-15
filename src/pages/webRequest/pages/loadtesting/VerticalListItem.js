import React, {useState, useEffect} from "react";
import {useSpring, animated} from 'react-spring';
import {useMove, useDrag} from "react-use-gesture";

import {RequestItem} from "./styles";
import {Colors} from "../../../../app_globals";

const Item = animated(RequestItem);

const SavedRequest = ({method, name, active, onClick, onDragStart, onDragEnd}) => {
    const [isFloating, setIsFloating] = useState(false);
    const [{x, y}, set] = useSpring(() => ({x: 0, y: 0}))


    useEffect(() => {
        if (isFloating)
            onDragStart();
        else
            onDragEnd()
    }, [isFloating])

    const bind = useDrag(({down, movement: [mx, my], event}) => {
        set({x: down ? mx : 0, y: down ? my : 0});
        setIsFloating(true);
        if (!down)
            setTimeout(() => {
                setIsFloating(false)
            }, 250)
    })




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
            <Item {...bind()} active={active} style={{
                x,
                y,
                pointerEvents: isFloating ? "none" : "visible",
                touchAction: 'none',
                userSelect: "none",
                position: "absolute",
                opacity: isFloating ? 1 : 0,
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
