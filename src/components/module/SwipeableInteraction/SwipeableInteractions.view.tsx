import React from 'react';

// import { useTheme } from 'utils/Theme';
import { SwipeableInteractionsProps } from './SwipeableInteractions.props';
import { Container, SwipeableWrapper, SwipeableInteraction, SwipeableContainer, ActionsContainer } from './SwipeableInteraction.style';
import { useSpring } from '@react-spring/core';
import { useDrag } from 'react-use-gesture';

const SwipeableInteractions = (props: SwipeableInteractionsProps): JSX.Element => {
  // const theme = useTheme();
  const { data, swipeActionLabel, swipeActionIcon, onSwipeTrigger } = props;

  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));

  // Set the drag hook and define component movement based on gesture data
  const bind = useDrag(({ down, movement: [mx] }) => {
    api.start({ x: down && mx > 0 ? mx : 0 });
    const trigger = !down && mx > 150;
    if (trigger) {
      console.log("triggered");
      onSwipeTrigger();
    }
  });
  return (
    <Container>
      {data.map((item) => (
        <SwipeableContainer>
          <SwipeableWrapper { ...bind() } style={{ x }}>
            <SwipeableInteraction {...item} />
          </SwipeableWrapper>
          <ActionsContainer>
              <div className="action">
                {swipeActionIcon}
                {swipeActionLabel}
              </div>
            </ActionsContainer>
        </SwipeableContainer>
      ))}
    </Container>
  );
};

export default React.memo(SwipeableInteractions);
