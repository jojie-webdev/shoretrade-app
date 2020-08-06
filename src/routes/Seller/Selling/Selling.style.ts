import Typography from 'components/base/Typography';
import styled from 'utils/styled';

export const Container = styled.div``;

export const ItemCard = styled.div`
  background: ${(props) => props.theme.grey.shade9};
  padding: 24px;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-around;
  border-radius: 4px;

  .content {
    margin-right: 24px;

    .item-title {
      margin-bottom: 16px;
    }

    .tags-container {
      margin-bottom: 16px;
      display: flex;
    }
  }

  .pricing {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
`;

export const Tag = styled.div`
  background: ${(props) => props.theme.grey.shade8};
  padding: 4px 8px;
  margin-right: 8px;
  border-radius: 4px;
`;

export const ItemImage = styled.img`
  width: 148px;
  height: 148px;
  border: 1px solid red;
  margin-right: 16px;
  border-radius: 4px;
`;

export const ItemDetail = styled(Typography)`
  &:not(:last-child) {
    margin-bottom: 8px;
  }

  span {
    font-weight: 900;
    color: ${(props) => props.theme.grey.noshade};
  }
`;
