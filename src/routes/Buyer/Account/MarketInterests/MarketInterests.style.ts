import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const Container = styled.div`
  @media ${BREAKPOINTS['sm']} {
    padding-bottom: 125px;
  }

  .search {
    margin-bottom: 0;
  }

  .search-info {
    display: flex;
    align-items: center;
  }

  .tooltip {
    margin-left: 6px;
  }

  .tooltip .tooltip-text {
    visibility: hidden;
    width: 320px;
    background-color: black;
    color: ${(props) => props.theme.grey.noshade};
    text-align: center;
    border-radius: 6px;
    padding: 8px;
    position: absolute;
    z-index: 1;
    right: 10%;
    top: 20%;

    @media ${BREAKPOINTS['sm']} {
      color: ${(props) => props.theme.brand.info};
      width: 230px;
    }
    @media ${BREAKPOINTS['md']} {
      width: 280px;
    }
  }
  .tooltip:hover .tooltip-text {
    visibility: visible;
  }

  .interactions {
    margin-top: 12px;

    .category-container {
      display: flex;
      align-items: center;

      img {
        width: 48px;
        height: 48px;
        border-radius: 8px;
        margin-right: 16px;
      }
    }

    .category-text {
      margin-left: 8px;
    }
  }
`;

export const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 24px;

  .badge-item-container {
    margin-right: 8px;
    margin-top: 8px;
  }
`;
