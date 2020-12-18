import Typography from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

import { InteractionsProps, IconAlignmentTypes } from './InteractionsV2.props';

export const Container = styled.div<InteractionsProps>`
  width: 100%;
  border-radius: 8px;
  padding: ${({ padding }) => padding || '15px'};
  display: flex;
  justify-content: space-between;
  position: relative;

  background-color: ${({ theme, backgroundColor, noBg }) => {
    const isSeller = theme.appType !== 'buyer';

    if (noBg) {
      return 'transparent';
    }

    return backgroundColor || (isSeller ? theme.grey.shade9 : '#ffffff');
  }};

  margin-top: ${({ label }) => (label ? '8px' : 0)};
  box-shadow: ${({ theme, noBg }) => {
    if (noBg) {
      return 'none';
    }

    return theme.appType === 'buyer'
      ? '0px 6px 12px rgba(41, 43, 50, 0.12);'
      : 'none';
  }};

  ${({ onClick, type }) =>
    onClick && type !== 'none'
      ? `cursor: pointer;
  &:hover {
    opacity: 0.9;
  }`
      : ''};

  ${({ isHover }) =>
    isHover
      ? `:hover {
    box-shadow: none;
  }`
      : ''};

  .right-content {
    display: flex;
    align-items: center;
  }

  .left-content {
  }
`;

export const Value = styled(Typography)`
  color: ${({ theme }) => {
    const isSeller = theme.appType !== 'buyer';
    return isSeller ? '#ffffff' : theme.grey.shade9;
  }};
  padding-right: 16px;
`;

export const Label = styled(Typography)`
  flex-wrap: wrap;
`;

export const DropdownFlipped = styled.div`
  transform: rotate(180deg);
`;

export const IconContainer = styled.div<{ iconAlignment: IconAlignmentTypes }>`
  display: flex;
  align-items: ${(props) => props.iconAlignment}; // defaults to center
  justify-content: center;
`;

export const BadgeContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 16px;
`;

export const BadgeItemContainer = styled.div`
  margin-right: 8px;
  margin-top: 8px;
`;
