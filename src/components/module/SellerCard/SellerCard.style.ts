import styled from 'utils/styled';

import { Typography } from '../CategoryCards/Landing/Card.style';

export const Container = styled.div`
  img {
    display: block;
    border: 0;
    border-radius: 4px;
    height: 112px;
    width: 100%;
  }

  .card {
    background: white;
    margin-bottom: 2rem;
    box-shadow: 0px 6px 12px rgba(41, 43, 50, 0.12);
    border-radius: 4px;
    box-sizing: border-box;
    width: 100%;
    height: 204px;
    margin-right: 32px;
    transition: transform 0.2s;
  }

  .card a {
    color: black;
    text-decoration: none;
  }

  .card:hover {
    box-shadow: 3px 3px 8px hsl(0, 0%, 80%);
    transform: scale(1.1);
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
`;

export const StyledTypography = styled(Typography)`
  margin-bottom: 4px;
  line-height: -24px;
`;

export const ImageContainer = styled.div<{ img: string }>`
  width: 100%;
  background-image: url(${(props) => props.img});
  background-size: cover;
  background-position: 50% 50%;
  height: 148px;
  border-radius: 4px;
`;