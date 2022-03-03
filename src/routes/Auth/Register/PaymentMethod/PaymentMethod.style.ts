import { Col, Row } from 'react-grid-system';
import styled from 'utils/styled';
import theme from 'utils/Theme';

export const Container = styled.div``;

export const CCImagesRow = styled(Row)`
  margin-top: 24px;
`;

export const CCImageCol = styled(Col)`
  > div {
    box-shadow: 0px 6px 12px rgba(41, 43, 50, 0.12);
    border-radius: 8px;
    display: flex;
    width: 48px;
    justify-content: center;
    background: ${theme.grey.noshade};
  }
`;

export const FormContainer = styled.div`
  margin-top: 25px;
`;

export const FormikRow = styled(Row)`
  margin-top: 16px;
`;
