import Button from 'components/base/Button';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const Container = styled.div`
  @media ${BREAKPOINTS['sm']} {
    padding-bottom: 125px;
  }

  .search-row {
    margin-bottom: 32px;

    @media ${BREAKPOINTS['sm']} {
      margin-bottom: 8px;
    }
  }

  .results-row {
    .title {
      margin-bottom: 16px;
    }

    .item-container {
      margin-bottom: 8px;
    }
    .interactions {
      height: 64px;
      @media ${BREAKPOINTS['sm']} {
        height: 40px;
      }
    }
  }

  .textfield-row {
    margin-bottom: 8px;

    .textfield-col {
      margin-bottom: 36px;
    }
  }
`;

export const Image = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  margin-right: 16px;
  margin-left: -16px;
`;

export const SearchContainerDesktop = styled.div`
  position: absolute;
  top: 0;
  right: 5%;
  width: 211px;
`;

export const EmptyResultDesktop = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ButtonContainer = styled.div`
  display: flex;
  margin-top: 40px;
`;

export const BackButton = styled(Button)`
  width: 67px;
  margin-right: 16px;
`;
