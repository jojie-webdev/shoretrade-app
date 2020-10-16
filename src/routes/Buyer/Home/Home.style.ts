import Typography from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Row, Container, Col } from 'react-grid-system';
import styled, { css } from 'utils/styled';

export const ViewContainer = styled.div`
  flex-direction: row;
  padding: 0 8px 8px 8px;

  .wrapper {
    width: calc(100% - 200px);
    margin: auto;
    position: relative;

    @media ${BREAKPOINTS['sm']} {
      width: 100%;
    }

    @media ${BREAKPOINTS['md']} {
      width: calc(100% - 150px);
    }
  }

  .buying-for {
    padding: 4px 16px 16px 16px;
  }
`;

export const SwiperContainer = styled.div`
  width: 100%;
  max-width: 100%;
`;

export const SmallAlertContainer = styled.div`
  // padding: 8px;
  padding: 16px 0px 16px 18px;
  width: 100%;
  background: ${({ theme }) => theme.brand.alert};
  border-radius: 4px;
  margin-bottom: 24px;

  display: flex;
  align-items: center;

  .icon-container {
    margin-right: 8px;
  }

  .text {
    // margin-top: 6px;
  }
`;

export const CategoriesContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 16px;
  position: relative;

  .row {
    width: 100%;
  }

  .card {
    margin-right: 0px !important;
  }

  a:not(:last-child) {
    margin-right: 32px;
  }
`;

export const Text = styled(Typography)`
  display: flex;
  flex: 1;
  margin-left: 5px;
`;

export const Bold = styled(Typography)`
  margin-left: 0.4em;
  margin-right: 0.4em;
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
  display: flex;
  flex-direction: row;
  margin-top: 16px;
  position: relative;

  .swiper-button-prev {
  }

  a:not(:last-child) {
    margin-right: 32px;
  }
`;

export const ViewCol = styled(Col)``;

export const RecentContainer = styled.div`
  display: flex;
  flex-direction: row;

  a:not(:last-child) {
    margin-right: 32px;
  }
`;

export const SellerContainer = styled(CategoriesContainer)``;
