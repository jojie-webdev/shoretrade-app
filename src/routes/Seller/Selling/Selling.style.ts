import Typography from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Row } from 'react-grid-system';
import styled from 'utils/styled';

export const Container = styled.div`
  height: 100%;

  .row {
    height: 100%;
  }
`;

export const ItemCard = styled.div`
  background: ${(props) => props.theme.grey.shade9};
  padding: 8px 12px;
  margin-bottom: 8px;
  border-radius: 4px;
  ${({ onClick }) =>
    onClick
      ? `cursor: pointer;
  &:hover {
    opacity: 0.9;
  }`
      : ''};

  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;

  .left-content {
    display: flex;
    align-items: center;
    flex: 1;

    .text-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }

  .tags-container {
    display: flex;
    margin: 2px 0;
  }

  .item-data {
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: flex-start;
  }

  .content {
    flex: 1;
    margin-right: 24px;

    .item-title {
      margin-bottom: 16px;
    }
  }

  .pricing {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  @media ${BREAKPOINTS['md']} {
    padding-bottom: 32px;
  }

  @media ${BREAKPOINTS['sm']} {
    padding-bottom: 32px;
  }
`;

export const Tag = styled.div`
  background: ${(props) => props.theme.grey.shade8};
  padding: 4px 8px;
  margin-right: 8px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ItemImage = styled.img`
  width: 32px;
  height: 32px;
  object-fit: contain;
  background: ${(props) => props.theme.grey.noshade};

  margin-right: 16px;
  border-radius: 4px;
`;

export const ItemDetail = styled(Typography)<{ row?: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.row ? 'row' : 'column')};
  margin-right: 24px;

  span {
    font-weight: 900;
    color: ${(props) => props.theme.grey.noshade};
    margin-left: ${(props) => (props.row ? '8px' : '0')};
  }
`;
