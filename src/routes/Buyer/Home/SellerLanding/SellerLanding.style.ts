import Typography from 'components/base/Typography';
import styled, { css } from 'utils/styled';

import { CategoriesContainer } from '../Home.style';

const customScrollbar = (props: any) =>
  css`
    ::-webkit-scrollbar {
      width: 0.7rem;
    }

    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 4px;
      background-color: darkgrey;
      outline: 1px solid slategrey;
    }
  `;

export const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
  padding: 0 8px 8px 8px;

  .cards {
    display: flex;
    flex-wrap: wrap;

    a {
      margin-right: 32px;

      .card {
        width: 203px;
      }
    }
  }

  .search-row {
    margin-bottom: 24px;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
  height: 100%;
`;

export const SellerContainer = styled(CategoriesContainer)``;

export const CardContainer = styled.div`
  img {
    display: block;
    border: 0;
    border-radius: 4px;
    height: 112px;
    width: 100%;
    object-fit: contain;
    background: ${(props) => props.theme.grey.shade7};
  }

  .card {
    background: white;
    margin-bottom: 2em;
    box-shadow: 0px 6px 12px rgba(41, 43, 50, 0.12);
    border-radius: 4px;
    box-sizing: border-box;
    width: 203px;
    height: 170px;
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
export const SellerCardTypography = styled.div`
  margin-bottom: 4px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.grey.shade9};
`;
