import TextField from 'components/base/TextField';
import styled from 'utils/styled';

export const Container = styled.div``;

export const StyledTextField = styled(TextField)`
  flex: 1;
`;

export const GroupedBoxContainer = styled.div`
  display: flex;
  border: 1px solid ${({ theme }) => theme.grey.shade5};
  padding: 5px;
`;

export const RadioBtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
