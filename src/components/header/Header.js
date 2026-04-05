import styled from 'styled-components';
import { Logo } from './Logo';
import { FilterPanel } from '../filterPanel/FilterPanel';

export function Header() {
  return (
    <HeaderContainer>
      <Logo />
      <FilterPanel />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 950px) {
    flex-direction: column;
    justify-content: center;
    gap: 30px;
  }
`;
