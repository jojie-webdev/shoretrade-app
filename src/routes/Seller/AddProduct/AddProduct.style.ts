import styled from 'utils/styled';

export const Container = styled.div`
  padding: 40px 80px;
`;

export const ProgressIndicator = styled.div`
  background: ${(props) => props.theme.brand.success};
  height: 10px;
  position: absolute;
  top: -8px;
  left: 0px;
  transition: width 0.4s ease-out;
`;
