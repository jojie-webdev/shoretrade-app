import { ArrowLeft } from 'components/base/SVG';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Col, Row } from 'react-grid-system';
import BuyerBackgroundImage from 'res/images/buyer-image.png';
import SellerBackgroundImage from 'res/images/seller-image.png';
import styled from 'utils/styled';

const getBackgroundImage = (theme: { appType: 'seller' | 'buyer' }) => {
  return theme.appType === 'seller'
    ? SellerBackgroundImage
    : BuyerBackgroundImage;
};

export const Container = styled(Row)`
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.grey.shade8};
  margin-left: 0px !important;
  margin-right: 0px !important;
  max-height: 100vh;
`;

export const BackgroundContainer = styled(Col)`
  padding-left: 0px !important;
  padding-right: 0px !important;
  max-height: 100vh;
  background-color: ${({ theme }) => theme.grey.shade8};
`;

export const Background = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${({ theme }) => getBackgroundImage(theme)});
  background-repeat: no-repeat;
  background-size: 100% 100%;

  @media ${BREAKPOINTS['lg']} {
    background-size: cover;
  }
  @media ${BREAKPOINTS['md']} {
    background-size: cover;
  }
  @media ${BREAKPOINTS['sm']} {
    background-size: cover;
    height: 0%;
  }
`;

export const Wrapper = styled(Col)`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding-left: 0px !important;
  padding-right: 0px !important;
  background-color: ${({ theme }) =>
    theme.appType === 'buyer' ? theme.grey.shade1 : theme.grey.shade8};
  max-height: 100vh;
  overflow: hidden;
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
  min-height: 64px;
  max-height: 64px;
  background-color: ${({ theme }) => theme.grey.shade8};
  align-items: center;
  padding: 0px 20px;
`;

export const HeaderSpacer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 100%;
`;

export const BackIcon = styled(ArrowLeft)``;

export const ProgressContainer = styled.div<{
  background?: string;
  isRegister?: boolean;
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${({ theme }) =>
    theme.appType === 'buyer' ? theme.grey.shade1 : theme.grey.shade8};
  border-radius: 4px;
  height: ${({ isRegister }) => (isRegister ? '1%' : '0%')};
`;

export const Content = styled.div<{
  background?: string;
  minHeight?: string;
  isRegister?: boolean;
  isLogin?: boolean;
}>`
  padding: 0px 40px 24px 40px;
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 460px;
  width: 100%;
  background-color: ${({ theme }) =>
    theme.appType === 'buyer' ? theme.grey.shade1 : theme.grey.shade8};
  min-height: ${({ minHeight }) => minHeight || '598px'};
  /* max-height: 660px; */
  border-radius: 4px;
  z-index: 999;
  height: ${({ isRegister }) => (isRegister ? '99%' : '100%')};

  @media ${BREAKPOINTS['sm']} {
    max-height: 100vh;
    max-width: 100%;

    padding: ${({ isLogin }) => (isLogin ? '40px 24px' : '0px 24px 40px 24px')};
  }
`;

export const ProgressIndicator = styled.div`
  background: ${(props) => props.theme.brand.success};
  height: 2px;
  transition: width 0.4s ease-out;
`;

export const LogoContainer = styled.div<{
  logoContainerMarginBottomHeight?: number;
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${(props) =>
    props.logoContainerMarginBottomHeight
      ? `${props.logoContainerMarginBottomHeight}px`
      : '120px'};
  margin-top: 80px;

  @media ${BREAKPOINTS['sm']} {
    margin-top: 40px;
    margin-bottom: 20px;
  }
`;

export const MobileFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 24px;
  background-color: ${({ theme }) =>
    theme.appType === 'seller' ? theme.grey.shade9 : theme.grey.shade2};
  width: 100%;
  z-index: 999;
  position: fixed;
  bottom: 0;
`;
