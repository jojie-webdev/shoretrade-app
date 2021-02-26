import React from 'react';

import Badge from 'components/base/Badge/Badge.view';
import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox/Checkbox.view';
import Interactions from 'components/base/Interactions/Interactions.view';
import { SubtractHollow, Pen, ArrowRight } from 'components/base/SVG';
import Typography from 'components/base/Typography/Typography.view';
import { BadgeText } from 'components/module/CategoryCards/Preview/Preview.style';
import { SELLER_MARKET_BOARD_ROUTES } from 'consts/routes';
import { useHistory } from 'react-router-dom';
import { useTheme } from 'utils/Theme';

import { ReviewOfferGeneratedProps } from './ReviewOffer.props';
import { Container } from './ReviewOffer.style';

const ReviewOfferView = ({ setStep, ...props }: ReviewOfferGeneratedProps) => {
  const theme = useTheme();
  const history = useHistory();

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
                <div onClick={() => setStep && setStep(2)}>
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
