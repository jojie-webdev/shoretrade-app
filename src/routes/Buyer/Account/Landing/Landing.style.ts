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
    position: relative;

    img {
      ${imgStyle};
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
        left: 25%;
        bottom: 0;
        @media (max-width: 350px) {
          bottom: 8%;
        }
      }
    }
    .pen-image {
      svg {
        position: absolute;
        left: 30%;
        bottom: 0;
        @media (max-width: 575px) {
          left: 27%;
          // bottom: 8%;
        }
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
