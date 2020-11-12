import Typography from 'components/base/Typography';
import styled, { css } from 'utils/styled';

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const AvatarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: fit-content;
`;

export const AvatarPreview = styled.img`
  width: 96px;
  height: 96px;
  border-radius: 5px;
  object-fit: contain;
`;

export const AvatarPlaceholder = styled.div`
  border-radius: 5px;
  width: 96px;
  height: 96px;
  background-color: ${({ theme }) => theme.grey.shade2};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Favorite = styled.button`
  position: absolute;
  align-items: center;
  justify-content: center;
  bottom: -12px;
  right: 8px;
  width: 40px;
  height: 40px;
  border-width: 0;
  border-radius: 50%;
  background-color: white;
  padding-top: 8px;
  box-shadow: 0px 4px 10px -5px;
`;

export const FlexShrinked = styled.div`
  flex-shrink: 1;
  margin-top: 4px;
  cursor: pointer;
`;

export const Bold = styled(Typography)``;

export const StarContainer = styled.div<{ location?: string }>`
  margin-right: 6px;
  margin-top: ${({ location }) => (location ? '9px' : 0)};
`;
