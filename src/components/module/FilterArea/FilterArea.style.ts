import Typography from 'components/base/Typography';
import styled from 'utils/styled';

export const Container = styled.div``;

export const FilterLabel = styled(Typography)`
  color: ${({ theme }) => theme.grey.shade6};
  padding-bottom: 8px;
  margin-bottom: 16px;
  border-bottom: 2px solid ${({ theme }) => theme.grey.shade3};
`;

export const LabeledCheckBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const CheckBoxLabel = styled(Typography)`
  color: ${({ theme }) => theme.grey.shade9};
  display: flex;
  flex: 1;
`;
