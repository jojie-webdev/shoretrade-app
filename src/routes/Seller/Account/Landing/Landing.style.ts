import Interactions from 'components/base/Interactions';
import { IOSBOTTOMPADDING } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled, { css } from 'utils/styled';

const imgStyle = css`
  width: 96px;
  height: 96px;
  border-radius: 8px;
  margin-right: 16px;
  cursor: pointer;
`;

export const Container = styled.div<{ isIOS?: boolean }>`
  @media ${BREAKPOINTS['sm']} {
    padding-bottom: ${(props) => (props.isIOS ? IOSBOTTOMPADDING : '24px')};
  }
`;

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
      cursor: pointer;
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
