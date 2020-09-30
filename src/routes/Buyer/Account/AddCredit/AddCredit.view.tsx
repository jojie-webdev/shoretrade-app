import React, { useState } from 'react';

// import { useTheme } from 'utils/Theme';
import Button from 'components/base/Button';
import SegmentedControls from 'components/base/SegmentedControls';
import Typography from 'components/base/Typography';
import FormikTextField from 'components/module/FormikTextField';
import InnerRouteHeader from 'components/module/InnerRouteHeader';
import { Formik, Field } from 'formik';
import pathOr from 'ramda/es/pathOr';
import { Col } from 'react-grid-system';

import { AddCreditGeneratedProps } from './AddCredit.props';
import {
  Container,
  Content,
  CreditInput,
  FormAddCredit,
} from './AddCredit.style';
import { validate } from './AddCredit.validation';
import { FieldsetBankAccount } from './FieldsetBankAccount';
import { FieldsetCreditCard } from './FieldsetCreditCard';

enum TABS {
  BANK = 'Bank Transfer',
  CC = 'Credit Card',
}

const AddCreditView = (props: AddCreditGeneratedProps) => {
  // TODO: Use props accordingly
  const {
    cards,
    selectedCardId,
    setSelectedCardId,
    addCredit,
    isPending,
  } = props;

  const [activeTab, setActiveTab] = useState(TABS.BANK);

  // const theme = useTheme();
  return (
    <Container>
      <InnerRouteHeader title="Add Credit" />

      <Content>
        <SegmentedControls
          options={[TABS.BANK, TABS.CC]}
          selectedOption={activeTab}
          onClickControl={(value) => {
            setActiveTab(value == TABS.BANK ? TABS.BANK : TABS.CC);
          }}
        />

        <Formik
          initialValues={{
            amount: '',
          }}
          onSubmit={(values) => {
            addCredit(`${values.amount}`);
          }}
          validate={validate}
          enableReinitialize
        >
          <FormAddCredit>
            <Col
              md={activeTab == TABS.BANK ? 6 : 12}
              className="textfield-container"
            >
              <FormikTextField
                type="text"
                name="amount"
                id="amount"
                label="How much credit would you like to add?"
                placeholder="$10,000.00"
                variant="label"
                color="shade8"
              />
            </Col>

            {activeTab == TABS.BANK && <FieldsetBankAccount />}

            {activeTab == TABS.CC && (
              <FieldsetCreditCard
                cards={cards}
                selectedCardId={selectedCardId}
                setSelectedCardId={setSelectedCardId}
              />
            )}

            {activeTab == TABS.BANK ? (
              <Button type="submit" text="Download Invoice" disabled />
            ) : (
              <Button type="submit" text="SAVE" loading={isPending} />
            )}
          </FormAddCredit>
        </Formik>
      </Content>
    </Container>
  );
};

export default AddCreditView;
