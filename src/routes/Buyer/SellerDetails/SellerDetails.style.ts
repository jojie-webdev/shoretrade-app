import Interactions from 'components/base/Interactions';
import Typography from 'components/base/Typography';
import CategoryImage from 'components/module/CategoryImage';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled, { css } from 'utils/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
  display: table;
  clear: both;
  width: 100%;
  padding: 0 6px;
`;

export const SellerRatingContainer = styled.div`
  margin-bottom: 44px;
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
  // flex: 1;
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
  overflow: auto;
  overflow-x: hidden;
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

export const ListingHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
