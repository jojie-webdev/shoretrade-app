import Alert from 'components/base/Alert';
import Interactions from 'components/base/Interactions';
import TypographyView from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';
import { pxToRem } from 'utils/Theme';
import { Swiper, SwiperSlide } from 'swiper/react';

export const MarketRequestsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-bottom: 16px;

  @media ${BREAKPOINTS['sm']} {
    height: auto;
    padding-bottom: 125px;
  }

  .header {
    margin-bottom: 24px;
  }

  .cards {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  }

  .delete-button {
    background-color: ${({ theme }) => theme.grey.shade2};
    height: 32px;
    width: 32px;
    border-radius: 12px;
    align-self: center;
    border: 1px solid ${({ theme }) => theme.grey.shade4};

    path {
      fill: ${({ theme }) => theme.grey.shade7};
    }
  }
`;

export const MarketRequestItemInteraction = styled(Interactions)`
  justify-content: initial;
  margin-bottom: 16px;
  border-radius: 8px;
  padding: 8px;

  @media ${BREAKPOINTS['sm']} {
    padding: 12px;
  }

  padding-right: 12px;
  align-items: center;

  .left-content {
    flex-grow: 2;
  }

  .cta{
    display: flex;
    align-items: center;
    height: 140px;
    align-content: space-between;
    flex-direction: column;
    justify-content: space-between; 
  }
`;

export const MarketRequestItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;

  .thumbnail-container {
    margin-right: 1rem;

    img {
      width: 48px;
      height: 48px;
      border-radius: 8px;
      @media ${BREAKPOINTS['sm']} {
        width: 40px;
        height: 40px;
      }
    }
  }

  .sub-group {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .info-container {
    display: flex;
    align-items: center;
    flex-direction: row;
    flex-grow: 1;
    justify-content: space-between;

    .time {
      font-size: ${pxToRem(12)};
      margin: 4px 0px;
      line-height: 1rem;
    }

    .offers-badge,
    .offers-status {
      margin: 0;
      width: fit-content;
      border-radius: 8px;
    }
  }
`;

export const SubText = styled(TypographyView)`
  font-family: 'Basis Grotesque Pro';
  font-weight: 400;
  color: ${(props) => `${props.theme.grey.shade7}`};
`;

export const BadgeText = styled(TypographyView) <{ empty?: boolean }>`
  font-size: ${pxToRem(9)};
  text-align: center;
  color: ${({ theme, empty }) =>
    empty ? theme.grey.shade5 : theme.grey.shade9};
`;

export const StyledAlert = styled(Alert)`
  margin-bottom: 24px;
`;

export const SizeTextContainer = styled.div`
  display: flex;
  flex-direction: row;

  .over-divider {
    margin-left: 2px;
    margin-right: 2px;
  }
`;

export const MajorInfo = styled.div`
  display: flex;
  flex-direction: row;
`;

export const MinorInfo = styled.div`
  margin-top: 8px;
`;

export const SubMinorInfo = styled.div`
  margin-top: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const SubMinorDetail = styled.div`
  display: flex;
  margin-right: 20px;
`;

export const Badges = styled.div`
  display: flex;
  margin-top: 10px;
`;

export const MarketRequestItemMobileContainer = styled.div`
  .thumbnail-container {
    img {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      margin-right: 8px;
    }
  }
`;

export const Card = styled.div`
  padding: 24px 40px 48px 40px;
  max-width: 310.67px;
  height: 388px;
  background: #FFFFFF;
  border: 1px solid #DADFF2;
  box-sizing: border-box;
  border-radius: 12px;

  @media (max-width: 1426px){
    padding: 24px;
  }
`

export const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: 100%;

  .swiper-pagination-bullet-active{
    background-color: ${({ theme }) => theme.brand.primary};
  }

  .swiper-pagination-bullet{
    margin: 0 2px;
  }
`

export const StyledSwiperSlide = styled(SwiperSlide)`
  display: flex;
  justify-content: center;
`