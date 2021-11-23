import styled from 'utils/styled';
import theme, { pxToRem } from '../../../utils/Theme';
import { BREAKPOINTS } from './../../..//consts/breakpoints';
import { Row, Col } from 'react-grid-system';
import Interactions from 'components/base/Interactions';
import Typography from 'components/base/Typography';

export const OfferContainer = styled.div`
  background: #ffffff;
  box-shadow: 0px 6px 12px rgba(41, 43, 50, 0.12);
  border-radius: 8px;
  padding: 8px 24px 8px 8px;
  margin-top: 12px;
  cursor: pointer;

  .sub-details {
    padding-top: 5px;

    @media (max-width: 833px) {
      background-color: red !important;
      margin-top: 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }

  .cta {
    @media (max-width: 833px) {
      margin-top: 15px;
      justify-content: flex-start !important;
    }
  }

  .sub-details {
    @media (max-width: 1199px) {
      margin-top: 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }

  .delete-button {
    background-color: ${theme.grey.shade2};
    height: 32px;
    width: 32px;
    border-radius: 12px;
    align-self: center;
    border: 1px solid ${theme.grey.shade4};

    path {
      fill: ${theme.grey.shade7};
    }
  }

  .badges-col {
    display: flex;
    align-items: center;
    justify-content: center !important;
  }
`;

export const MarketRequestItemInteractionContainer = styled.div`
  margin-top: 12px;

  .delete-button {
    background-color: ${theme.grey.shade2};
    height: 32px;
    width: 32px;
    border-radius: 12px;
    align-self: center;
    border: 1px solid ${theme.grey.shade4};

    path {
      fill: ${theme.grey.shade7};
    }
  }

  .cta {
    display: flex;
    align-items: center;
    height: 115px;
    align-content: space-between;
    flex-direction: column;
    justify-content: space-between;
  }
`;

export const TagsContainer = styled.div`
  height: 100%;
  width: 100%;
  align-items: flex-start !important;
  display: flex;

  #status-badge {
    margin: 0px;

    @media (min-width: 993px) {
      margin: auto;
    }
  }
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

export const MajorInfoContainer = styled.div`
  margin-left: 12px;
  display: flex;
  flex-flow: column;
  align-items: baseline;
  justify-content: space-evenly;
  height: 100%;
`;

export const OfferRowContainer = styled(Row)`
  display: flex;
  justify-content: space-between;
`;

export const MajorInfoNonMobileContainer = styled.div`
  margin-left: 12px;
  display: flex;
  flex-flow: column;
  align-items: baseline;
  justify-content: space-evenly;
  height: 100%;
  padding-bottom: 10px;
`;

export const MajorInfo = styled.div`
  display: flex;
  flex-direction: row;
`;

export const MarketRequestItemMobileContainer = styled.div`
  .thumbnail-container {
    img {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      margin-right: 8px;
    }
  }
`;

export const MarketRequestItemInteraction = styled(Interactions)`
  justify-content: initial;
  margin-bottom: 16px;
  border-radius: 8px;
  padding: 8px;

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

export const StatusBadgeText = styled(Typography)`
  font-size: ${pxToRem(9)};
  text-align: center;
`;

export const AvatarPlaceholder = styled.div<{
  borderRadius?: string;
  width?: string;
  height?: string;
}>`
  border-radius: 5px;
  width: ${({ width }) => width || '56px'};
  height: ${({ height }) => height || '56px'};
  background-color: ${({ theme }) => theme.grey.shade2};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${({ borderRadius }) => borderRadius};
`;
