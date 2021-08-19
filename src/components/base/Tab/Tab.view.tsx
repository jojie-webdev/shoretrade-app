import React from 'react';

import { useTheme } from 'utils/Theme';

import TypographyView from '../Typography';

// import { useTheme } from 'utils/Theme';
import { TabItem, TabProps } from './Tab.props';
import { Container, TabButton } from './Tab.style';

const Tab = (props: TabProps): JSX.Element => {
  const theme = useTheme();
  const { active, items, handleSelect } = props;
  const isSeller = theme.appType === 'seller';
  const defaultColor = isSeller ? 'shade2' : 'shade6';
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
          <TypographyView variant="label" color={defaultColor}>
            {i.title}
          </TypographyView>
        </TabButton>
      ))}
    </Container>
  );
};

export default React.memo(Tab);
