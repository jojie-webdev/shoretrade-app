import styled, { css } from 'utils/styled';

const imgStyle = css`
  border-radius: 12px;
  margin-right: 16px;
  cursor: pointer;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;

  .error-container {
    position: absolute;
    top: 120px;

    .text {
      white-space: nowrap;
    }
  }
`;

export const ImageContainer = styled.div<{
  size?: number;
}>`
  position: relative;
  img {
    ${imgStyle}
    width: ${({ size }) => size || 96}px;
    height: ${({ size }) => size || 96}px;
  }

  .loading-indicator {
    width: 96px;
    height: 96px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .pen {
    cursor: pointer;
    svg {
      position: absolute;
      right: 16px;
      bottom: 0px;
    }
  }
`;

export const NoProfilePic = styled.div<{
  size?: number;
}>`
  ${imgStyle};
  width: ${({ size }) => size || 96}px;
  height: ${({ size }) => size || 96}px;
  background-color: #edeffa;
`;
