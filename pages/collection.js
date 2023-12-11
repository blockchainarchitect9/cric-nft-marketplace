import React from "react";

//INTERNAL IMPORT
import Style from "../styles/collection.module.css";
import images from "../img";
import {
  Banner,
  CollectionProfile,
  NFTCardTwo,
} from "../collection/collectionindex";
import { Slider, Brand } from "../components/componentindex";
import Filter from "../components/Filter/Filter";

const collection = () => {
  const collectionArray = [
    {
      image: images.nft_image_11,
    },
    {
      image: images.nft_image_12,
    },
    {
      image: images.nft_image_13,
    },
    {
      image: images.nft_image_14,
    },
    {
      image: images.nft_image_15,
    },
    {
      image: images.nft_image_16,
    },
    {
      image: images.nft_image_17,
    },
    {
      image: images.nft_image_18,
    },
  ];
  return (
    <div className={Style.collection}>
      <Banner bannerImage={images.hero2} />
      <CollectionProfile />
      <Filter />
      <NFTCardTwo NFTData={collectionArray} />

      <Slider />
      <Brand />
    </div>
  );
};

export default collection;
