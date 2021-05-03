import Typography from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const Container = styled.div`
  .header-title {
    @media (min-width: 769px) and (max-width: 1100px) {
      margin-bottom: 40px;
    }

    @media ${BREAKPOINTS['sm']} {
      margin-bottom: 24px;
    }
  }

  .search-container {
    width: 300px;

    @media ${BREAKPOINTS['sm']} {
      width: 100%;
    }
  }

  .results {
    margin-top: 16px;
  }

  .recent-searches {
    width: 50%;
    margin-top: 50px;

    @media (min-width: 769px) and (max-width: 1100px) {
      width: 100%;
    }

    @media ${BREAKPOINTS['md']} {
      width: 75%;
    }

    @media ${BREAKPOINTS['sm']} {
      margin-top: 16px;
      width: 100%;
    }
  }

  .no-search-results {
    margin-top: 32px;

    @media ${BREAKPOINTS['sm']} {
      margin-top: 16px;
    }
  }

  .interactions {
    margin-bottom: 12px;
  }
`;

export const Label = styled(Typography)`
  margin-bottom: 16px;
`;

export const SVGContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    z-index: 2;

    @media ${BREAKPOINTS['md']} {
      width: 292px;
      height: 169px;
    }
  }

  :before {
    position: absolute;
    content: '';
    width: 280px;
    height: 280px;
    border-radius: 50%;
    z-index: 1;
    background: ${(props) => props.theme.grey.shade3};

    @media ${BREAKPOINTS['md']} {
      width: 250px;
      height: 250px;
    }
  }

  @media (min-width: 769px) and (max-width: 1100px) {
    display: none;
  }
`;
