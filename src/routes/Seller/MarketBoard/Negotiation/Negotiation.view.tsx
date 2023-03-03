import React from 'react';

import Breadcrumbs from 'components/base/Breadcrumbs';
import Button from 'components/base/Button';
import { Check, Close } from 'components/base/SVG';
import Refresh from 'components/base/SVG/Refresh';
import Typography from 'components/base/Typography';
import AcceptSellerModal from 'components/module/AcceptSellerModal';
import DeclineSellerModal from 'components/module/DeclineSellerModal';
import NegotiateSellerModal from 'components/module/NegotiateSellerModal';
import NegotiationSellerModal from 'components/module/NegotiationSellerModal';
import SellerNegotiationAlert from 'components/module/SellerNegotiationAlert';
import { SELLER_MARKET_BOARD_ROUTES } from 'consts/routes';
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

      <DeclineSellerModal
        show={showDeclineModal}
        onCancelBtnClick={handleDeclineModalCancelBtnClick}
        onConfirmBtnClick={handleDeclineModalConfirmBtnClick}
        disableConfirmBtn={isDeclineNegotiationPending}
      />

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
          negotiation?.status !== 'END' && (
            <CTAContainer>
              <div style={{ display: 'flex' }}>
                <Button
                  onClick={handleDeclineClick}
                  variant="outline"
                  text={
                    <Typography color="primary" style={{ marginRight: 5 }}>
                      Decline
                    </Typography>
                  }
                  icon={<Close fill={theme.brand.primary} />}
                  style={{ width: '100%', marginRight: 10 }}
                />
                <Button
                  text={
                    <Typography color="noshade" style={{ marginRight: 5 }}>
                      Negotiate
                    </Typography>
                  }
                  icon={<Refresh fill={theme.grey.noshade} />}
                  onClick={handleNegotiationCloseBtnClick}
                  disabled={negotiation?.display_status === 'Awaiting Buyer'}
                  style={{ marginRight: 10, width: '100%' }}
                />
              </div>
              <div style={{ width: '124px' }}>
                <StyledAcceptButton
                  text={
                    <Typography color="noshade" style={{ marginRight: 5 }}>
                      Accept
                    </Typography>
                  }
                  icon={<Check width={10} height={9} />}
                  onClick={handleAcceptBtnClick}
                  // onClick={() => console.log('')}
                  disabled={negotiation?.display_status === 'Awaiting Buyer'}
                />
              </div>
            </CTAContainer>
          )}
      </DetailsContainer>
    </Container>
  );
};

export default NegotiationView;