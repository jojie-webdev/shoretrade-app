import React, { useState } from 'react';

import Alert from 'components/base/Alert';
import Breadcrumbs from 'components/base/Breadcrumbs/Breadcrumbs.view';
import Button from 'components/base/Button';
import SegmentedControls from 'components/base/SegmentedControls';
import { DollarSign } from 'components/base/SVG';
import { BoxContainer } from 'components/layout/BoxContainer';
import FormikTextField from 'components/module/FormikTextField';
import { BUYER_ACCOUNT_ROUTES } from 'consts/routes';
import { Formik } from 'formik';
import { Col, Row } from 'react-grid-system';
import { useHistory } from 'react-router-dom';
import { useTheme } from 'utils/Theme';

import { AddCreditGeneratedProps } from './AddCredit.props';
import { Container, FormAddCredit, Notification } from './AddCredit.style';
import { validate } from './AddCredit.validation';
import { FieldsetBankAccount } from './FieldsetBankAccount';
import { FieldsetCreditCard } from './FieldsetCreditCard';

enum TABS {
  BANK = 'Bank Transfer',
  CC = 'Credit Card',
}

const AddCreditView = (props: AddCreditGeneratedProps) => {
  const {
    cards,
    selectedCardId,
    setSelectedCardId,
    addCredit,
    isPending,
    chargeCardResult,
    downloadInvoice,
  } = props;

  const [activeTab, setActiveTab] = useState(TABS.CC);

  const history = useHistory();

  const theme = useTheme();
  return (
    <Container>
      <BoxContainer>
        <div className="breadcrumb-container">
          <Breadcrumbs
            sections={[
              { label: 'Account', link: BUYER_ACCOUNT_ROUTES.LANDING },
              {
                label: 'Balance & Payments',
                link: BUYER_ACCOUNT_ROUTES.BANK_DETAILS,
              },
              { label: 'Add Credit' },
            ]}
          />
        </div>

        <div>
          <SegmentedControls
            options={[TABS.CC, TABS.BANK]}
            selectedOption={activeTab}
            onClickControl={(value) => {
              setActiveTab(value == TABS.BANK ? TABS.BANK : TABS.CC);
            }}
          />

          {chargeCardResult?.error && (
            <Notification>
              <Alert
                variant="error"
                content="Cannot add Credit at the moment."
              />
            </Notification>
          )}

          <Formik
            initialValues={{
              amount: '',
            }}
            onSubmit={(values) => {
              if (activeTab == TABS.BANK) {
                downloadInvoice(`${values.amount}`);
              } else {
                addCredit(`${values.amount}`);
              }
            }}
            validate={validate}
            enableReinitialize
          >
            <FormAddCredit>
              <Row>
                <Col md={12} xl={6} className="form-spacer">
                  <FormikTextField
                    type="text"
                    name="amount"
                    id="amount"
                    label="How much credit would you like to add?"
                    placeholder="$10,000.00"
                    LeftComponent={<DollarSign fill={theme.grey.shade6} />}
                  />
                </Col>
              </Row>

              {activeTab == TABS.BANK && <FieldsetBankAccount />}

              {activeTab == TABS.CC && (
                <FieldsetCreditCard
                  cards={cards}
                  selectedCardId={selectedCardId}
                  setSelectedCardId={setSelectedCardId}
                />
              )}

              {activeTab == TABS.BANK ? (
                <Button type="submit" text="Download Invoice" />
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
        </div>
      </BoxContainer>
    </Container>
  );
};

export default AddCreditView;
