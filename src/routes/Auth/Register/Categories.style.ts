import styled from 'utils/styled';

export const Image = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  margin-right: 16px;
`;

export const DetailsContainer = styled.div`
  padding-right: 8px;
  margin-left: 24px;
`;

export const CategoryItems = styled.div`
  display: flex;
  align-items: center;
`;

export const ResultContainer = styled.div`
  flex: none;
  order: 0;
  align-self: center;
  flex-direction: row;
  display: flex;
  position: absolute;
  left: 30%;
  top: 0;

  .ctg-text {
    margin-top: 12px;
  }
`;
