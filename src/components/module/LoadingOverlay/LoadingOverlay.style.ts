import Typography from 'components/base/Typography/Typography.view';
import styled from 'utils/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-color: rgba(244, 246, 255, 0.9); //shade2
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
  z-index: 1000;
`;

export const Label = styled(Typography)`
  margin-top: 10px;
`;