import React from 'react';

import Badge from 'components/base/Badge/Badge.view';
import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox/Checkbox.view';
import Interactions from 'components/base/Interactions/Interactions.view';
import {
  Weight,
  DollarSign,
  SubtractHollow,
  Pen,
  ArrowRight,
} from 'components/base/SVG';
import Typography from 'components/base/Typography/Typography.view';
import { BadgeText } from 'components/module/CategoryCards/Preview/Preview.style';
import { SELLER_MARKET_BOARD_ROUTES } from 'consts/routes';
import { useHistory } from 'react-router-dom';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import { useTheme } from 'utils/Theme';

import { ReviewOfferGeneratedProps } from './ReviewOffer.props';
import { Container } from './ReviewOffer.style';

const ReviewOfferView = ({ setStep, ...props }: ReviewOfferGeneratedProps) => {
  const theme = useTheme();
  const history = useHistory();

  return (
    <Container>
      <div>
        {props.offer.map((v) => (
          <Interactions
            key={v.editId}
            leftComponent={
              <div className="left-component">
                <img src={v.image} />
                <div>
                  <Typography color="noshade">{v.type}</Typography>
                  <div className="badges-container">
                    {v.listStateOptions &&
                      v.listStateOptions.map((ls) => (
                        <Badge
                          key={ls}
                          className="badge"
                          badgeColor={theme.grey.shade8}
                        >
                          <BadgeText variant="overlineSmall" color="noshade">
                            {ls}
                          </BadgeText>
                        </Badge>
                      ))}
                    {v.size.to !== null && (
                      <Badge className="badge" badgeColor={theme.grey.shade8}>
                        <BadgeText variant="overlineSmall" color="noshade">
                          {v.size.to || ''}
                        </BadgeText>
                      </Badge>
                    )}
                  </div>

                  <div className="weights">
                    <div style={{ margin: '0 4px 4px 0' }}>
                      <Weight
                        fill={theme.grey.noshade}
                        width={12}
                        height={12}
                      />
                    </div>
                    <Typography color="noshade" variant="small">
                      {v.weight}
                      {formatMeasurementUnit(v.measurementUnit)}
                    </Typography>
                    <div style={{ margin: '0 2px 4px 8px' }}>
                      <DollarSign
                        fill={theme.grey.noshade}
                        width={11}
                        height={11}
                      />
                    </div>
                    <Typography color="noshade" variant="small">
                      {v.price}/{formatMeasurementUnit(v.measurementUnit)}
                    </Typography>
                  </div>
                </div>
              </div>
            }
            rightComponent={
              <div className="right-component">
                <div onClick={() => setStep && setStep(2)}>
                  <Pen fill={theme.brand.primary} />
                </div>
                <div onClick={() => props.onDelete(v.editId)}>
                  <SubtractHollow fill={theme.brand.primary} />
                </div>
              </div>
            }
            padding="16px 24px 16px 16px"
          />
        ))}
      </div>

      <div className="checkbox-container">
        <Checkbox onClick={(v) => {}} className="checkbox" checked={false} />
        <Typography className="label" variant="label" color="noshade">
          Confirm the availability of the product
        </Typography>
      </div>

      <div className="submit-btns">
        <Button
          style={{ width: 137 }}
          onClick={() => setStep && setStep(2)}
          className="submit-btn"
          text="Add an offer"
          variant="outline"
        />
        <Button
          onClick={() => history.replace(SELLER_MARKET_BOARD_ROUTES.LANDING)}
          className="submit-btn"
          text="submit"
          variant="primary"
        />
      </div>
    </Container>
  );
};

export default ReviewOfferView;
