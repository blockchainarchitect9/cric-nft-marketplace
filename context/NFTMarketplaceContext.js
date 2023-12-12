import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import axios from "axios";

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
const projectSecretKey = process.env.NEXT_PUBLIC_SECRECT_KEY;
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecretKey}`).toString(
  "base64"
)}`;

//INTERNAL  IMPORT
import { NFTMarketplaceAddress, NFTMarketplaceABI } from "./constants";

//---FETCHING SMART CONTRACT
const fetchContract = (signerOrProvider) =>
  new ethers.Contract(
    NFTMarketplaceAddress,
    NFTMarketplaceABI,
    signerOrProvider
  );

//---CONNECTING WITH SMART CONTRACT

const connectingWithSmartContract = async () => {
  try {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);
    return contract;
  } catch (error) {
    console.log("Something went wrong while connecting with contract", error);
  }
};

export const NFTMarketplaceContext = React.createContext();

export const NFTMarketplaceProvider = ({ children }) => {
  const titleData = "Discover, collect, and sell NFTs";

  //------USESTAT
  const [error, setError] = useState("");
  const [openError, setOpenError] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  const [accountBalance, setAccountBalance] = useState("");
  const router = useRouter();

  //---CHECK IF WALLET IS CONNECTD

  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum)
        return setOpenError(true), setError("Install MetaMask");

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        // console.log(accounts[0]);
      } else {
        // setError("No Account Found");
        // setOpenError(true);
        console.log("No account");
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const getBalance = await provider.getBalance(accounts[0]);
      const bal = ethers.utils.formatEther(getBalance);
      setAccountBalance(bal);
    } catch (error) {
      // setError("Something wrong while connecting to wallet");
      // setOpenError(true);
      console.log("not connected");
    }
  };

  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  //---CONNET WALLET FUNCTION
  const connectWallet = async () => {
    try {
      if (!window.ethereum)
        return setOpenError(true), setError("Install MetaMask");

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log(accounts);
      setCurrentAccount(accounts[0]);

      // window.location.reload();
      connectingWithSmartContract();
    } catch (error) {
      // setError("Error while connecting to wallet");
      // setOpenError(true);
    }
  };

  const uploadToIPFS = async (file) => {
    try {
      const formData = new FormData();
      const apiKey = "8094e1e59bd84325eb26";
      const apiSecret =
        "67a79430f3e5d233dc060fc0e6a5420493f0b2638d94f43206a39323e6d887b3";
      const ipfsUrl = "https://api.pinata.cloud/pinning/pinFileToIPFS";

      console.log("API Key:", apiKey);
      console.log("API Secret:", apiSecret);
      console.log("IPFS URL:", ipfsUrl);

      formData.append("file", file);
      console.log("Form Data:", formData);
      const resFile = await axios({
        method: "post",
        url: ipfsUrl,
        data: formData,
        headers: {
          pinata_api_key: apiKey,
          pinata_secret_api_key: apiSecret,
          "Content-Type": "multipart/form-data",
          accept: "application/json",
        },
      });
      console.log("Response:", resFile);
      console.log("IPFS Hash:", resFile.data.IpfsHash);
      const url = `https://tan-top-tiglon-899.mypinata.cloud/ipfs/${resFile.data.IpfsHash}?pinataGatewayToken=hiqILyuKXpz4WaOJqzc3vUkq8Zat31UwK6eOKAz2-eL24FoNnjsKtsL8qAS3cnmV&_gl=1*1p0pxn4*_ga*ODE5OTM1Njk4LjE2OTUxODcxNjY.*_ga_5RMPXG14TE*MTcwMTk4MTM1NC44LjEuMTcwMTk4MTkzMy40OS4wLjA.`;
      // const provider = new ethers.providers.Web3Provider(window.ethereum);
      // let contract = connectingWithSmartContract();
      // const signer = contract.connect(provider.getSigner());
      // console.log("Signer", signer);
      // signer.add(currentAccount, url);
      console.log("URL:", url);
      return url;
    } catch (e) {
      alert(e);
    }
  };

  //---CREATENFT FUNCTION
  const createNFT = async (name, price, image, description, router) => {
    if (!name || !description || !price || !image)
      return setError("Data Is Missing"), setOpenError(true);

    try {
      const data = JSON.stringify({ name, description, image });
      const apiKey = "8094e1e59bd84325eb26";
      const apiSecret =
        "67a79430f3e5d233dc060fc0e6a5420493f0b2638d94f43206a39323e6d887b3";
      const ipfsUrl = "https://api.pinata.cloud/pinning/pinJSONToIPFS";

      const resFile = await axios({
        method: "post",
        url: ipfsUrl,
        data: data,
        headers: {
          pinata_api_key: apiKey,
          pinata_secret_api_key: apiSecret,
          "Content-Type": "application/json",
          accept: "application/json",
        },
      });
      const url = `https://tan-top-tiglon-899.mypinata.cloud/ipfs/${resFile.data.IpfsHash}?pinataGatewayToken=hiqILyuKXpz4WaOJqzc3vUkq8Zat31UwK6eOKAz2-eL24FoNnjsKtsL8qAS3cnmV&_gl=1*1p0pxn4*_ga*ODE5OTM1Njk4LjE2OTUxODcxNjY.*_ga_5RMPXG14TE*MTcwMTk4MTM1NC44LjEuMTcwMTk4MTkzMy40OS4wLjA.`;
      await createSale(url, price);
      router.push("/search");
    } catch (error) {
      setError("Error while creating NFT");
      setOpenError(true);
      alert(error);
    }
  };

  //--- createSale FUNCTION
  const createSale = async (url, formInputPrice, isReselling, id) => {
    try {
      console.log(url, formInputPrice, isReselling, id);
      const price = ethers.utils.parseUnits(formInputPrice, "ether");
      const contract = await connectingWithSmartContract();
      const listingPrice = await contract.getListingPrice();

      console.log(listingPrice);
      const transaction = !isReselling
        ? await contract.createToken(url, price, {
            value: listingPrice,
          })
        : await contract.resellToken(id, price, {
            value: listingPrice,
          });

      await transaction.wait();
      console.log(transaction);
    } catch (error) {
      setError("error while creating sale");
      setOpenError(true);
      console.log(error);
    }
  };

  //--FETCHNFTS FUNCTION
  const fetchNFTs = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        "https://eth-sepolia.g.alchemy.com/v2/ws8MSG_ngHJux7SoFIm880yTbZuvElml"
      );
      console.log(provider);
      const contract = fetchContract(provider);
      const data = await contract.fetchMarketItems();
      console.log("NFTS Fetched:", data);
      const items = await Promise.all(
        data.map(
          async ({ tokenId, seller, owner, price: unformattedPrice }) => {
            const tokenURI = await contract.tokenURI(tokenId);
            const {
              data: { image, name, description },
            } = await axios.get(tokenURI, {});
            const price = ethers.utils.formatUnits(
              unformattedPrice.toString(),
              "ether"
            );

            return {
              price,
              tokenId: tokenId.toNumber(),
              seller,
              owner,
              image,
              name,
              description,
              tokenURI,
            };
          }
        )
      );

      return items;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNFTs();
  }, []);

  //--FETCHING MY NFT OR LISTED NFTs
  const fetchMyNFTsOrListedNFTs = async (type) => {
    try {
      if (currentAccount) {
        const contract = await connectingWithSmartContract();
        const data =
          type == "fetchItemsListed"
            ? await contract.fetchItemsListed()
            : await contract.fetchMyNFTs();
        console.log("Data***", data);
        const items = await Promise.all(
          data.map(
            async ({ tokenId, seller, owner, price: unformattedPrice }) => {
              const tokenURI = await contract.tokenURI(tokenId);
              const {
                data: { image, name, description },
              } = await axios.get(tokenURI);
              const price = ethers.utils.formatUnits(
                unformattedPrice.toString(),
                "ether"
              );

              return {
                price,
                tokenId: tokenId.toNumber(),
                seller,
                owner,
                image,
                name,
                description,
                tokenURI,
              };
            }
          )
        );
        return items;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMyNFTsOrListedNFTs();
  }, []);

  //---BUY NFTs FUNCTION
  const buyNFT = async (nft) => {
    try {
      const contract = await connectingWithSmartContract();
      const price = ethers.utils.parseUnits(nft.price.toString(), "ether");

      const transaction = await contract.createMarketSale(nft.tokenId, {
        value: price,
      });

      await transaction.wait();
      router.push("/author");
    } catch (error) {
      setError("Error While buying NFT");
      setOpenError(true);
    }
  };

  //----TRANSFER FUNDS

  const fetchTransferFundsContract = (signerOrProvider) =>
    new ethers.Contract(
      transferFundsAddress,
      transferFundsABI,
      signerOrProvider
    );

  const connectToTransferFunds = async () => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchTransferFundsContract(signer);
      return contract;
    } catch (error) {
      console.log(error);
    }
  };
  //---TRANSFER FUNDS
  const [transactionCount, setTransactionCount] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const transferEther = async (address, ether, message) => {
    try {
      //if (currentAccount) {
      const contract = await connectToTransferFunds();
      console.log(address, ether, message);

      const unFormatedPrice = ethers.utils.parseEther(ether);
      // //FIRST METHOD TO TRANSFER FUND
      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: address,
            gas: "0x5208",
            value: unFormatedPrice._hex,
          },
        ],
      });

      const transaction = await contract.addDataToBlockchain(
        address,
        unFormatedPrice,
        message
      );

      console.log(transaction);

      setLoading(true);
      transaction.wait();
      setLoading(false);

      const transactionCount = await contract.getTransactionCount();
      setTransactionCount(transactionCount.toNumber());
      window.location.reload();
      //}
    } catch (error) {
      console.log(error);
    }
  };

  //FETCH ALL TRANSACTION
  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const contract = await connectToTransferFunds();

        const avaliableTransaction = await contract.getAllTransactions();

        const readTransaction = avaliableTransaction.map((transaction) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(
            transaction.timestamp.toNumber() * 1000
          ).toLocaleString(),
          message: transaction.message,
          amount: parseInt(transaction.amount._hex) / 10 ** 18,
        }));

        setTransactions(readTransaction);
        console.log(transactions);
      } else {
        console.log("On Ethereum");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <NFTMarketplaceContext.Provider
      value={{
        checkIfWalletConnected,
        connectWallet,
        uploadToIPFS,
        createNFT,
        fetchNFTs,
        fetchMyNFTsOrListedNFTs,
        buyNFT,
        createSale,
        currentAccount,
        titleData,
        setOpenError,
        openError,
        error,
        transferEther,
        getAllTransactions,
        loading,
        accountBalance,
        transactionCount,
        transactions,
      }}
    >
      {children}
    </NFTMarketplaceContext.Provider>
  );
};
