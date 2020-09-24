import styled from 'utils/styled';

export const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
`;

export const CCImage = styled.div`
  border: ${(props) => `2px solid ${props.theme.grey.shade3}`};
  padding: 0px 4px;
  border-radius: 5px;
  min-height: 20px;
  min-width: 34px;
  text-align: center;
  margin-right: 4px;
  & > svg {
    vertical-align: middle;
  }
`;

export const CCNumRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
`;
