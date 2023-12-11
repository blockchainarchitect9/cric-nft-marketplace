import React from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./Service.module.css";
import images from "../../img";
const Service = () => {
  return (
    <div className={Style.service}>
      <div className={Style.service_box}>
        <div className={Style.service_box_item}>
          <Image
            src={images.service1}
            alt="Filter & Discover"
            width={100}
            height={100}
            style={{ objectFit: "contain" }}
          />
          <p className={Style.service_box_item_step}>
            <span>Step 1</span>
          </p>
          <h3>Filter & Discover</h3>
          <p>
            Search for and explore these unique digital assets on NFT
            marketplace
          </p>
        </div>
        <div className={Style.service_box_item}>
          <Image
            src={images.service2}
            alt="Filter & Discover"
            width={100}
            height={100}
            style={{ objectFit: "contain" }}
          />
          <p className={Style.service_box_item_step}>
            <span>Step 2</span>
          </p>
          <h3>Connect Wallet</h3>
          <p>Connect with wallet and make transactions</p>
        </div>
        <div className={Style.service_box_item}>
          <Image
            src={images.service3}
            alt="Connect Wallet"
            width={100}
            height={100}
            style={{ objectFit: "contain" }}
          />
          <p className={Style.service_box_item_step}>
            <span>Step 3</span>
          </p>
          <h3>Own NFTs</h3>
          <p>Own the unique NFTs listed in the marketplace</p>
        </div>
        <div className={Style.service_box_item}>
          <Image
            src={images.service1}
            alt="Filter & Discover"
            width={100}
            height={100}
            style={{ objectFit: "contain" }}
          />
          <p className={Style.service_box_item_step}>
            <span>Step 1</span>
          </p>
          <h3>Sell NFTs</h3>
          <p>Create unique NFTs or sell owned NFTs</p>
        </div>
      </div>
    </div>
  );
};

export default Service;
