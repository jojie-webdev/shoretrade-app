import React from 'react';

import Button from 'components/base/Button';
import Tag from 'components/base/Tag';
import Typography from 'components/base/Typography';

// import { useTheme } from 'utils/Theme';
import { SpecieCheckoutSummaryProps } from './SpecieCheckoutSummary.props';
import {
  ActionsContainer,
  Container,
  ItemsContainer,
  PriceContainer,
  StyledTag,
} from './SpecieCheckoutSummary.style';

const SpecieCheckoutSummary = (
  props: SpecieCheckoutSummaryProps
): JSX.Element => {
  // const theme = useTheme();
  const { items, onClickCheckout } = props;
  const total = items.reduce((prev, curr) => prev + curr.price, 0);
  return (
    <Container>
      <PriceContainer>
        <div className="total">
          <Typography color="shade7" variant="title6">
            $
          </Typography>
          <Typography color="noshade" altFont variant="display4">
            {total}
          </Typography>
          <Typography className="per" color="shade7" variant="caption">
            /month
          </Typography>
        </div>
        {items.length > 0 && (
          <div className="breakdown">
            <Typography color="shade7" variant="caption">
              {/* FIXED PRICING */}
              {/* Make a quick equality check */}
              {items.filter((i) => i.price === 12.5).length === items.length &&
                '$12.50 '}{' '}
              per {items.length} species
            </Typography>
          </div>
        )}
      </PriceContainer>
      <ItemsContainer>
        {onClickCheckout
          ? items.map((i) => <Tag key={i.id} label={i.name} />)
          : items.map((i) => (
              <Tag
                onClickRemove={() => props.onItemRemoved}
                alt
                key={i.id}
                label={i.name}
              />
            ))}
      </ItemsContainer>
      {!onClickCheckout && (
        <ActionsContainer>
          <Button
            disabled={items.length < 1}
            variant="primary"
            text="Checkout"
          />
        </ActionsContainer>
      )}
    </Container>
  );
};

export default React.memo(SpecieCheckoutSummary);
