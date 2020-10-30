import Alert from 'components/base/Alert';
import Touchable from 'components/base/Touchable';
import Typography from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const Container = styled.div`
  height: 100%;

  .row {
    height: 100%;
  }
`;

export const StyledAlert = styled(Alert)`
  margin-bottom: 16px;
  width: 100%;
`;

export const ItemCard = styled.div`
  background: ${(props) => props.theme.grey.shade9};
  padding: 8px 12px;
  margin-bottom: 8px;
  border-radius: 4px;

  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 75%;

    :hover {
      cursor: pointer;
    }
  }

  .left-content {
    display: flex;
    align-items: center;
    flex: 1;

    .text-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .tags-container {
      display: flex;
      margin: 2px 0;
    }
  }

  .right-content {
    display: flex;
    align-items: center;
    flex: 1;

    .item-data {
      display: flex;
      align-items: center;
      flex: 1;
      justify-content: space-between;
    }
  }

  .buttons {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex: 0.3;
    z-index: 1000;
  }

  @media (max-width: 1252px) {
    .right-content {
      margin-top: 8px;
      margin-left: 48px;
      flex-wrap: wrap;
    }

    .buttons {
      position: absolute;
      top: 8px;
      right: 8px;
    }
  }

  @media (max-width: 375px) {
    .right-content {
      .item-data {
        flex-wrap: wrap;
      }
    }
  }
`;

export const StyledTouchable = styled(Touchable)`
  margin-right: 6px;
`;

export const Tag = styled.div`
  background: ${(props) => props.theme.grey.shade8};
  padding: 2px 6px;
  margin-right: 8px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
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
  margin-right: 16px;
  width: auto;

  white-space: nowrap;

  span {
    font-weight: 900;
    color: ${(props) => props.theme.grey.noshade};

    margin-left: ${(props) => (props.row ? '8px' : '0')};
  }
`;
