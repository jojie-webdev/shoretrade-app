import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const Container = styled.div<{ isIOS?: boolean }>`
  @media ${BREAKPOINTS['sm']} {
    padding-bottom: 125px;
  }

  .search {
    margin-bottom: 0;
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
