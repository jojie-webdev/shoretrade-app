import ReactTooltip from 'react-tooltip';
import styled from 'utils/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

export const IconContainer = styled.div<{ isRefreshing: boolean }>`
  margin-left: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  svg {
    animation: ${({ isRefreshing }) =>
      isRefreshing ? 'loading 0.75s infinite linear' : 'none'};
  }

  @keyframes loading {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(359deg);
    }
  }
`;

export const ToolTip = styled(ReactTooltip)`
  overflow: visible;
  opacity: 1 !important;
  filter: drop-shadow(0px 6px 12px rgba(41, 43, 50, 0.12));

  &::after {
    left: 20% !important;
  }
`;
