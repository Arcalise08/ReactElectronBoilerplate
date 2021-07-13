import styled from 'styled-components';
import {Colors} from '../../../app_globals'

export const NavigationItem = styled.div`
  flex:1; 
  display:flex;
  background-color: ${({active}) => active ? Colors.navItemColor :"transparent"};
  border-color:gray; 
  border-width:1px 0 1px 0;
  border-style:solid;
  
  &:hover {
    background-color: ${Colors.navHoverColor};
    cursor:pointer;
  }
`
