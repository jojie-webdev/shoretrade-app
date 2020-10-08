import styled from 'utils/styled';

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
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
  border-color: grey;
  object-fit: contain;
`;

export const AvatarPlaceholder = styled.img`
  width: 96px;
  height: 96px;
  border-radius: 5px;
  border-color: grey;
  background-color: grey;
`;

export const PreviewDetails = styled.div`
  margin-left: 15px;
`;

export const StarContainer = styled.span<{
  hasLocation: boolean;
}>`
  margin-right: 6px;
  margin-top: ${(props) => (props.hasLocation ? '0' : '22px')};
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
