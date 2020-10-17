import styled from 'utils/styled';

export const Container = styled.div<{ noMargin?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: ${(props) => (props.noMargin ? '0px' : '16px')};
  margin-bottom: ${(props) => (props.noMargin ? '0px' : '16px')};
`;
