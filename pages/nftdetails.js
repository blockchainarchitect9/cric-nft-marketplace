import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";

//INTERNAL IMPORT
import { Button, Category, Brand } from "../components/componentindex";
import NFTDetailsPage from "../nftdetails/NFTDetailsPage";

//IMPORT SMART CONTRACT DATA
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext";
const NFTDetails = () => {
  const { currentAccount } = useContext(NFTMarketplaceContext);

  const [nft, setNft] = useState({
    image: "",
    tokenId: "",
    name: "",
    owner: "",
    price: "",
    seller: "",
  });

  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    setNft(router.query);
  }, [router.isReady]);

  return (
    <div>
      <NFTDetailsPage nft={nft} />
      <Category />
      <Brand />
    </div>
  );
};

export default NFTDetails;
