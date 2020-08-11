import styled from 'utils/styled';

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.grey.shade9};
  border: 1px dashed ${(props) => props.theme.grey.shade6};
  padding: 28px 0;
  border-radius: 4px;

  .content {
    display: flex;
    align-items: center;

    .svg-container {
      display: flex;
      align-items: center;
      margin-right: 10px;
    }
  }

  &:hover {
    cursor: pointer;
  }
`;
