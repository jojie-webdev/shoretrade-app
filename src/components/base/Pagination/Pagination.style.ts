import styled from 'utils/styled';

export const Container = styled.div`
  display: flex;
`;

export const PaginationButton = styled.button<{ active?: boolean }>`
  height: 40px;
  width: 40px;
  background: ${(props) =>
    props.active ? props.theme.brand.primary : props.theme.grey.noshade};
  box-shadow: 0px 6px 12px rgba(41, 43, 50, 0.12);
  border-radius: 4px;
  margin-right: 16px;
  border: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  :focus {
    outline: none;
  }
`;
