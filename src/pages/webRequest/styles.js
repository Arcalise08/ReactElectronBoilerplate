import styled from 'styled-components';
import {Colors} from '../../app_globals';

export const NavigationItem = styled.div`
  flex:1;
  height:50px;
  display:flex;
  justify-content:center;
  align-items:center; 
  border-right-width:1px;
  border-top-width: 0;
  border-bottom-width:1px;
  border-left-width: 0;
  cursor:pointer;
  background-color: ${({active}) => active ? Colors.navItemColor : "transparent"};
  border-style:groove;
  &:hover {
    background-color: ${Colors.navHoverColor};
  }
`
