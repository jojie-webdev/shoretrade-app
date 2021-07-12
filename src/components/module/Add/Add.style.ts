import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const Container = styled.div<{ error: boolean }>`
  min-height: 64px;
  max-height: 88px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.grey.shade9};
  border: 1px dashed
    ${(props) =>
      props.error ? props.theme.brand.error : props.theme.grey.shade6};

  @media ${BREAKPOINTS['sm']} {
    border: unset;
    max-height: 64px;
  }

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
