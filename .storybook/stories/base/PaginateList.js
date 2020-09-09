import React from 'react';

import { storiesOf } from '@storybook/react';

import PaginateList from '../../../src/components/base/PaginateList';
import Container from '../../components/Container';

storiesOf('base/PaginateList', module).add('Summary', () => {
  const list = [
    { name: 'Adan' },
    { name: 'Bentoy' },
    { name: 'Chico' },
    { name: 'Dabid' },
    { name: 'Emman' },
    { name: 'Ferdinando' },
    { name: 'Guillermo' },
    { name: 'Horhe' },
    { name: 'Imelda' },
    { name: 'Jaime' },
  ];
  return (
    <Container>
      <PaginateList list={list} labelPath={['name']} maxItemPerPage={4} onClickItem={(item)=>console.log({item})}/>
    </Container>
  );
});
