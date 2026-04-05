import styled from 'styled-components';

export function Text({ children }) {
  return <StyledText>{children}</StyledText>;
}

const StyledText = styled.span`
  color: #ccc;
  font-size: 16px;
`;
