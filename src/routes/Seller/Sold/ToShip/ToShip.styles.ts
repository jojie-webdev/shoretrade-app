import Interaction from 'components/base/Interactions';
import Typography from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Row } from 'react-grid-system';
import styled from 'utils/styled';

export const TitleRow = styled.div`
  margin-bottom: 12px;

  .title-col {
    display: flex;
    align-items: center;

    .svg-container {
      margin-right: 8px;
    }
  }
`;

export const PriorityNumber = styled.div`
  background: ${(props) => props.theme.brand.primary};
  border-radius: 2px;
  width: 34px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
`;

export const PendingItemContainer = styled.div`
  border-radius: 4px;
  width: 100%;
  background: ${(props) => props.theme.grey.shade9};

  &:hover {
    cursor: pointer;
  }

  .bottom-content {
    padding: 0 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 16px;
  }

  .divider {
    height: 2px;
    background: ${(props) => props.theme.grey.shade8};
    margin: 16px 0;
  }

  .content {
    padding: 12px 12px 0 12px;
    display: flex;

    .center-text {
      margin: 0 4px;
    }

    img {
      height: 64px;
      width: 64px;
      border-radius: 8px;
      margin-right: 8px;
    }

    .details {
      display: flex;
      flex-direction: column;
      div {
        display: flex;
        align-items: center;
      }
    }
  }
`;

export const Spacer = styled.div`
  width: 0px;
  @media (min-width: 1300px) {
    width: 32px;
  }

  @media (min-width: 1400px) {
    width: 132px;
  }

  @media (min-width: 1500px) {
    width: 232px;
  }

  @media (min-width: 1600px) {
    width: 332px;
  }
`;

export const StyledInteraction = styled(Interaction)`
  margin-bottom: 8px;

  .content {
    display: flex;
    flex: 1;
    align-items: center;
    flex-wrap: wrap;

    .left-content {
      display: flex;
      align-items: center;
      width: 300px;
      justify-content: space-between;
      padding-right: 32px;

      @media (max-width: 375px) {
        width: 240px;
      }

      .order-count {
        padding: 8px 16px;
        background-color: ${({ theme }) => theme.grey.shade8};
      }
    }

    .left-content-extended {
      width: 324px;
    }

    .right-content {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      width: 230px;
      padding: 16px 0px;

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
    }
  }
`;

export const CollapsibleContent = styled.div<{ isOpen?: boolean }>`
  overflow: hidden;
  height: ${({ isOpen }) => (isOpen ? 'auto' : '0')};
  transition: all 0.1s ease;
`;

export const ItemRow = styled(Row)`
  margin-bottom: 8px;
`;

export const CarouselContainer = styled.div`
  position: relative;
  margin-bottom: 16px;
`;

export const ItemCard = styled.div`
  background: ${(props) => props.theme.grey.shade9};
  padding: 8px 12px;
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
    width: 230px;
    padding: 16px 0px;
    justify-content: space-evenly;

    @media (max-width: 375px) {
      width: 240px;
    }

    @media (max-width: 1237px) {
      margin-left: 72px;
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

  width: auto;
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
  background: ${(props) => props.theme.grey.shade8};
  padding: 4px 8px;
  margin-right: 8px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
`;
