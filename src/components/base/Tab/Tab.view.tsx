import React from 'react';

// import { useTheme } from 'utils/Theme';
import { TabItem, TabProps } from './Tab.props';
import { Container, TabButton } from './Tab.style';

const Tab = (props: TabProps): JSX.Element => {
  // const theme = useTheme();
  const { active, items, handleSelect } = props;
  const onSelect = (i: number) => {
    handleSelect(i);
  };

  return (
    <Container>
      {items.map((i: TabItem) => (
        <TabButton
          key={i.key}
          className={active === i.key ? 'active' : ''}
          onClick={() => handleSelect(i.key)}
        >
          {i.title}
        </TabButton>
      ))}
    </Container>
  );
};

export default React.memo(Tab);
