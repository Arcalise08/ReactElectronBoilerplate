import styled from 'styled-components';
import {Colors} from "../../app_globals";

export const ListItem = styled.div`
  width:100%;
  height:150px;
  display:flex;
  border-width:0 0 1px 0;
  border-style:solid;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  background-color: transparent;
  cursor:pointer;
      &:hover {
        background-color: ${Colors.navHoverColor}
      }
    `
