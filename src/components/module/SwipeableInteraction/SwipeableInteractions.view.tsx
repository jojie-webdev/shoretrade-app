import React, { useRef } from 'react';

// import { useTheme } from 'utils/Theme';
import { useSprings } from '@react-spring/core';
import { useDrag } from 'react-use-gesture';

import {
  Container,
  SwipeableWrapper,
  SwipeableInteraction,
  SwipeableContainer,
  ActionsContainer,
  TouchContainer,
} from './SwipeableInteraction.style';
import { SwipeableInteractionsProps } from './SwipeableInteractions.props';

const fn = (active = false, x = 0, originalIndex = 0) => (index: number) =>
  active && index === originalIndex
    ? {
        x: x,
        scale: 1.1,
        zIndex: '1',
        immediate: (n: any) => n === 'x' || n === 'zIndex',
      }
    : { x: 0, scale: 1, zIndex: '0', immediate: false };

const SwipeableInteractions = (
  props: SwipeableInteractionsProps
): JSX.Element => {
  // const theme = useTheme();
  const { data, swipeActionLabel, swipeActionIcon, onSwipeTrigger } = props;
  const itemsRef = useRef(data.map((_, index) => index));

  const [springProps, set] = useSprings(data.length, fn());

  // Set the drag hook and define component movement based on gesture data
  const bind = useDrag(({ args: [id, index], active, movement: [x] }) => {
    set.start(fn(active, x, index));
    const trigger = !active && x > 150;
    if (trigger) {
      onSwipeTrigger(id);
    }
  });
  return (
    <Container>
      {springProps.map(({ x, scale }, i) => (
        <TouchContainer key={i}>
          <SwipeableContainer>
            <SwipeableWrapper {...bind(data[i].id, i)} style={{ x }}>
              <SwipeableInteraction {...data[i]} />
            </SwipeableWrapper>
            <ActionsContainer>
              <div className="action">
                {swipeActionIcon}
                {swipeActionLabel}
              </div>
            </ActionsContainer>
          </SwipeableContainer>
        </TouchContainer>
      ))}
    </Container>
  );
};

export default React.memo(SwipeableInteractions);
