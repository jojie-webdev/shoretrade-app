import Typography from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Col } from 'react-grid-system';
import styled from 'utils/styled';
import theme, { pxToRem } from 'utils/Theme';

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

  @media (max-width: 1439px) {
    height: 182px;
  }

  @media (max-width: 1023px) {
    height: 150px;
  }
`;

export const CategoriesContainer = styled.div``;

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
  display: flex;
  flex-direction: row;
`;

export const ViewCol = styled(Col)``;

export const RecentContainer = styled.div``;

export const SellerContainer = styled(CategoriesContainer)``;

export const FreeTrialCountdown = styled.div`
  padding: 16px;
  margin: 0 auto 24px auto;
  width: calc(100% - 200px);
  display: flex;
  background: ${theme.grey.noshade};
  border-radius: 12px;
`;
