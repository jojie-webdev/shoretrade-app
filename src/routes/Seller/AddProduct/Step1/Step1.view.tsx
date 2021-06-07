import React, { useState, useEffect } from 'react';

import Button from 'components/base/Button';
import Interactions from 'components/base/Interactions';
import Select from 'components/base/Select';
import { Fish } from 'components/base/SVG';
import TextField from 'components/base/TextField';
import Typography from 'components/base/Typography';
import EmptyState from 'components/module/EmptyState';
import Loading from 'components/module/Loading';
import Search from 'components/module/Search';
import { placeholderImage } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import { isEmpty } from 'ramda';
import { Row, Col } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { SearchProductTypeResponseItem } from 'types/store/SearchProductTypeState';

import { Step1Props } from './Step1.props';
import {
  Container,
  Image,
  ButtonContainer,
  BackButton,
  EmptyResultDesktop,
} from './Step1.style';

const ProductView = (props: SearchProductTypeResponseItem) => {
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });
  const image = false;
  return (
    <>
      {!isMobile && (
        <>
          {image ? (
            <Image src={placeholderImage} />
          ) : (
            <Image src={placeholderImage} />
          )}
        </>
      )}
      <Typography variant="body" color="noshade">
        {props.label}
      </Typography>
    </>
  );
};

function Step2({
  search,
  selectProductType,
  searchResults,
  pendingSearch,
  showCustomTypeSettings,
  setShowCustomTypeSettings,
  categories,
  getCustomFormData,
  selectCustomType,
  editableListing,
  navBack,
  desktopSearchValue,
}: Step1Props) {
  const [searchKey, setSearchKey] = useState<string>('');
  const [isTriggered, setIsTriggered] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  useEffect(() => {
    setSearchKey(searchKey);

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
    } else if (setSearchKey.length <= 2 && isEmpty(searchResults)) {
      search('');
    }
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
  }, [showCustomTypeSettings, searchKey]);

  useEffect(() => {
    if (metricOptions.length > 0) {
      setSelectedMetric(metricOptions[0].value);
    }
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
        <Row justify="end" nogutter>
          <BackButton
            variant={'outline'}
            text="Back"
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

              {searchResults.map((item, index) => (
                <div className="item-container" key={item.value}>
                  <Interactions onClick={() => selectProductType(item.value)}>
                    <ProductView {...item} />
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
                  onButtonClicked={() => setShowCustomTypeSettings(true)}
                  height={211}
                  width={211}
                  fluid
                />
              )}
            </>
          )}
          {!pendingSearch && (
            <ButtonContainer>
              <BackButton
                variant={'outline'}
                text="Back"
                onClick={() => navBack()}
              />
              {searchResults.length === 0 && !isMobile && (
                <Button
                  text="Create Custom Type"
                  onClick={() => setShowCustomTypeSettings(true)}
                />
              )}
            </ButtonContainer>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Step2;
