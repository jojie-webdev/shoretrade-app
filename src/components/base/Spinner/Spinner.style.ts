import styled from 'utils/styled';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: max-content;
  animation: rotation 1s infinite linear;
  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
