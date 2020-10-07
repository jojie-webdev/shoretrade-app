import React, { useEffect, useState } from 'react';

import Interactions from 'components/base/Interactions';
import Spinner from 'components/base/Spinner';
import Search from 'components/module/Search/Search.view';
import { isEmpty } from 'ramda';
import parseGooglePlaceData from 'utils/Address/parseGooglePlaceData';
import useScript from 'utils/Hooks/useScript';
import { useTheme } from 'utils/Theme';

import { LocationSearchProps } from './LocationSearch.props';
import {
  LocationItemContainer,
  SpinnerContainer,
  Results,
} from './LocationSearch.style';

const NO_RESULTS = 'No results';
const API_ERROR = 'Please try again';

const LocationSearch = (props: LocationSearchProps): JSX.Element => {
  const theme = useTheme();
  const [searchValue, setSearchValue] = useState('');
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [searchData, setSearchData] = useState<{ id: string; title: string }[]>(
    (props.initialResult || []).map((v) => ({
      id: 'initial',
      title: v,
    }))
  );
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  const [hasMap, error] = useScript(
    `https://maps.googleapis.com/maps/api/js?libraries=places&key=${process.env.REACT_APP_GOOGLE_PLACES_AUTOCOMPLETE_API_KEY}`
  );

  const search = async (text: string) => {
    if (!hasMap) return;
    setLoading(true);

    const transformResults = (predictions: any[], error?: boolean) => {
      if (error) {
        return [
          {
            id: '1',
            title: API_ERROR,
          },
        ];
      }

      if (isEmpty(predictions) || !predictions) {
        return [
          {
            id: '1',
            title: NO_RESULTS,
          },
        ];
      }

      return predictions.map((p: { place_id: string; description: string }) => {
        return {
          id: p.place_id,
          title: p.description,
        };
      });
    };

    const placesService = new google.maps.places.AutocompleteService();

    try {
      await new Promise((r) => setTimeout(r, 3000));

      placesService.getPlacePredictions(
        {
          input: text,
          types: [props.autocompleteType ? props.autocompleteType : 'address'],
        },
        (predictions, status) => {
          if (status === 'OK' || status === 'ZERO_RESULTS') {
            setSearchData(transformResults(predictions));
          } else {
            setSearchData(transformResults([], true));
          }

          setLoading(false);
        }
      );
    } catch (e) {
      setSearchData(transformResults([], true));
      setLoading(false);
    }
  };

  const getLocationData = async (placeId: string, placeTitle: string) => {
    if (placeTitle === NO_RESULTS || placeTitle === API_ERROR) return;

    const placesService = new google.maps.places.PlacesService(
      document.createElement('div')
    );

    setLoadingData(true);
    setLoading(true);

    try {
      if (placeId === 'initial') {
        // if placeId is initial do nothing
        props.onSelect();
        setLoading(false);
        setLoadingData(false);
      } else {
        placesService.getDetails(
          {
            placeId: placeId,
            fields: ['address_component', 'formatted_address', 'geometry'],
          },
          (result: any, status) => {
            if (status === 'OK') {
              props.onSelect(parseGooglePlaceData(result));
            }

            setLoading(false);
            setLoadingData(false);
          }
        );
      }
    } catch (e) {
      setLoading(false);
      setLoadingData(false);
    }
  };

  const onKeyUp = (e: any) => {
    //enter
    if (
      e.charCode === 13 &&
      searchValue.length > 2 &&
      !loading &&
      !loadingData
    ) {
      search(searchValue);
    }
  };

  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }

    if (searchValue.length > 2 && !loading && !loadingData) {
      const timerId = setTimeout(() => {
        search(searchValue);
      }, 800);
      setTimer(timerId);
    }
  }, [searchValue]);

  return (
    <>
      <Search
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        resetValue={() => setSearchValue('')}
        placeholder="Search for a Location"
        onKeyUp={onKeyUp}
      />

      {loading ? (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      ) : (
        <Results>
          {searchData.map((item) => (
            <LocationItemContainer key={item.id}>
              <Interactions
                type="next"
                value={item.title}
                onClick={() => {
                  if (!loadingData) {
                    getLocationData(item.id, item.title);
                  }
                }}
                {...props.interactionProps}
              />
            </LocationItemContainer>
          ))}
        </Results>
      )}
    </>
  );
};

export default React.memo(LocationSearch);
