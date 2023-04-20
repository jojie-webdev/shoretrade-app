import React from 'react';

import Case from 'case';
import { ChevronRight } from 'components/base/SVG';
import TypographyView from 'components/base/Typography';
import Typography from 'components/base/Typography';
import OfferTagView from 'components/module/OfferTag';
import { NegotiationWithExpiry } from 'routes/Seller/MarketBoard/Landing/Landing.props';
import { Theme } from 'types/Theme';
import { formatUnitToPricePerUnit } from 'utils/Listing/formatMeasurementUnit';
import { transformNegotiationStatusText } from 'utils/MarketRequest/marketRequestTag';
import { parseImageUrl } from 'utils/parseImageURL';
import { useTheme } from 'utils/Theme';

import { Badges } from '../Landing.style';
import { buildSize } from '../Landing.view';
import {
  MarketRequestItemInteraction as NegotiationInteraction,
  MarketRequestItemMobileContainer as NegotiationItemMobileContainer,
  MajorInfo,
  MinorInfo,
  SubMinorInfo,
  SubMinorDetail,
} from '../RequestsMobile/RequestsMobile.style';

const OfferTagTextStyle = {
  fontWeight: 600,
  fontSize: '12px',
  lineHeight: '16px',
  letterSpacing: '0.5px',
};

type NegotiationLeftComponentProps = NegotiationWithExpiry & { theme: Theme };
const NegotiationLeftComponent = (
  negotiation: NegotiationLeftComponentProps
) => {
  const specifications = negotiation.specifications
    .map((specification) => specification.name)
    .join(', ');

  const quantity = negotiation?.negotiation_offer
    ? negotiation.negotiation_offer.desired_quantity
    : negotiation.desired_quantity;

  const metric = negotiation.metric ?? negotiation.active_size_unit ?? 'Grams';

  const statusTextProps = transformNegotiationStatusText(
    negotiation.theme,
    negotiation.display_status
  );

  const viewText = (label: string, value: string) => (
    <>
      <Typography
        variant="caption"
        weight="400"
        color="shade6"
        style={{ marginRight: '5px' }}
      >
        {label}{' '}
      </Typography>
      <Typography variant="caption" weight="700" color="shade9">
        {value}
      </Typography>
    </>
  );

  return (
    <NegotiationItemMobileContainer>
      <MajorInfo>
        <div className="thumbnail-container">
          <img
            src={parseImageUrl(
              negotiation.thumbnail ?? negotiation.default_photo
            )}
            alt=""
          />
        </div>
        <TypographyView variant="label" style={{ lineHeight: '20px' }}>
          {negotiation.name}
        </TypographyView>
      </MajorInfo>

      <MinorInfo>
        <Typography variant="caption" weight="400" color="shade6">
          {specifications}
        </Typography>

        <SubMinorInfo>
          <SubMinorDetail>
            {viewText(
              'Quantity',
              `${quantity ? quantity.toString() : 0} ${Case.pascal(
                formatUnitToPricePerUnit(negotiation.measurement_unit)
              )}`
            )}
          </SubMinorDetail>

          <SubMinorDetail>
            {viewText('Time Left', negotiation.expiry)}
          </SubMinorDetail>

          <SubMinorDetail>
            {viewText(
              'Size',
              buildSize(metric, negotiation.size_from, negotiation.size_to, {})
            )}
          </SubMinorDetail>
        </SubMinorInfo>

        <Badges>
          {statusTextProps.text !== '' && (
            <OfferTagView
              text={statusTextProps.text}
              badgeColor={statusTextProps.badgeColor || ''}
              variantColor={statusTextProps.variantColor}
              color={statusTextProps.tagColor}
              textStyle={OfferTagTextStyle}
            />
          )}
        </Badges>
      </MinorInfo>
    </NegotiationItemMobileContainer>
  );
};

type NegotiationMobileContainerProps = {
  negotiations: NegotiationWithExpiry[];
  redirectToNegotiation: (row: NegotiationWithExpiry) => void;
};

const NegotiationMobileContainer = (
  props: NegotiationMobileContainerProps
): JSX.Element => {
  const theme = useTheme();
  return (
    <>
      {props.negotiations.map((negotiation) => (
        <NegotiationInteraction
          key={negotiation.negotiation_request_id}
          type="next"
          onClick={() => props.redirectToNegotiation(negotiation)}
          leftComponent={
            <NegotiationLeftComponent {...negotiation} theme={theme} />
          }
          rightComponent={
            <div className="cta">
              <div>
                <ChevronRight width={10} height={12} />
              </div>
            </div>
          }
        />
      ))}
    </>
  );
};

export default NegotiationMobileContainer;
