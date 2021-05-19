import { animated } from '@react-spring/web';
import InteractionsView from 'components/base/Interactions';
import styled from 'utils/styled';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const TouchContainer = styled.div`
  touch-action: none;
  margin-bottom: 1rem;
`;

export const SwipeableContainer = styled(animated.div)`
  width: 100%;
  height: 96px;
  overflow: hidden;
  display: flex;
  position: relative;
  align-items: center;
  cursor: pointer;

  /* Shadow / Medium */

  box-shadow: 0px 6px 12px rgba(41, 43, 50, 0.12);
  border-radius: 4px;
`;

export const ActionsContainer = styled.div`
  position: relative;
  width: 98%;
  height: 98%;
  display: flex;
  flex-direction: row;
  z-index: 0;
  border-radius: 8px;
  margin: auto;

  .action {
    z-index: 0;
    color: ${({ theme }) => theme.grey.noshade};
    background: ${({ theme }) => theme.brand.error};
    height: 100%;
    text-align: left;
    padding: 24px;
    width: 100%;
    display: block;
    border-radius: 8px;

    svg {
      margin-right: 4px;
    }
  }
`;

export const SwipeableWrapper = styled(animated.div)`
  cursor: pointer;
  z-index: 10;
  position: absolute;
  left: 0;
  height: auto;
  top: 0;
  right: 0;
  bottom: 0;
`;

export const SwipeableInteraction = styled(InteractionsView)`
  height: 100%;
`;
