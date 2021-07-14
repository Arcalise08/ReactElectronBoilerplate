import styled from 'styled-components';
import {Colors} from '../../app_globals';

export const NavigationItem = styled.div`
  flex:1;
  height:50px;
  display:flex;
  justify-content:center;
  align-items:center; 
  border-width:1px;
  cursor:pointer;
  background-color: ${({active}) => active ? Colors.navItemColor : "transparent"};
  border-style:groove;
  border-top:0;
  border-bottom-left-radius:${({position}) => position === "left" ? "80px" : 0};
  border-bottom-right-radius:${({position}) => position === "right" ? "80px" : 0};
  &:hover {
    background-color: ${Colors.navHoverColor};
  }
`
