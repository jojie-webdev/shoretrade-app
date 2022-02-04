import Typography from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

import { InteractionsProps, IconAlignmentTypes } from './Interactions.props';

export const Container = styled.div<InteractionsProps>`
  width: 100%;
  border-radius: 8px;
  padding: ${({ padding }) => padding || '24px'};
  margin-bottom: ${({ marginBottom }) => marginBottom};
  display: flex;
  justify-content: space-between;
  position: relative;
  flex-direction: ${({ bottomComponent }) =>
    bottomComponent ? 'column' : 'row'};

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

  ${({ type }) =>
    type !== 'none'
      ? `cursor: pointer;
        &:hover {
          opacity: 0.9;
        }`
      : ''}

  .top-content,
  .left-content,
  .right-content,
  .bottom-content {
    display: flex;
    align-items: center;
  }
  .left-radio {
    flex-direction: row;
  }
`;

export const Value = styled(Typography)<{ fontColor?: string }>`
  color: ${({ theme, fontColor }) => {
    const isSeller = theme.appType !== 'buyer';
    return fontColor || (isSeller ? '#ffffff' : theme.grey.shade9);
  }};
  padding-right: 16px;
  white-space: nowrap;

  @media ${BREAKPOINTS['sm']} {
    padding-right: 0;
  }
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

export const PlusContainer = styled.div`
  background: ${({ theme }) => theme.brand.primary};
  border-radius: 12px;
  padding: 8px 13px 14px;
  color: ${({ theme }) => theme.grey.noshade};

  p {
    height: 12px;
    margin-bottom: 0;
  }
`;
