import React from 'react';

// import { useTheme } from 'utils/Theme';
import Badge from 'components/base/Badge';
import Breadcrumbs from 'components/base/Breadcrumbs';
import Button from 'components/base/Button';
import { ArrowRight, ChevronRight } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import MobileFooter from 'components/layout/MobileFooter';
import { groupBy } from 'ramda';
import { Row, Hidden, Visible } from 'react-grid-system';
import { sizeToString } from 'utils/Listing';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import theme from 'utils/Theme';

import {
  ContainerWithCategoryImagePreview,
  CreateRequestHeaderContainer,
  DetailsContainer,
  MainContainer,
  RequestDetailsContainer,
  RequestRow,
  TitleContainer,
} from '../Create.style';
import { SummaryProps } from './Summary.props';
import {
  SummaryContentContainer,
  BadgesContainer,
  BadgeText,
  SubmitButton,
  CheckboxContainer,
  CheckboxMain,
  StyledAddressSelect,
} from './Summary.style';

const SummaryView = (props: SummaryProps) => {
  const {
    stepCountComponent,
    selectedQuantity,
    selectedSize,
    selectedSpecifications,
    setSendConfModalisOpen,
    onBack,
    listingFormData,
    detailsListComponent,
    didFinishStep,
  } = props;

  const handleSubmit = () => {
    setSendConfModalisOpen(true);
  };

  const groupSpecs = () => {
    return groupBy((a: any) => {
      return `group${a.groupOrder}`;
    }, selectedSpecifications.items);
  };

  const SummaryBadges = (props: { items: string[]; label: string }) => {
    const { items, label } = props;

    if (!items) return <></>;

    const tagsMarkup = items.map((item, index) => (
      <Badge
        key={index}
        className="offers-state-badge"
        badgeColor={theme.grey.shade3}
      >
        <BadgeText color="shade9" weight="900" variant="overline">
          {item}
        </BadgeText>
      </Badge>
    ));

    return (
      <div>
        {items[0] !== '' && (
          <>
            <Typography
              style={{ marginBottom: '8px' }}
              color="shade10"
              variant="overline"
            >
              {label}
            </Typography>
            <BadgesContainer>{tagsMarkup}</BadgesContainer>
          </>
        )}
      </div>
    );
  };

  const sizeSummary = () => {
    if (selectedSize.ungraded === true) {
      return <SummaryBadges label="Size" items={['Ungraded']} />;
    }

    if (selectedSize.from !== '') {
      return (
        <Row style={{ marginLeft: 0 }}>
          <div>
            <Typography
              style={{ marginBottom: '8px' }}
              color="shade10"
              variant="overline"
            >
              Size
            </Typography>
            <Badge
              className="offers-state-badge"
              badgeColor={theme.grey.shade3}
            >
              <BadgeText color="shade9" weight="900" variant="overline">
                {sizeToString(
                  listingFormData?.metric.name || '',
                  selectedSize.from,
                  selectedSize.to
                )}
              </BadgeText>
            </Badge>
          </div>
        </Row>
      );
    } else {
      return <SummaryBadges label="Size" items={selectedSize.items} />;
    }
  };

  return (
    <>
      <CreateRequestHeaderContainer>
        <MainContainer>
          <Hidden xs sm>
            <Breadcrumbs
              className="breadcrumbs"
              color="shade5"
              sections={[
                {
                  label: 'Category',
                  onClick: () => {
                    if (didFinishStep >= 1) {
                      onBack(1);
                    }
                  },
                  isDone: didFinishStep >= 1,
                },
                {
                  label: 'Specifications',
                  onClick: () => {
                    if (didFinishStep >= 2) {
                      onBack(2);
                    }
                  },
                  isDone: didFinishStep >= 2,
                },
                {
                  label: 'Size',
                  onClick: () => {
                    if (didFinishStep >= 3) {
                      onBack(3);
                    }
                  },
                  isDone: didFinishStep >= 3,
                },
                {
                  label: 'Quantity',
                  onClick: () => {
                    if (didFinishStep >= 4) {
                      onBack(4);
                    }
                  },
                  isDone: didFinishStep >= 4,
                },
                {
                  label: 'Summary',
                },
              ]}
            />
          </Hidden>
          <TitleContainer>
            <Visible xs sm>
              {stepCountComponent}
            </Visible>
            <Typography
              variant="title5"
              weight="500"
              style={{ marginBottom: 12 }}
              altFont
            >
              {listingFormData?.type.name}
            </Typography>
            <Typography variant="label" weight="400" color="shade7">
              Review the details of your request and select your shipping
              address. If you need to edit your request simply go back and
              update before sending your market request.
            </Typography>
          </TitleContainer>
        </MainContainer>
      </CreateRequestHeaderContainer>
      <RequestRow>
        <ContainerWithCategoryImagePreview>
          <SummaryContentContainer>
            {selectedSpecifications?.items.length > 0 && (
              <>
                {Object.keys(groupSpecs()).map((group, index) => {
                  return (
                    <SummaryBadges
                      items={groupSpecs()[group].map(
                        (spec: any, i: any, arr: any[]) => `${spec.label}`
                      )}
                      key={index}
                      label={`Specs ${index + 1}`}
                    />
                  );
                })}
              </>
            )}
            <div className="size-container">{sizeSummary()}</div>
            <Typography
              style={{ marginBottom: '8px' }}
              color="shade10"
              variant="overline"
            >
              Quantity
            </Typography>
            <div className="quantity-container">
              <Row style={{ marginLeft: 0, marginBottom: 24 }}>
                <div>
                  <Badge
                    className="offers-state-badge"
                    badgeColor={theme.grey.shade3}
                  >
                    <BadgeText color="shade9" weight="900" variant="overline">
                      {selectedQuantity.from}{' '}
                      {formatMeasurementUnit(listingFormData?.measurementUnit)}
                    </BadgeText>
                  </Badge>
                </div>
                {selectedQuantity.to && (
                  <>
                    <div
                      style={{ marginTop: -4, marginLeft: 4, marginRight: 4 }}
                    >
                      <ArrowRight
                        width={8}
                        height={8}
                        fill={theme.grey.shade6}
                      />
                    </div>
                    <div>
                      <Badge
                        className="offers-state-badge"
                        badgeColor={theme.grey.shade3}
                      >
                        <BadgeText
                          color="shade9"
                          weight="900"
                          variant="overline"
                        >
                          {selectedQuantity.to}{' '}
                          {formatMeasurementUnit(
                            listingFormData?.measurementUnit
                          )}
                        </BadgeText>
                      </Badge>
                    </div>
                  </>
                )}
              </Row>
              <StyledAddressSelect
                value={props.selectedAddress}
                onChange={props.onChangeAddress}
                options={props.addressOptions}
                label="Shipping To"
              />

              <CheckboxMain>
                <Typography
                  style={{ marginBottom: 4 }}
                  color="shade10"
                  variant="overline"
                >
                  Notes
                </Typography>
                <CheckboxContainer>
                  <Typography
                    variant="caption"
                    style={{ marginLeft: 8, marginTop: 8 }}
                  >
                    Your Market Request will automatically close after 7 days or
                    once the maximum quantity requested is reached.
                  </Typography>
                </CheckboxContainer>
              </CheckboxMain>
            </div>
            <Hidden xs>
              <SubmitButton
                onClick={() => handleSubmit()}
                className="submit-btn"
                text="Send Market Request ✓"
                variant="primary"
              />
            </Hidden>
            <MobileFooter>
              <Button
                takeFullWidth
                onClick={() => handleSubmit()}
                className="submit-btn"
                text="send market request"
                variant="primary"
                icon={
                  <ChevronRight
                    width={14}
                    height={12}
                    fill="white"
                    style={{ paddingBottom: '2px' }}
                  />
                }
              />
            </MobileFooter>
          </SummaryContentContainer>
        </ContainerWithCategoryImagePreview>
        <Hidden xs sm>
          <RequestDetailsContainer>
            <DetailsContainer>{detailsListComponent}</DetailsContainer>
          </RequestDetailsContainer>
        </Hidden>
      </RequestRow>
    </>
  );
};

export default SummaryView;
