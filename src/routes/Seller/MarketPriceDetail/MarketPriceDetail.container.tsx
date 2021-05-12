import React, { useState, useEffect } from 'react';

import { isEmpty } from 'ramda';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  getFilters,
  getGraphData,
  getRegion,
  getSize,
  getStateId,
} from 'routes/Seller/MarketPriceDetail/MarketPriceDetail.transforms';
import { getSellerMarketPrice } from 'services/company';
import { Store } from 'types/store/Store';

import {
  GraphData,
  MarketPriceDetailGeneratedProps,
} from './MarketPriceDetail.props';
import MarketPriceDetailView from './MarketPriceDetail.view';

const MarketPriceDetail = (): JSX.Element => {
  const { id } = useParams<any>();
  const token = useSelector((state: Store) => state.auth.token) || '';

  const [name, setName] = useState('');
  const [data, setData] = useState<any | null>(null);
  const [graphData, setGraphData] = useState<GraphData>({
    dates: [],
    values: [],
  });

  //modal filter
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState<any[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<any[]>([]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const fetchData = async (
    sizeFrom?: any,
    sizeTo?: any,
    region?: any,
    stateIds?: any[]
  ) => {
    try {
      const resp = await getSellerMarketPrice(
        {
          typeId: id,
          ...(sizeFrom ? { sizeFrom } : {}),
          ...(sizeTo ? { sizeTo } : {}),
          ...(region ? { region } : {}),
          ...(stateIds && !isEmpty(stateIds) ? { stateIds } : {}),
        },
        token
      );
      setData(resp.data.data);
      setGraphData(getGraphData(resp.data.data));
      setFilters(getFilters(resp.data.data));
    } catch (e) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data && data.typeName) setName(data.typeName);
  }, [data]);

  const openFilterModal = () => setIsFilterModalOpen(true);
  const closeFilterModal = () => setIsFilterModalOpen(false);

  const onApply = () => {
    closeFilterModal();
    setData(null);

    const { sizeFrom, sizeTo } = getSize(data, selectedSize);
    const region = getRegion(data, selectedFilters);
    const stateIds = [
      getStateId(data, selectedFilters, 'stateOne'),
      getStateId(data, selectedFilters, 'stateTwo'),
      getStateId(data, selectedFilters, 'stateThree'),
    ].filter((sids) => sids !== null);

    fetchData(sizeFrom, sizeTo, region, stateIds);
  };

  const onReset = () => {
    setSelectedFilters([]);
    setSelectedSize(null);
    closeFilterModal();
  };

  const generatedProps: MarketPriceDetailGeneratedProps = {
    isOpen: isFilterModalOpen,
    openFilterModal,
    onClickClose: closeFilterModal,
    name,
    data,
    graphData,
    filters,
    selectedFilters,
    setSelectedFilters,
    selectedSize,
    setSelectedSize,
    onReset,
    onApply,
  };
  return <MarketPriceDetailView {...generatedProps} />;
};

export default MarketPriceDetail;
