import styled from 'utils/styled';

export const Container = styled.div`
  width: 100%;
`;

export const Rectangle = styled.div`
  cursor: pointer;
  padding: 20px;
  margin-bottom: 12px;
  background: #ffffff;
  border-radius: 4px;
  box-shadow: 0 6px 12px rgba(41, 43, 50, 0.12);

  .shipping-option-left {
    display: flex;
    align-items: center;
  }

  .shipping-texts {
    margin-left: 24px;
  }
`;

export const Spacer = styled.div`
  margin-bottom: 2px;
`;
