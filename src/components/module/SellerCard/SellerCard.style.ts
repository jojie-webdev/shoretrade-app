import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

import { Typography } from '../CategoryCards/Landing/Card.style';

export const Container = styled.div`
  img {
    display: block;
    border: 0;
    border-radius: 4px;
    height: 150px;
    width: 100%;
    object-fit: contain;
  }

  .card {
    background: white;
    margin-bottom: 2rem;
    box-shadow: 0px 6px 12px rgba(41, 43, 50, 0.12);
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box;
    max-height: 205px;
    transition: transform 0.2s;
  }

  .card a {
    color: black;
    text-decoration: none;
  }

  .card:hover {
    box-shadow: 3px 3px 8px hsl(0, 0%, 80%);
    transform: scale(1.1);
    z-index: 1000;

    @media ${BREAKPOINTS.sm} {
      transform: none;
    }
  }

  .card-content {
    padding: 12px 12px 0px 12px;
    object-fit: contain;
    height: 58px;
    display: flex;
    align-items: center;
  }

  .card-content h2 {
    margin-top: 0;
    margin-bottom: 1em;
    font-weight: bold;
  }

  .card-content p {
    font-size: 80%;
  }

  .placeholder-image {
    width: 100%;
    height: 150px;
    background-color: ${({ theme }) => theme.grey.shade2};
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const StyledTypography = styled(Typography)`
  margin-bottom: 4px;
  line-height: -24px;
`;
