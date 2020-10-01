import TypographyView from 'components/base/Typography';
import styled from 'utils/styled';

export const CardContainer = styled.div`
  img {
    display: block;
    border: 0;
    width: 100%;
    height: auto;
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
    max-width: 300px;
    min-width: 281px;
    height: 364px;
    width: 281px;
    flex-wrap: wrap;
  }

  .card a {
    color: black;
    text-decoration: none;
  }

  .card a:hover {
    box-shadow: 3px 3px 8px hsl(0, 0%, 80%);
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
  top: 5%;
  right: 5%;
`;

export const BadgeContainer = styled.div`
  flex-direction: row;
  display: flex;
  position: absolute;
  bottom: 5%;
  left: 2%;
`;

export const StatusContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 8px;
`;

export const DetailsContainer = styled.div`
  width: 100%;
  padding-left: 16px;
  padding-right: 16px;
`;

export const HeaderContainer = styled.div`
  flex-direction: row;
  padding: 8px;
`;

export const BodyContainer = styled.div`
  flex-direction: row;
  padding: 8px;
  margin-bottom: 8px;
`;

export const PriceContainer = styled.div`
  align-items: flex-end;
  width: 30%;
  padding-right: 10px;
`;

export const Price = styled(TypographyView)`
  text-align: right;
`;

export const Title = styled(TypographyView)`
  font-size: 14px;
  width: 70%;
`;
