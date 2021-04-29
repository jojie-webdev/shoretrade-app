import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const CardContainer = styled.div<{ responsive?: boolean }>`
  .card {
    background: white;
    margin-bottom: 2em;
    box-shadow: 0px 4px 12px rgba(41, 43, 50, 0.04);
    border-radius: 8px;
    box-sizing: border-box;
    width:${(props) => props.responsive ? '100%': '142px' };
    max-width:${(props) => props.responsive ? '156px': '142px' };
    min-height: 160px;
    margin-right: 24px;
    transition: transform 0.2s;
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
    display: flex;
    align-items: center;
    min-height: 48px;
    padding: 0 12px;
  }
`;
