import styled from 'utils/styled';

export const Container = styled.div`
  width: auto;
  min-width: 200px;

  .sup-text {
    color: ${({ theme }) => theme.grey.shade6};
    font-weight: normal;
    font-size: 20px;
    margin-right: 5px;
  }

  .sup-text-2 {
    color: ${({ theme }) => theme.grey.shade6};
    font-weight: normal;
    font-size: 23px;
    margin-right: 5px;
  }
`;
