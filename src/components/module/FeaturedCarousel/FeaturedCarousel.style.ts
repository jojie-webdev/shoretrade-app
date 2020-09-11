import styled from 'utils/styled';

export const MainContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  // background: #F9FAFF;
`;

export const PreviewContainer = styled.div`
  box-shadow: 0px 6px 12px rgba(41, 43, 50, 0.12);
  flex: 1;
  min-width: 100%;
  height: 357px;
  transition: 0.5s;
  border-radius: 4px;
`;

export const Preview = styled.img`
  flex: 1;
  width: 100%;
  height: auto;
  object-fit: contain;
  border-radius: 4px;
`;

const Btn = styled.button`
  border: none;
  padding: 0;
  background: none;
  position: absolute;
  transform: translateY(-50%);
  z-index: 1000;
  right: 0;
`;

export const ButtonRight = styled(Btn)`
  right: 0;
`;

export const ButtonLeft = styled(Btn)`
  left: 0;
`;
