import Interactions from 'components/base/Interactions';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const Container = styled.div`
  @media ${BREAKPOINTS['sm']} {
    padding-bottom: 24px;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;

  .left-content {
    display: flex;
    align-items: center;
    position: relative;
    height: 120px;
  }
`;

export const NavInteraction = styled(Interactions)`
  margin-bottom: 12px;
`;
