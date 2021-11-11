import React, { useState } from 'react';

import Interactions from 'components/base/Interactions';

import { AccordionProps } from './Accordion.props';
import { Container, Content, StyledInteractions } from './Accordion.style';

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
  sameWidth,
  border,
  bottomComponent,
  headerBorder,
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
      <StyledInteractions
        pressed={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        value={title}
        type="accordion"
        iconColor={iconColor}
        noBg={noBg}
        padding={padding}
        leftComponent={leftComponent}
        rightComponent={rightComponent}
        bottomComponent={bottomComponent}
        keepIcon={keepIcon}
        sameWidth={sameWidth}
        isOpen={isOpen}
        border={headerBorder}
      />
      <Content
        className="accordion-content-wrapper"
        isOpen={isOpen}
        withBackground={props.withBackground}
        padding={innerContentPadding}
        sameWidth={sameWidth}
      >
        {props.withBackground && <div className="border" />}
        {props.children}
      </Content>
    </Container>
  );
};

export default React.memo(Accordion);
