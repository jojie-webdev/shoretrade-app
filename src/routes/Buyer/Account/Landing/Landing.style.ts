import Interactions from 'components/base/Interactions';
import styled from 'utils/styled';

export const Container = styled.div`
  padding-bottom: 16px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;

  .left-content {
    display: flex;
    align-items: center;

    img {
      width: 96px;
      height: 96px;
      border-radius: 4px;
    }

    .user-details {
      margin-left: 16px;
    }
  }
`;

export const NavInteraction = styled(Interactions)`
  margin-bottom: 16px;
`;
