import styled from 'utils/styled';

import Touchable from '../Touchable';

export const Container = styled(Touchable)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 4px;
  background: #ffffff;
  border: 1px solid ${({ theme }) => theme.grey.shade4};
  box-sizing: border-box;
  border-radius: 8px;
  min-width: 40px;
  height: 40px;

  :hover {
    background-color: #fff;
  }

  :active {
    opacity: 0.5;
  }
`;

export const SvgContainer = styled.div`
  padding-top: 4px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
