import styled from 'utils/styled';

export const Container = styled.div``;

export const Tab = styled.div<{
  active: boolean;
  textColor?: string;
  activeTextColor?: string;
  underlineColor?: string;
  light?: boolean;
}>`
  display: flex;
  align-items: center;
  padding: 9px 24px;
  justify-content: center;
  border-bottom: 2px solid
    ${({ theme, active, underlineColor }) =>
      active
        ? theme.brand.primary
        : underlineColor
        ? underlineColor
        : theme.grey.shade9};
  cursor: pointer;

  .tab-text {
    color: ${({ theme, active, textColor, activeTextColor }) =>
      active
        ? activeTextColor
          ? activeTextColor
          : theme.grey.noshade
        : textColor
        ? textColor
        : theme.grey.shade6};

    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
  }

  .custom-tab {
    border-radius: 8px;
    padding: 4px 8px;
    background: ${({ theme, light }) =>
      light ? theme.grey.shade3 : theme.grey.shade9};
    font-size: 9px;
    font-weight: 900;
    margin-left: 8px;
    color: ${({ theme, light }) =>
      light ? theme.grey.shade9 : theme.grey.noshade};
  }
`;
