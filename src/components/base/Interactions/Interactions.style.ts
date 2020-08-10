import Typography from 'components/base/Typography';
import styled from 'utils/styled';

import { InteractionsProps, IconAlignmentTypes } from './Interactions.props';

export const Container = styled.div<InteractionsProps>`
  width: 100%;
  border-radius: 4px;
  padding: ${({ padding }) => padding || '24px'};
  display: flex;
  justify-content: space-between;
  position: relative;
  background-color: ${({ theme, backgroundColor }) => {
    const isSeller = theme.appType !== 'buyer';

    return backgroundColor || (isSeller ? theme.grey.shade9 : '#ffffff');
  }};
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
  margin-top: ${({ label }) => (label ? '20px' : 0)};
  box-shadow: ${({ theme }) =>
    theme.appType === 'buyer' ? '0 6px 12px rgba(41, 43, 50, 0.12)' : 'none'};
`;

export const Value = styled(Typography)`
  color: ${({ theme }) => {
    const isSeller = theme.appType !== 'buyer';
    return isSeller ? '#ffffff' : theme.grey.shade9;
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
