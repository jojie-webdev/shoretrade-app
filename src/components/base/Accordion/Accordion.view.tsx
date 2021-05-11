import React, { useState } from 'react';

import Interactions from 'components/base/Interactions';

import { AccordionProps } from './Accordion.props';
import { Container, Content } from './Accordion.style';

const Accordion = ({
  title,
  iconColor,
  noBg,
  padding,
  marginBottom = '0px',
  innerContentPadding,
  rightComponent,
  background,
  leftComponent,
  keepIcon,
  border,
  ...props
}: AccordionProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(props.isOpen);

  return (
    <Container
      withBackground={props.withBackground}
      isOpen={isOpen}
      marginBottom={marginBottom}
      background={background}
      border={border}
    >
      <Interactions
        pressed={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        value={title}
        type="accordion"
        iconColor={iconColor}
        noBg={noBg}
        padding={padding}
        leftComponent={leftComponent}
        rightComponent={rightComponent}
        keepIcon={keepIcon}
      />
      <Content
        className="accordion-content-wrapper"
        isOpen={isOpen}
        withBackground={props.withBackground}
        padding={padding}
      >
        {props.withBackground && <div className="border" />}
        {props.children}
      </Content>
    </Container>
  );
};

export default React.memo(Accordion);
