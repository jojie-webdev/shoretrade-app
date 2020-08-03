import styled from 'utils/styled';

export const Container = styled.div`
  height: 40px;

  box-shadow: 0px 12px 24px rgba(41, 43, 50, 0.25);
  background: white;
  border-radius: 4px;

  display: inline-flex;
  flex-direction: row;
`;

export const ControlButton = styled.button<{ active: boolean }>`
  height: 100%;
  width: 90px;
  border-radius: 4px;
  border: none;
  background: ${(props) => (props.active ? props.theme.brand.primary : 'none')};

  display: flex;
  justify-content: center;
  align-items: center;

  /* Text Properties */
  font-size: 14px;
  color: ${(props) => (props.active ? props.theme.grey.noshade : '#bbc2dc')};

  :focus {
    outline: none;
  }
`;
