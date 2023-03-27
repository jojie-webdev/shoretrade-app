import Badge from 'components/base/Badge';
import Interactions from 'components/base/Interactions';
import Typography from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Swiper } from 'swiper/react';
import styled from 'utils/styled';
import { pxToRem } from 'utils/Theme';

export const Container = styled.div`
  .segmented_control__option {
    color: ${({ theme }) => theme.grey.noshade};
  }

  @media ${BREAKPOINTS['sm']} {
    padding-bottom: 24px;
  }

  .tabs-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 16px;

    .tabs {
      margin-top: 10px;
      width: 330px;

      @media ${BREAKPOINTS['sm']} {
        width: 100%;
        margin-bottom: 16px;
      }
    }

    .search {
      border: none;
      background-color: ${({ theme }) => theme.grey.shade9};
      width: 280px;

      @media ${BREAKPOINTS['sm']} {
        width: 100%;
      }

      input {
        background-color: ${({ theme }) => theme.grey.shade9};

        ::placeholder {
          color: ${({ theme }) => theme.grey.shade7};
        }
      }
    }
  }

  .interactions {
    margin-bottom: 8px;

    .left-content {
      display: flex;
      align-items: center;
      width: 100%;

      .section {
        flex: 1;
      }

      img {
        width: 48px;
        height: 48px;
        border-radius: 8px;
        margin-right: 12px;
      }

      .badge {
        display: flex;
        width: fit-content;

        .svg-container {
          margin-left: 5px;
          margin-top: -2px;
        }
      }
    }
  }
`;

export const FilterButton = styled.button`
  background: ${({ theme }) => theme.grey.shade9};
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border: none;
  height: 40px;
  margin-bottom: 16px;

  .btn-text {
    margin-right: 8px;
  }
`;

export const BadgeText = styled(Typography)`
  font-size: ${pxToRem(12)};
`;

export const ItemInteraction = styled(Interactions)`
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

  .cta {
    display: flex;
    align-items: center;
    height: 140px;
    align-content: space-between;
    flex-direction: column;
    justify-content: space-between;
    padding-right: 10px;
  }
`;

export const StyledBadge = styled(Badge)`
  height: 22px;
  border-radius: 8px;
`;

export const FilterSearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;

  .filter-button {
    margin-left: 16px;
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
  height: 100%;
  display: flex;
  align-items: center;

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

export const MonthlySubsContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const ImageContainer2 = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
