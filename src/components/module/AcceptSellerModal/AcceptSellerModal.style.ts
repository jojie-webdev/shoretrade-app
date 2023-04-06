import styled from 'utils/styled';

export const Container = styled.div``;

export const DetailsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 7px;
`;

export const Line = styled.div`
  height: 2px;
  width: 100%;
  background-color: ${({ theme }) => theme.grey.noshade};
`;

export const TotalValueContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

export const BoxContainer = styled.div`
  display: flex;
  align-items: start;
  justify-content: start;
  margin-top: 10px;
`;
