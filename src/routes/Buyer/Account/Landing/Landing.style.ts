import Interactions from 'components/base/Interactions';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const Container = styled.div`
  width: 100%;
  padding: 0px 100px;

  @media ${BREAKPOINTS['md']} {
    padding: 0px 75px;
  }

  @media ${BREAKPOINTS['sm']} {
    padding: 0px 8px;
  }
`;

export const Content = styled.div`
  padding: 40px 40px 24px 40px;
  background: ${(props) => props.theme.grey.shade2};
  border: 2px solid ${(props) => props.theme.grey.shade3};
  border-radius: 8px;

  @media ${BREAKPOINTS['md']} {
    padding: 32px 32px 16px 32px;
  }

  @media ${BREAKPOINTS['sm']} {
    padding: 16px 16px 0 16px;
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

    img {
      width: 96px;
      height: 96px;
      border-radius: 4px;
    }

    .user-details {
      margin-left: 16px;
    }
  }

  .right-content {
    position: relative;

    select {
      padding: 4px 12px;
      background: ${(props) => props.theme.grey.shade9};
      color: ${(props) => props.theme.grey.noshade};
      border-radius: 2px;
      border: none;
    }
  }
`;

export const NavInteraction = styled(Interactions)`
  margin-bottom: 16px;
`;

export const DropdownContainer = styled.div`
  /* height: 30px;
  padding: 4px 12px; */
`;
