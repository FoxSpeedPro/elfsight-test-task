import styled, { css } from 'styled-components';

export function FilterButton({ children, variant = 'apply', ...props }) {
  return (
    <StyledButton type="button" variant={variant} {...props}>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  grid-column: span 1;
  height: 40px;
  border-radius: 8px;
  background: transparent;
  cursor: pointer;

  transition: all 0.25s ease-in-out;

  ${({ variant }) =>
    variant === 'reset'
      ? css`
          border: 1px solid rgb(255, 81, 82);
          color: rgb(255, 81, 82);
        `
      : css`
          border: 1px solid rgb(131, 191, 70);
          color: rgb(131, 191, 70);
        `}

  &:hover {
    color: rgb(245, 245, 245);
    ${({ variant }) =>
      variant === 'reset'
        ? css`
            background: rgb(255, 81, 82);
          `
        : css`
            background: rgb(131, 191, 70);
          `}
  }
`;
