const chatHistoryABI = [
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "bytes32"
        },
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "userChatHistory",
      "outputs": [
        {
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "admin",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "_admin",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "uidHash",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "name": "timestamp",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "messages",
          "type": "string[]"
        }
      ],
      "name": "ChatBlockAdded",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "uid",
          "type": "string"
        },
        {
          "name": "messages",
          "type": "string[]"
        }
      ],
      "name": "addChatBlock",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "uid",
          "type": "string"
        }
      ],
      "name": "getChatHistory",
      "outputs": [
        {
          "components": [
            {
              "name": "timestamp",
              "type": "uint256"
            },
            {
              "name": "messages",
              "type": "string[]"
            }
          ],
          "name": "",
          "type": "tuple[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "uid",
          "type": "string"
        },
        {
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "getChatBlock",
      "outputs": [
        {
          "components": [
            {
              "name": "timestamp",
              "type": "uint256"
            },
            {
              "name": "messages",
              "type": "string[]"
            }
          ],
          "name": "",
          "type": "tuple"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "newAdmin",
          "type": "address"
        }
      ],
      "name": "changeAdmin",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
  
export default chatHistoryABI;
  