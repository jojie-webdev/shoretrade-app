import TextField from 'components/base/TextField';
import TypographyView from 'components/base/Typography';
import styled, { css } from 'utils/styled';
import { pxToRem } from 'utils/Theme';

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

      .weight {
        margin-right: 1rem;
      }
    }
    .offers-badge {
      margin-bottom: 4px;
      width: fit-content;
    }
    .ratings-container {
      display: flex;
      flex-direction: row;
      & svg:not(:last-child) {
        margin-right: 6px;
      }
    }
  }
`;

export const BadgesContainer = styled.div`
  display: flex;

  .offers-state-badge {
    margin-right: 0.6rem;
  }
`;

export const BadgeText = styled(TypographyView)`
  font-size: ${pxToRem(11)};
  text-align: center;
`;

export const StyledTextField = styled(TextField)<{ noMargin?: boolean }>`
  flex: 1;
  margin-right: ${({ noMargin }) => (noMargin ? '0' : '24px')};
`;

export const OfferDetailsContainer = styled.div`
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

    .computation-container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .computation-item-container {
        display: flex;
      flex-direction: row;
      justify-content: space-between;
      }

    }
  }
`;

export const OfferActionsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 32px;

  .button {
    margin: 8px;
  }
`;
