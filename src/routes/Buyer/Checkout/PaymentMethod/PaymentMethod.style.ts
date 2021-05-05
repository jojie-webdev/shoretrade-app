import InteractionCreditCard from 'components/module/InteractionCreditCard/InteractionCreditCard.view';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const Container = styled.div`
  .breadcrumb-container {
    margin-bottom: 40px;
  }

  .box-error-container {
    margin-bottom: 24px;
  }

  .payment-methods {
    margin-bottom: 40px;

    @media ${BREAKPOINTS['sm']} {
      justify-content: center !important;
    }
  }

  .cc-image-row {
    display: flex;
    flex-flow: row nowrap;
    margin-bottom: 32px;
  }

  .cc-title {
    margin-bottom: 32px;
  }

  .form-card-col {
    margin-bottom: 24px;
  }

  .form-card-checkbox {
    margin-bottom: 60px;
  }
`;

export const BottomRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  @media ${BREAKPOINTS['genericTablet']} {
    flex-direction: column-reverse;
    align-items: flex-end;
  }

  .btns-container {
    display: flex;
    margin-bottom: 10px;

    .pay-btn {
      min-width: 210px;
    }
  }

  .balances {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px;
    background-color: #ffffff;
    border: 1px solid ${({ theme }) => theme.grey.shade3};
    border-radius: 8px;
    min-width: 357px;
    margin-bottom: 10px;

    @media ${BREAKPOINTS['genericTablet']} {
      min-width: 100%;
      justify-content: flex-end;
      margin-bottom: 32px;
    }

    @media ${BREAKPOINTS['sm']} {
      flex-direction: column;
      min-width: 100%;
    }

    .total-value {
      @media ${BREAKPOINTS['genericTablet']} {
        margin: 0 26px;
      }

      @media ${BREAKPOINTS['sm']} {
        margin: 10px 0;
      }
    }
  }
`;

export const Method = styled.div<{ disabled?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 221px;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 19px 17px;
  margin-bottom: 24px;

  cursor: ${({ disabled }) => (disabled ? 'inherit' : 'pointer')};

  &:hover {
    opacity: ${({ disabled }) => (disabled ? 1 : 0.75)};
  }

  .radio {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  .disabled-radio {
    width: 24px;
    height: 24px;
    background-color: ${({ theme }) => theme.grey.shade4};
    border: 1.5px solid ${({ theme }) => theme.grey.shade5};
    border-radius: 100px;
  }
`;

export const CCImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.grey.noshade};
  padding: 0 4px;
  box-shadow: 0 6px 12px rgba(41, 43, 50, 0.12);
  border-radius: 2px;
  height: 24px;
  width: 40px;
  margin-right: 16px;

  & > svg {
    vertical-align: middle;
  }
`;

export const CreditCardInteraction = styled(InteractionCreditCard)`
  max-height: 74px;
  margin-top: 12px;
`;
