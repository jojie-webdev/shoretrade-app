import Interactions from 'components/base/Interactions';
import Typography from 'components/base/Typography';
import styled from 'utils/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
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
  margin-top: 50px;
`;

export const ListingCounter = styled.span`
  font-weight: 900;
  margin-left: 10px;
`;

export const SearchContainer = styled.div`
  margin-top: 24px;
`;

export const CategoryContainer = styled.div`
  margin-top: 24px;
`;

export const ListItemInteraction = styled(Interactions)`
  margin-top: 12px;
`;