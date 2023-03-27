import Typography from 'components/base/Typography';
import styled from 'utils/styled';

export const Container = styled.div<{ margin?: number }>`
  display: inline-block;
  margin: ${({ margin }) => (margin !== undefined ? margin : 16)}px;

  .icon-label-wrapper {
    display: flex;

    p {
      margin-left: 5px;
    }
  }

  .__react_component_tooltip {
    padding: 0;
  }
`;

export const StyledContent = styled(Typography)`
  max-width: 210px;
  padding: 8px 21px;
  text-transform: none !important;
`;

export const StyledContentNegotiation = styled(Typography)`
  padding: 8px 21px;
  text-transform: none !important;
`;
