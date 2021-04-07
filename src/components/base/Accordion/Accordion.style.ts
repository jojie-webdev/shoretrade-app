import styled from 'utils/styled';

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
}>`
  width: 100%;
  overflow: ${(props) => (props.isOpen ? 'visible' : 'hidden')};
  padding: ${(props) => (props.isOpen ? '16px 0' : '0px')};
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
    .border {
      border: ${({ theme }) => `1px solid ${theme.grey.shade3}`};
      margin: 0px 24px;
    }
  }
`;
