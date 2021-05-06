import React, { useEffect, useState } from 'react';

import Button from 'components/base/Button';
import { P } from 'components/base/Typography/Typography.style';
import Typography from 'components/base/Typography/Typography.view';
import MobileModal from 'components/layout/MobileModal';
import Modal from 'components/layout/Modal';
import { BREAKPOINTS } from 'consts/breakpoints';
import { useMediaQuery } from 'react-responsive';

import { AddBoxModalProps, BoxValues } from './AddBoxModal.props';
import { Inputs, ButtonContainer, StyledTextField } from './AddBoxModal.style';

const Content = (props: AddBoxModalProps) => {
  const { onAdd, unit = 'kg', ...modalProps } = props;
  const [values, setValues] = useState<BoxValues>({
    weight: '',
    quantity: '',
    count: '',
  });

  useEffect(() => {
    const isWhole = (v: string) => Number.isInteger(Number(v));

    if (!isWhole(values.quantity)) setValues({ ...values, quantity: '' });
    if (!isWhole(values.count)) setValues({ ...values, count: '' });
  }, [values.quantity, values.count]);

  const inputFilters = ['e', 'E', '+', '-'];

  return (
    <>
      <Typography variant="title5" color="shade1">
        Add Box
      </Typography>
      <Inputs>
        <StyledTextField
          type="number"
          label={`${unit} per box`}
          value={values.weight}
          onChangeText={(v) => {
            setValues({ ...values, weight: v });
          }}
          onKeyDown={(v) => inputFilters.includes(v.key) && v.preventDefault()}
          min={0}
          LeftComponent={
            <Typography variant="label" color="shade6">
              {unit}
            </Typography>
          }
        />
        <StyledTextField
          type="number"
          label="Number of Boxes"
          value={values.quantity}
          onChangeText={(v) => {
            setValues({ ...values, quantity: v });
          }}
          min={0}
          onKeyDown={(v) => inputFilters.includes(v.key) && v.preventDefault()}
        />
        <StyledTextField
          type="number"
          readOnly={unit === 'portions'}
          label="Count per Box (Optional)"
          value={values.count}
          onChangeText={(v) => {
            setValues({ ...values, count: v });
          }}
          noMargin
          min={0}
          onKeyDown={(v) => inputFilters.includes(v.key) && v.preventDefault()}
        />
      </Inputs>
      <ButtonContainer>
        <Button
          className="btn-add "
          variant="primary"
          text="ADD BOX"
          onClick={() => {
            onAdd(values);
            modalProps.onClickClose();
          }}
        />
      </ButtonContainer>
    </>
  );
};

const AddBoxModal = (props: AddBoxModalProps): JSX.Element => {
  const isSmallScreen = useMediaQuery({ query: BREAKPOINTS['sm'] });
  const { onAdd, unit = 'kg', ...modalProps } = props;

  return isSmallScreen ? (
    <MobileModal
      style={{
        width: 'unset',
        padding: isSmallScreen ? '48px 16px' : '48px',
      }}
      {...modalProps}
    >
      <Content {...props} {...modalProps} />
    </MobileModal>
  ) : (
    <Modal
      style={{
        width: 'unset',
        padding: isSmallScreen ? '48px 16px' : '48px',
      }}
      {...modalProps}
    >
      <Content {...props} {...modalProps} />
    </Modal>
  );
};

export default React.memo(AddBoxModal);
