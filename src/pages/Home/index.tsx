import React from "react";
import "./Home.scss";
import Hero from "./Hero";
import CalculateProfit from "./CalculateProfit";
import YourFarm from "./YourFarm";
import StartJourney from "./StartJourney";
import Footer from "./Footer";
const Home: React.FC = () => {
  return (
    <main className="home">
      <Hero />
      <CalculateProfit />
      <YourFarm />
      <StartJourney />
      <Footer />
    </main>
  );
};

export default Home;
