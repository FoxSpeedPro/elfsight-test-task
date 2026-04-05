import styled from 'styled-components';

export function FilterInput(props) {
  return <StyledInput {...props} />;
}

const StyledInput = styled.input`
  grid-column: span 2;
  height: 40px;
  padding: 12px 16px;
  border: 1px solid rgb(131, 191, 70);
  border-radius: 8px;
  background: rgb(38, 55, 80);
  color: rgb(245, 245, 245);
  box-sizing: border-box;
  outline: none;
  text-overflow: ellipsis;

  &::placeholder {
    color: rgb(179, 179, 179);
  }

  &:hover,
  &:focus {
    background: rgb(51, 68, 102);
  }
`;
