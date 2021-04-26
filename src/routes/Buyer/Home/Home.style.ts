import AccordionView from 'components/base/Accordion';
import InteractionsView from 'components/base/Interactions';
import Typography from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Row, Container, Col } from 'react-grid-system';
import styled, { css } from 'utils/styled';
import { pxToRem } from 'utils/Theme';

export const ViewContainer = styled.div`
  flex-direction: row;
  padding: 0 8px 8px 8px;

  .wrapper {
    position: relative;

    margin-top: 24px;
    width: 100%;
  }

  .buying-for {
    padding: 4px 16px 16px 16px;
  }
`;

export const Wrapper = styled.div`
  position: relative;
  margin-top: 24px;
`;

export const SwiperContainer = styled.div`
  width: 100%;
  max-width: 100%;
  padding-top: 48px;
`;

export const CategoriesContainer = styled.div<{ isSmallScreen: boolean }>``;

export const Text = styled(Typography)`
  display: inline;
  flex: 1;
  margin-left: 5px;
`;

export const Bold = styled.span`
  margin-left: 0.4em;
  margin-right: 0.4em;

  font-weight: 700; // bold
  font-size: ${pxToRem(14)}; // label
  line-height: 24px; // label
`;

export const ArrowArea = styled.div<{ left?: boolean; right?: boolean }>`
  display: flex;
  position: absolute;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 24px;
  left: ${(props) => (props.left ? '-64px' : '')};
  right: ${(props) => (props.right ? '-64px' : '')};
  padding: 4px;
`;

export const FavouritesContainer = styled.div`
  padding-top: 16px;

  .interactions {
    margin-bottom: 8px;
  }
`;

export const ViewCol = styled(Col)``;

export const RecentContainer = styled.div``;

export const SellerContainer = styled(CategoriesContainer)``;

export const Image = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  margin-right: 16px;
`;

export const PlaceholderImage = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  margin-right: 16px;
  background-color: ${({ theme }) => theme.grey.shade2};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InteractionTitleContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;

  .title {
    margin-right: 4px;
    font-size: ${pxToRem(12)};
  }

  .value {
    font-size: ${pxToRem(12)};
  }
`;
export const StyledInteractions = styled(InteractionsView)`
  margin-bottom: 16px;
  padding: 8px 16px;
  background: ${(props) => props.theme.grey.shade1};
`;

export const OrderBadge = styled.div`
  padding: 8px 16px;
  background: ${(props) => props.theme.grey.shade3};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  margin-right: 24px;
  white-space: nowrap;
  width: 100px;

  p {
    line-height: 100%;
  }
`;
