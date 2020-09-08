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

export const SellerRatingContainer = styled.div<{ fishermanNotes?: string }>`
  padding: 16px;
  background-color: ${({ theme }) => theme.grey.noshade};
  border: 2px solid #edeffa;
  border-width: ${({ fishermanNotes }) =>
    fishermanNotes ? '1px 2px 1px 2px' : '1px 2px 2px 2px'};
  border-radius: ${({ fishermanNotes }) =>
    fishermanNotes ? '0' : '0 0 8px 8px'};
`;
