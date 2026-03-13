
import React from 'react';
import MainSlider from '../components/MainSlider';
import KeywordGrid from '../components/KeywordGrid';
import QuickLinks from '../components/QuickLinks';
import AboutSection from '../components/AboutSection';
import Stats from '../components/Stats';
import Channels from '../components/Channels';
import NewsAndNotice from '../components/NewsAndNotice';
import DonateCTA from '../components/DonateCTA';
import { Page } from '../App';

interface HomePageProps {
  navigateTo: (page: Page, id?: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ navigateTo }) => {
  return (
    <>
      <MainSlider />
      <KeywordGrid navigateTo={navigateTo} />
      <QuickLinks navigateTo={navigateTo} />
      <AboutSection />
      <Stats />
      <Channels />
      <NewsAndNotice />
      <DonateCTA />
    </>
  );
};

export default HomePage;
