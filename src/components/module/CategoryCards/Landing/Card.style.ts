import TypographyView from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const CardContainer = styled.div`
  img {
    display: block;
    border: 0;
  }

  .card {
    background: white;
    margin-bottom: 2em;
    box-shadow: 0px 4px 12px rgba(41, 43, 50, 0.04);
    border-radius: 4px;
    box-sizing: border-box;
    border-radius: 4px;
    width: 100%;
    height: 160px;
    margin-right: 32px;
    transition: transform 0.2s;

    @media ${BREAKPOINTS.sm} {
      min-height: 160px;
      height: auto;
    }
  }

  .card a {
    color: black;
    text-decoration: none;
  }

  .card:hover {
    box-shadow: 3px 3px 8px hsl(0, 0%, 80%);
    transform: scale(1.1);

    @media ${BREAKPOINTS.sm} {
      transform: none;
    }
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

export const Text = styled(TypographyView)`
  margin-bottom: 4px;
`;
