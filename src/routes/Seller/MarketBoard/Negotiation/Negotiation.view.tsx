import React from 'react';

import Breadcrumbs from 'components/base/Breadcrumbs';
import Button from 'components/base/Button';
import { Check, CheckFilled, Close } from 'components/base/SVG';
import Refresh from 'components/base/SVG/Refresh';
import Typography from 'components/base/Typography';
import AcceptSellerModal from 'components/module/AcceptSellerModal';
import ConfirmationModal from 'components/module/ConfirmationModal';
import DeclineSellerModal from 'components/module/DeclineSellerModal';
import NegotiateSellerModal from 'components/module/NegotiateSellerModal';
import NegotiationSellerModal from 'components/module/NegotiationSellerModal';
import SellerNegotiationAlert from 'components/module/SellerNegotiationAlert';
import { SELLER_MARKET_BOARD_ROUTES, SELLER_ROUTES } from 'consts/routes';
import { Col } from 'react-grid-system';
import { useHistory } from 'react-router-dom';
import { GetActiveOffersRequestResponseItem } from 'types/store/GetActiveOffersState';
import { sizeToString } from 'utils/Listing';
import { formatUnitToPricePerUnit } from 'utils/Listing/formatMeasurementUnit';
import { toPrice } from 'utils/String';
import { useTheme } from 'utils/Theme';

import { AlertProps, NegotiationProps } from './Negotiation.props';
import {
  Container,
  CTAContainer,
  DetailsContainer,
  DetailsValueContainer,
  Line,
  NewNegoTypeWrapper,
  StyledAcceptButton,
  StyledTypography,
  DeclineAndNegoBtnContainer,
  NegoBtnWrapper,
  DeclineBtnWrapper,
  DeclineAndNegoBtnContainerMobile,
  AcceptBtnCol,
  AcceptBtnContainer,
  AcceptBtnContainerMobile,
} from './Negotiation.style';

const NegotiationView = (props: NegotiationProps) => {
  const {
    negotiation,
    handleAcceptBtnClick,
    showAcceptModal,
    handleNegotiationCloseBtnClick,
    showNegotiationModal,
    handleNegotiationConfirmClick,
    handleAcceptModalAcceptBtnClick,
    handleDeclineClick,
    showDeclineModal,
    handleDeclineModalCancelBtnClick,
    handleDeclineModalConfirmBtnClick,
    isAcceptNegotiationPending,
    isDeclineNegotiationPending,
    showDeclinedNegoModal,
    handleDeclinedNegoModalClose,
    showSuccessfulNegoModal,
    handleSuccessfulNegoModalClose,
    showNegotiationAcceptedModal,
    handleNegotiationAcceptedModalClose,
    listing,
    listingBoxes,
    acceptNegotiationError,
    handleRadioClick,
    selectedGroupedBoxIndex,
  } = props;

  const history = useHistory();
  const theme = useTheme();

  const sizeValue = sizeToString(
    negotiation?.metric || negotiation?.active_size_unit || '',
    negotiation?.size_from,
    negotiation?.size_to
  );

  const quantityValue =
    negotiation?.desired_quantity + ' ' + negotiation?.measurement_unit;

  const pricePerUnit = `${toPrice(
    negotiation?.counter_offer || '0.00'
  )}/${formatUnitToPricePerUnit(negotiation?.measurement_unit)}`;

  const priceDiff = negotiation
    ? Number(negotiation?.counter_offer) - Number(negotiation?.price_per_kilo)
    : 0;
  const priceDiff2 = priceDiff / Math.abs(Number(negotiation?.price_per_kilo));
  const priceDiffPercentage = !negotiation?.counter_offer
    ? 0
    : priceDiff2 < 0
    ? -(Math.abs(priceDiff2) * 100)
    : priceDiff2 * 100;

  const renderLabel = (label: string) => (
    <Typography
      variant="overline"
      color="shade6"
      weight="700"
      style={{ fontFamily: 'Basis Grotesque Pro ' }}
    >
      {label}
    </Typography>
  );

  const renderLabelValue = (value: string | undefined) => (
    <>
      <DetailsValueContainer>
        <StyledTypography weight="700" variant="label">
          {value}
        </StyledTypography>
      </DetailsValueContainer>
    </>
  );

  const getAlertProps = (): AlertProps => {
    switch (negotiation?.display_status?.toLowerCase() || '') {
      case '':
        if (negotiation?.status === 'END') {
          return {
            title: 'Negotiation Finalised',
            alertColor: 'success',
            description: (
              <Typography variant="body" color="shade6" weight="400">
                The Negotiation is now Order #0000-XXXX and can be found in your
                sold tab{' '}
                <span
                  style={{
                    color: theme.brand.primary,
                    textDecoration: 'underline',
                  }}
                  // onClick={() => history.push(SOLD_)}
                >
                  here
                </span>
                .
              </Typography>
            ),
          };
        } else {
          return {
            title: '',
            alertColor: 'primary',
            description: <></>,
          };
        }
      case 'finalised':
        return {
          title: 'Negotiation Finalised',
          alertColor: 'success',
          description: (
            <Typography variant="body" color="shade6" weight="400">
              The new order can be found in your sold tab{' '}
              <span
                style={{
                  color: theme.brand.primary,
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
                onClick={() => history.push(SELLER_ROUTES.SOLD)}
              >
                here
              </span>
              .
            </Typography>
          ),
        };

      case 'closed':
        return {
          title: 'New Negotiation',
          alertColor: 'alert',
          description: (
            <Typography variant="body" color="shade6" weight="400">
              A buyer has sent you a negotiation for{' '}
              <NewNegoTypeWrapper>{negotiation?.name}</NewNegoTypeWrapper>
            </Typography>
          ),
        };

      case 'new negotiation':
        return {
          title: 'New Negotiation',
          alertColor: 'alert',
          description: (
            <Typography variant="body" color="shade6" weight="400">
              A buyer has sent you a negotiation for{' '}
              <NewNegoTypeWrapper>{negotiation?.name}</NewNegoTypeWrapper>
            </Typography>
          ),
        };

      case 'awaiting buyer':
        return {
          title: 'Awaiting Buyer',
          alertColor: 'alert',
          description: (
            <Typography variant="body" color="shade6" weight="400">
              The buyer will respond to your offer soon.
            </Typography>
          ),
        };

      case 'awaiting payment':
        return {
          title: 'Negotiation Accepted-Pending Payment',
          alertColor: 'primary',
          description: (
            <Typography variant="body" color="shade6" weight="400">
              The sale will be finalised once the Buyer processes your payment
              within 24 hours. You will be notified when this occurs.
            </Typography>
          ),
        };

      // case 'lost':
      //   return {
      //     title: 'New Negotiation',
      //     alertColor: 'noshade',
      //     description: (
      //      Buyer has sent you a negotiation for ${productTypeName}`,
      //   };

      case 'declined':
        return {
          title: 'Negotiation Declined',
          alertColor: 'error',
          description: (
            <Typography variant="body" color="shade6" weight="400">
              The Buyer declined your counter-offer for{' '}
              <NewNegoTypeWrapper>{negotiation?.name}</NewNegoTypeWrapper>
            </Typography>
          ),
        };

      default:
        return {
          title: '',
          alertColor: 'primary',
          description: <></>,
        };
    }
  };

  return (
    <Container>
      <AcceptSellerModal
        show={showAcceptModal}
        onCloseClick={handleAcceptBtnClick}
        isAccepting={isAcceptNegotiationPending}
        onAcceptBtnClick={() => {
          handleAcceptModalAcceptBtnClick();
        }}
        quantity={`${
          negotiation?.desired_quantity || 0
        } ${negotiation?.measurement_unit.toLowerCase()}`}
        buyersNegoPrice={pricePerUnit}
        percentageChangeInPrice={
          priceDiffPercentage
            ? `${new Intl.NumberFormat('en-US', {
                signDisplay: 'exceptZero',
              })
                .format(Number(priceDiffPercentage.toFixed(2)))
                .toString()}
              %`
            : '0.00%'
        }
        isGoodNego={
          negotiation
            ? Number(negotiation?.price_per_kilo) >
              Number(negotiation?.desired_quantity)
            : false
        }
        negoDiff={
          negotiation
            ? `${toPrice(
                Math.abs(
                  Number(negotiation?.price_per_kilo) -
                    Number(negotiation?.counter_offer)
                )
              )}/${negotiation?.measurement_unit}`
            : ''
        }
        totalValue={
          negotiation
            ? toPrice(
                negotiation?.desired_quantity *
                  Number(negotiation?.counter_offer)
              )
            : '0.00'
        }
        listingBoxes={listingBoxes}
        negoMeasurementUnit={negotiation?.measurement_unit || ''}
        acceptNegotiationError={acceptNegotiationError}
        handleRadioClick={handleRadioClick}
        selectedGroupedBoxIndex={selectedGroupedBoxIndex}
        negotiation={negotiation}
        pricePerUnit={pricePerUnit}
      />

      <NegotiationSellerModal
        negotiation={negotiation}
        isOpen={showNegotiationModal}
        onClickClose={handleNegotiationCloseBtnClick}
        isNegotiating={false}
        // onSubmit={(counterOffer) => {
        //   props.onNegotiateOffer(activeOffer.id, counterOffer);
        //   setIsOpen(false);
        // }}
        onSubmit={handleNegotiationConfirmClick}
      />

      <div id="decline_seller_modal__container">
        <DeclineSellerModal
          show={showDeclineModal}
          onCancelBtnClick={handleDeclineModalCancelBtnClick}
          onConfirmBtnClick={handleDeclineModalConfirmBtnClick}
          disableConfirmBtn={isDeclineNegotiationPending}
        />
      </div>

      <div id="negotiation_accepted_modal__container">
        <ConfirmationModal
          isOpen={showNegotiationAcceptedModal}
          onClickClose={handleNegotiationAcceptedModalClose}
          title={
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography
                variant="title4"
                color="noshade"
                weight="900"
                style={{ fontFamily: 'Canela' }}
              >
                Negotiation Accepted
              </Typography>
              <div style={{ marginLeft: 20 }} />
              <CheckFilled width={30} height={30} fill={theme.brand.success} />
            </div>
          }
          action={() => {
            console.log('');
          }}
          actionText={
            <Typography
              color="noshade"
              weight="700"
              style={{ fontFamily: 'Basis Grotesque Pro' }}
            >
              Pay Now
            </Typography>
          }
          hideCancel
          hideAction
          disableActionText={isAcceptNegotiationPending}
          description={
            <Typography color="shade6" variant="label">
              You will be notified once the buyer processes the payment.
            </Typography>
          }
        />
      </div>

      <div id="negotiation_success_modal__container">
        <ConfirmationModal
          isOpen={showSuccessfulNegoModal}
          onClickClose={handleSuccessfulNegoModalClose}
          action={() => console.log('')}
          title={
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography
                variant="title4"
                color="noshade"
                weight="900"
                style={{ fontFamily: 'Canela' }}
              >
                Negotiation Successfully Sent
              </Typography>
              <div style={{ marginLeft: 20 }} />
              <CheckFilled width={30} height={30} fill={theme.brand.success} />
            </div>
          }
          hideCancel
          hideAction
          disableActionText={isAcceptNegotiationPending}
          description={
            <Typography color="shade6" variant="label">
              You will be notified when the Buyer responds.
            </Typography>
          }
        />
      </div>

      <div id="negotiation_declined_modal__container">
        <ConfirmationModal
          isOpen={showDeclinedNegoModal}
          onClickClose={handleDeclinedNegoModalClose}
          action={() => {
            console.log('');
          }}
          title={
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography
                variant="title4"
                color="noshade"
                weight="900"
                style={{ fontFamily: 'Canela' }}
              >
                Negotiation Declined
              </Typography>
              <div style={{ marginLeft: 20 }} />
              <CheckFilled width={30} height={30} fill={theme.brand.success} />
            </div>
          }
          hideCancel
          hideAction
          disableActionText={isAcceptNegotiationPending}
          description={
            <Typography color="shade6" variant="label">
              The negotiation will be removed from your Negotiation tab shortly.
            </Typography>
          }
        />
      </div>

      <Breadcrumbs
        sections={[
          {
            label: 'All Negotiations',
            onClick: () => history.push(SELLER_MARKET_BOARD_ROUTES.LANDING),
          },
          {
            label: 'Negotiation Details',
          },
        ]}
      />

      <div style={{ marginTop: 24 }} />
      <Typography
        variant="title4"
        weight="700"
        color="noshade"
        style={{ fontFamily: 'Canela' }}
      >
        {negotiation?.name}
      </Typography>

      <div style={{ marginTop: 12 }} />
      <Typography
        color="shade6"
        weight="700"
        style={{ fontFamily: 'Basis Grotesque Pro' }}
      >
        The customer has detailed the specifications they want for this
        negotiation.
      </Typography>

      <div style={{ marginTop: 24 }} />
      {negotiation && (
        <SellerNegotiationAlert
          content={getAlertProps().description}
          header={getAlertProps().title}
          variant={getAlertProps().alertColor}
          status={negotiation?.display_status?.toLowerCase() || ''}
          fullWidth
        />
      )}

      {/*
      <Alert
        content={
          <div style={{ display: 'flex' }}>
            <Typography variant="body" color="shade6" weight="400">
              infoAlert
            </Typography>
            <Typography
              variant="body"
              color="secondary"
              weight="400"
              style={{ marginLeft: 5 }}
            >
              {negotiation?.name}
            </Typography>
          </div>
        }
        header={negotiation?.display_status}
        variant="infoAlert"
        color="blue"
        fullWidth
      />
      <Alert
        content={
          <div style={{ display: 'flex' }}>
            <Typography variant="body" color="shade6" weight="400">
              alert
            </Typography>
            <Typography
              variant="body"
              color="alert"
              weight="400"
              style={{ marginLeft: 5 }}
            >
              {negotiation?.name}
            </Typography>
          </div>
        }
        header={negotiation?.display_status}
        variant="alert"
        color="blue"
        fullWidth
      />
      <Alert
        content={
          <div style={{ display: 'flex' }}>
            <Typography variant="body" color="shade6" weight="400">
              warning
            </Typography>
            <Typography
              variant="body"
              color="warning"
              weight="400"
              style={{ marginLeft: 5 }}
            >
              {negotiation?.name}
            </Typography>
          </div>
        }
        header={negotiation?.display_status}
        variant="warning"
        color="blue"
        fullWidth
      />
      <Alert
        content={
          <div style={{ display: 'flex' }}>
            <Typography variant="body" color="shade6" weight="400">
              error
            </Typography>
            <Typography
              variant="body"
              color="warning"
              weight="400"
              style={{ marginLeft: 5 }}
            >
              {negotiation?.name}
            </Typography>
          </div>
        }
        header={negotiation?.display_status}
        variant="error"
        color="blue"
        fullWidth
      /> */}

      <DetailsContainer>
        {renderLabel('SPECIFICATION')}
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {negotiation?.specifications.map((spec) => (
            <div key={spec.id} style={{ marginRight: 8 }}>
              {renderLabelValue(spec.name)}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 24 }} />
        {renderLabel('SIZE')}
        {renderLabelValue(sizeValue)}

        <div style={{ marginTop: 24 }} />
        {renderLabel('QUANTITY')}
        {renderLabelValue(quantityValue.toLowerCase())}

        <Line />

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            weight="700"
            color="noshade"
            style={{ fontFamily: 'Basis Grotesque Pro' }}
          >
            Buyer&apos;s Counter Offer
          </Typography>
          <Typography
            weight="700"
            color="noshade"
            style={{ fontFamily: 'Basis Grotesque Pro' }}
          >
            {pricePerUnit}
          </Typography>
        </div>

        <div style={{ marginTop: 8 }} />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            weight="700"
            color="noshade"
            style={{ fontFamily: 'Basis Grotesque Pro' }}
          >
            Total Value
          </Typography>
          <Typography
            weight="700"
            color="noshade"
            style={{ fontFamily: 'Basis Grotesque Pro' }}
          >
            {toPrice(
              Number(negotiation?.desired_quantity || '0.00') *
                Number(negotiation?.counter_offer || '0.00')
            )}
          </Typography>
        </div>

        {negotiation?.status !== 'ACCEPTED' &&
          negotiation?.status !== 'PARTIAL' &&
          negotiation?.status !== 'DECLINED' &&
          negotiation?.status !== 'END' &&
          negotiation?.status !== 'CLOSED' && (
            <CTAContainer>
              <Col style={{ padding: 0, marginTop: 10 }}>
                <DeclineAndNegoBtnContainer>
                  <DeclineBtnWrapper
                    onClick={handleDeclineClick}
                    variant="outline"
                    text={
                      <Typography color="primary" style={{ marginRight: 5 }}>
                        {!!negotiation?.negotiation_offer ? 'Withdraw' : 'Decline'}
                      </Typography>
                    }
                    icon={<Close fill={theme.brand.primary} />}
                  />
                  {negotiation?.display_status?.toLowerCase() !==
                    'awaiting buyer' && (
                    <NegoBtnWrapper
                      text={
                        <Typography color="noshade" style={{ marginRight: 5 }}>
                          Negotiate
                        </Typography>
                      }
                      icon={<Refresh fill={theme.grey.noshade} />}
                      onClick={handleNegotiationCloseBtnClick}
                      disabled={
                        negotiation?.display_status === 'Awaiting Buyer'
                      }
                    />
                  )}
                </DeclineAndNegoBtnContainer>
              </Col>
              <DeclineAndNegoBtnContainerMobile>
                <DeclineBtnWrapper
                  onClick={handleDeclineClick}
                  variant="outline"
                  text={
                    <Typography color="primary" style={{ marginRight: 5 }}>
                      Decline
                    </Typography>
                  }
                  icon={<Close fill={theme.brand.primary} />}
                />
                {negotiation?.display_status?.toLowerCase() !==
                  'awaiting buyer' && (
                  <NegoBtnWrapper
                    text={
                      <Typography color="noshade" style={{ marginRight: 5 }}>
                        Negotiate
                      </Typography>
                    }
                    icon={<Refresh fill={theme.grey.noshade} />}
                    onClick={handleNegotiationCloseBtnClick}
                    disabled={negotiation?.display_status === 'Awaiting Buyer'}
                    style={{ marginTop: 10 }}
                  />
                )}
              </DeclineAndNegoBtnContainerMobile>
              <AcceptBtnCol>
                <AcceptBtnContainer>
                  {negotiation?.display_status?.toLowerCase() !==
                    'awaiting buyer' && (
                    <StyledAcceptButton
                      text={
                        <Typography color="noshade" style={{ marginRight: 5 }}>
                          Accept
                        </Typography>
                      }
                      icon={<Check width={10} height={9} />}
                      onClick={handleAcceptBtnClick}
                      disabled={
                        negotiation?.display_status === 'Awaiting Buyer'
                      }
                    />
                  )}
                </AcceptBtnContainer>
              </AcceptBtnCol>
              <AcceptBtnContainerMobile>
                {negotiation?.display_status?.toLowerCase() !==
                  'awaiting buyer' && (
                  <StyledAcceptButton
                    text={
                      <Typography color="noshade" style={{ marginRight: 5 }}>
                        Accept
                      </Typography>
                    }
                    icon={<Check width={10} height={9} />}
                    onClick={handleAcceptBtnClick}
                    disabled={negotiation?.display_status === 'Awaiting Buyer'}
                    style={{ marginTop: 10 }}
                  />
                )}
              </AcceptBtnContainerMobile>
            </CTAContainer>
          )}
      </DetailsContainer>
    </Container>
  );
};

export default NegotiationView;
