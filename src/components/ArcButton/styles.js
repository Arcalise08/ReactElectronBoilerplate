import styled from 'styled-components';


export const GenericButton = styled(({backgroundColor, onHoverColor, ...props}) => <div {...props} />)`
  cursor:pointer; 
  background-color: ${({backgroundColor}) =>  backgroundColor ?? "rgba(26, 131, 223, 0.47)"};
  max-height:45px;
  justify-content:center;
  align-items:center;
  border-radius:8px;
  &:hover {
    background-color: ${({onHoverColor}) => onHoverColor ?? "rgba(26, 131, 223, 0.25)"};
  }
`
