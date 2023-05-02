import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractAbi, contractAddress } from "../constants/constant";

// import { parse } from '@ethersproject/transactions';
export const TransactionContext = React.createContext();

const { ethereum } = window;

const EthereumContract = () => {
  // A Web3Provider wraps a standard Web3 provider, which is
  // what MetaMask injects as window.ethereum into each page
  const provider = new ethers.providers.Web3Provider(ethereum);

  // The MetaMask plugin also allows signing transactions to
  // send ether and pay to change state within the blockchain.
  // For this, you need the account signer...
  const signer = provider.getSigner();

  const transactionsContract = new ethers.Contract(
    contractAddress,
    contractAbi,
    signer
  );

  return transactionsContract;
};

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount")
  );
  const [transactions, setTransactions] = useState([]);
  const [verifications, setVerifications] = useState([]);

  const [balance, setBalance] = useState();

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const transactionsContract = EthereumContract();

        const availableTransactions =
          await transactionsContract.getAllTransactions();

        const structuredTransactions = availableTransactions.map(
          (transaction) => ({
            addressTo: transaction.receiver,
            addressFrom: transaction.sender,
            timestamp: new Date(
              transaction.timestamp.toNumber() * 1000
            ).toLocaleString(),
            message: transaction.message,
            keyword: "test",
            amount: parseInt(transaction.amount._hex) / 10 ** 18,
          })
        );

        console.log(structuredTransactions);

        setTransactions(structuredTransactions);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("PLease install metamask");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        getAllTransactions();
        getAllJobVerification();
        console.log(verifications);
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("PLease install metamask");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const checkIfTransactionsExists = async () => {
    try {
      if (ethereum) {
        const transactionsContract = EthereumContract();
        const currentTransactionCount =
          await transactionsContract.getTransactionCount();

        window.localStorage.setItem(
          "transactionCount",
          currentTransactionCount
        );
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const getAddressBalance = async (address) => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const balance = await provider.getBalance(address);

    if (balance) {
      setBalance(ethers.utils.formatEther(balance));
    }
    console.log(`Balance: ${ethers.utils.formatEther(balance)} ether`);
  };

  const getBalance = async () => {
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    getAddressBalance(accounts[0]);
  };





  const verifyJob=async(lg,client,jobId)=>{
    const transactionsContract = EthereumContract();

    transactionsContract.verifyJob(lg,client,jobId);

  }


  const getAllJobVerification = async () => {
    try {
      if (ethereum) {
        const transactionsContract = EthereumContract();

        const jobsVerified =
          await transactionsContract.getAllJobVerifications();

        const structuredVerification = jobsVerified.map(
          (verification) => ({
            lg: verification.lg,
            client: verification.client,
            jobId: verification.jobId
          })
        );

        console.log(structuredVerification);

        setVerifications(structuredVerification);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };




  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert("PLease install metamask");

      const { addressTo, amount, keyword, message } = formData;
      const transactionsContract = EthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount);

      console.log(parsedAmount);

      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: addressTo,
            gas: "0x5208",
            value: parsedAmount._hex,
          },
        ],
      });

      const transactionHash = await transactionsContract.addToBlockchain(
        addressTo,
        parsedAmount,
        message,
        keyword
      );

      console.log(verifications);

      setIsLoading(true);
      console.log(`Loading - ${transactionHash.hash}`);
      await transactionHash.wait();
      setIsLoading(false);
      console.log(`Success - ${transactionHash.hash}`);
      setIsSuccess(true);

      const transactionCount = await transactionsContract.getTransactionCount();

      setTransactionCount(transactionCount.toNumber());

      setTimeout(() => {
        window.location.reload();
      }, 2000);

      // console.log(transactionCount);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    checkIfTransactionsExists();
    getBalance();
    // eslint-disable-next-line
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        formData,
        setFormData,
        sendTransaction,
        transactionCount,
        transactions,
        handleChange,
        isLoading,
        isSuccess,
        balance,
        verifyJob,
        verifications
        
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
