import Typography from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const Container = styled.div<{ fluid: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: ${({ fluid }) => (fluid ? 'auto' : '100%')};
  width: 100%;

  @media ${BREAKPOINTS['sm']} {
    flex-direction: column;
  }

  .text-container {
    flex-direction: column;
    margin-right: 161px;
    .refresh-container {
      display: flex;
      flex-direction: row;

      .refresh-text {
        text-decoration: underline;
        cursor: pointer;
        color: ${(props) => props.theme.brand.primary};
      }
      @media ${BREAKPOINTS['xl']} {
        display: inline;
      }
    }

    @media ${BREAKPOINTS['iPad']} {
      margin-right: 20px;
    }

    @media ${BREAKPOINTS['xl']} {
      margin-right: 20px;
    }

    @media ${BREAKPOINTS['sm']} {
      margin-right: 0px;
      margin-top: 24px;
    }
  }
`;

export const MainText = styled(Typography)``;

export const SVGContainer = styled.div<{
  circleColor: string;
  fluid: boolean;
  circleHeight?: number;
  circleWidth?: number;
}>`
  margin-top: ${({ fluid }) => (fluid ? '0' : '70px')};
  margin-bottom: ${({ fluid }) => (fluid ? '0' : '60px')};
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    z-index: 2;
  }
  @media ${BREAKPOINTS['sm']} {
    margin-top: -12px;
  }
  :before {
    position: absolute;
    content: '';
    height: ${(props) =>
      props.circleHeight ? `${props.circleHeight}px` : '210px'};
    width: ${(props) =>
      props.circleWidth ? `${props.circleWidth}px` : '210px'};
    border-radius: 210px;
    z-index: 1;

    background: ${(props) =>
      props.circleColor !== '' ? props.circleColor : props.theme.grey.shade9};
  }
`;
