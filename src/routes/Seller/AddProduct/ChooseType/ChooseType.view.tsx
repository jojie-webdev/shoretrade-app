import React, { useState, useEffect } from 'react';

import Button from 'components/base/Button';
import Interactions from 'components/base/Interactions';
import Select from 'components/base/Select';
import { Fish } from 'components/base/SVG';
import TextField from 'components/base/TextField';
import Typography from 'components/base/Typography';
import MobileFooter from 'components/layout/MobileFooter';
import EmptyState from 'components/module/EmptyState';
import Loading from 'components/module/Loading';
import Search from 'components/module/Search';
import { placeholderImage } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import { isEmpty } from 'ramda';
import { Row, Col } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';

import { ChooseTypeProps } from './ChooseType.props';
import {
  Container,
  Image,
  ButtonContainer,
  BackButton,
  EmptyResultDesktop,
} from './ChooseType.style';

const ProductView = (props: { image: string; label: string }) => {
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });
  const image = props.image;
  return (
    <>
      {!isMobile && (
        <>{image ? <Image src={image} /> : <Image src={placeholderImage} />}</>
      )}
      <Typography variant="body" color="noshade">
        {props.label}
      </Typography>
    </>
  );
};

const ChooseType = ({
  search,
  selectProductType,
  searchResults,
  productsToSell,
  pendingSearch,
  showCustomTypeSettings,
  setShowCustomTypeSettings,
  categories,
  getCustomFormData,
  selectCustomType,
  editableListing,
  navBack,
  desktopSearchValue,
  disableBackBtn,
}: ChooseTypeProps) => {
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  const [searchKey, setSearchKey] = useState<string>('');
  const [isTriggered, setIsTriggered] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    if (searchKey.length > 2) {
      const timerId = setTimeout(() => {
        search(searchKey);
        setIsTriggered(true);
      }, 800);
      setTimer(timerId);
    } else if (searchKey.length <= 2 && isEmpty(searchResults)) {
      search('');
    }
    // eslint-disable-next-line
  }, [searchKey]);

  // Custom type states

  const [selectedCategory, setSelectedCategory] = useState(
    editableListing.customTypeData?.categoryId || ''
  );
  const [customTypeName, setCustomTypeName] = useState(
    editableListing.customTypeData?.name || ''
  );
  const [selectedMetric, setSelectedMetric] = useState(
    editableListing.customTypeData?.metric.id || ''
  );

  const categoryOptions = categories.map((c) => ({
    label: c.name,
    value: c.id,
  }));

  const metricOptions = (
    categories.find((c) => c.id === selectedCategory)?.metrics || []
  ).map((c) => ({
    label: c.label,
    value: c.id,
  }));

  useEffect(() => {
    if (showCustomTypeSettings && searchKey) {
      setCustomTypeName(searchKey);
    }

    if (showCustomTypeSettings && categoryOptions.length === 0) {
      getCustomFormData();
    }
    // eslint-disable-next-line
  }, [showCustomTypeSettings, searchKey]);

  useEffect(() => {
    if (metricOptions.length > 0) {
      setSelectedMetric(metricOptions[0].value);
    }
    // eslint-disable-next-line
  }, [selectedCategory]);

  if (showCustomTypeSettings) {
    return (
      <Container>
        <Row className="textfield-row">
          <Col md={6} className="textfield-col">
            <Select
              value={selectedCategory}
              onChange={(option) => {
                setSelectedCategory(option.value);
              }}
              options={categoryOptions}
              label="Category"
            />
          </Col>
          <Col md={6} className="textfield-col">
            <TextField
              label="Custom Type Name"
              value={customTypeName}
              onChangeText={setCustomTypeName}
            />
          </Col>
          <Col md={6} className="textfield-col">
            <Select
              value={selectedMetric}
              onChange={(option) => {
                setSelectedMetric(option.value);
              }}
              options={metricOptions}
              label="Metric"
            />
          </Col>
        </Row>
        {!isMobile && (
          <Row justify="end" nogutter>
            <BackButton
              variant={'outline'}
              text="Back"
              disabled={disableBackBtn}
              onClick={() => setShowCustomTypeSettings(false)}
            />
            <Button
              variant={
                selectedCategory && selectedMetric && customTypeName
                  ? 'primary'
                  : 'disabled'
              }
              text="Next"
              onClick={() => {
                if (selectedCategory && selectedMetric && customTypeName) {
                  selectCustomType({
                    customTypeName,
                    selectedCategory,
                    selectedMetric: {
                      id: selectedMetric,
                      name:
                        metricOptions.find((o) => o.value === selectedMetric)
                          ?.label || '',
                    },
                  });
                }
              }}
            />
          </Row>
        )}

        <MobileFooter>
          <Button
            takeFullWidth
            variant={'outline'}
            text="Back"
            disabled={disableBackBtn}
            onClick={() => setShowCustomTypeSettings(false)}
            style={{ marginRight: 8 }}
          />
          <Button
            takeFullWidth
            variant={
              selectedCategory && selectedMetric && customTypeName
                ? 'primary'
                : 'disabled'
            }
            text="Next"
            onClick={() => {
              if (selectedCategory && selectedMetric && customTypeName) {
                selectCustomType({
                  customTypeName,
                  selectedCategory,
                  selectedMetric: {
                    id: selectedMetric,
                    name:
                      metricOptions.find((o) => o.value === selectedMetric)
                        ?.label || '',
                  },
                });
              }
            }}
          />
        </MobileFooter>
      </Container>
    );
  }
  return (
    <Container>
      {isMobile && (
        <Row className="search-row">
          <Col xs={12}>
            <Search
              value={searchKey}
              placeholder="e.g. Ocean Trout"
              onChange={(e) => setSearchKey(e.currentTarget.value)}
              resetValue={() => setSearchKey('')}
            />
          </Col>
        </Row>
      )}

      <Row className="results-row">
        <Col xs={12}>
          {pendingSearch ? (
            <Loading label="Searching" />
          ) : (isMobile && !isTriggered) || searchResults.length > 0 ? (
            <>
              {isMobile && (
                <Typography variant="overline" color="shade6" className="title">
                  Results
                </Typography>
              )}

              {(!(desktopSearchValue || searchKey) && productsToSell.length
                ? productsToSell
                : searchResults
              ).map((item, index) => (
                <div className="item-container" key={item.value}>
                  <Interactions onClick={() => selectProductType(item.value)}>
                    <ProductView label={item.label} image={item.image || ''} />
                  </Interactions>
                </div>
              ))}
            </>
          ) : (
            <>
              {!isMobile ? (
                <EmptyResultDesktop>
                  <Typography variant="body" color="noshade">
                    {`We didn’t find anything for “${
                      desktopSearchValue || searchKey
                    }” `}
                  </Typography>
                  <Typography variant="label" color="shade6">
                    Check the spelling or try a more general term
                  </Typography>
                </EmptyResultDesktop>
              ) : (
                <EmptyState
                  title="There are no types which match your search"
                  buttonText="Create Custom Type"
                  Svg={Fish}
                  onButtonClicked={
                    isMobile ? undefined : () => setShowCustomTypeSettings(true)
                  }
                  height={211}
                  width={211}
                  fluid
                />
              )}
            </>
          )}
          {!pendingSearch && !isMobile && (
            <ButtonContainer>
              <BackButton
                variant={'outline'}
                text="Back"
                onClick={() => navBack()}
              />
              {searchResults.length === 0 && (
                <Button
                  text="Create Custom Type"
                  onClick={() => setShowCustomTypeSettings(true)}
                />
              )}
            </ButtonContainer>
          )}
        </Col>
      </Row>

      <MobileFooter>
        <Button
          takeFullWidth
          disabled={pendingSearch}
          variant={'outline'}
          text="Back"
          onClick={() => navBack()}
        />
        {!pendingSearch && searchResults.length === 0 && (
          <Button
            takeFullWidth
            text="Create Custom Type"
            onClick={() => setShowCustomTypeSettings(true)}
            style={{ marginLeft: 8 }}
          />
        )}
      </MobileFooter>
    </Container>
  );
};

export default ChooseType;
