import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const Container = styled.div`
  .card {
    background: white;
    margin-bottom: 2rem;
    box-shadow: 0px 4px 12px rgba(41, 43, 50, 0.04);
    border-radius: 8px;
    width: 100%;
    max-height: 205px;
    transition: transform 0.2s;
    ${({ theme }) => {
      if (theme.isSFM) {
        return `outline: 2px solid ${theme.brand.secondary};`;
      }
    }}
  }

  .card:hover {
    box-shadow: 3px 3px 8px hsl(0, 0%, 80%);
    transform: scale(1.1);
    z-index: 999;

    @media ${BREAKPOINTS.sm} {
      transform: none;
    }
  }

  img {
    display: block;
    border: 0;
    border-radius: ${({ theme }) => (theme.isSFM ? '0px' : '4px')};
    height: 150px;
    width: 100%;
    object-fit: contain;
    ${({ theme }) => {
      if (theme.isSFM) {
        return `border-bottom: 2px solid ${theme.brand.secondary};`;
      }
    }}
  }

  .placeholder-image {
    width: 100%;
    height: 150px;
    background-color: ${({ theme }) =>
      theme.isSFM ? theme.grey.shade5 : theme.grey.shade2};
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .card-content {
    margin-top: 14px;
    padding: 0 12px;
    height: 48px;

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
