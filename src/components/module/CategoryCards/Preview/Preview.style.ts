import TypographyView from 'components/base/Typography';
import styled from 'utils/styled';
import { pxToRem } from 'utils/Theme';

export const CardContainer = styled.div`
  img {
    display: block;
    border: 0;
    width: 100%;
    height: 148px;
    border-radius: 4px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  }

  .imgContainer {
    position: relative;
    text-align: center;
    color: white;
  }

  .card {
    background: white;
    margin-bottom: 2em;
    box-shadow: 0px 6px 12px rgba(41, 43, 50, 0.12);
    border-radius: 4px;
    max-width: 281px;
    min-width: 281px;
    height: 364px;
    width: 281px;
    flex-wrap: wrap;
  }

  .card:hover {
    box-shadow: 3px 3px 8px hsl(0, 0%, 80%);
  }

  .card a {
    color: black;
    text-decoration: none;
  }

  /* .card-content {
    padding: 1.4em;
  } */

  .card-content h2 {
    margin-top: 0;
    margin-bottom: 0.5em;
    font-weight: bold;
  }

  .card-content p {
    font-size: 80%;
  }

  /* Flexbox stuff */

  .card {
    flex: 1 0 500px;
    box-sizing: border-box;
    margin: 1rem 0.25em;
  }
`;

export const LocationContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;

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
  position: absolute;
  bottom: 12px;
  left: 16px;
`;

export const StatusContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
`;

export const DetailsContainer = styled.div`
  width: 100%;
  padding-left: 16px;
  padding-right: 16px;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
`;

export const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-bottom: 8px;
`;

export const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-left: 8px;
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
`;
