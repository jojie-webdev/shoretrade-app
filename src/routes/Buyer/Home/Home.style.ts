import Typography from 'components/base/Typography';
import { Row, Container, Col } from 'react-grid-system';
import styled, { css } from 'utils/styled';
import 'swiper/swiper-bundle.css';

export const ViewContainer = styled.div`
  flex-direction: row;
  padding: 8px;
`;

export const SwiperContainer = styled.div`
  

  .swiper-pagination-bullet-active {
    background: ${({ theme }) => theme.grey.shade7};
  }

  .swiper-container {
    position: relative;
    height: 357px;
    width: 100%;
    overflow: hidden;
    margin-left: 3%;
  }

  .swiper-wrapper {
    padding-inline-start: 0;
  }
  
  .swiper-slide {
    height: 357px;
    padding: 16px;
    border-radius: 4px;
    // box-shadow: 0px 0px 0px;
    // position: relative;
  }


  .swiper-button-prev {
    color: ${({theme})=> theme.grey.shade7};
    width: 18px;
    height: 11px;
    // left: -10px;
  }
  
  .swiper-button-next {
    color: ${({theme})=> theme.grey.shade7};
    width: 18px;
    height: 11px;
  }

  img {
    position: relative;
    border-radius: 4px;
    box-shadow: 0px 6px 12px rgba(41, 43, 50, 0.12);
    width: 65vw;
    height: 100%;
    object-fit: fill;
    left: 50%;
    top: 50%;
    -webkit-transform: translateY(-50%) translateX(-50%);
  }
`;

export const GridContainer = styled(Container)`
  width: 100%;
  max-width: 100%;
  // overflow-x: hidden;
`;

export const CategoriesContainer = styled.div`
  display: flex;
  width: 65vw;
  margin-left: 7%;

`;

export const CategoriesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 48px;
  width: 65vw;
  margin-left: 7%;
`;

export const CreditContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 4px;
  background-color: #ffcf5c;
  height: 3.5em;
  margin-bottom: 24px;
  width: 65vw;
  margin-left: 7%;
  
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

export const FavouritesContainer = styled(CategoriesContainer)``;

export const SearchRow = styled(Row)`
`;

export const ViewCol = styled(Col)`
`;