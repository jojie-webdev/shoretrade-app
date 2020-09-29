import Interactions from 'components/base/Interactions';
import styled from 'utils/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  padding: 0 6px;
`;

export const SearchContainer = styled.div`
  margin-bottom: 24px;
`;

export const ListContainer = styled.div`
  margin: 24px auto;
  flex: 1;
`;

export const ListItemInteraction = styled(Interactions)`
  margin-top: 12px;
`;
