import styled from 'styled-components';
import {Image} from 'react-bootstrap';

export const HighlightImage = styled(Image)`
  cursor :${({disabled}) => disabled ? "not-allowed" : "pointer"};
  width: ${({size}) => size ?? "25px"};
  height: ${({size}) => size ?? "25px"};
  opacity: 1;
  &:hover {
    opacity:${({disabled}) => disabled ? 1 : 0.8};
  }
  
`
