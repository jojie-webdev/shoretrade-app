import styled from 'utils/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 156px;
  height: 156px;
  background-color: ${({ theme }) => theme.grey.shade1};
  border-radius: 4px;
  box-shadow: 0px 6px 12px rgba(41, 43, 50, 0.12);
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 14px;
`;

export const CheckBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 16px;
  padding-bottom: 10px;
`;
