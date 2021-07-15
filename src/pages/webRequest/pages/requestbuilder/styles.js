import styled from 'styled-components';
import {Colors} from "../../../../app_globals";



export const ClickableX = styled.p`
  font-size:32px;
  font-weight:bold;
  color:red; 
  margin-right:10px;
  cursor:pointer;
  opacity:1;
  &:hover {
    opacity:0.5;
  }
`

export const RequestItem = styled.div`
  width:100%;
  height:155px;
  display:flex;
  cursor:pointer;
  background-color: ${({active}) => active ? Colors.navHoverColor : "transparent"};
  justify-content:center;
  border-width:0 0 1px 0;
  border-style:solid;
  flex-direction:column;
  &:hover {
    background-color: ${({onHoverColor}) => onHoverColor ?? Colors.navHoverColor};
  }
    `
