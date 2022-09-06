import React from "react";
import illustration from "assets/images/hero_illustration.png";

const Hero = () => {
  return (
    <div className="mx pad">
      <div className="hero">
        <div className="hero_content">
          <h1>
            Stable & <br /> Profitable <br /> Yield Farming
          </h1>
          <p>Get started with the easiest and most secure platform</p>
        </div>
        <div className="hero_abstract">
          <img src={illustration} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
