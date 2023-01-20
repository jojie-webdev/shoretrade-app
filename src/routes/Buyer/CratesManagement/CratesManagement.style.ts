import Typography from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import ReactTooltip from 'react-tooltip';
import styled from 'utils/styled';
import { pxToRem } from 'utils/Theme';

export const Container = styled.div`
  .__react_component_tooltip {
    padding: 4px 12px;
    border-radius: 6px;
  }
`;

export const CratesLeased = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const SFMLeased = styled.div`
  padding: 16px;
  border-radius: 8px;
`;

export const CratesContainer = styled.div<{ width?: string }>`
  background-color: ${({ theme }) => theme.grey.noshade};
  padding: 20px 12px;
  border-radius: 10px;
  border: 2px solid ${({ theme }) => theme.brand.secondary};
  width: ${({ width }) => width || '50%'};
  display: flex;
  justify-content: space-between;
`;

export const Text = styled.p`
  margin-bottom: 0;
  font-weight: 700 !important;
  color: ${({ theme }) => theme.brand.secondary};
  font-size: ${pxToRem(18)};
  line-height: 24px;
`;

export const ShoretradeLeased = styled.div`
  padding: 16px;
  background: ${({ theme }) => theme.grey.noshade};
  border-radius: 8px;
  ${({ theme }) => {
    if (theme.isSFM) {
      return `
        border: 1px solid ${theme.brand.secondary};
      `;
    }
  }}
`;

export const Count = styled(Typography)`
  margin-top: 4px;
  ${({ theme }) => {
    if (theme.isSFM) {
      return `
        color: ${theme.brand.secondary};
      `;
    }
  }}
`;

export const ButtonContainer = styled.div`
  display: flex;
  margin-top: 24px;
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
