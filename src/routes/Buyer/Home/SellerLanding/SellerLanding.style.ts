import styled from 'utils/styled';

export const PreviewContainer = styled.div`
  .header-title {
    margin-bottom: 24px;
  }

  .cards {
    display: flex;
    flex-wrap: wrap;
  }

  .search-row {
    margin-bottom: 24px;
  }
`;

export const SellerContainer = styled.div`
  margin-top: 10px;

  .interactions {
    margin-bottom: 8px;
  }
`;

export const Image = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  margin-right: 16px;
`;

export const PlaceholderImage = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  margin-right: 16px;
  background-color: ${({ theme }) => theme.grey.shade2};
  display: flex;
  justify-content: center;
  align-items: center;
`;
