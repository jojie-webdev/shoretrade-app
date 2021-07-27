import styled from 'utils/styled';
import theme from 'utils/Theme';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px;

  header {
    color: ${theme.grey.shade6};
    font-weight: 900;
    font-size: 9px;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 4px;
  }

  section {
    margin-bottom: 8px;

    div {
      font-size: 16px;
      color: ${theme.grey.shade9};
    }
  }
`;
