import Button from 'components/base/Button';
import Typography from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Col } from 'react-grid-system';
import styled from 'utils/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  .cards {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  }

  .confirmation_modal__ok_btn {
    margin-left: 0 !important;
  }

  .text_field__field_container {
    border-radius: 8px;

    .text_field__field_container__input {
      border-radius: 8px;
    }
  }

  .modal_container {
    width: 686px;
  }

  .tooltip-container {
    position: relative;
  }

  .__react_component_tooltip {
    position: absolute !important;
    padding: 0;
    top: -85px !important;
    left: -8px !important;
    border-radius: 8px !important;
    width: 510px !important;
  }

  .__react_component_tooltip::after {
    left: 5% !important;
  }

  .icon-tooltip-container {
    position: absolute !important;
    width: 500px;
    top: -19px;
    left: 25px;
  }

  .icon-label-wrapper {
    margin-left: 5px;
  }

  @media ${BREAKPOINTS['sm']} {
    padding-bottom: 16vh;
  }
`;

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const AlertsContainer = styled.header`
  margin-top: 16px;
  margin-bottom: 16px;
`;

export const FullOfferDetailsContainer = styled.div`
  background: #ffffff;
  border: 1px solid ${({ theme }) => theme.grey.shade4};
  box-sizing: border-box;
  border-radius: 12px;
  padding: 48px;

  @media ${BREAKPOINTS['sm']} {
    padding: 16px;
    border: none;
  }

  @media (max-width: 1200px) {
    margin-top: 16px;
  }
`;

export const CompanyInfoCol = styled(Col)`
  @media ${BREAKPOINTS['sm']} {
    margin-top: 16px;
  }

  @media (max-width: 1200px) {
    margin-top: 16px;
  }
`;

export const TotalPriceContainer = styled.div`
  background: ${({ theme }) => theme.grey.noshade};
  border: 1px solid ${({ theme }) => theme.grey.shade4};
  border-radius: 12px;
  padding: 16px;

  @media ${BREAKPOINTS['sm']} {
    border: 1px solid ${({ theme }) => theme.grey.shade4};
  }

  @media ${BREAKPOINTS['md']} {
    margin-top: 16px;
  }
  .sup-text-2 {
    color: ${({ theme }) => theme.grey.shade6};
    font-weight: normal;
    font-size: 23px;
    margin-right: 5px;
  }
`;

export const DetailsValueContainer = styled.div`
  margin-top: 12px;
  padding: 6px 6px;
  background-color: #e5e8f5;
  border-radius: 8px;
  width: fit-content;
`;

export const StarContainer = styled.div`
  display: flex;
  margin-top: 8px;
  align-items: center;
`;

export const StyledAcceptButton = styled(Button)`
  border-radius: 12px;
  padding: 15px 28px;
  width: 100%;
  height: 100%;
`;

export const StyledNegotiateButton = styled(Button)`
  border-radius: 12px;
  padding: 15px 28px;
  width: 100%;
`;

export const TagsContainer = styled.div`
  display: flex;
  margin-top: 24px;
`;

export const StyledTypography = styled(Typography)`
  font-family: 'Basis Grotesque Pro';
  clear: both;
`;

export const StyledTypography2 = styled(Typography)`
  margin-left: 16px;
  font-family: Basis Grotesque Pro;
`;

export const StyledImage = styled.img`
  width: 48px;
  height: 48px;
  background-color: grey;
  border-radius: 8px;
`;

export const StyledNumberRating = styled(Typography)`
  margin-right: 5px;
  margin-top: 3px;
`;

export const CTAContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 50px;
`;

export const StyledNegotiateButtonContainer = styled.div`
  width: 148px;
  margin-right: 10px;
`;

export const NoActionsYetBadgesContainer = styled.div`
  display: flex;
  height: 100%;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 1480px) {
    flex-flow: column !important;
  }

  @media (max-width: 991px) {
    display: -webkit-inline-box !important;
  }
`;

export const AcceptNegoDetailContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const DefaultCTAContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 24px;
`;

export const DefaultStyledNegotiateButtonContainer = styled.div`
  width: 148px;
  margin-right: 10px;
`;

export const DefaultStyledNegotiateButton = styled(Button)`
  border-radius: 12px;
  padding: 15px 28px;
  width: 100%;
`;

export const DefaultStyledAcceptButton = styled(Button)`
  border-radius: 12px;
  padding: 15px 28px;
  width: 100%;
  height: 100%;
`;
