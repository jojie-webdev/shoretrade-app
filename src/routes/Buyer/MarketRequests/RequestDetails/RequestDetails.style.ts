import Accordion from 'components/base/Accordion';
import Alert from 'components/base/Alert';
import Interactions from 'components/base/Interactions';
import TextField from 'components/base/TextField';
import TypographyView from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled, { css } from 'utils/styled';
import { pxToRem } from 'utils/Theme';

export const RequestDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  .cards {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  }
`;

export const RequestDetailsCardContainer = styled(Interactions)`
  margin-bottom: 1rem;
`;

export const RequestOffersAccordion = styled(Accordion)`
  background-color: ${({ theme }) => theme.grey.shade3};
`;

export const RequestOfferItemInteraction = styled(Interactions)`
  margin-bottom: 16px;
  border-radius: 8px;
  padding: 12px;
`;
export const RequestItemInteraction = styled(Interactions)`
  margin-bottom: 16px;
  border-radius: 8px;
`;

export const HeaderContainer = styled.header`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  padding: 16px;
`;

export const OffersSellerAccordionContentContainer = styled.div`
  display: flex;
  flex-direction: row;

  .thumbnail-container {
    margin-right: 1rem;

    img {
      border-radius: 8px;
    }
  }

  .info-container {
    display: flex;
    flex-direction: column;
    flex: 0 1 auto;

    .time {
      font-size: ${pxToRem(12)};
      margin: 4px 0px;
      line-height: 1rem;
    }
    .offers-badge {
      margin: 0;
      width: fit-content;
    }
    .ratings-container {
      display: flex;
      flex-direction: row;
      margin-top: 5px;
      align-items: baseline;

      .value {
        position: relative;
        top: 1px;
        font-size: ${pxToRem(12)};
        margin-right: ${pxToRem(5)};
      }

      & svg:not(:last-child) {
        margin-right: 6px;
      }
    }
  }
`;

export const SellerOfferInteractionContentContainer = styled.div`
  display: flex;
  flex-direction: row;

  div {
    margin-bottom: 0.2rem;
  }

  .info-container {
    display: flex;
    flex-direction: column;
    flex: 0 1 auto;

    .weight-price-container {
      font-size: ${pxToRem(12)};
      margin: 4px 0px;
      line-height: 1rem;
      display: flex;
      flow-direction: row;

      .weight {
        margin-right: 1rem;
      }
    }
    .offers-badge {
      margin: 0;
      width: fit-content;
    }
    .ratings-container {
      display: flex;
      flex-direction: row;
      margin-top: 5px;
      & svg:not(:last-child) {
        margin-right: 6px;
      }
    }
  }
`;

export const TagsContainer = styled.div`
  display: flex;

  .offers-state-badge {
    margin-right: 0.6rem;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
  height: 100%;
`;

export const BadgeText = styled(TypographyView)`
  font-size: ${pxToRem(11)};
  text-align: center;
`;

export const StatusBadgeText = styled(TypographyView)`
  font-size: ${pxToRem(9)};
  text-align: center;
`;

export const StyledAlert = styled(Alert)`
  margin-bottom: 24px;
`;

export const StyledTextField = styled(TextField)<{ noMargin?: boolean }>`
  flex: 1;
  margin-right: ${({ noMargin }) => (noMargin ? '0' : '24px')};
`;

export const OfferContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  width: 100%;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0px 4px 12px rgba(41, 43, 50, 0.04) !important;

  .offer-badges {
    margin-bottom: 24px;
  }

  .sizes-container {
    display: flex;
    flex-direction: row;
  }

  .footer {
    border-top: 1px solid;
    padding-top: 10px;
    border-color: ${(props) => props.theme.grey.shade3};
    margin-top: 52px;

    .total-value-container {
      display: flex;
      justify-content: space-between;
    }
  }
`;

export const OffersContainer = styled.div`
  display: flex;
  flex-direction: column;

  .numbers-container {
    margin-bottom: 2rem;
    display: flex;
    flex-direction: row;
    font-size: ${pxToRem(12)};
    font-weight: bold;

    .divider {
      margin-right: 0.5rem;
      color: ${(props) => props.theme.grey.shade6};
    }

    .item {
      .label {
        text-transform: uppercase;
        color: ${(props) => props.theme.grey.shade6};
      }
    }
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 1rem;

  .filter-search-container {
    width: 18rem;
  }

  .filter-sort-container {
    width: 8rem;
  }

  @media ${BREAKPOINTS['md']} {
    .filter-search-container {
      width: 100%;
    }

    .filter-sort-container {
      width: 76%;
    }
  }

  @media ${BREAKPOINTS['sm']} {
    .filter-search-container {
      width: 100%;
    }

    .filter-sort-container {
      width: 100%;
    }
  }
`;
