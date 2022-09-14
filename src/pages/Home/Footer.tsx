import React from "react";

import vvsfinance from "../../assets/partners/vvsfinance.png";
import cryptocom from "../../assets/partners/cryptocom.png";
import debank from "../../assets/partners/debank.png";
import defiwallet from "../../assets/partners/defiwallet.png";
import { ReactComponent as Discord } from "../../assets/icons/discord.svg";
import { ReactComponent as Twitter } from "../../assets/icons/twitter.svg";

const images = [
  { image: cryptocom, alt: "cryptocom", id: Math.random().toString(16) },
  { image: debank, alt: "debank", id: Math.random().toString(16) },
  { image: defiwallet, alt: "defiwallet", id: Math.random().toString(16) },
  { image: vvsfinance, alt: "vvsfinance", id: Math.random().toString(16) },
];

const Banner = ({ images, speed = 10000 }) => {
  const styles = { "--speed": `${speed}ms` } as React.CSSProperties;
  return (
    <div className="inner">
      <div className="wrapper">
        <section style={styles}>
          {images.map(({ id, image }) => (
            <div className="image" key={id}>
              <img src={image} alt={id} />
            </div>
          ))}
        </section>
        <section style={styles}>
          {images.map(({ id, image }) => (
            <div className="image" key={id}>
              <img src={image} alt={id} />
            </div>
          ))}
        </section>
        <section style={styles}>
          {images.map(({ id, image }) => (
            <div className="image" key={id}>
              <img src={image} alt={id} />
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export { Banner };

const Footer = () => {
  return (
    <div className="footer">
      <div className="partners">
        <p style={{ color: "#fff", fontWeight: "600" }} className="mb-30">
          Ecosystem Partners
        </p>
        <div className="banners">
          <Banner images={images} />
        </div>
      </div>
      <div className="icon">
        <p style={{ fontWeight: "600" }}>Follow us on</p>
        <div className="icons">
          <a href="https://twitter.com/DashFinance" target="_blank" rel="noopener noreferrer">
            <Twitter />
          </a>
          <a href="https://discord.gg/xVfRwx7XXg" target="_blank" rel="noopener noreferrer">
            <Discord />
          </a>
        </div>
      </div>
      <div className="copyright">
        <h4>DASH FINANCE STABLE YIELD PLATFORM</h4>
        <p>©dashfinance.live, 2022</p>
      </div>
    </div>
  );
};

export default Footer;
