import Alert from 'components/base/Alert';
import Typography from 'components/base/Typography';
import Search from 'components/module/Search';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Swiper, SwiperSlide } from 'swiper/react';
import styled from 'utils/styled';
import { pxToRem } from 'utils/Theme';

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

  .search__input {
    height: 37px !important;
  }
`;

export const BadgeText = styled(Typography)<{ empty?: boolean }>`
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

export const Badges = styled.div`
  display: flex;
  margin-top: 10px;
  flex-direction: column;
  > div {
    margin-bottom: 4px;
  }
`;

export const StyledSwiperSlide = styled(SwiperSlide)`
  display: flex;
  justify-content: center;
`;

export const BadgesContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;

  @media (max-width: 835px) {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    .sub-group {
      margin-bottom: 10px;
    }
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
  display: flex;
  max-width: min-content;
  font-size: 10px;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 5px;
`;

export const Title1 = styled(Typography)`
  font-family: 'Media Sans';
  margin: 24px 0 12px;
  line-height: 30px;

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

  /* @media ${BREAKPOINTS['md']} {
    width: 214px;
  } */
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
  margin-top: 30px;
`;

export const ImageContainer2 = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
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

export const MonthlySubsContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const SubMinorDetail = styled.div`
  display: flex;
  margin-right: 20px;
`;

export const SearchWrapper = styled(Search)`
  height: 40px;
  max-width: 350px;
  border-radius: 10px;
  margin-bottom: 30px;
`;
