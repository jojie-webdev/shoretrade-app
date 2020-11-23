import React, { useEffect, useState } from 'react';

import Button from 'components/base/Button';
import Typography from 'components/base/Typography/Typography.view';
import Modal from 'components/layout/Modal';

import { AddBoxModalProps, BoxValues } from './AddBoxModal.props';
import { Inputs, ButtonContainer, StyledTextField } from './AddBoxModal.style';

const AddBoxModal = (props: AddBoxModalProps): JSX.Element => {
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
    <Modal
      style={{
        width: 'unset',
        padding: '48px 80px',
      }}
      {...modalProps}
    >
      <>
        <Typography variant="title5" color="shade1">
          Add a Box
        </Typography>
        <Inputs>
          <StyledTextField
            type="number"
            label="Box Weight"
            value={values.weight}
            onChangeText={(v) => {
              setValues({ ...values, weight: v });
            }}
            onKeyDown={(v) =>
              inputFilters.includes(v.key) && v.preventDefault()
            }
            min={0}
            LeftComponent={
              <Typography variant="label" color="shade6">
                {unit}
              </Typography>
            }
          />
          <StyledTextField
            type="number"
            label="Quantity"
            value={values.quantity}
            onChangeText={(v) => {
              setValues({ ...values, quantity: v });
            }}
            min={0}
            onKeyDown={(v) =>
              inputFilters.includes(v.key) && v.preventDefault()
            }
          />
          <StyledTextField
            type="number"
            label="Count per Box"
            value={values.count}
            onChangeText={(v) => {
              setValues({ ...values, count: v });
            }}
            noMargin
            min={0}
            onKeyDown={(v) =>
              inputFilters.includes(v.key) && v.preventDefault()
            }
          />
        </Inputs>
        <ButtonContainer>
          <Button
            variant="primary"
            text="ADD A BOX"
            onClick={() => {
              onAdd(values);
              modalProps.onClickClose();
            }}
          />
        </ButtonContainer>
      </>
    </Modal>
  );
};

export default React.memo(AddBoxModal);
