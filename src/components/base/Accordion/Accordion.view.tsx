import React, { useState } from 'react';

import Interactions from 'components/base/Interactions';

import { AccordionProps } from './Accordion.props';
import { Container, Content } from './Accordion.style';

const Accordion = ({
  title,
  iconColor,
  ...props
}: AccordionProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(props.isOpen);
  return (
    <Container withBackground={props.withBackground} isOpen={isOpen}>
      <Interactions
        pressed={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        value={title}
        type="accordion"
        iconColor={iconColor}
      />
      <Content isOpen={isOpen} withBackground={props.withBackground}>
        {props.withBackground && <div className="border" />}
        {props.children}
      </Content>
    </Container>
  );
};

export default React.memo(Accordion);
