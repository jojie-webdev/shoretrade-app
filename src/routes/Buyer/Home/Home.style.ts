import Typography from 'components/base/Typography';
import { Row, Container, Col } from 'react-grid-system';
import styled, { css } from 'utils/styled';

export const ViewContainer = styled.div`
  flex-direction: row;
  padding: 0 8px 8px 8px;
`;

export const SwiperContainer = styled.div`
  width: 100%;
  max-width: 100%;
  height: 357px;
  margin-bottom: 16px;

  .swiper-container {
    width: 100%;
    border-radius: 4px;
    overflow: hidden;
  }

  .swiper-button-prev {
    color: ${({ theme }) => theme.grey.shade7};
    width: 18px;
    height: 11px;
  }

  .swiper-button-next {
    color: ${({ theme }) => theme.grey.shade7};
    width: 18px;
    height: 11px;
  }

  .swiper-slide {
    height: 357px;
    padding: 16px;
  }

  img {
    position: relative;
    width: 100%;
    height: 100%;
    object-fit: fill;
    left: 50%;
    top: 50%;
    border-radius: 4px;
    -webkit-transform: translateY(-50%) translateX(-50%);
    box-shadow: 0px 6px 12px rgba(41, 43, 50, 0.12);
  }
`;

export const GridContainer = styled(Container)`
  width: 100%;
  max-width: 100%;
`;

export const CategoriesContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  .card {
    width: 203px;
  }

  a:not(:last-child) {
    margin-right: 32px;
  }
`;

export const CategoriesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 48px;
`;

export const CreditContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 4px;
  background-color: #ffcf5c;
  height: 3.5em;
  margin-bottom: 24px;
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

export const InfoContainer = styled.span`
  margin-right: 19px;
  margin-left: 18px;
`;

export const FavouritesHeader = styled(CategoriesHeader)``;

export const FavouritesContainer = styled.div`
  display: flex;
  flex-direction: row;

  a:not(:last-child) {
    margin-right: 32px;
  }
`;

export const SearchRow = styled(Row)``;

export const ViewCol = styled(Col)``;
