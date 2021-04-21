import Typography from 'components/base/Typography';
import styled from 'utils/styled';

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const RatingRow = styled(Row)`
  align-items: center;

  .rating-value {
    margin-right: 4px;
    font-size: 16px;
    line-height: 20px;
    display: block;
    height: 16px;
  }
`;

export const EndRow = styled(Row)``;

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

export const FlexShrinked = styled.div`
  display: flex;
  cursor: pointer;
  flex-direction: column;
  margin-left: 1rem;
  flex: 1 auto;

  max-height: 56px;
`;

export const StarContainer = styled.div<{ location?: string }>`
  margin-right: 6px;
`;

export const SellerCardContainer = styled.div<{
  fishermanNotes?: string;
  withBackground?: boolean;
}>`
  padding: ${({ theme, withBackground }) => (withBackground ? '16px' : 0)};
  margin-bottom: ${({ theme, withBackground }) =>
    withBackground ? 0 : '32px'};
  background-color: ${({ theme, withBackground }) =>
    withBackground ? theme.grey.noshade : 'rgba(0, 0 ,0 ,0, 0)'};
  border: 2px solid #edeffa;
  border: ${({ theme, withBackground }) =>
    withBackground ? '2px solid #edeffa' : 0};

  border-radius: 8px;

  height: 100%;
  max-height: 120px;

  @media (min-width: 992px) {
    border-width: 2px;
    border-radius: 0px 0px 8px 8px;
  }
`;
