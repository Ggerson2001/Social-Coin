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
  const [jobNotVerified, setJobNotVerified] = useState(false);

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
      // Create an instance of the Ethereum contract
      const transactionsContract = EthereumContract();

      // Fetch all available transactions from the contract
      const availableTransactions = await transactionsContract.getAllTransactions();

      // Structure the fetched transactions into a desired format
      const structuredTransactions = availableTransactions.map((transaction) => ({
        addressTo: transaction.receiver,
        addressFrom: transaction.sender,
        timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
        message: transaction.message,
        keyword: "test",
        amount: parseInt(transaction.amount._hex) / 10 ** 18,
        jobId: transaction.jobId,
      }));

      // Set the structured transactions in the component state
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
    if (!ethereum) return alert("Please install MetaMask");

    // Request the connected Ethereum accounts from the user's wallet
    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length) {
      // Set the current connected account
      setCurrentAccount(accounts[0]);

      // Fetch all transactions and job verifications for the connected account
      getAllTransactions();
      getAllJobVerification();
    } else {
      console.log("No accounts found");
    }
  } catch (error) {
    console.log(error);

    throw new Error("No Ethereum object");
  }
};

const connectWallet = async () => {
  try {
    if (!ethereum) return alert("Please install MetaMask");

    // Request the user to connect their wallet and retrieve the connected Ethereum accounts
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });

    // Set the current connected account
    setCurrentAccount(accounts[0]);
  } catch (error) {
    console.log(error);

    throw new Error("No Ethereum object");
  }
};

const checkIfTransactionsExists = async () => {
  try {
    if (ethereum) {
      // Get the transactions contract instance
      const transactionsContract = EthereumContract();

      // Retrieve the current transaction count from the contract
      const currentTransactionCount = await transactionsContract.getTransactionCount();

      // Store the current transaction count in the local storage
      window.localStorage.setItem("transactionCount", currentTransactionCount);
    }
  } catch (error) {
    console.log(error);

    throw new Error("No Ethereum object");
  }
};

const getAddressBalance = async (address) => {
  // Create a new Web3Provider instance using the current Ethereum provider
  const provider = new ethers.providers.Web3Provider(ethereum);

  // Retrieve the balance of the specified address
  const balance = await provider.getBalance(address);

  // If a balance is returned, update the state variable 'balance' with the formatted balance value
  if (balance) {
    setBalance(ethers.utils.formatEther(balance));
  }

  // Log the formatted balance value to the console
  
};

  const getBalance = async () => {
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    getAddressBalance(accounts[0]);
  };

  const verifyJob = async (lg, client, jobId) => {
    // Create an instance of the transactions contract using EthereumContract()
    const transactionsContract = EthereumContract();
  
    // Check if the job has already been verified by iterating through the verifications array
    let isVerified = false;
    for (let i = 0; i < verifications.length; i++) {
      if (verifications[i].jobId === jobId) {
        isVerified = true;
        break;
      }
    }
  
    // If the job has not been verified, call the verifyJob function of the transactions contract
    if (!isVerified) {
      transactionsContract.verifyJob(lg, client, jobId);
    } else {
      // If the job has already been verified, display an alert message
      return alert("Job is already verified");
    }
  };

  const getAllJobVerification = async () => {
    try {
      if (ethereum) {
        // Create an instance of the transactions contract using EthereumContract()
        const transactionsContract = EthereumContract();
  
        // Retrieve all job verifications from the transactions contract
        const jobsVerified = await transactionsContract.getAllJobVerifications();
  
        // Structure the verification data to the desired format
        const structuredVerification = jobsVerified.map((verification) => ({
          lg: verification.lg,
          client: verification.client,
          jobId: verification.jobId,
        }));
  
        // Set the structured verification data in the component's state
        setVerifications(structuredVerification);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendTransaction = async (jobId) => {
    try {
      if (!ethereum) return alert("Please install MetaMask");
  
      // Destructure form data
      const { addressTo, amount, keyword, message } = formData;
  
      // Create an instance of the transactions contract using EthereumContract()
      const transactionsContract = EthereumContract();
  
      // Parse the amount value to Ether
      const parsedAmount = ethers.utils.parseEther(amount);
  
      let isVerified = false;
      for (let i = 0; i < verifications.length; i++) {
        // Check if the client and jobId exist in the verifications array
        if (
          verifications[i].client === addressTo &&
          verifications[i].jobId === jobId
        ) {
          isVerified = true;
          break;
        }
      }
  
      if (isVerified === true) {
        // Add the transaction to the blockchain using the transactions contract
        const transactionHash = await transactionsContract.addToBlockchain(
          addressTo,
          parsedAmount,
          message,
          keyword,
          jobId
        );
  
        // Send the transaction using eth_sendTransaction method of the Ethereum provider
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
  
        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        setIsLoading(false);
        console.log(`Success - ${transactionHash.hash}`);
        setIsSuccess(true);
  
        // Update the transaction count
        const transactionCount = await transactionsContract.getTransactionCount();
        setTransactionCount(transactionCount.toNumber());
  
        // Redirect to the transactions page after a delay
        setTimeout(() => {
          window.location.replace("/mytransactions");
        }, 2000);
      } else {
        setJobNotVerified(true);
      }
    } catch (error) {
      return alert("Transaction was unsuccessful. Address is not correct.");
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
        verifications,
        jobNotVerified,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
