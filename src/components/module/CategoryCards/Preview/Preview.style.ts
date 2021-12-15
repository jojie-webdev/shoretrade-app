import TypographyView from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';
import { pxToRem } from 'utils/Theme';

const imgUrl = (url: string) => `"${url}"`;

export const CardContainer = styled.div<{ img: string }>`
  width: 265px;

  .imgContainer {
    position: relative;
    text-align: center;
    color: white;
  }

  .card {
    background: white;
    margin-bottom: 2em;
    box-shadow: 0px 4px 12px rgba(41, 43, 50, 0.04);
    border-radius: 4px;
    padding-bottom: 8px;
    width: 265px;
    /* flex-wrap: wrap; */
    transition: transform 0.2s;
  }

  .card:hover {
    box-shadow: 3px 3px 8px hsl(0, 0%, 80%);
    transform: scale(1.1);

    @media ${BREAKPOINTS.sm} {
      transform: none;
    }
  }

  .card a {
    color: black;
    text-decoration: none;
  }

  .card-content h2 {
    margin-top: 0;
    margin-bottom: 0.5em;
    font-weight: bold;
  }

  .card-content p {
    font-size: 80%;
  }

  .img {
    background-image: url(${(props) => imgUrl(props.img)});
    background-size: cover;
    background-position: 50% 50%;
    display: block;
    border: 0;
    width: 265px;
    height: 200px;
    border-radius: 4px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  }
`;

export const LocationContainer = styled.div`
  position: absolute;
  top: 15px;
  right: 8px;

  .location-font {
    padding-left: 5.75px;
  }
`;

export const BadgeText = styled(TypographyView)`
  font-size: ${pxToRem(12)};
`;

export const BadgeContainer = styled.div`
  flex-direction: row;
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  bottom: 12px;
  left: 16px;

  .badge {
    margin-top: 4px;
  }
`;

export const StatusContainer = styled.div`
  margin-top: 5px;
`;

export const DetailsContainer = styled.div`
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
`;

export const BodyContainerAlt = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  margin-bottom: 8px;
`;

export const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-bottom: 8px;
`;

export const BodyColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-bottom: 8px;
  width: 100%;
  padding-right: 8px;
`;

export const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-left: 8px;
`;

export const PriceContainerAlt = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  .price {
    margin-right: 4px;
  }
`;

export const Price = styled(TypographyView)`
  text-align: right;
`;

export const Title = styled(TypographyView)`
  font-size: ${pxToRem(16)};
  width: 70%;
`;

export const ResultText = styled(TypographyView)`
  font-size: ${pxToRem(14)};
  margin-bottom: 0.6rem;
`;

export const ResultTextAlt = styled(TypographyView)`
  font-size: ${pxToRem(12)};
  margin-bottom: 0.6rem;
  letter-spacing: -0.6px;
`;

export const ResultTextValue = styled(TypographyView)`
  font-size: ${pxToRem(14)};

  max-width: 160px;
  margin-bottom: 0.6rem;
  overflow-wrap: wrap;
  text-align: right;
`;

export const ResultTextValueAlt = styled(TypographyView)`
  font-size: ${pxToRem(12)};

  max-width: 160px;
  margin-bottom: 0.6rem;
  overflow-wrap: wrap;
  text-align: right;
  letter-spacing: -0.6px;
`;

export const Image = styled.div<{ imgSrc: string }>`
  width: 40px;
  height: 40px;
  background-image: url(${(props) => props.imgSrc});
  background-size: cover;
  margin-right: 8px;
  min-width: 40px;
  border-radius: 4px;
`;

export const TitleContainer = styled.div`
  display: flex;
  margin-bottom: 8px;
`;
