import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';

import {
  /* PLOP_INJECT_IMPORT */
  Bell,
  Sold,
  CommentsAlt,
  EnvolopeAlt,
  Desktop,
  NewWave51,
  WaveNew31,
  Cross7,
  ShoretradeAnchor,
  Group204,
  Group194,
  Group195,
  Group196,
  Wave51,
  Wave31,
  Wave41,
  TexturedCrab,
  TexturedSwordFish,
  TexturedOctopus,
  Sync,
  CaviarHero,
  OctopusHero,
  AnchorHero,
  ArrowLeftAlt,
  FileBookMarkAlt,
  Fish2,
  Ellipse,
  Minus,
  ChevronDown,
  SubtractHollow,
  Weight,
  FileUpload,
  Bolt,
  BuyerRestaurantBar,
  BuyerHotel,
  Retailer,
  Processor,
  Wholesaler,
  AquacultureProducer,
  WildCatchFishingCompany,
  Tuna,
  Message,
  CheckList,
  DownloadFile,
  TrashCan,
  Amex,
  PlaceholderProfile,
  MarketSectorWholesaler,
  MarketSectorWetShop,
  MarketSectorRetailer,
  MarketSectorRestaurantBar,
  MarketSectorProcessor,
  MarketSectorHotel,
  Clock,
  Paypal,
  Zippay,
  Mastercard,
  Visa,
  RoundedTickInactive,
  RoundedTickActive,
  Menu,
  Expand,
  PlaceholderIcon,
  Notepad,
  Category,
  Home,
  HeartFilled,
  Heart,
  Star,
  StarFilled,
  Oysters,
  Download,
  Fish,
  UpArrow,
  Filter,
  Plane,
  Scale,
  Truck,
  PaperPlane,
  Octopus,
  DollarSign,
  Location,
  Subtract,
  Box,
  Camera,
  Check,
  Help,
  Crab,
  Calendar,
  ArrowRight,
  ArrowLeft,
  Lock,
  Spin,
  DropdownArrow,
  Pen,
  Exit,
  ShoretradeLogo,
  ShoretradeLogo2,
  Dashboard,
  AddBorder,
  Cart,
  CheckBorder,
  Account,
  FileCheck,
  ChevronRight,
  ChevronLeft,
  Search,
  CheckFilled,
  CloseFilled,
  ExclamationFilled,
  QuestionFilled,
  InfoFilled,
  Close,
  Eye,
  EyeOff,
  CarouselChevronRight,
  CarouselChevronLeft,
  Wetshop,
} from '../../../src/components/base/SVG';
import Container from '../../components/Container';

// eslint-disable-next-line react/prop-types
const Content = ({ children }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100vw',
      }}
    >
      {children}
    </div>
  );
};

// eslint-disable-next-line react/prop-types
const Wrapper = ({ children, label }) => {
  return (
    <div
      style={{
        marginLeft: 16,
        marginTop: 16,
        marginBottom: 16,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      {children}
      <div style={{ marginTop: '8px', marginBottom: 16 }}>{label}</div>
    </div>
  );
};

storiesOf('base/SVG', module).add('Summary', () => {
  const [text, setText] = useState('');
  // eslint-disable-next-line react/prop-types
  const Wrapper = ({ children, label }) => {
    return (
      <div
        style={{
          marginLeft: 16,
          marginTop: 16,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        {children}
        <div style={{ marginTop: '8px', color: '#000' }}>{label}</div>
      </div>
    );
  };

  return (
    <Container background="white">
      <Content>
        {/* PLOP_INJECT_INSTANCE*/}
        <Wrapper label="Bell">
          <Bell width={30} height={30} />
        </Wrapper>
        <Wrapper label="Sold">
          <Sold width={30} height={30} />
        </Wrapper>
        <Wrapper label="CommentsAlt">
          <CommentsAlt width={30} height={30} />
        </Wrapper>
        <Wrapper label="EnvolopeAlt">
          <EnvolopeAlt width={30} height={30} />
        </Wrapper>
        <Wrapper label="Desktop">
          <Desktop width={30} height={30} />
        </Wrapper>
        <Wrapper label="NewWave51">
          <NewWave51 width={30} height={30} />
        </Wrapper>
        <Wrapper label="WaveNew31">
          <WaveNew31 width={30} height={30} />
        </Wrapper>
        <Wrapper label="Cross7">
          <Cross7 width={30} height={30} />
        </Wrapper>
        <Wrapper label="ShoretradeAnchor">
          <ShoretradeAnchor width={30} height={30} />
        </Wrapper>
        <Wrapper label="Group204">
          <Group204 width={30} height={30} />
        </Wrapper>
        <Wrapper label="Group194">
          <Group194 width={30} height={30} />
        </Wrapper>
        <Wrapper label="Group195">
          <Group195 width={30} height={30} />
        </Wrapper>
        <Wrapper label="Group196">
          <Group196 width={30} height={30} />
        </Wrapper>
        <Wrapper label="Wave51">
          <Wave51 width={30} height={30} />
        </Wrapper>
        <Wrapper label="Wave31">
          <Wave31 width={30} height={30} />
        </Wrapper>
        <Wrapper label="Wave41">
          <Wave41 width={30} height={30} />
        </Wrapper>
        <Wrapper label="TexturedCrab">
          <TexturedCrab width={30} height={30} />
        </Wrapper>
        <Wrapper label="TexturedSwordFish">
          <TexturedSwordFish width={30} height={30} />
        </Wrapper>
        <Wrapper label="TexturedOctopus">
          <TexturedOctopus width={30} height={30} />
        </Wrapper>
        <Wrapper label="Sync">
          <Sync width={30} height={30} />
        </Wrapper>
        <Wrapper label="CaviarHero">
          <CaviarHero width={30} height={30} />
        </Wrapper>
        <Wrapper label="OctopusHero">
          <OctopusHero width={30} height={30} />
        </Wrapper>
        <Wrapper label="AnchorHero">
          <AnchorHero width={30} height={30} />
        </Wrapper>
        <Wrapper label="ArrowLeftAlt">
          <ArrowLeftAlt width={30} height={30} />
        </Wrapper>
        <Wrapper label="FileBookMarkAlt">
          <FileBookMarkAlt width={30} height={30} />
        </Wrapper>
        <Wrapper label="Fish2">
          <Fish2 width={30} height={30} />
        </Wrapper>
        <Wrapper label="Ellipse">
          <Ellipse width={30} height={30} />
        </Wrapper>
        <Wrapper label="Minus">
          <Minus width={30} height={30} />
        </Wrapper>
        <Wrapper label="ChevronDown">
          <ChevronDown width={30} height={30} />
        </Wrapper>
        <Wrapper label="Weight">
          <Weight width={30} height={30} />
        </Wrapper>
        <Wrapper label="FileUpload">
          <FileUpload width={30} height={30} />
        </Wrapper>
        <Wrapper label="Bolt">
          <Bolt width={30} height={30} />
        </Wrapper>
        <Wrapper label="Wetshop">
          <Wetshop width={30} height={30} />
        </Wrapper>
        <Wrapper label="BuyerRestaurantBar">
          <BuyerRestaurantBar width={30} height={30} />
        </Wrapper>
        <Wrapper label="BuyerHotel">
          <BuyerHotel width={30} height={30} />
        </Wrapper>
        <Wrapper label="Retailer">
          <Retailer width={30} height={30} />
        </Wrapper>
        <Wrapper label="Processor">
          <Processor width={30} height={30} />
        </Wrapper>
        <Wrapper label="Wholesaler">
          <Wholesaler width={30} height={30} />
        </Wrapper>
        <Wrapper label="AquacultureProducer">
          <AquacultureProducer width={30} height={30} />
        </Wrapper>
        <Wrapper label="WildCatchFishingCompany">
          <WildCatchFishingCompany width={30} height={30} />
        </Wrapper>
        <Wrapper label="Tuna">
          <Tuna width={30} height={30} />
        </Wrapper>
        <Wrapper label="Message">
          <Message width={30} height={30} />
        </Wrapper>
        <Wrapper label="CheckList">
          <CheckList width={30} height={30} />
        </Wrapper>
        <Wrapper label="DownloadFile">
          <DownloadFile width={30} height={30} />
        </Wrapper>
        <Wrapper label="TrashCan">
          <TrashCan width={30} height={30} />
        </Wrapper>
        <Wrapper label="Amex">
          <Amex width={30} height={30} />
        </Wrapper>
        <Wrapper label="PlaceholderProfile">
          <PlaceholderProfile width={30} height={30} />
        </Wrapper>

        <Wrapper label="MarketSectorWholesaler">
          <MarketSectorWholesaler width={30} height={30} />
        </Wrapper>
        <Wrapper label="MarketSectorWetShop">
          <MarketSectorWetShop width={30} height={30} />
        </Wrapper>
        <Wrapper label="MarketSectorRetailer">
          <MarketSectorRetailer width={30} height={30} />
        </Wrapper>
        <Wrapper label="MarketSectorRestaurantBar">
          <MarketSectorRestaurantBar width={30} height={30} />
        </Wrapper>
        <Wrapper label="MarketSectorProcessor">
          <MarketSectorProcessor width={30} height={30} />
        </Wrapper>
        <Wrapper label="MarketSectorHotel">
          <MarketSectorHotel width={30} height={30} />
        </Wrapper>
        <Wrapper label="Clock">
          <Clock width={30} height={30} />
        </Wrapper>
        <Wrapper label="Paypal">
          <Paypal width={30} height={30} />
        </Wrapper>
        <Wrapper label="Zippay">
          <Zippay width={30} height={30} />
        </Wrapper>
        <Wrapper label="Mastercard">
          <Mastercard width={30} height={30} />
        </Wrapper>
        <Wrapper label="Visa">
          <Visa width={30} height={30} />
        </Wrapper>
        <Wrapper label="RoundedTickInactive">
          <RoundedTickInactive width={30} height={30} />
        </Wrapper>
        <Wrapper label="RoundedTickActive">
          <RoundedTickActive width={30} height={30} />
        </Wrapper>
        <Wrapper label="Menu">
          <Menu width={30} height={30} />
        </Wrapper>
        <Wrapper label="Expand">
          <Expand width={30} height={30} />
        </Wrapper>
        <Wrapper label="CarouselChevronRight">
          <CarouselChevronRight width={30} height={30} />
        </Wrapper>
        <Wrapper label="CarouselChevronLeft">
          <CarouselChevronLeft width={30} height={30} />
        </Wrapper>
        <Wrapper label="PlaceholderIcon">
          <PlaceholderIcon width={30} height={30} />
        </Wrapper>
        <Wrapper label="Notepad">
          <Notepad width={30} height={30} />
        </Wrapper>
        <Wrapper label="Category">
          <Category width={30} height={30} />
        </Wrapper>
        <Wrapper label="Home">
          <Home width={30} height={30} />
        </Wrapper>
        <Wrapper label="HeartFilled">
          <HeartFilled width={30} height={30} />
        </Wrapper>
        <Wrapper label="Heart">
          <Heart width={30} height={30} />
        </Wrapper>
        <Wrapper label="Star">
          <Star width={30} height={30} />
        </Wrapper>
        <Wrapper label="StarFilled">
          <StarFilled width={30} height={30} />
        </Wrapper>
        <Wrapper label="Oysters">
          <Oysters width={30} height={30} />
        </Wrapper>
        <Wrapper label="Download">
          <Download width={30} height={30} />
        </Wrapper>
        <Wrapper label="Fish">
          <Fish width={30} height={30} />
        </Wrapper>
        <Wrapper label="UpArrow">
          <UpArrow width={30} height={30} />
        </Wrapper>
        <Wrapper label="Filter">
          <Filter width={30} height={30} />
        </Wrapper>
        <Wrapper label="Plane">
          <Plane width={30} height={30} />
        </Wrapper>
        <Wrapper label="Scale">
          <Scale width={30} height={30} />
        </Wrapper>
        <Wrapper label="Truck">
          <Truck width={30} height={30} />
        </Wrapper>
        <Wrapper label="PaperPlane">
          <PaperPlane width={30} height={30} />
        </Wrapper>
        <Wrapper label="Octopus">
          <Octopus width={30} height={30} />
        </Wrapper>
        <Wrapper label="DollarSign">
          <DollarSign width={30} height={30} />
        </Wrapper>
        <Wrapper label="Location">
          <Location width={30} height={30} />
        </Wrapper>
        <Wrapper label="SubtractHollow">
          <SubtractHollow width={30} height={30} />
        </Wrapper>
        <Wrapper label="Subtract">
          <Subtract width={30} height={30} fill={'#F23742'} />
        </Wrapper>
        <Wrapper label="Box">
          <Box width={30} height={30} />
        </Wrapper>
        <Wrapper label="Camera">
          <Camera width={30} height={30} />
        </Wrapper>
        <Wrapper label="Check">
          <Check width={30} height={30} fill="black" />
        </Wrapper>
        <Wrapper label="Help">
          <Help width={30} height={30} fill="black" />
        </Wrapper>
        <Wrapper label="Crab">
          <Crab width={30} height={30} />
        </Wrapper>
        <Wrapper label="Calendar">
          <Calendar width={30} height={30} />
        </Wrapper>
        <Wrapper label="ArrowRight">
          <ArrowRight width={30} height={30} />
        </Wrapper>
        <Wrapper label="ArrowLeft">
          <ArrowLeft width={30} height={30} />
        </Wrapper>
        <Wrapper label="Lock">
          <Lock width={30} height={30} fill="#000" />
        </Wrapper>
        <Wrapper label="Spin">
          <Spin width={30} height={30} />
        </Wrapper>
        <Wrapper label="DropdownArrow">
          <DropdownArrow width={30} height={30} />
        </Wrapper>
        <Wrapper label="Pen">
          <Pen width={30} height={30} />
        </Wrapper>
        <Wrapper label="Exit">
          <Exit width={30} height={30} fill="black" />
        </Wrapper>
        <Wrapper label="ShoretradeLogo">
          <ShoretradeLogo width={30} height={30} />
        </Wrapper>
        <Wrapper label="ShoretradeLogo2">
          <ShoretradeLogo2 width={30} height={30} />
        </Wrapper>
        <Wrapper label="Dashboard">
          <Dashboard width={30} height={30} fill="black" />
        </Wrapper>
        <Wrapper label="AddBorder">
          <AddBorder width={30} height={30} fill="black" />
        </Wrapper>
        <Wrapper label="Cart">
          <Cart width={30} height={30} fill="black" />
        </Wrapper>
        <Wrapper label="CheckBorder">
          <CheckBorder width={30} height={30} fill="black" />
        </Wrapper>
        <Wrapper label="Account">
          <Account width={30} height={30} fill="black" />
        </Wrapper>
        <Wrapper label="FileCheck">
          <FileCheck width={30} height={30} fill="black" />
        </Wrapper>
        <Wrapper label="ChevronRight">
          <ChevronRight width={30} height={30} />
        </Wrapper>
        <Wrapper label="ChevronLeft">
          <ChevronLeft width={30} height={30} />
        </Wrapper>
        <Wrapper label="Search">
          <Search width={30} height={30} />
        </Wrapper>
        <Wrapper label="CheckFilled">
          <CheckFilled width={30} height={30} />
        </Wrapper>
        <Wrapper label="CloseFilled">
          <CloseFilled width={30} height={30} />
        </Wrapper>
        <Wrapper label="ExclamationFilled">
          <ExclamationFilled width={30} height={30} />
        </Wrapper>
        <Wrapper label="QuestionFilled">
          <QuestionFilled width={30} height={30} />
        </Wrapper>
        <Wrapper label="InfoFilled">
          <InfoFilled width={30} height={30} />
        </Wrapper>
        <Wrapper label="Close">
          <Close width={30} height={30} />
        </Wrapper>
        <Wrapper label="Eye">
          <Eye width={30} height={30} />
        </Wrapper>
        <Wrapper label="EyeOff">
          <EyeOff width={30} height={30} />
        </Wrapper>
      </Content>
    </Container>
  );
});
