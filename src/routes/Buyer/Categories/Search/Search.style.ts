import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const SearchContainer = styled.div`
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 34px;

    @media ${BREAKPOINTS['sm']} {
      margin-bottom: 0px;
    }

    .search {
      width: 308px;

      @media ${BREAKPOINTS['sm']} {
        width: 100%;
      }
    }
  }

  .interactions {
    margin-bottom: 12px;
    padding: 16px 42px 16px 16px;

    @media ${BREAKPOINTS['sm']} {
      padding: 16px 27px 16px 16px;
    }
  }
`;

export const Image = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 8px;
  margin-right: 16px;

  @media ${BREAKPOINTS['sm']} {
    width: 48px;
    height: 48px;
  }
`;

export const ResultContainer = styled.div`
  flex: none;
  order: 0;
  align-self: center;
  flex-direction: row;
  display: flex;

  .per {
    margin-left: 16px;
    margin-right: 4px;
  }

  .measure {
    margin-right: 8px;
  }
`;
