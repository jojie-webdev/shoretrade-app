import Interactions from 'components/base/Interactions';
import CategoryImage from 'components/module/CategoryImage';
import styled, { css } from 'utils/styled';

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
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const SellerRatingContainer = styled.div`
  margin-bottom: 40px;
`;

export const CategoryContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const SpinnerContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const ListingContainer = styled.div`
  flex: 1;
  
  
`;

export const ListingCounter = styled.span`
  font-weight: 900;
  margin-left: 10px;
`;

export const SearchContainer = styled.div`
  margin-top: 24px;
`;

export const ListContainer = styled.div`
  margin: 24px auto;
  max-height: 400px;
  overflow: scroll;
  overflow-x: hidden;
  
  ${customScrollbar}
`;

export const ListItemInteraction = styled(Interactions)`
  margin-top: 12px;
`;

export const ListingImageContainer = styled.div`
  display: flex;
  margin-right: 12px;
  & > img {
    width: 90px;
    height: 90px;
    border-bottom-left-radius: 4px;
    border-top-left-radius: 4px;
    object-fit: cover;
  }
`;

export const RightComponent = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
  padding-right: 24px;
`;
