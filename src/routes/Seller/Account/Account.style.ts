import Interactions from 'components/base/Interactions';
import Select from 'components/base/Select';
import styled from 'utils/styled';

export const Container = styled.div``;

export const NavInteraction = styled(Interactions)`
  margin-bottom: 8px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;

  .left-content {
    display: flex;
    align-items: center;

    img {
      border: 1px solid red;
      width: 96px;
      height: 96px;
      border-radius: 4px;
      margin-right: 16px;
    }
  }

  .right-content {
  }
`;

export const AccountSelect = styled(Select)`
  height: 28px;
  min-width: 120px;
`;
