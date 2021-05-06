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

    @media ${BREAKPOINTS.sm} {
      flex-direction: column;
    }
  }

  .checkout-card-texts {
    padding: 12px 24px;
  }

  .checkout-card-end {
    display: flex;
    justify-content: flex-end;
    padding: 12px 26px;

    @media ${BREAKPOINTS.sm} {
      padding: 12px 0;
      justify-content: flex-start;
    }
  }

  .checkout-card-price {
    margin: 0 34px;

    @media ${BREAKPOINTS.sm} {
      margin: 0px 24px;
    }
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

export const Image = styled.img`
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  min-width: 120px;
  width: 120px;
  height: 120px;
  overflow: hidden;

  @media ${BREAKPOINTS.sm} {
    flex: 1;
    width: 100%;
    height: 150px;
    object-fit: cover;
  }
`;

export const TextValue = styled(Typography)`
  margin-left: 8px;
  margin-right: 16px;
`;

export const BadgeText = styled(Typography)`
  font-size: ${pxToRem(12)};
`;
