import Interactions from 'components/base/Interactions';
import Typography from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';
import { pxToRem } from 'utils/Theme';

export const Container = styled.div``;

export const MarketRequestItemInteraction = styled(Interactions)`
  justify-content: initial;
  margin-bottom: 16px;
  border-radius: 8px;
  padding: 8px;
  ${({ theme }) => {
    return theme.isSFM && `border: 2px solid ${theme.brand.secondary};`;
  }}

  @media ${BREAKPOINTS['sm']} {
    padding: 12px;
  }

  padding-right: 12px;
  align-items: center;

  .left-content {
    flex-grow: 2;
  }

  .cta {
    display: flex;
    align-items: center;
    height: 140px;
    align-content: space-between;
    flex-direction: column;
    justify-content: space-between;
  }
`;

export const MarketRequestItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;

  .thumbnail-container {
    margin-right: 1rem;

    img {
      width: 48px;
      height: 48px;
      border-radius: 8px;
      @media ${BREAKPOINTS['sm']} {
        width: 40px;
        height: 40px;
      }
    }
  }

  .sub-group {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .info-container {
    display: flex;
    align-items: center;
    flex-direction: row;
    flex-grow: 1;
    justify-content: space-between;

    .time {
      font-size: ${pxToRem(12)};
      margin: 4px 0px;
      line-height: 1rem;
    }

    .offers-badge,
    .offers-status {
      margin: 0;
      width: fit-content;
      border-radius: 8px;
      padding: 5px 10px;
    }
  }
`;

export const SubText = styled(Typography)`
  font-family: 'Basis Grotesque Pro';
  font-weight: 400;
  color: ${(props) => `${props.theme.grey.shade7}`};
`;
