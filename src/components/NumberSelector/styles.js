import styled from 'styled-components';

export const StyledInput = styled.input`
  display:block; 
  width:100%;
  text-align:center;
  margin:auto;
  font-size: ${({size}) => size ? size * 0.5 : 25 * 0.5};
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin:0
  };
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin:0
  }
`

export const Arrow = styled.div`
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
`
