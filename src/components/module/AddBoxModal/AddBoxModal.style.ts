import TextField from 'components/base/TextField';
import styled from 'utils/styled';

export const StyledTextField = styled(TextField)<{ noMargin?: boolean }>`
  flex: 1;
  margin-right: ${({ noMargin }) => (noMargin ? '0' : '24px')};
`;

export const Inputs = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 24px 0 36px 0;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
