import styled, { css } from 'utils/styled';

const imgStyle = css`
  width: 96px;
  height: 96px;
  border-radius: 8px;
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

export const ImageContainer = styled.div`
  position: relative;
  img {
    ${imgStyle}
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

export const NoProfilePic = styled.div`
  ${imgStyle};
  background-color: #edeffa;
`;
