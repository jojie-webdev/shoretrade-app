import Typography from 'components/base/Typography';
import styled from 'utils/styled';

export const Container = styled.div`
  margin-bottom: 16px;
  background: #ffffff;
  border-radius: 4px;
  box-shadow: 0 6px 12px rgba(41, 43, 50, 0.12);

  .checkout-row {
    display: flex;
  }

  .checkout-card-texts {
    padding: 12px 24px;
  }

  .checkout-card-end {
    display: flex;
    justify-content: flex-end;
    padding: 12px 26px;
  }

  .checkout-card-price {
    margin: 0 34px;
  }

  .checkout-card-delete {
    cursor: pointer;
    &:hover {
      opacity: 0.5;
    }
  }
`;

export const Image = styled.img`
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  height: 80px;
  width: 80px;
  overflow: hidden;
`;

export const TextValue = styled(Typography)`
  margin-left: 8px;
  margin-right: 16px;
`;
