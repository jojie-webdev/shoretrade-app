import React, { Dispatch, SetStateAction, useState } from 'react';

import Interactions from 'components/base/Interactions/Interactions.view';
import TextField from 'components/base/TextField';
import Typography from 'components/base/Typography/Typography.view';
import MobileModal from 'components/layout/MobileModal';
import Modal from 'components/layout/Modal';
import Search from 'components/module/Search';
import { BREAKPOINTS } from 'consts/breakpoints';
import CALLING_CODES from 'consts/callingCodes';
import { useField } from 'formik';
import { useMediaQuery } from 'react-responsive';
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

const ResultsView = (
  props: PhoneTextFieldProps & { setIsOpen: Dispatch<SetStateAction<boolean>> }
) => {
  const { setCallingCode, setIsOpen } = props;
  const [search, setSearch] = useState('');

  return (
    <Results>
      <Search
        rounded
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
        placeholder="Search for your Country"
      />

      {CALLING_CODES.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
      ).map((item) => (
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
  );
};

const PhoneTextField = (props: PhoneTextFieldProps): JSX.Element => {
  const { name, callingCode, setCallingCode, ...textFieldProps } = props;
  const [field, meta] = useField<string>(name);
  const [isOpen, setIsOpen] = useState(false);

  const isSmallScreen = useMediaQuery({ query: BREAKPOINTS['sm'] });
  const theme = useTheme();

  const isST = !theme.isSFM;

  const australia = {
    callingCode: isST ? '' : '61',
    flag: isST ? '' : '🇦🇺',
  };
  const initCountry = callingCode
    ? CALLING_CODES.find((cc) => cc.callingCode === callingCode) || australia
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
            {country.callingCode ? `+ ${country.callingCode}` : ''}
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

      {isSmallScreen ? (
        <MobileModal isOpen={isOpen} onClickClose={() => setIsOpen(false)}>
          <ResultsView {...props} setIsOpen={setIsOpen} />
        </MobileModal>
      ) : (
        <Modal isOpen={isOpen} onClickClose={() => setIsOpen(false)}>
          <ResultsView {...props} setIsOpen={setIsOpen} />
        </Modal>
      )}
    </>
  );
};

export default React.memo(PhoneTextField);
