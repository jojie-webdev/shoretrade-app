import React, { useState } from 'react';

import Accordion from 'components/base/Accordion';
import Badge from 'components/base/Badge';
import Breadcrumbs from 'components/base/Breadcrumbs';
import Interactions from 'components/base/Interactions';
import Tag from 'components/base/Tag';
import Typography from 'components/base/Typography';
import Loading from 'components/module/Loading';
import MobileHeader from 'components/module/MobileHeader';
import Search from 'components/module/Search';
import SearchV2 from 'components/module/SearchV2';
import SpecieCheckoutSummary from 'components/module/SpecieCheckoutSummary';
import { Row, Col, Visible } from 'react-grid-system';
import { Link } from 'react-router-dom';
import MarketDataImg from 'res/images/market-data.png';
import { useTheme } from 'utils/Theme';

import { BreadCrumbSections } from '../market-data.routes';
import { SpeciesGeneratedProps } from './Species.props';
import {
  ProductTagsContainer,
  ProductsAccordion,
  Space,
  SpeciesContainer,
  SpinnerContainer,
} from './Species.style';

const MarketPricesView = (props: SpeciesGeneratedProps): JSX.Element => {
  const theme = useTheme();
  const { productsImSelling, selectedSpecies } = props;

  const [searchTerm, setSearchTerm] = useState('');
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  return (
    <SpeciesContainer>
      <Breadcrumbs sections={BreadCrumbSections}></Breadcrumbs>
      <Space>
        <Row>
          <Col md={9}>
            <SearchV2
              value={searchTerm}
              resetValue={() => setSearchTerm('')}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for species"
            />

            <div>
              <ProductsAccordion
                title="Product's I'm Selling"
                bottomComponent={
                  <Typography variant="label" color="shade6">
                    We found 12 products you may be interested based on your
                    account settings
                  </Typography>
                }
              >
                <ProductTagsContainer>
                  {selectedSpecies.map((p) => (
                    <Tag
                      onClick={() => props.handleItemOnClick(p)}
                      alt
                      label={p.name}
                      selected={p.selected}
                      key={p.id}
                    />
                  ))}
                </ProductTagsContainer>
              </ProductsAccordion>
            </div>
          </Col>
          <Col md={3}>
            <SpecieCheckoutSummary
              items={selectedSpecies.filter((i) => i.selected)}
            />
          </Col>
        </Row>
      </Space>
    </SpeciesContainer>
  );
};

export default MarketPricesView;
