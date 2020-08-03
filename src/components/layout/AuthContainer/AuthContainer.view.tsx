import React from 'react';

// import { useTheme } from 'utils/Theme';
import { AuthContainerProps } from './AuthContainer.props';
import {
  Container,
  Background,
  Content,
  Grid,
  Row,
} from './AuthContainer.style';

const AuthContainerView = (props: AuthContainerProps): JSX.Element => {
  // const theme = useTheme();
  const { children } = props;
  return (
    <Container>
      <Background />
      <Grid>
        <Row justify="center" align="center">
          <Content sm={4}>{children}</Content>
        </Row>
      </Grid>
    </Container>
  );
};

export default React.memo(AuthContainerView);
