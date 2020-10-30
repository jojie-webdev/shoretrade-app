import Typography from 'components/base/Typography';
import styled from 'utils/styled';

export const Container = styled.div`
  margin-bottom: 16px;
  background: #ffffff;
  border-radius: 4px;
  border: ${({ theme }) => `1px solid ${theme.grey.shade3}`};
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

  .checkout-tags {
    display: flex;
    margin: 4px 0 4px -2px;
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
  min-width: 120px;
  width: 120px;
  height: 120px;
  overflow: hidden;
`;

export const TextValue = styled(Typography)`
  margin-left: 8px;
  margin-right: 16px;
`;
