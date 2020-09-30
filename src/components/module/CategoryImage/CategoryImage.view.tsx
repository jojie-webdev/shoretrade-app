import React from 'react';

import {
  CtgBugsScampi,
  CtgCaviar,
  CtgClams,
  CtgCrabs,
  CtgFillets,
  CtgFish,
  CtgFishCuts,
  CtgLobsters,
  CtgMussels,
  CtgOctopus,
  CtgOysters,
  CtgPrawns,
  CtgScallopMeat,
  CtgScallopsShell,
  CtgShellfish,
  CtgSmoked,
  CtgSquids,
  CtgTuna,
} from 'components/base/SVG';

import { CategoryImageProps } from './CategoryImage.props';
import { Circle, Container } from './CategoryImage.style';

const CategoryImage = ({
  id,
  cBorderRadius,
  circled = false,
  maxHeight,
  customSVGSize,
  containerHeight,
}: CategoryImageProps) => {
  const upperCaseId = id.toUpperCase();

  const SVG = () => {
    switch (upperCaseId) {
      case '8123E9D4-9A96-4398-9A7B-2F169E99690E':
        return (
          <CtgClams
            sizeMultiplier={customSVGSize ? customSVGSize : 1.75}
            height={maxHeight}
          />
        );
      case 'BD1EA44F-63E9-44E8-8BD6-5213BE85DA7C':
        return (
          <CtgCrabs
            sizeMultiplier={customSVGSize ? customSVGSize : 1.75}
            height={maxHeight}
          />
        );
      case '48B46427-82D3-434C-AFC4-492000FFD5C2':
        return (
          <CtgFillets
            sizeMultiplier={customSVGSize ? customSVGSize : 1.75}
            height={maxHeight}
          />
        );
      case '3AE0F9A5-15C2-4EFE-9A75-1956762019A9':
        return (
          <CtgFish
            sizeMultiplier={customSVGSize ? customSVGSize : 1.75}
            height={maxHeight}
          />
        );
      case 'A13DA4C1-C103-4390-81F6-3ACB0BDC9FDB':
        return (
          <CtgFishCuts
            sizeMultiplier={customSVGSize ? customSVGSize : 1.75}
            height={maxHeight}
          />
        );
      case '53A435E4-5355-4949-81A5-1C94DEE95317':
        return (
          <CtgLobsters
            sizeMultiplier={customSVGSize ? customSVGSize : 1.75}
            height={maxHeight}
          />
        );
      case 'E6E7DCAB-126F-4E22-B1ED-681D086C6B31':
        return (
          <CtgOctopus
            sizeMultiplier={customSVGSize ? customSVGSize : 1.75}
            height={maxHeight}
          />
        );
      case 'B6367227-6892-4DC6-9C9A-32DF9AB8284A':
        return (
          <CtgOysters
            sizeMultiplier={customSVGSize ? customSVGSize : 1.75}
            height={maxHeight}
          />
        );
      case 'B920A5A8-EF5D-4BF9-95A0-0FECC19BFB2F':
        return (
          <CtgPrawns
            sizeMultiplier={customSVGSize ? customSVGSize : 1.75}
            height={maxHeight}
          />
        );
      case 'C07B5FFD-E668-4DF3-B9FC-462F414D4E46':
        return (
          <CtgShellfish
            sizeMultiplier={customSVGSize ? customSVGSize : 1.75}
            height={maxHeight}
          />
        );
      case 'A6DFB3C8-7F9B-4CF4-B436-5B0E84872024':
        return (
          <CtgSmoked
            sizeMultiplier={customSVGSize ? customSVGSize : 1.75}
            height={maxHeight}
          />
        );
      case 'F9679552-7B86-4911-8EB7-FACEAB4D7BAE':
        return (
          <CtgSquids
            sizeMultiplier={customSVGSize ? customSVGSize : 1.75}
            height={maxHeight}
          />
        );
      case '08714EE7-AAE7-43FD-B692-996A5C06B433':
        return (
          <CtgTuna
            sizeMultiplier={customSVGSize ? customSVGSize : 1.75}
            height={maxHeight}
          />
        );
      case '964087D2-3F9E-46DC-A446-1BDAE606601E':
        return (
          <CtgBugsScampi
            sizeMultiplier={customSVGSize ? customSVGSize : 1.75}
            height={maxHeight}
          />
        );
      case '3C984EEA-3040-4E88-8686-5019C7455698':
        return (
          <CtgCaviar
            sizeMultiplier={customSVGSize ? customSVGSize : 1.75}
            height={maxHeight}
          />
        );
      case '3A6714A2-6D6F-4BEF-8FDA-8E4D70289CA1':
        return (
          <CtgMussels
            sizeMultiplier={customSVGSize ? customSVGSize : 1.75}
            height={maxHeight}
          />
        );
      case '3B44272B-E8FC-42DE-B797-0B7DD5AA81D2':
        return (
          <CtgScallopMeat
            sizeMultiplier={customSVGSize ? customSVGSize : 1.75}
            height={maxHeight}
          />
        );
      case '50645A22-5018-4C6D-A3B8-1B789CC2EEC8':
        return (
          <CtgScallopsShell
            sizeMultiplier={customSVGSize ? customSVGSize : 1.75}
            height={maxHeight}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Container
      style={{ height: containerHeight }}
      cBorderRadius={cBorderRadius}
      circled={circled}
    >
      {circled ? <Circle>{SVG()}</Circle> : <>{SVG()}</>}
    </Container>
  );
};

export default React.memo(CategoryImage);
