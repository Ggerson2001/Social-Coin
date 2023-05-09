
pragma solidity ^0.8.0;

contract Transactions {
    uint256 transactionCount;

    event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp, string keyword);
  
    struct TransferStruct {
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;
        uint32 jobId;
    }

    struct JobVerification {
        address lg;
        address client;
        uint32 jobId;
    }

    TransferStruct[] transactions;

    JobVerification [] verifiedJobs;


    function verifyJob(address payable lg,address payable client, uint32 jobId) public returns (bytes32) {
        require(msg.sender == lg, "Only localgovernment can verify job");
        verifiedJobs.push(JobVerification(lg,client,jobId));
        return keccak256(abi.encodePacked(lg, client, jobId));
        
    }


    function addToBlockchain(address payable receiver, uint amount, string memory message, string memory keyword, uint32 jobId) public {
    bool isVerified = false;
    for (uint i = 0; i < verifiedJobs.length; i++) {
        if (verifiedJobs[i].lg == msg.sender &&
            verifiedJobs[i].client == receiver &&
            verifiedJobs[i].jobId == jobId) {
            isVerified = true;
            break;
        }
    }
    require(isVerified, "Job is not verified");

    transactionCount += 1;
    transactions.push(TransferStruct(msg.sender, receiver, amount, message, block.timestamp, keyword,jobId));

    emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword);
}

    function getAllTransactions() public view returns (TransferStruct[] memory) {
        return transactions;
    }

    function getAllJobVerifications() public view returns (JobVerification[] memory) {
        return verifiedJobs;
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }
}