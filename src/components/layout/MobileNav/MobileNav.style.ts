import { MOBILE_HEADER_HEIGHT } from 'consts/mobileHeader';
import styled from 'utils/styled';

export const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 0 27px;
  position: fixed;
  top: 0;
  width: 100%;
  height: ${MOBILE_HEADER_HEIGHT}px;
  background-color: ${({ theme }) => theme.grey.shade9};
`;

export const Content = styled.div`
  margin-top: ${MOBILE_HEADER_HEIGHT}px;
`;

export const Title = styled.div`
  margin: auto;
`;