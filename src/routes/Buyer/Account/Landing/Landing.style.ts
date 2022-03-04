import Interactions from 'components/base/Interactions';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const Container = styled.div`
  @media ${BREAKPOINTS['sm']} {
    padding-bottom: 24px;
  }
`;

export const UserInfoContainer = styled.div`
  background: ${({ theme }) => theme.grey.noshade};
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 8px;
`;

export const AccountPictureProgress = styled.div`
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
`;

export const NavInteraction = styled(Interactions)`
  margin-bottom: 12px;
`;
