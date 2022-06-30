import Typography from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Swiper } from 'swiper/react';
import styled from 'utils/styled';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TextContainer = styled.div`
  max-width: 50%;

  @media (max-width: 568px) {
    max-width: unset;
  }
`;

export const ImgContainer = styled.div`
  margin-top: 32px;
  margin-left: 12px;

  img {
    width: 468px;
  }

  @media (max-width: 568px) {
    display: none;
  }
`;

export const LinkContainer = styled.div`
  display: flex;
  margin-top: 24px;
  flex-wrap: wrap;

  button:first-of-type {
    margin-right: 8px;
  }
`;

export const LinkButton = styled.button`
  display: flex;
  margin-top: 8px;
  cursor: pointer;
  border-radius: 8px;
  background: ${({ theme }) => theme.grey.shade9};
  border: 0;
  padding: 12px 16px;
  width: 205px;

  svg {
    margin-right: 12px;
    height: 40px;
    width: 40px;
  }
`;

export const SubscriptionPayment = styled(Typography)`
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

export const Container1 = styled.div`
  gap: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${BREAKPOINTS['sm']} {
    gap: 8px;
  }
`;

export const Pro = styled(Typography)`
  padding: 3px 4px;
  background-color: ${({ theme }) => theme.brand.primary};
  border-radius: 4px;
  font-weight: 900;
  font-family: 'Media Sans';
  line-height: normal;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 5px;
`;

export const Title1 = styled(Typography)`
  font-family: 'Media Sans';
  margin: 24px 0 12px;

  @media ${BREAKPOINTS['sm']} {
    text-align: center;
    margin-bottom: 0;
  }
`;

export const DescriptionWrapper = styled.div`
  max-width: 310px;
  margin: auto;
  display: flex;
  align-items: center;
  height: 100%;

  @media ${BREAKPOINTS['md']} {
    width: 214px;
  }
`;

export const Description = styled(Typography)`
  @media ${BREAKPOINTS['sm']} {
    text-align: center;
  }
`;

export const LandingDefaultContainer = styled.div`
  max-width: 972px;
  margin: auto;
`;

export const FirstDescription = styled(Typography)`
  @media ${BREAKPOINTS['sm']} {
    text-align: center;
  }
`;

export const ImageContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 235px;
`;

export const SwiperWrapper = styled(Swiper)`
  .swiper-pagination-bullet {
    margin: 0 2px;
    @media ${BREAKPOINTS['sm']} {
      background: ${({ theme }) =>
        theme.appType === 'buyer' ? theme.grey.shade10 : theme.grey.noshade};
    }
  }

  .swiper-pagination-bullet-active {
    background: ${({ theme }) => theme.brand.primary};
    @media ${BREAKPOINTS['sm']} {
      background: ${({ theme }) => theme.brand.primary};
    }
  }
`;
