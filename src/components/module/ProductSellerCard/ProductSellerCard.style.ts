import styled from 'utils/styled';

export const SellerCardContainer = styled.div<{
  fishermanNotes?: string;
  withBackground?: boolean;
  fullWidth?: boolean;
}>`
  padding: ${({ theme, withBackground }) => (withBackground ? '16px' : 0)};
  margin-bottom: ${({ theme, withBackground }) =>
    withBackground ? 0 : '32px'};
  background-color: ${({ theme, withBackground }) =>
    withBackground ? theme.grey.noshade : 'rgba(0, 0 ,0 ,0, 0)'};
  border: ${({ theme, withBackground }) =>
    withBackground ? '2px solid #edeffa' : 0};
  border-radius: 8px;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
`;

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

export const AvatarContainer = styled.div<{ borderRadius?: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: fit-content;
  border-radius: ${({ borderRadius }) => borderRadius};
`;

export const AvatarPreview = styled.img<{ width?: string; height?: string }>`
  width: ${({ width }) => width || '56px'};
  height: ${({ height }) => height || '56px'};
  border-radius: 5px;
  object-fit: contain;
`;

export const AvatarPlaceholder = styled.div<{
  borderRadius?: string;
  width?: string;
  height?: string;
}>`
  border-radius: 5px;
  width: ${({ width }) => width || '56px'};
  height: ${({ height }) => height || '56px'};
  background-color: ${({ theme }) => theme.grey.shade2};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${({ borderRadius }) => borderRadius};
`;

export const FlexShrinked = styled.div<{ showCursor?: boolean }>`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
  flex: 1 auto;

  cursor: ${({ showCursor }) => (showCursor ? 'pointer' : 'inherit')};
`;
