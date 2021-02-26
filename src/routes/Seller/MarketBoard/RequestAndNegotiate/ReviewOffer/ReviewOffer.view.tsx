import React from 'react';

import Badge from 'components/base/Badge/Badge.view';
import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox/Checkbox.view';
import Interactions from 'components/base/Interactions/Interactions.view';
import { SubtractHollow, Pen, ArrowRight } from 'components/base/SVG';
import Typography from 'components/base/Typography/Typography.view';
import { BadgeText } from 'components/module/CategoryCards/Preview/Preview.style';
import { useTheme } from 'utils/Theme';

import { ReviewOfferGeneratedProps } from './ReviewOffer.props';
import { Container } from './ReviewOffer.style';

const ReviewOfferView = (props: ReviewOfferGeneratedProps) => {
  const theme = useTheme();
  return (
    <Container>
      <div>
        {[...new Array(2)].map((v, i) => (
          <Interactions
            key={i}
            leftComponent={
              <div className="left-component">
                <img src="https://picsum.photos/200/300" />
                <div>
                  <Typography color="noshade">Pale Octopus</Typography>
                  <div className="badges-container">
                    {['Fresh', 'Farmed', 'Head on Gutted', 'Medium'].map(
                      (v) => (
                        <Badge
                          key={v}
                          className="badge"
                          badgeColor={theme.grey.shade8}
                        >
                          <BadgeText variant="overlineSmall" color="noshade">
                            {v}
                          </BadgeText>
                        </Badge>
                      )
                    )}
                  </div>

                  <div className="weights">
                    <Typography color="noshade" variant="small">
                      100kg
                    </Typography>
                    <ArrowRight
                      width={10}
                      height={10}
                      fill={theme.grey.shade7}
                    />
                    <Typography color="noshade" variant="small">
                      250kg
                    </Typography>
                  </div>
                </div>
              </div>
            }
            rightComponent={
              <div className="right-component">
                <div onClick={() => props.setStep && props.setStep(2)}>
                  <Pen fill={theme.brand.primary} />
                </div>
                <div onClick={() => {}}>
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
          onClick={() => props.setStep && props.setStep(2)}
          className="submit-btn"
          text="Add an offer"
          variant="outline"
        />
        <Button
          onClick={() => {}}
          className="submit-btn"
          text="submit"
          variant="primary"
        />
      </div>
    </Container>
  );
};

export default ReviewOfferView;
