import styled from 'utils/styled';

import { BottomButtonLayout } from './BottomButtonAction.props';

export const Container = styled.div`
  display: block;
  width: 100%;
  position: fixed;
  bottom: 24px;
  left: 0;
  padding: 0 24px;
`;

export const ButtonContainer = styled.div<{ layout: BottomButtonLayout }>`
  display: flex;
  justify-content: center;
  flex-direction: ${(props) =>
    props.layout === 'horizontal' ? 'row' : 'column'};

  > :nth-child(2n) {
    margin: ${(props) =>
      props.layout === 'horizontal' ? '0 0 0 1em' : '1em 0 0 0'};
  }
`;
