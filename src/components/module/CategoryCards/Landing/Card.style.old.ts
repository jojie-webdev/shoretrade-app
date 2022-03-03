import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const CardContainer = styled.div`
  img {
    display: block;
    border: 0;
    ${({ theme }) => {
      if (theme.isSFM) {
        return `border-bottom: 2px solid ${theme.brand.secondary};`;
      }
    }}
  }

  .card {
    background: white;
    margin-bottom: 2em;
    box-shadow: 0px 6px 12px rgba(41, 43, 50, 0.12);
    border-radius: 4px;
    box-sizing: border-box;
    width: 100%;
    height: 160px;
    margin-right: 32px;
    transition: transform 0.2s;

    @media ${BREAKPOINTS.sm} {
      min-height: 160px;
      height: auto;
    }

    ${({ theme }) => {
      if (theme.isSFM) {
        return `outline: 2px solid ${theme.brand.secondary};`;
      }
    }}
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

  .card-content p {
    font-size: 80%;
  }
`;
