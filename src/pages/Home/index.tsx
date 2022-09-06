import React from "react";
import "./Home.scss";
import Hero from "./Hero";
import CalculateProfit from "./CalculateProfit";

const Home: React.FC = () => {
  return (
    <main className="home">
      <Hero />
      <CalculateProfit />
    </main>
  );
};

export default Home;
