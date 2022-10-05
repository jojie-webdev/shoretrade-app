import React, { useEffect, useState } from 'react';

import Alert from 'components/base/Alert';
// import Checkbox from 'components/base/Checkbox/Checkbox.view';
import Interactions from 'components/base/Interactions';
import Radio from 'components/base/Radio';
import Select from 'components/base/Select';
import Typography from 'components/base/Typography/Typography.view';
import MobileFooter from 'components/layout/MobileFooter';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Row } from 'react-grid-system';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import {
  CHOICES,
  PACKAGING,
} from 'routes/Seller/AddProduct/AddPackaging/AddPackaging.constants';
import { Polystyrene, Sfm } from 'types/store/GetAvailableCrates';
import { Store } from 'types/store/Store';

import Button from '../../../../components/base/Button';
import { AddPackagingProps, CustomSize } from './AddPackaging.props';
import {
  // Aquafuture,
  Choices,
  Container,
  SelectWrapper,
  StyledTextField,
} from './AddPackaging.style';

const AddPackaging = ({
  editableListing,
  listingFormData,
  onAddPackaging,
  navBack,
}: AddPackagingProps) => {
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  const availableCrates = useSelector(
    (state: Store) => state.getAvailableCrates.data?.data
  );
  const sfm = availableCrates?.sfm.filter((s) => !!s.short_code) || [];
  const polystyrene = availableCrates?.polystyrene || [];

  const [choice, setChoice] = useState('');
  const [selectedId, setSelectedId] = useState(
    editableListing?.packaging?.id || ''
  );
  const [isAirlineApproved, setIsAirlineApproved] = useState<
    boolean | undefined
  >(editableListing?.packaging?.custom?.airlineApproved);
  // eslint-disable-next-line
  const [isAquafuture, setIsAquafuture] = useState<boolean>(
    editableListing?.isAquafuture || false
  );
  const [customSize, setCustomSize] = useState<CustomSize>({
    width: editableListing?.packaging?.custom?.width?.toString() || '',
    height: editableListing?.packaging?.custom?.height?.toString() || '',
    length: editableListing?.packaging?.custom?.length?.toString() || '',
  });

  const transformPolystyrene = (
    data: Polystyrene[]
  ): { label: string; value: string }[] => {
    return data.map((d) => {
      return { label: d.label, value: d.id };
    });
  };

  const transformSfm = (data: Sfm[]): { label: string; value: string }[] => {
    return data.map((d) => {
      return { label: d.label, value: d.id };
    });
  };

  const onNext = () => {
    onAddPackaging({
      isAquafuture,
      ...(choice !== '' && choice !== PACKAGING.custom
        ? { id: selectedId }
        : {}),
      ...(choice === PACKAGING.custom
        ? {
            custom: {
              width: Number(customSize.width),
              height: Number(customSize.height),
              length: Number(customSize.length),
              airlineApproved: isAirlineApproved,
            },
          }
        : {}),
    });
  };

  useEffect(() => {
    if (availableCrates && editableListing.packaging) {
      const isCustom = editableListing.packaging?.custom;
      if (isCustom) {
        setChoice(PACKAGING.custom);
        return;
      }

      const isSfm = sfm.find((s) => s.id === editableListing.packaging?.id);
      if (isSfm) {
        setChoice(PACKAGING.sfm);
        return;
      }

      const isPoly = polystyrene.find(
        (p) => p.id === editableListing.packaging?.id
      );
      if (isPoly) {
        setChoice(PACKAGING.polystyrene);
        return;
      }
    }
    // eslint-disable-next-line
  }, [availableCrates, editableListing.packaging]);

  // const isAlreadyCreated = editableListing.isAlreadyCreated;

  const isNextDisabled =
    choice === '' ||
    (choice !== '' && choice !== PACKAGING.custom && !selectedId) ||
    (choice === PACKAGING.custom &&
      Object.values(customSize).some((val) => val === ''));

  return (
    <Container>
      <Choices>
        {CHOICES.map((p) => (
          <div key={p.value}>
            <Interactions
              type="radio"
              padding="16px 24px"
              pressed={p.value === choice}
              onClick={() => {
                if (p.value !== PACKAGING.custom) {
                  setIsAirlineApproved(undefined);
                  setCustomSize({ width: '', height: '', length: '' });
                }
                if (p.value === PACKAGING.custom) {
                  setIsAirlineApproved(false);
                }
                setSelectedId('');
                setChoice(p.value);
              }}
            >
              <Typography color="noshade">{p.title}</Typography>
              <Typography variant="caption" color="shade6">
                {p.subtitle}
              </Typography>
            </Interactions>

            {p.value === choice && choice === PACKAGING.polystyrene && (
              <div>
                <SelectWrapper
                  value={selectedId}
                  options={transformPolystyrene(polystyrene)}
                  onChange={({ value }) => setSelectedId(value)}
                  placeholder="Select type (pre-approved box sizes)"
                />
                {selectedId ? (
                  <Alert
                    content="This product is airline approved!"
                    variant="success"
                    fullWidth
                    style={{
                      margin: '12px 0',
                    }}
                  />
                ) : (
                  <div
                    style={{
                      margin: '12px 0',
                    }}
                  />
                )}
              </div>
            )}

            {p.value === choice && choice === PACKAGING.sfm && (
              <div
                style={{
                  marginBottom: '12px',
                }}
              >
                <Select
                  value={selectedId}
                  options={transformSfm(sfm)}
                  onChange={({ value }) => setSelectedId(value)}
                  placeholder="Select type (pre-approved box sizes)"
                />
              </div>
            )}

            {p.value === choice && choice === PACKAGING.custom && (
              <div>
                <Alert
                  content="Is your packaging airline approved?"
                  variant="alert"
                  fullWidth
                />
                <div className="radio-group">
                  <Radio
                    label="Yes"
                    checked={isAirlineApproved === true}
                    onClick={() => setIsAirlineApproved(true)}
                  />
                  <Radio
                    label="No"
                    checked={isAirlineApproved === false}
                    onClick={() => setIsAirlineApproved(false)}
                  />
                </div>
                <div className="input-group">
                  <StyledTextField
                    type="number"
                    inputType="decimal"
                    label={'Width'}
                    value={customSize.width}
                    onChangeText={(v) => {
                      if (!Number.isNaN(Number(v))) {
                        setCustomSize((ps) => ({
                          ...ps,
                          width: v,
                        }));
                      }
                    }}
                    min={0}
                    placeholder="20 cm"
                  />
                  <StyledTextField
                    type="number"
                    inputType="decimal"
                    label={'Height'}
                    value={customSize.height}
                    onChangeText={(v) => {
                      if (!Number.isNaN(Number(v))) {
                        setCustomSize((ps) => ({
                          ...ps,
                          height: v,
                        }));
                      }
                    }}
                    min={0}
                    placeholder="20 cm"
                  />
                  <StyledTextField
                    type="number"
                    inputType="decimal"
                    label={'Length'}
                    value={customSize.length}
                    onChangeText={(v) => {
                      if (!Number.isNaN(Number(v))) {
                        setCustomSize((ps) => ({
                          ...ps,
                          length: v,
                        }));
                      }
                    }}
                    min={0}
                    placeholder="20 cm"
                  />
                </div>

                {isAirlineApproved === false && (
                  <Alert
                    content="You won’t be able to ship this product via air"
                    variant="error"
                    fullWidth
                    style={{
                      marginTop: 16,
                    }}
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </Choices>

      {/* {!isAlreadyCreated ? (
        <Aquafuture>
          <div className="checkbox-view">
            <Checkbox
              checked={isAquafuture}
              onClick={() => setIsAquafuture((a) => !a)}
            />
          </div>

          <div className="text-container">
            <Typography
              className="checkbox-alt-label"
              color="noshade"
              variant="label"
              onClick={() => setIsAquafuture((a) => !a)}
            >
              This is an Aquafuture Listing.
            </Typography>
            <Typography color="shade5" variant="caption">
              It has not been boxed or weighted yet.
            </Typography>
          </div>
        </Aquafuture>
      ) : (
        )} */}
      <div style={{ margin: '24px 0 40px 0' }} />

      {!isMobile && (
        <Row justify="start" nogutter>
          <Button
            variant={'outline'}
            text="Back"
            onClick={() => {
              navBack();
            }}
            className="back-btn"
          />
          <Button
            variant="primary"
            text="Next"
            className="next-btn"
            disabled={isNextDisabled}
            onClick={onNext}
          />
        </Row>
      )}

      <MobileFooter>
        <Button
          takeFullWidth
          variant={'outline'}
          text="Back"
          onClick={() => {
            navBack();
          }}
          style={{ marginRight: 8 }}
        />
        <Button
          takeFullWidth
          variant="primary"
          text="Next"
          disabled={isNextDisabled}
          onClick={onNext}
        />
      </MobileFooter>
    </Container>
  );
};

export default AddPackaging;
