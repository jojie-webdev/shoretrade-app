import styled from 'utils/styled';

export const Parent = styled.div<{ height?: string }>`
  display: flex;
  height: ${({ height }) => height || '295px'};
  width: 100%;

  @media (min-width: 375px) {
    height: 220px;
    margin-top: 120px;
  }

  @media (min-width: 1024px) {
    height: 300px;
  }

  @media (min-width: 1366px) {
    height: 325px;
  }

  @media (min-width: 1440px) {
    height: 350px;
  }
`;

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;

  .swiper-container {
    width: 100%;
    max-width: 100%;
    height: 100%;
    border-radius: 4px;
  }
`;
