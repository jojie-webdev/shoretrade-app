import Interaction from 'components/base/Interactions';
import Typography from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Row } from 'react-grid-system';
import styled from 'utils/styled';
import { pxToRem } from 'utils/Theme';

export const StyledInteraction = styled(Interaction)`
  margin-bottom: 8px;
  padding: 16px 24px;

  .content {
    display: flex;
    flex: 1;
    align-items: center;
    flex-wrap: wrap;

    .left-content {
      display: flex;
      align-items: center;
      width: 292px;
      justify-content: space-between;
      padding-right: 32px;

      @media (max-width: 375px) {
        width: 240px;
      }

      .order-count {
        padding: 8px 16px;
        background-color: ${({ theme }) => theme.grey.shade8};

        p {
          font-size: 11px;
        }
      }
    }

    .left-content-extended {
      width: 316px;

      @media (max-width: 375px) {
        width: 240px;
      }
    }

    .right-content {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      width: 210px;

      @media (max-width: 375px) {
        width: 240px;
      }

      @media (max-width: 1237px) {
        justify-content: flex-start;
        margin-left: 8px;
      }
    }

    .buttons {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      flex: 1;
      margin-right: 16px;
    }

    .center-text {
      margin: 0 4px;
      display: flex;

      p:not(:first-child) {
        margin-left: 4px;
      }
    }

    .title-text {
      font-size: ${pxToRem(16)};
    }
  }
`;

export const InnerStyledInteraction = styled(StyledInteraction)`
  min-height: 60px;
  padding: 10px 24px;
`;

export const CollapsibleContent = styled.div<{ isOpen?: boolean }>`
  overflow: hidden;
  height: ${({ isOpen }) => (isOpen ? 'auto' : '0')};
  transition: all 0.25s ease-in-out;
  transform-origin: top;
  transform: ${(props) => (props.isOpen ? 'scaleY(1)' : 'scaleY(0)')};
`;

export const CarouselContainer = styled.div`
  position: relative;
  margin-bottom: 16px;
`;

export const ItemCard = styled.div`
  min-height: 144px;
  background: ${(props) => props.theme.grey.shade9};
  padding: 16px;
  margin-bottom: 8px;
  border-radius: 4px;

  display: flex;
  position: relative;
  justify-content: space-between;
  flex-wrap: wrap;
  flex: 1;

  :hover {
    cursor: pointer;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .title {
    display: flex;
    flex-direction: row;
    margin-bottom: 12px;

    p:not(:first-child) {
      margin-left: 4px;
    }
  }

  .content {
    display: flex;
    flex-direction: row;
  }

  .left-content {
    display: flex;
    align-items: center;
    width: 300px;

    @media (max-width: 375px) {
      width: 240px;
    }

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
    width: 210px;
    padding: 16px 0px;
    justify-content: space-evenly;

    @media (max-width: 375px) {
      width: 240px;
    }

    @media (max-width: 1024px) {
      width: auto;
    }

    /* @media (max-width: 1237px) {
      margin-left: 72px;
    } */
  }

  .right-content-alternate {
    display: flex;
    flex-direction: row;
    /* align-items: center; */
    flex: 1;
    padding: 16px 0px;
    flex-wrap: wrap;

    @media (max-width: 375px) {
      width: 240px;
    }

    .data-content {
      display: flex;
      min-width: 120px;
      flex: 1;
      padding: 4px 16px;
    }

    .data-fisherman {
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .buttons {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: flex-end;
  }
`;

export const ItemImage = styled.img`
  width: 56px;
  height: 56px;
  object-fit: contain;
  background: ${(props) => props.theme.grey.noshade};

  margin-right: 16px;
  border-radius: 4px;
`;

export const ItemDetail = styled(Typography)<{ row?: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.row ? 'row' : 'column')};
  align-items: ${(props) => (props.row ? 'center' : 'flex-start')};

  width: 100%;
  white-space: nowrap;
  line-height: 16px;

  margin-right: 56px;

  @media (max-width: 662px) {
    margin-right: 16px;
  }

  span {
    color: ${(props) => props.theme.grey.noshade};
    font-size: 14px;
    margin-left: ${(props) => (props.row ? '8px' : '0')};
    line-height: 24px;
  }
`;

export const Tag = styled.div`
  /* background: ${(props) => props.theme.grey.shade8}; */
  padding: 4px 8px;
  margin-right: 8px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
`;
