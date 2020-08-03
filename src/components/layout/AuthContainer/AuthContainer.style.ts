import {
  Container as GridContainer,
  Row as GridRow,
  Col,
} from 'react-grid-system';
import BackgroundImage from 'res/images/seller-auth-background.png';
import styled from 'utils/styled';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.grey.shade9};
`;

export const Background = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${BackgroundImage});
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0.32;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const Grid = styled(GridContainer)`
  height: 100%;
`;

export const Row = styled(GridRow)`
  height: 100%;
`;

export const Content = styled(Col)`
  background-color: ${({ theme }) => theme.grey.shade8};
  height: 70%;
  box-shadow: 0px 12px 24px rgba(41, 43, 50, 0.25);
  border-radius: 4px;
`;
