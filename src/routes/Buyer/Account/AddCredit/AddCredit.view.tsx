import React, { useState } from 'react';

// import { useTheme } from 'utils/Theme';
import Alert from 'components/base/Alert';
import Button from 'components/base/Button';
import SegmentedControls from 'components/base/SegmentedControls';
import FixedWidthContainer from 'components/layout/FixedWidthContainer';
import FormikTextField from 'components/module/FormikTextField';
import InnerRouteHeader from 'components/module/InnerRouteHeader';
import { BUYER_ACCOUNT_ROUTES } from 'consts/routes';
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';

import { AddCreditGeneratedProps } from './AddCredit.props';
import {
  Container,
  Content,
  FormAddCredit,
  Notification,
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
    chargeCardResult,
  } = props;

  const [activeTab, setActiveTab] = useState(TABS.CC);

  const history = useHistory();

  // const theme = useTheme();
  return (
    <Container>
      <InnerRouteHeader title="Add Credit" />

      <Content>
        <SegmentedControls
          options={[TABS.CC, TABS.BANK]}
          selectedOption={activeTab}
          onClickControl={(value) => {
            setActiveTab(value == TABS.BANK ? TABS.BANK : TABS.CC);
          }}
        />

        {chargeCardResult?.error && (
          <Notification>
            <Alert variant="error" content="Cannot add Credit at the moment." />
          </Notification>
        )}

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
            <FixedWidthContainer width={436} className="textfield-container">
              <FormikTextField
                type="text"
                name="amount"
                id="amount"
                label="How much credit would you like to add?"
                placeholder="$10,000.00"
                variant="label"
                color="shade8"
              />
            </FixedWidthContainer>

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
            ) : cards.length ? (
              <Button type="submit" text="Add Credit" loading={isPending} />
            ) : (
              <Button
                type="button"
                text="Add a Card"
                loading={isPending}
                onClick={() => {
                  history.push(`${BUYER_ACCOUNT_ROUTES.CREDIT_CARD}`, {
                    card: {},
                  });
                }}
              />
            )}
          </FormAddCredit>
        </Formik>
      </Content>
    </Container>
  );
};

export default AddCreditView;
