import React, { useState } from 'react';

import Interactions from 'components/base/Interactions/Interactions.view';
import TextField from 'components/base/TextField';
import Typography from 'components/base/Typography/Typography.view';
import Modal from 'components/layout/Modal';
import Search from 'components/module/Search';
import CALLING_CODES from 'consts/callingCodes';
import { useField } from 'formik';
import { useTheme } from 'utils/Theme';

import { PhoneTextFieldProps } from './PhoneTextField.props';
import {
  Container,
  Country,
  CountryContainer,
  InteractionsContainer,
  Results,
  Error,
} from './PhoneTextField.style';

const PhoneTextField = (props: PhoneTextFieldProps): JSX.Element => {
  const theme = useTheme();

  const { name, callingCode, setCallingCode, ...textFieldProps } = props;
  const [field, meta] = useField<string>(name);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const australia = { callingCode: '61', flag: '🇦🇺' };
  const initCountry = callingCode
    ? CALLING_CODES.find((cc) => callingCode.includes(cc.callingCode)) ||
      australia
    : australia;

  const country = {
    callingCode: initCountry.callingCode,
    flag: initCountry.flag,
  };

  return (
    <>
      <Container>
        <CountryContainer
          {...textFieldProps}
          onClick={() => !props.readOnly && setIsOpen(true)}
        >
          <Typography variant="overline" color="shade6">
            Country
          </Typography>
          <Country readOnly={textFieldProps.readOnly}>
            +{country.callingCode}
          </Country>
        </CountryContainer>

        <TextField
          {...field}
          {...textFieldProps}
          id={name}
          type="tel"
          style={{ width: '100%' }}
        />
      </Container>
      {meta.touched && (
        <Error variant="caption" color="error">
          {meta.error}
        </Error>
      )}

      <Modal isOpen={isOpen} onClickClose={() => setIsOpen(false)}>
        <Results>
          <Search
            rounded
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            placeholder="Search for your Country"
          />

          {CALLING_CODES.filter((c) => c.name.includes(search)).map((item) => (
            <InteractionsContainer key={item.name}>
              <Interactions
                type="next"
                value={`${item.flag} ${item.name} +${item.callingCode} `}
                onClick={() => {
                  setCallingCode(item.callingCode);
                  setIsOpen(false);
                }}
              />
            </InteractionsContainer>
          ))}
        </Results>
      </Modal>
    </>
  );
};

export default React.memo(PhoneTextField);
