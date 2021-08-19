import styled from 'utils/styled';

import Interactions from '../Interactions';

export const Container = styled.div<{
  isOpen?: boolean;
  withBackground?: boolean;
  marginBottom: string;
  background?: string;
  border?: string;
}>`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  margin-bottom: ${(props) => props.marginBottom};
  border: ${(props) => (props.border ? props.border : 'none')};
  background: ${(props) => (props.background ? props.background : 'none')};
  .interactions {
    box-shadow: ${({ withBackground }) => withBackground && 'none'};
  }
`;

export const Content = styled.div<{
  isOpen?: boolean;
  padding?: string;
  withBackground?: boolean;
  sameWidth?: boolean;
}>`
  width: 100%;
  overflow: ${(props) => (props.isOpen ? 'visible' : 'hidden')};
  padding: ${({ sameWidth, isOpen }) => {
    if (!isOpen) {
      return '0';
    }
    return sameWidth ? '0' : '16px';
  }};
  padding-top: ${({ withBackground, isOpen }) => {
    if (!isOpen) {
      return '0';
    }
    return withBackground ? '0' : '16px';
  }};
  height: ${(props) => (props.isOpen ? '100%' : '0')};
  transform: ${(props) => (props.isOpen ? 'scaleY(1)' : 'scaleY(0)')};
  transform-origin: top;
  transition: all 0.25s ease-in-out;
    // .border {
    //   border: ${({ theme }) => `1px solid ${theme.grey.shade3}`};
    //   margin: 0px 24px;
    // }
  }
`;

export const StyledInteractions = styled(Interactions)<{
  sameWidth?: boolean;
  isOpen?: boolean;
}>`
  transition: all 0.25s ease-in-out;
  border-radius: ${({ sameWidth, isOpen }) => {
    if (!isOpen) {
      return '8px';
    }
    return sameWidth ? '8px 8px 0px 0px' : '8px';
  }};
`;
