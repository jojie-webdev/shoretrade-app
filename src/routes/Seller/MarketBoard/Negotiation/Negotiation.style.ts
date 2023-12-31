import Badge from 'components/base/Badge';
import Button from 'components/base/Button';
import Typography from 'components/base/Typography';
import TypographyView from 'components/base/Typography/Typography.view';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Col, Row } from 'react-grid-system';
import styled from 'utils/styled';
import { pxToRem } from 'utils/Theme';

export const Container = styled.div`
  #decline_seller_modal__container {
    .modal_container {
      width: 641px;
    }
  }

  #negotiation_declined_modal__container {
    .modal_backdrop_color {
      .modal_container {
        width: 641px;
      }
    }
  }

  #negotiation_success_modal__container {
    .modal_backdrop_color {
      .modal_container {
        width: 641px;
      }
    }
  }

  #negotiation_accepted_modal__container {
    .modal_backdrop_color {
      .modal_container {
        width: 641px;
      }
    }
  }

  @media ${BREAKPOINTS['sm']} {
    padding-bottom: 140px;
  }

  .breadcrumb-container {
    margin-bottom: 40px;
  }

  .submit-btns {
    display: flex;
  }

  .submit-btn {
    margin-top: 1rem;
    margin-right: 8px;
    max-width: 148px;
  }

  .modal_container__exit_btn {
    background-color: ${({ theme }) => theme.grey.shade10};
    border: 1px solid ${({ theme }) => theme.grey.shade8};

    svg > path {
      fill: ${({ theme }) => theme.grey.noshade};
    }
  }

  .radio__outer_circle {
    height: 16px;
    width: 16px;

    .radio__inner_circle {
      height: 7.25px;
      width: 7.25px;
    }
  }
`;

export const StyledAcceptButton = styled(Button)`
  border-radius: 12px;
  padding: 15px 28px;
  width: 100%;
  height: 100%;
`;

export const CTAContainer = styled(Row)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 56px;
  margin-left: 0px !important;
  margin-right: 0px !important;
`;

export const DetailsContainer = styled.div`
  background-color: ${({ theme }) => theme.grey.shade10};
  border-radius: 12px;
  padding: 48px;
  margin-top: 24px;
  max-width: 641px;
`;

export const DetailsValueContainer = styled.div`
  margin-top: 12px;
  padding: 4px 6px;
  background-color: #e5e8f5;
  border-radius: 8px;
  width: fit-content;
`;

export const StyledTypography = styled(Typography)`
  font-family: 'Basis Grotesque Pro';
  clear: both;
  color: ${({ theme }) => theme.grey.shade9};
`;

export const Line = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.grey.shade6};
  margin: 24px 0;
`;

export const NewNegoTypeWrapper = styled.span`
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  text-align: left;
  margin: 0;
  font-family: 'Graphik';
  color: ${({ theme }) => theme.brand.primary};
`;

export const DeclineAndNegoBtnContainer = styled.div`
  display: flex;

  @media (max-width: 600px) {
    justify-items: space-between;
  }

  @media (max-width: 467px) {
    display: none;
  }
`;

export const DeclineBtnWrapper = styled(Button)`
  width: 118px;
  margin-right: 10px;

  @media (max-width: 547px) {
    width: 100%;
  }
`;

export const NegoBtnWrapper = styled(Button)`
  width: 133px;

  @media (max-width: 547px) {
    width: 100%;
  }
`;

export const DeclineAndNegoBtnContainerMobile = styled.div`
  width: 100%;

  @media (min-width: 468px) {
    display: none;
  }
`;

export const AcceptBtnCol = styled(Col)`
  padding: 0px !important;
  margin-top: 10px;
  margin-left: 10px !important;

  @media (max-width: 880px) and (min-width: 835px) {
    margin-left: 0px !important;
    width: 100%;
  }

  @media (max-width: 600px) {
    margin-left: 0px !important;
    width: 100%;
  }

  @media (max-width: 467px) {
    display: none;
  }
`;

export const AcceptBtnContainer = styled.div`
  width: 124px;
  margin-left: auto;

  @media (max-width: 880px) and (min-width: 835px) {
    width: 100%;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const AcceptBtnContainerMobile = styled.div`
  padding: 0px !important;
  width: 100%;
  margin-left: auto;

  @media (min-width: 468px) {
    display: none;
  }
`;
