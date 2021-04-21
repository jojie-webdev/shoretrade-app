import styled from 'utils/styled';

export const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
  padding: 0 8px 8px 8px;

  .cards {
    display: flex;
    flex-wrap: wrap;

    a {
      margin-right: 32px;
    }
  }

  .search-row {
    margin-bottom: 24px;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
  height: 100%;
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
