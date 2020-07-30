import styled from 'utils/styled';

export const Container = styled.div``;

export const Field = styled.input`
  width: 100%;
  height: 40px;
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.grey.shade5};
  box-sizing: border-box;
  border-radius: 4px;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: 1px solid ${({ theme }) => theme.grey.shade9};
  margin-top: 4px;
`;
