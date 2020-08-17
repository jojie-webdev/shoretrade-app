import React, { useState } from 'react';

import Interactions from 'components/base/Interactions';

import { AccordionProps } from './Accordion.props';
import { Container, Content } from './Accordion.style';

const Accordion = ({ title, ...props }: AccordionProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(props.isOpen);

  return (
    <Container>
      <Interactions
        pressed={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        value={title}
        type="accordion"
      />
      <Content isOpen={isOpen}>{props.children}</Content>
    </Container>
  );
};

export default React.memo(Accordion);