import styled from 'utils/styled';

export const SwiperArea = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: calc(100% - 200px);
  overflow-x: hidden;
`;

export const ArrowArea = styled.div`
  display: flex;
  width: 100px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: ${(props) => props.theme.grey.noshade};
  border-radius: 4px;
`;
