import React from "react";

import { ReactComponent as Illustration1 } from "assets/images/logo1.svg";
import { ReactComponent as Illustration2 } from "assets/images/logo2.svg";
import { ReactComponent as Illustration3 } from "assets/images/logo3.svg";

const Hero = () => {
  return (
    <div className="hero pad">
      <div className="mx">
        <div className="hero_content">
          <h1>Stable & Profitable Farming in Cronos</h1>
          <p>Get started with the easiest and most secure platform</p>
        </div>
        <div className="hero_abstract">
          <Illustration1 className="logo1" />
          <Illustration2 className="logo2" />
          <Illustration3 className="logo3" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
