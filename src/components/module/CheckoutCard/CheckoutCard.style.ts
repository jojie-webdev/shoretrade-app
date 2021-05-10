import Typography from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';
import { pxToRem } from 'utils/Theme';

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
    white-space: nowrap;
  }

  .checkout-card-delete {
    cursor: pointer;
    &:hover {
      opacity: 0.5;
    }
  }
`;

export const MobileContainer = styled.div`
  padding: 16px;
  border-bottom: 2px solid ${({ theme }) => theme.grey.shade2};

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  .checkout-row {
    display: flex;
  }

  .checkout-card-texts {
    width: 100%;
  }

  .name-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .checkout-card-price {
    margin-left: 8px;
  }

  .checkout-tags {
    display: flex;
    margin: 4px 0 4px -2px;
    white-space: nowrap;
    flex-wrap: wrap;
  }
`;

export const Image = styled.img`
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  width: 120px;
  height: 120px;

  @media ${BREAKPOINTS.sm} {
    width: 64px;
    height: 64px;
    border-radius: 4px;
    margin-right: 8px;
  }
`;

export const TextValue = styled(Typography)`
  margin-left: 8px;
  margin-right: 16px;

  @media ${BREAKPOINTS.sm} {
    margin-left: 4px;
    margin-right: 8px;
  }
`;

export const BadgeText = styled(Typography)`
  font-size: ${pxToRem(12)};
`;
