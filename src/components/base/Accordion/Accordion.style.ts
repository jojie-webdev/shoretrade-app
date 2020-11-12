import styled from 'utils/styled';

export const Container = styled.div<{
  isOpen?: boolean;
  withBackground?: boolean;
  marginBottom: string;
}>`
  display: flex;
  flex-direction: column;
  margin-bottom: ${(props) => props.marginBottom};
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
  height: ${(props) => (props.isOpen ? '100%' : '0')};
  transform: ${(props) => (props.isOpen ? 'scaleY(1)' : 'scaleY(0)')};
  transform-origin: top;
  transition: all 0.25s ease-in-out;
  padding: 0 16px;
  padding-top: ${({ withBackground }) => (withBackground ? '0px' : '16px')};
  .border {
    border: ${({ theme }) => `1px solid ${theme.grey.shade3}`};
    margin: 0px 24px;
  }
`;
