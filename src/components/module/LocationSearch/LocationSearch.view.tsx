import React, { useEffect, useState } from 'react';

import Spinner from 'components/base/Spinner';
import { Location } from 'components/base/SVG';
import TextField from 'components/base/TextField';
import Typography from 'components/base/Typography';
import { isEmpty } from 'ramda';
import parseGooglePlaceData from 'utils/Address/parseGooglePlaceData';
import useScript from 'utils/Hooks/useScript';

import { LocationSearchProps } from './LocationSearch.props';
import {
  Container,
  SearchLocationContainer,
  SpinnerContainer,
  Results,
  Item,
} from './LocationSearch.style';

const NO_RESULTS = 'No results';
const API_ERROR = 'Please try again';

const LocationSearch = ({
  textFieldProps,
  ...props
}: LocationSearchProps): JSX.Element => {
  const [searchValue, setSearchValue] = useState(
    textFieldProps?.value ? String(textFieldProps.value) : ''
  );
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [searchData, setSearchData] = useState<{ id: string; title: string }[]>(
    (props.initialResult || []).map((v) => ({
      id: 'initial',
      title: v,
    }))
  );
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [doSearch, setDoSearch] = useState(!!textFieldProps?.value);

  const [hasMap, error] = useScript(
    `https://maps.googleapis.com/maps/api/js?libraries=places&key=${process.env.REACT_APP_GOOGLE_PLACES_AUTOCOMPLETE_API_KEY}`
  );

  useEffect(() => {
    setSearchData([]);
  }, [searchValue]);

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
      // await new Promise((r) => setTimeout(r, 3000));

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
    if (placeTitle === NO_RESULTS || placeTitle === API_ERROR) {
      setSearchValue('');
      return;
    }

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
              const parsedResult = parseGooglePlaceData(result);
              props.onSelect(parsedResult);
              setSearchValue(parsedResult.address);
            }

            setLoading(false);
            setLoadingData(false);
            setSearchData([]);
            setDoSearch(true);
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
    if (searchValue.length > 2 && !loading && !loadingData && !doSearch) {
      const timerId = setTimeout(() => {
        search(searchValue);
      }, 800);
      setTimer(timerId);
    }
  }, [searchValue]);

  return (
    <Container onClick={() => setDoSearch(false)}>
      <TextField
        {...textFieldProps}
        LeftComponent={<Location />}
        // RightComponent={
        //   doSearch ? (
        //     <SearchLocationContainer onClick={() => setDoSearch(false)}>
        //       <Typography variant="label">Search</Typography>
        //     </SearchLocationContainer>
        //   ) : null
        // }
        // disabled={doSearch}
        placeholder="Search for a Location"
        onKeyUp={onKeyUp}
        value={searchValue}
        onChangeText={(val) => setSearchValue(val)}
      />

      {loading && (
        <Results>
          <SpinnerContainer>
            <Spinner width={32} height={32} />
          </SpinnerContainer>
        </Results>
      )}

      {!loading && !isEmpty(searchData) && (
        <Results>
          {searchData.map((item) => (
            <Item
              key={item.id}
              isSelected={item.title === searchValue}
              className="item"
              onClick={() => {
                if (!loadingData) {
                  getLocationData(item.id, item.title);
                }
              }}
            >
              {item.title}
            </Item>
          ))}
        </Results>
      )}
    </Container>
  );
};

export default React.memo(LocationSearch);
