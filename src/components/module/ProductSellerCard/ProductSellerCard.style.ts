import Typography from 'components/base/Typography';
import styled, { css } from 'utils/styled';

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;


export const RatingRow = styled(Row)`
  align-items: center;

  .rating-value {
    margin-right: 4px;
  }
`;

export const EndRow = styled(Row)`
`;

export const AvatarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: fit-content;
`;

export const AvatarPreview = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 5px;
  object-fit: contain;
`;

export const AvatarPlaceholder = styled.div`
  border-radius: 5px;
  width: 56px;
  height: 56px;
  background-color: ${({ theme }) => theme.grey.shade2};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Favorite = styled.button`
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-width: 0;
  background-color: white;
  padding-top: 8px;
`;

export const FlexShrinked = styled.div`
  display: flex;
  cursor: pointer;
  flex-direction: column;
  margin-left: 1rem;
  flex: 1 auto;

  max-height: 56px;
`;

export const Bold = styled(Typography)``;

export const StarContainer = styled.div<{ location?: string }>`
  margin-right: 6px;
`;

export const SellerCardContainer = styled.div<{ fishermanNotes?: string }>`
  padding: 24px;
  background-color: ${({ theme }) => theme.grey.noshade};
  border-color: ${({ theme }) => theme.grey.shade2};

  border: 2px solid #edeffa;

  border-radius: 8px;

  @media (min-width: 992px) {
    border-width: 2px;
    border-radius: 0px 0px 8px 8px;
  }
`;
