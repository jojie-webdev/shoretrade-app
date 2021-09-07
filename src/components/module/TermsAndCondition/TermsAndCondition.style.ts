import Alert from 'components/base/Alert';
import Interactions from 'components/base/Interactions';
import TypographyView from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Swiper, SwiperSlide } from 'swiper/react';
import styled from 'utils/styled';
import { pxToRem } from 'utils/Theme';

export const Container = styled.div``;

export const AnimatedComponentContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 35px;
`;

export const AnimatedImageContainer = styled.div`
  margin-top: auto;
  width: 100%;
  position: relative;
  padding-bottom: 20px;
`;

export const AnimatedImageSubContainer = styled.div`
  /* position: absolute; */
  inset: 0;
  margin: auto;
  width: fit-content;
`;

export const Card = styled.div<{ appType: string }>`
  display: flex;
  flex-direction: column;
  padding: 24px 40px 48px 40px;
  max-width: 310.67px;
  height: 100%;
  background: ${({ theme, appType }) =>
    appType === 'buyer' ? '#fff' : theme.grey.shade10};
  border: 1px solid #dadff2;
  box-sizing: border-box;
  border-radius: 12px;

  @media (max-width: 1426px) {
    padding: 24px;
  }
`;

export const CircleBackground = styled.div<{ appType: string }>`
  width: 150px;
  height: 150px;
  background-color: ${({ theme, appType }) =>
    appType === 'buyer' ? theme.grey.shade1 : theme.grey.shade10};
  border-radius: 50%;
`;

export const StyledAcceptTermsAndConditionText = styled(TypographyView)`
  margin-left: 8px;
  font-family: 'Basis Grotesque Pro';
`;

export const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: 100%;

  .swiper-pagination-bullet-active {
    background-color: ${({ theme }) => theme.brand.primary};
  }

  .swiper-pagination-bullet {
    margin: 0 2px;
  }
`;
