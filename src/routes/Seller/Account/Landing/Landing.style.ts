import Interactions from 'components/base/Interactions';
import Select from 'components/base/Select';
import { DropdownArrow } from 'components/base/SVG';
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
      width: 96px;
      height: 96px;
      border-radius: 4px;
      margin-right: 16px;
    }
  }

  .right-content {
    position: relative;

    select {
      padding: 4px 12px;
      background: ${(props) => props.theme.grey.shade9};
      color: ${(props) => props.theme.grey.noshade};
      border-radius: 2px;
      border: none;
    }
  }
`;

export const AccountSelect = styled(Select)`
  height: 28px;
  min-width: 120px;
`;

export const DropdownContainer = styled.div`
  /* height: 30px;
  padding: 4px 12px; */
`;
