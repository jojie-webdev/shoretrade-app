import styled from 'utils/styled';

export const Parent = styled.div<{ height?: string }>`
  display: flex;
  height: ${({ height }) => height || '295px'};
  width: 100%;
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
