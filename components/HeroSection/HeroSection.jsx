import React, { useState, useEffect, useContext } from "react";

import Image from "next/image";

// INTERNAL IMPORT
import Style from "./HeroSection.module.css";
import { Button } from "../componentindex";
import images from "../../img";

// SMART CONTRACT IMPORT
import { NFTMarketplaceContext } from "../../context/NFTMarketplaceContext";

const HeroSection = () => {
  const { titleData } = useContext(NFTMarketplaceContext);
  return (
    <div className={Style.heroSection}>
      <div className={Style.heroSection_box}>
        <div className={Style.heroSection_box_left}>
          <h1>{titleData} </h1>
          <p>
            Discover the most outstanding cricket NFTs.Create your NFTs and sell
            them
          </p>
          <Button btnName="Start your search" />
        </div>
        <div className={Style.heroSection_box_right}>
          <Image
            src={images.hero}
            alt="Hero section"
            width={800}
            height={600}
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
