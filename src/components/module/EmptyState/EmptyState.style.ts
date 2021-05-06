import Typography from 'components/base/Typography';
import styled from 'utils/styled';

export const Container = styled.div<{ fluid: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: ${({ fluid }) => (fluid ? 'auto' : '100%')};
  width: 100%;
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
  height: 350px;
  width: 245px;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    z-index: 2;
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
