import styled, { css } from 'utils/styled';

export const CategoriesContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 16px;

  .cards {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
  height: 100%;
`;

export const FilterButton = styled.button`
  background: #111e2b;
  border-radius: 4px;
  color: white;
  margin-top: 4px;
`;
