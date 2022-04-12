import Tag from 'components/base/Tag';
import styled from 'utils/styled';

export const Container = styled.div`
  background: ${({ theme }) => theme.grey.shade9};
  border-radius: 12px;
  padding: 24px;
`;

export const PriceContainer = styled.div`
  padding-bottom: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.grey.shade8};

  .total {
    display: flex;
    flex-direction: row;

    > p {
      margin-right: 4px;
    }

    .per {
      position: relative;
      top: 4px;
    }
  }
`;

export const ItemsContainer = styled.div`
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;

  > div {
    margin 0px 4px 4px 0px;
  }
`;

export const StyledTag = styled(Tag)`
  border: 1px solid ${({ theme }) => theme.grey.shade8};
  margin 0px 4px 4px 0px;
`;

export const ActionsContainer = styled.div`
  margin-top: 16px;
`;
