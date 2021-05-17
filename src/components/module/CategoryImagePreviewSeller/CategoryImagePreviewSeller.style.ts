import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

const imgUrl = (url: string) => `"${url}"`;

export const Container = styled.div<{ img?: string }>`
  width: 100%;
  max-width: 474px;
  margin-bottom: 1rem;

  @media ${BREAKPOINTS['iPad']} {
    max-width: 100%;
  }
  @media ${BREAKPOINTS['xl']} {
    max-width: 100%;
  }

  .imgContainer {
    position: relative;
    text-align: center;
    color: white;

    @media ${BREAKPOINTS['genericTablet']} {
      max-width: 671px;
    }
  }
  .img {
    background-image: url(${(props) => imgUrl(props.img ? props.img : '')});
    background-size: cover;
    background-position: 50% 50%;
    display: block;
    border: 0;
    width: 100%;
    height: 280px;
    border-radius: 8px;
    @media ${BREAKPOINTS['iPad']} {
      height: 374px;
    }
    @media ${BREAKPOINTS['xl']} {
      height: 374px;
    }
  }

  .label {
    margin-top: 1rem;
  }

  @media ${BREAKPOINTS['genericTablet']} {
    max-width: 671px;
  }
`;

export const BadgeContainer = styled.div`
  flex-direction: row;
  display: flex;
  position: absolute;
  bottom: 12px;
  left: 16px;
`;

export const MarketBoardBadge = styled.div`
  display: flex;
  margin-bottom: 8px;
`;
