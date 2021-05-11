import Typography from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';
import { pxToRem } from 'utils/Theme';

export const Container = styled.div`
  padding: 16px 24px;
  margin-bottom: 12px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(41, 43, 50, 0.04);

  .checkout-row {
    display: flex;
  }

  .checkout-card-texts {
    padding-right: 24px;
  }

  .checkout-tags {
    display: flex;
    margin: 4px 0 4px -2px;
    white-space: nowrap;
    flex-wrap: wrap;
  }

  .checkout-card-end {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex: 1;

    .checkout-card-delete {
      cursor: pointer;

      svg {
        margin-bottom: 4px;
        margin-left: 26px;
      }

      &:hover {
        opacity: 0.5;
      }
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
  width: 64px;
  height: 64px;
  margin-right: 16px;
  border-radius: 8px;

  @media ${BREAKPOINTS.sm} {
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
