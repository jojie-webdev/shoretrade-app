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
      svg {
        position: absolute;
        left: 29%;
        bottom: 0;
        @media (max-width: 576px) and (min-width: 320px) {
          left: 27%;
        }
      }
    }
    .pen-image {
      svg {
        position: absolute;
        left: 28.5%;
        bottom: 0;
        @media (max-width: 576px) and (min-width: 320px) {
          left: 27%;
        }
        @media (max-width: 595px) and (min-width: 577px) {
          left: 29%;
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
