import Typography from 'components/base/Typography';
import styled from 'utils/styled';

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  /* align-items: center; */
`;

export const ActionsContainer = styled(Row)`
  display: flex;
  flex-direction: row;
  padding: 12px;
  width: 100%;
  background-color: ${({ theme }) => theme.grey.shade9};
  align-items: center;
  border-radius: 4px;
  margin-bottom: 2px;
`;

export const ActionContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 8px;
  background: rgba(255, 255, 255, 0.1);
  align-items: center;
  border-radius: 2px;
`;

export const ActionText = styled(Typography)`
  margin-left: 6px;
`;

export const Container = styled.div`
  padding: 16px;
  width: 100%;
  background-color: ${({ theme }) => theme.grey.shade9};
  border-radius: 4px;
  margin-bottom: 2px;
  ${({ onClick }) =>
    onClick
      ? `cursor: pointer;
  &:hover {
    opacity: 0.9;
  }`
      : ''};
`;

export const ValuesRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 12px;
`;

export const Value = styled.div`
  margin-right: 56px;
  padding: 0 4px 0 4px;
  min-width: 120px;
`;

export const OrderNumber = styled(Typography)`
  color: ${({ theme }) => theme.brand.primary};
  font-weight: bold;
`;

export const Preview = styled.img`
  width: 72px;
  height: 72px;
  margin-right: 12px;
  border-radius: 4px;
`;

export const Details = styled.div``;

export const TagsContainer = styled(Row)`
  flex-wrap: wrap;
  margin-bottom: 4px;
`;

export const Tag = styled.div`
  display: flex;
  flex-direction: row;
  padding: 8px;
  background: ${({ theme }) => theme.grey.shade8};
  align-items: center;
  min-height: 16px;
  border-radius: 2px;
  margin-right: 4px;
`;

export const TagText = styled(Typography)``;

export const Size = styled(Typography)`
  color: ${({ theme }) => theme.grey.noshade};
  font-weight: bold;
  margin-left: 4px;
`;
