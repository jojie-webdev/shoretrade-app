import React, { useState, useEffect } from 'react';

import Interactions from 'components/base/Interactions/Interactions.view';
import TextField from 'components/base/TextField';
import Modal from 'components/layout/Modal';
import CALLING_CODES from 'consts/callingCodes';
import { useField } from 'formik';
import { useTheme } from 'utils/Theme';

import { PhoneTextFieldProps } from './PhoneTextField.props';
import {
  LeftComponent,
  Flag,
  InteractionsContainer,
  Results,
} from './PhoneTextField.style';

const PhoneTextField = (props: PhoneTextFieldProps): JSX.Element => {
  const theme = useTheme();

  const { name, callingCode, setCallingCode, ...textFieldProps } = props;
  const [field, meta] = useField<string>(name);
  const [isOpen, setIsOpen] = useState(false);

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
      <TextField
        {...field}
        {...textFieldProps}
        id={name}
        error={meta.touched ? meta.error : undefined}
        type="tel"
        prefix={`+${country.callingCode}`}
        LeftComponent={
          <LeftComponent onClick={() => setIsOpen(true)}>
            <Flag>{country.flag}</Flag>
          </LeftComponent>
        }
      />

      <Modal isOpen={isOpen} onClickClose={() => setIsOpen(false)}>
        <Results>
          {CALLING_CODES.map((item) => (
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
