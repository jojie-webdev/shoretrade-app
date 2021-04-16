import styled from 'utils/styled';
import Touchable from '../Touchable';

export const Container = styled(Touchable)`
  display: flex;
  flex-direction: row;
  align-items: center;

  width: 40px;
  height: 40px;

  background: #FFFFFF;
  border: 1px solid #DADFF2;
  box-sizing: border-box;
  border-radius: 8px;

  min-width 40px;
  min-height: 40px;
`;

export const SvgContainer = styled.div`
  display: block;
  margin: 0 auto;
`;
