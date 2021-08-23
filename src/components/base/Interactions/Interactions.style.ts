import Typography from 'components/base/Typography';
import styled from 'utils/styled';

import { InteractionsProps, IconAlignmentTypes } from './Interactions.props';

export const Container = styled.div<InteractionsProps>`
  width: 100%;
  border-radius: 8px;
  padding: ${({ padding }) => padding || '24px'};
  display: flex;
  justify-content: space-between;
  position: relative;

  background-color: ${({ theme, backgroundColor, noBg }) => {
    const isSeller = theme.appType !== 'buyer';

    if (noBg) {
      return 'transparent';
    }

    return (
      backgroundColor || (isSeller ? theme.grey.shade9 : theme.grey.noshade)
    );
  }};

  margin-top: ${({ label }) => (label ? '20px' : 0)};
  box-shadow: ${({ theme, noBg, flat }) => {
    if (noBg || flat) {
      return 'none';
    }

    return theme.appType === 'buyer'
      ? '0px 4px 12px rgba(41, 43, 50, 0.04) !important'
      : 'none !important';
  }};

  ${({ onClick, type, offers }) =>
    offers !== undefined
      ? offers > 0
        ? `cursor: pointer;
          &:hover {
            opacity: 0.9;
          }`
        : ''
      : onClick && type !== 'none'
      ? `cursor: pointer;
        &:hover {
          opacity: 0.9;
        }`
      : ''}

  .left-content,
  .right-content {
    display: flex;
    align-items: center;
  }
`;

export const Value = styled(Typography)<{ fontColor?: string }>`
  color: ${({ theme, fontColor }) => {
    const isSeller = theme.appType !== 'buyer';
    return fontColor || (isSeller ? '#ffffff' : theme.grey.shade9);
  }};
  padding-right: 16px;
`;

export const Label = styled(Typography)`
  position: absolute;
  top: -20px;
  left: 0;
`;

export const DropdownFlipped = styled.div`
  transform: rotate(180deg);
`;

export const IconContainer = styled.div<{ iconAlignment: IconAlignmentTypes }>`
  display: flex;
  align-items: ${(props) => props.iconAlignment}; // defaults to center
  justify-content: center;
`;
