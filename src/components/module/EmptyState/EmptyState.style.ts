import Typography from 'components/base/Typography';
import styled from 'utils/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export const MainText = styled(Typography)``;

export const SVGContainer = styled.div<{ circleColor: string }>`
  margin-top: 70px;
  margin-bottom: 60px;
  position: relative;
  height: 245px;
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
    height: 210px;
    width: 210px;
    border-radius: 110px;
    background: ${(props) =>
      props.circleColor !== '' ? props.circleColor : props.theme.grey.shade9};
    z-index: 1;
  }
`;
