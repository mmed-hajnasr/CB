// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract ChatHistory {
    address public admin;  
    mapping(bytes32 => ChatBlock[]) public userChatHistory;  

    struct ChatBlock {
        uint timestamp;           
        string[] messages;        
    }

    event ChatBlockAdded(bytes32 indexed uidHash, uint timestamp, string[] messages);

    constructor() public {
        admin = 0xCE486c2a45b2Cd92f9381100bb7a288618074286;
    }

    function addChatBlock(string memory uid, string[] memory messages) public{
        bytes32 uidHash = keccak256(abi.encodePacked(uid));  
        uint timestamp = block.timestamp;  

        ChatBlock memory newBlock = ChatBlock({
            timestamp: timestamp,
            messages: messages
        });

        userChatHistory[uidHash].push(newBlock);  

        emit ChatBlockAdded(uidHash, timestamp, messages);
    }

    function getChatHistory(string memory uid) public view returns (ChatBlock[] memory) {
        bytes32 uidHash = keccak256(abi.encodePacked(uid));  // Hash the UID into a bytes32 key
        return userChatHistory[uidHash];
    }

    function getChatBlock(string memory uid, uint index) public view returns (ChatBlock memory) {
        bytes32 uidHash = keccak256(abi.encodePacked(uid));  // Hash the UID into a bytes32 key
        require(index < userChatHistory[uidHash].length, "Chat block index out of range");
        return userChatHistory[uidHash][index];
    }

}
