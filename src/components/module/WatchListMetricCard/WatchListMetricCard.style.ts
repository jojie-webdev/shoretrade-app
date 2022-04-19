import styled from 'utils/styled';

export const Container = styled.div`
  background: ${({ theme }) => theme.grey.shade9};
  border-radius: 12px;
  padding: 12px 20px 20px 20px;
`;

export const TopContainer = styled.div`
  padding-bottom: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.grey.shade8};
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
`;

export const ItemsContainer = styled.div`
  margin-top: 8px;
`;

export const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;

  .sub-label {
    opacity: 0.5;
  }

  .value-container {
    display: flex;
    margin-bottom: 8px;

    svg {
      margin-left: 8px;
    }
  }
`;
