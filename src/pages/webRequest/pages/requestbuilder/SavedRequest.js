import {RequestItem} from "./styles";
import React from "react";

const SavedRequest = ({method, name, active, onClick, center}) => {
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
        <RequestItem active={active} onClick={onClick} >
            <p style={{fontSize: 18, fontWeight: "bold", marginLeft: center ? 0 : 25, textAlign: center ? "center" : "initial", color: getMethodColor()}}>{method}</p>
            <p style={{fontSize: 18, color: "gray", textAlign: "center"}}>{name}</p>
        </RequestItem>
    )
}

export default SavedRequest;
