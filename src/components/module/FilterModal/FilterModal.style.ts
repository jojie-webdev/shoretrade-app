import Typography from 'components/base/Typography';
import { Row } from 'react-grid-system';
import styled from 'utils/styled';

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const Title = styled(Typography)<{ marginLeft?: string }>`
  color: ${({ theme }) =>
    theme.appType === 'seller' ? theme.grey.shade1 : theme.grey.shade9};
  margin-left: ${({ marginLeft }) => marginLeft || '0px'};
`;

export const ClickableRow = styled(Row)`
  cursor: pointer;
`;

export const Reset = styled(Typography)`
  color: ${({ theme }) => theme.brand.primary};
  margin-right: 8px;
`;

export const Filter = styled.div`
  margin-bottom: 16px;
`;

export const RadioContainer = styled.div`
  margin-bottom: 24px;
  background-color: ${({ theme }) => {
    const isSeller = theme.appType !== 'buyer';

    return isSeller ? theme.grey.shade9 : '#ffffff';
  }};
  border-radius: 4px;
  padding: 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const CheckboxContainer = styled.div`
  margin-bottom: 16px;
`;

export const DropdownContainer = styled.div`
  margin-bottom: 24px;
`;

export const InputContainer = styled.div`
  margin-bottom: 24px;
`;

export const Scroll = styled.div`
  overflow-y: auto;
  max-height: 50vh;
`;
