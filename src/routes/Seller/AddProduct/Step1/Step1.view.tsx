import React, { useState, useEffect } from 'react';

import Button from 'components/base/Button';
import Select from 'components/base/Select';
import TextField from 'components/base/TextField';
import pathOr from 'ramda/es/pathOr';

import { Step1Props } from './Step1.props';
import { Container } from './Step1.style';

const Step1 = ({ onSelectAccount, accountOptions }: Step1Props) => {
  const [selected, setSelected] = useState('');
  useEffect(() => {
    if (selected === '') {
      setSelected(pathOr('', ['0', 'value'], accountOptions));
    }
  }, [accountOptions]);
  return (
    <Container>
      <Select
        value={selected}
        onChange={(option) => {
          setSelected(option.value);
        }}
        options={accountOptions}
        label="Choose Account"
      />
      <div className="btn-container">
        <Button
          text="Add a new product"
          onClick={() => {
            onSelectAccount(selected);
          }}
        />
      </div>
    </Container>
  );
};

export default Step1;
