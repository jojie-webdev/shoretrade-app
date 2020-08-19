import React, { useState } from 'react';

import Interactions from 'components/base/Interactions/Interactions.view';
import TextField from 'components/base/TextField';
import Modal from 'components/layout/Modal';
import CALLING_CODES from 'consts/callingCodes';
import { useTheme } from 'utils/Theme';

import { PhoneTextFieldProps } from './PhoneTextField.props';
import {
  LeftComponent,
  Flag,
  InteractionsContainer,
  Results,
} from './PhoneTextField.style';

const PhoneTextField = ({
  callingCode,
  setCallingCode,
  ...props
}: PhoneTextFieldProps): JSX.Element => {
  const theme = useTheme();
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

  const [value, setValue] = useState(country);

  return (
    <>
      <TextField
        type="tel"
        prefix={`+${value.callingCode}`}
        LeftComponent={
          <LeftComponent onClick={() => setIsOpen(true)}>
            <Flag>{value.flag}</Flag>
          </LeftComponent>
        }
        {...props}
      />

      <Modal isOpen={isOpen} onClickClose={() => setIsOpen(false)}>
        <Results>
          {CALLING_CODES.map((item) => (
            <InteractionsContainer key={item.name}>
              <Interactions
                type="next"
                value={`${item.flag} ${item.name} +${item.callingCode} `}
                onClick={() => {
                  setValue({
                    callingCode: `${item.callingCode}`,
                    flag: item.flag,
                  });

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
