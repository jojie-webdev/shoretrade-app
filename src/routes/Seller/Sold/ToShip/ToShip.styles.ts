import Interaction from 'components/base/Interactions';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Row } from 'react-grid-system';
import styled from 'utils/styled';

export const PendingRow = styled.div`
  margin-bottom: 32px;

  .title-col {
    display: flex;
    align-items: center;
    margin-bottom: 8px;

    .svg-container {
      margin-right: 8px;
    }
  }

  .pagination-container {
    display: flex;
    justify-content: center;
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

      .details-delivery {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
`;

export const StyledInteraction = styled(Interaction)`
  margin-bottom: 12px;

  .content {
    display: flex;
    align-items: center;

    .center-text {
      margin: 0 4px;
    }
  }
`;

export const CollapsibleContent = styled.div<{ isOpen?: boolean }>`
  width: 100%;
  overflow: hidden;
  height: ${({ isOpen }) => (isOpen ? 'auto' : '0')};
  padding: ${({ isOpen }) => (isOpen ? '16px 0' : '0')};
  transition: all 0.1s ease;
`;

export const DeliveryRow = styled(Row)`
  margin-bottom: 32px;

  .title {
    margin-bottom: 8px;
  }
`;

export const CarouselContainer = styled.div`
  height: 160px;
  width: 100%;
  display: flex;
  flex-direction: row;

  .swiper-container {
    width: 100%;
    max-width: 100%;
    height: 100%;
    border-radius: 4px;
  }
`;
