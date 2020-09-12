import Typography from 'components/base/Typography';
import { Row } from 'react-grid-system';
import styled, { css } from 'utils/styled';
import theme from 'utils/Theme';

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

export const Container = styled.div`
  ${customScrollbar}
`;

export const CategoriesContainer = styled.div`
  display: flex;
`;

export const CategoriesHeader = styled.div`
  display: flex;
  // border: 2px solid blue;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 48px;
`;

export const CreditContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 4px;
  background-color: #ffcf5c;
  height: 3.5em;
  margin-bottom: 24px;
`;

export const Text = styled(Typography)`
  display: flex;
  flex: 1;
  margin-left: 5px;
`;

export const Bold = styled(Typography)`
  margin-left: 0.4em;
  margin-right: 0.4em;
`;

export const InfoContainer = styled.span`
  margin-right: 19px;
  margin-left: 18px;
`;

export const FavouritesHeader = styled(CategoriesHeader)``;

export const FavouritesContainer = styled(CategoriesContainer)``;
