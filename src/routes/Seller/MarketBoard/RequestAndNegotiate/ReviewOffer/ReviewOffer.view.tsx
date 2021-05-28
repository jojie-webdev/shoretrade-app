import React, { useState } from 'react';

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
import MobileFooter from 'components/layout/MobileFooter';
import { BREAKPOINTS } from 'consts/breakpoints';
import { isIOS } from 'react-device-detect';
import { useMediaQuery } from 'react-responsive';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import { useTheme } from 'utils/Theme';

import { ReviewOfferGeneratedProps } from './ReviewOffer.props';
import { Container, BadgeText, ItemDetail } from './ReviewOffer.style';

const ReviewOfferView = ({ setStep, ...props }: ReviewOfferGeneratedProps) => {
  const theme = useTheme();
  const [isChecked, setIsChecked] = useState(false);
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  const flatMap = (array: [], fn: any) => {
    let result: any[] = [];
    array.forEach((element) => {
      const mapping = fn(element);
      result = result.concat(mapping);
    });
    return result;
  };

  const renderSize = (size: any) => {
    size = flatMap(size.split('-'), function (part: any) {
      return [part, <ArrowRight fill={theme.grey.shade7} />];
    });
    size.pop();
    return size;
  };
  return (
    <Container isIOS={isIOS}>
      <div>
        {props.offer.map((v) => {
          const sizeText = `${v.size.from} ${formatMeasurementUnit(
            v.measurementUnit
          )} ${
            v.size.to
              ? ` - ${v.size.to} ${formatMeasurementUnit(v.measurementUnit)}`
              : ''
          }`;
          return (
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
                            <BadgeText
                              variant={isMobile ? 'small' : 'overlineSmall'}
                              color="noshade"
                            >
                              {ls}
                            </BadgeText>
                          </Badge>
                        ))}
                    </div>

                    <div className="weights">
                      <div style={{ margin: '0 4px 4px 0' }}>
                        <Weight
                          fill={theme.grey.shade7}
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
                          fill={theme.grey.shade7}
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
                  <div onClick={() => props.onEdit(v.editId)}>
                    <Pen fill={theme.brand.primary} />
                  </div>
                  <div onClick={() => props.onDelete(v.editId)}>
                    <SubtractHollow fill={theme.brand.primary} />
                  </div>
                </div>
              }
              padding="16px 24px 16px 16px"
            />
          );
        })}
      </div>

      <div className="checkbox-container">
        <Checkbox
          onClick={() => setIsChecked((prevState) => !prevState)}
          className="checkbox"
          checked={isChecked}
        />
        <Typography className="label" variant="label" color="noshade">
          Confirm the availability of the product
        </Typography>
      </div>

      {!isMobile && (
        <div className={'submit-btns'}>
          <Button
            onClick={() => setStep && setStep(2)}
            className={'submit-btn'}
            text="Add an offer"
            variant="outline"
          />
          <Button
            onClick={props.onSubmit}
            className={'submit-btn'}
            text="submit"
            variant={!isChecked ? 'disabled' : 'primary'}
            disabled={!isChecked}
            loading={props.isSubmitting}
          />
        </div>
      )}

      <MobileFooter>
        <Button
          onClick={() => setStep && setStep(2)}
          takeFullWidth
          text="Add an offer"
          variant="outline"
        />
        <Button
          onClick={props.onSubmit}
          takeFullWidth
          text="submit"
          variant={!isChecked ? 'disabled' : 'primary'}
          disabled={!isChecked}
          loading={props.isSubmitting}
          style={{ marginLeft: 8 }}
        />
      </MobileFooter>
    </Container>
  );
};

export default ReviewOfferView;
