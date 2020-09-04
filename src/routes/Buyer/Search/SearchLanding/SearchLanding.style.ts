import Interactions from 'components/base/Interactions';
import styled from 'utils/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  padding-left: 24px;
  padding-right: 24px;
  flex: 1;
  margin-top: 24px;
`;

export const SearchContainer = styled.div`
  margin-bottom: 24px;
`;

export const ListContainer = styled.div`
  margin: 24px auto;
  max-height: 400px;
  overflow: scroll;
  overflow-x: hidden;
`;

export const ListItemInteraction = styled(Interactions)`
  margin-top: 12px;
`;
