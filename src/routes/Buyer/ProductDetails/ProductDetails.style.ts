import styled from 'utils/styled';

export const Container = styled.div`
  flex-direction: row;
  padding: 8px;

  .description {
    text-align: center;
    padding: 24px;
  }
`;

export const BannerContainer = styled.div`
  width: 100%;
  max-width: 100%;
  height: 297px;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
`;

export const DetailsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
