import Button from 'components/base/Button';
import TextField from 'components/base/TextField';
import Typography from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Row } from 'react-grid-system';
import styled from 'utils/styled';

export const Container = styled.div`
  .confirmation_modal__ok_btn {
    margin-left: 0px;
    padding: 14px 24px !important;
  }

  .confirmation_modal__cancel_btn {
    margin-left: 0px;
    padding: 14px 24px !important;
  }

  .confirmation_modal__ok_btn > p {
    text-transform: capitalize !important;
    font-weight: 700;
  }

  .confirmation_modal__cancel_btn > p {
    text-transform: capitalize !important;
    font-weight: 700;
  }

  .text_field__field_container {
    height: 40px;
    border-radius: 8px;

    .text_field__field_container__input {
      border-radius: 8px;
    }
  }

  .radio > span {
    height: 12px;
    width: 12px;

    .span {
      height: 0px;
      width: 0px;
    }
  }

  .indicator {
    font-weight: bold;
  }
`;

export const BannerContainer = styled.div`
  margin-bottom: 8px;
  width: 100%;
  max-width: 100%;

  .placeholder {
    margin: auto;
    display: block;
    border: 0;
    width: 100%;
    height: 295px;
    object-fit: contain;
  }
`;

export const DetailsContainer = styled(Row)`
  height: 100%;

  .title {
    margin-bottom: 1rem;
  }
`;

export const ProductBoxContainer = styled.div`
  background-color: ${({ theme }) => theme.grey.noshade};
`;

export const DesiredQuantityContainer = styled.div<{ withBackground: boolean }>`
  display: flex;
  flex-direction: column;

  margin-top: ${({ theme, withBackground }) => (withBackground ? '24px' : 0)};

  box-shadow: ${({ theme, withBackground }) =>
    withBackground ? '0 4px 12px rgba(41,43,50,0.04)' : ''};

  background: ${({ theme, withBackground }) =>
    withBackground ? theme.grey.noshade : 'rgba(0,0,0,0)'};

  padding: ${({ theme, withBackground }) => (withBackground ? '24px' : 0)};

  @media (max-width: 991px) {
    border-width: 1px 2px 2px 2px;
    border-radius: 0 0 8px 8px;
  }

  @media (min-width: 992px) {
    border-radius: 8px;
    border-width: 2px;
  }

  .content {
    display: flex;
    margin-top: -16px;
    flex-direction: column;
  }

  .box-loading {
    display: flex;
    flex-direction: column;
    padding-top: 48px;
  }

  @media ${BREAKPOINTS['sm']} {
    padding-bottom: 40px;
  }
`;

export const TextFieldWrapper = styled.div`
  margin-top: 16px;
`;

export const RemainingWrapper = styled.div`
  margin-top: 8px;
`;

export const BoxRadioContainer = styled.div`
  margin-top: 8px;
`;

export const ButtonContainer = styled.div`
  margin-top: 32px;
  display: flex;
  justify-content: flex-start;
`;

export const AddToCartButton = styled(Button)`
  @media ${BREAKPOINTS['sm']} {
    width: 50%;
  }
`;

export const EstimationsContainer = styled.div`
  display: flex;
  margin-top: 8px;
`;

export const TopBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const StatusContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
`;

export const BadgeText = styled(Typography)`
  font-size: 12px;
`;

export const StyledTextField = styled(TextField)`
  flex: 1;
`;

export const RadioBtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const GroupedBoxContainer = styled.div`
  display: flex;
  border: 1px solid ${({ theme }) => theme.grey.shade5};
  padding: 5px;
`;
