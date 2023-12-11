import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";

// INTERNAL IMPORT
import Style from "../styles/index.module.css";
import {
  HeroSection,
  Service,
  BigNFTSlider,
  Subscribe,
  Title,
  Category,
  Filter,
  NFTCard,
  Collection,
  AudioLive,
  FollowerTab,
  Slider,
  Brand,
  Video,
  Loader,
} from "../components/componentindex";
import { getTopCreators } from "../TopCreators/TopCreators";

//IMPORTING CONTRACT DATA
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext";

const Home = () => {
  const { checkIfWalletConnected, currentAccount } = useContext(
    NFTMarketplaceContext
  );
  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  const { fetchNFTs } = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);

  useEffect(() => {
    //if (currentAccount) {
    fetchNFTs().then((items) => {
      console.log("Items:::", items);
      setNfts(items.reverse());
      setNftsCopy(items);
    });
    //}
  }, []);

  const creators = getTopCreators(nfts);

  return (
    <div className={Style.homePage}>
      <HeroSection />
      <Service />
      <BigNFTSlider />
      <Title
        heading="Latest Audio Collection"
        paragraph="Discover the most outstanding NFTs of your favourite cricketers"
      />
      <AudioLive />
      {creators.length == 0 ? (
        <Loader />
      ) : (
        <FollowerTab TopCreator={creators} />
      )}
      <Slider />
      <Title
        heading="New Collection"
        paragraph="Discover the most outstanding NFTs of your favourite cricketers"
      />
      <Collection />
      <Title
        heading="Featured NFTs"
        paragraph="Discover the most outstanding NFTs of your favourite cricketers"
      />
      <Filter />
      {nfts.length == 0 ? <Loader /> : <NFTCard NFTData={nfts} />}
      <Title
        heading="Browse by category"
        paragraph="Explore the NFTs in the most featured categories"
      />
      <Category />
      <Subscribe />
      <Brand />
      <Video />
    </div>
  );
};

export default Home;
