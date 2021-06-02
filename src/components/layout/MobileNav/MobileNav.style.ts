import { MOBILE_HEADER_HEIGHT } from 'consts/mobileHeader';
import styled from 'utils/styled';

export const Container = styled.div<{ position?: string }>`
  display: flex;
  align-items: center;
  padding: 0 24px;
  position: ${(props) => props.position};
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9998;
  height: ${MOBILE_HEADER_HEIGHT}px;
  min-height: ${MOBILE_HEADER_HEIGHT}px;
  background-color: ${({ theme }) => theme.grey.shade9};

  .right-content {
    justify-content: flex-end;
  }

  .left-content {
    justify-content: flex-start;
    margin-right: 12px;
  }
`;

export const Content = styled.div`
  margin-top: ${MOBILE_HEADER_HEIGHT}px;
`;

export const Title = styled.div`
  margin: auto;
`;
