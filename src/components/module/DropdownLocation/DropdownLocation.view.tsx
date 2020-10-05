import React, { useEffect, useState } from 'react';

import { DropdownArrow, Location } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import Modal from 'components/layout/Modal';
import LocationSearch from 'components/module/LocationSearch';
import { PlaceData } from 'types/PlaceData';
import { useTheme } from 'utils/Theme';

import { DropdownLocationProps } from './DropdownLocation.props';
import {
  Container,
  LeftIconContainer,
  Text,
  Label,
  ErrorContainer,
} from './DropdownLocation.style';

const DropdownLocation = (props: DropdownLocationProps): JSX.Element => {
  const theme = useTheme();
  const [value, setValue] = useState(props.value);
  const [isOpen, setIsOpen] = useState(false);

  const onSelect = (location?: PlaceData) => {
    if (location) {
      setValue(location.address);
      props.onSelect(location);
    }
    setIsOpen(false);
  };

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <>
      <Label variant="overline" color="shade6">
        {props.label}
      </Label>
      <Container
        className={props.className}
        label={props.label}
        isError={!!props.error}
        onClick={() => setIsOpen(!isOpen)}
      >
        <LeftIconContainer>
          <Location />
        </LeftIconContainer>
        <Text>{value}</Text>
        <DropdownArrow />
      </Container>
      {props.error ? (
        <ErrorContainer>
          <Typography variant="caption" color="error">
            {props.error}
          </Typography>
        </ErrorContainer>
      ) : null}

      <Modal
        {...props.modalProps}
        isOpen={isOpen}
        onClickClose={() => setIsOpen(false)}
      >
        <LocationSearch
          onSelect={onSelect}
          initialResult={props.value ? [props.value] : undefined}
          {...props.locationSearchProps}
        />
      </Modal>
    </>
  );
};

export default React.memo(DropdownLocation);
