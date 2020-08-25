import { ArrowLeft } from 'components/base/SVG';
import Typography from 'components/base/Typography';
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

export const CloseButtonContainer = styled.div`
  width: 40px;
  height: 40px;
  position: absolute;
  border-radius: 50%;
  top: -20px;
  right: -20px;
  background-color: ${({ theme }) => theme.grey.noshade};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 64px;
  background-color: ${({ theme }) =>
    theme.appType === 'seller' ? theme.grey.shade9 : theme.grey.shade2};
  align-items: center;
  padding: 0px 20px;
`;

export const HeaderContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const HeaderSpacer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 100%;
`;

export const BackIcon = styled(ArrowLeft)``;

export const Title = styled(Typography)`
  font-weight: bold;
  color: ${({ theme }) =>
    theme.appType === 'seller' ? theme.grey.noshade : theme.grey.shade8};
`;

export const Content = styled(Col)`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) =>
    theme.appType === 'seller' ? theme.grey.shade8 : theme.grey.shade1};
  height: 70%;
  width: 100%;
  box-shadow: 0px 12px 24px rgba(41, 43, 50, 0.25);
  border-radius: 4px;
`;

export const Scroll = styled.div`
  overflow-x: hidden;
  overflow-y: visible;
`;

export const ProgressIndicator = styled.div`
  background: ${(props) => props.theme.brand.success};
  height: 2px;
  transition: width 0.4s ease-out;
`;
