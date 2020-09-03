import styled from 'utils/styled';

export const InputContainer = styled.div`
  background: #ffffff;
  border: ${(props) => `1px solid ${props.theme.grey.shade5}`};
  box-sizing: border-box;
  border-radius: 100px;
  width: 100%;
  padding: 10px 15px;
  margin-bottom: 16px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  .close-svg-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  
  input {
    flex: 1;
    border: 0;
    margin: 0 10px;
    height: 100%;

    :focus {
      outline: none;
      border: none;
    }

    ::placeholder {
      color: ${(props) => props.theme.grey.shade5}};
    }

    
  }
`;
