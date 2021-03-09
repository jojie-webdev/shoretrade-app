import Alert from 'components/base/Alert';
import Interactions from 'components/base/Interactions';
import TypographyView from 'components/base/Typography';
import styled, { css } from 'utils/styled';
import { pxToRem } from 'utils/Theme';

export const MarketRequestsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-bottom: 16px;

  .header {
    margin-bottom: 24px;
  }

  .cards {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  }
`;

export const MarketRequestItemInteraction = styled(Interactions)`
  margin-bottom: 16px;
  border-radius: 8px;
`;

export const MarketRequestItemContainer = styled.div`
  display: flex;
  flex-direction: row;

  .thumbnail-container {
    margin-right: 1rem;

    img {
      width: 64px;
      height: 64px;
      border-radius: 8px;
    }
  }

  .info-container {
    display: flex;
    flex-direction: column;
    flex: 0 1 auto;

    .time {
      font-size: ${pxToRem(12)};
      margin: 4px 0px;
      line-height: 1rem;
    }
    .offers-badge {
      margin: 0;
      width: fit-content;
    }
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
  height: 100%;
`;

export const BadgeText = styled(TypographyView)`
  font-size: ${pxToRem(12)};
  text-align: center;
`;

export const StyledAlert = styled(Alert)`
  margin-bottom: 24px;
`;

export const SizeTextContainer = styled.div`
  display: flex;
  flex-direction: row;

  .over-divider {
    margin-left: 2px;
    margin-right: 2px;
  }
`;
