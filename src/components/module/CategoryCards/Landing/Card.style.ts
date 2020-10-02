import TypographyView from 'components/base/Typography';
import styled from 'utils/styled';

export const CardContainer = styled.div`
  img {
    display: block;
    border: 0;
  }

  .card {
    background: white;
    margin-bottom: 2em;
    box-shadow: 0px 6px 12px rgba(41, 43, 50, 0.12);
    border-radius: 4px;
    box-sizing: border-box;
    border-radius: 4px;
    width: 203px;
    height: 160px;
    margin-right: 32px;
  }

  .card a {
    color: black;
    text-decoration: none;
  }

  .card:hover {
    box-shadow: 3px 3px 8px hsl(0, 0%, 80%);
  }

  .card-content {
    padding: 12px 12px 0px 12px;
  }

  .card-content h2 {
    margin-top: 0;
    margin-bottom: 1em;
    font-weight: bold;
  }

  .card-content p {
    font-size: 80%;
  }
`;

export const Typography = styled(TypographyView)`
  margin-bottom: 4px;
`;