import React from 'react';

// import { useTheme } from 'utils/Theme';
import { BottomButtonActionProps } from './BottomButtonAction.props';
import { Container, ButtonContainer } from './BottomButtonAction.style';

const BottomButtonAction = (props: BottomButtonActionProps): JSX.Element => {
  // const theme = useTheme();
  const {
    ActionButtonMain,
    ActionButtonSecondary,
    layout = 'horizontal',
  } = props;
  return (
    <Container>
      <ButtonContainer layout={layout}>
        {ActionButtonSecondary}
        {ActionButtonMain}
      </ButtonContainer>
    </Container>
  );
};

export default React.memo(BottomButtonAction);
