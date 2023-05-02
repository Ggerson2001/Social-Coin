
pragma solidity ^0.8.0;

contract Transactions {
    uint256 transactionCount;

    event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp, string keyword, uint jobId);
  
    struct TransferStruct {
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;
        uint jobId;
    }

    TransferStruct[] transactions;

    mapping(uint => bool) completedJobs;


    function verifyJob(address lg, uint jobId) private view returns(bool) {
        require(completedJobs[jobId], "Job not completed");
        require(msg.sender == lg, "Only localgovernment can verify job");
        return true;
    }

    function addToBlockchain(address payable receiver, uint amount, string memory message, string memory keyword, uint jobId) public {
        require(verifyJob(msg.sender, jobId), "Job verification failed");
        
        transactionCount += 1;
        transactions.push(TransferStruct(msg.sender, receiver, amount, message, block.timestamp, keyword, jobId));
        
        emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword, jobId);
    }

    function getAllTransactions() public view returns (TransferStruct[] memory) {
        return transactions;
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }
}