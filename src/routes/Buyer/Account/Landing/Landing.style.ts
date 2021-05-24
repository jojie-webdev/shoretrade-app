import Interactions from 'components/base/Interactions';
import styled, { css } from 'utils/styled';

const imgStyle = css`
  width: 96px;
  height: 96px;
  border-radius: 8px;
  margin-right: 16px;
  cursor: pointer;
`;

export const Container = styled.div``;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;

  .left-content {
    display: flex;
    align-items: center;

    img {
      ${imgStyle};
    }
    .img-container {
      position: relative;
    }
    .loading-indicator {
      width: 96px;
      height: 96px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .pen {
      svg {
        position: absolute;
        right: 16px;
        bottom: 0px;
      }
    }
  }
`;

export const NavInteraction = styled(Interactions)`
  margin-bottom: 12px;
`;

export const NoProfilePic = styled.div`
  ${imgStyle};
  background-color: #edeffa;
`;
