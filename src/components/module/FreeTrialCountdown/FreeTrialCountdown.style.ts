import styled from 'utils/styled';

import { FreeTrialCountdownProps } from './FreeTrialCountdown.props';

export const Container = styled.div<FreeTrialCountdownProps>`
  padding: 16px;
  margin: 0 auto 24px auto;
  ${({ theme, small }) =>
    theme.appType === 'buyer' && !small ? 'width: calc(100% - 200px);' : ''}
  display: flex;
  background: ${({ theme }) =>
    theme.appType === 'buyer' ? theme.grey.noshade : theme.grey.shade9};
  border-radius: 12px;

  ${({ daysLeft }) =>
    daysLeft === 0
      ? `
  &:hover {
    cursor: pointer;
  }
  `
      : ''}

  > div {
    ${({ small }) => (!small ? 'margin-left: 24px;' : '')}
    width: 100%;
  }
`;
