import web3 from "../components/web3";

const address = "";

const abi = [{
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "Approval",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "Transfer",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "activities",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "activityId",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "title",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "resume",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "ownersName",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "addrOwner",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "startActivityDate",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "endActivityDate",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "startAllowedJoinActivityDate",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "endAllowedJoinActivityDate",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "title",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "resume",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "ownersName",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "startActivityDate",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "endActivityDate",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "startAllowedJoinActivityDate",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "endAllowedJoinActivityDate",
            "type": "uint256"
          }
        ],
        "name": "addActivity",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "newUser",
            "type": "address"
          }
        ],
        "name": "addUser",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          }
        ],
        "name": "allowance",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "approve",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "activityId",
            "type": "uint256"
          }
        ],
        "name": "assist",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "account",
            "type": "address"
          }
        ],
        "name": "balanceOf",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "decimals",
        "outputs": [
          {
            "internalType": "uint8",
            "name": "",
            "type": "uint8"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "subtractedValue",
            "type": "uint256"
          }
        ],
        "name": "decreaseAllowance",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getActivities",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "activityId",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "title",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "resume",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "description",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "ownersName",
                "type": "string"
              },
              {
                "internalType": "address",
                "name": "addrOwner",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "startActivityDate",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "endActivityDate",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "startAllowedJoinActivityDate",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "endAllowedJoinActivityDate",
                "type": "uint256"
              }
            ],
            "internalType": "struct SmartActivities.Activity[]",
            "name": "",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "activityId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "addr",
            "type": "address"
          }
        ],
        "name": "getAssisted",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "activityId",
            "type": "uint256"
          }
        ],
        "name": "getCompleteActivity",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "activityId",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "title",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "resume",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "description",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "ownersName",
                "type": "string"
              },
              {
                "internalType": "address",
                "name": "addrOwner",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "startActivityDate",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "endActivityDate",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "startAllowedJoinActivityDate",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "endAllowedJoinActivityDate",
                "type": "uint256"
              },
              {
                "internalType": "bool",
                "name": "inscribed",
                "type": "bool"
              },
              {
                "internalType": "bool",
                "name": "assisted",
                "type": "bool"
              },
              {
                "internalType": "bool",
                "name": "voted",
                "type": "bool"
              },
              {
                "internalType": "uint256",
                "name": "stars",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "votedCount",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "userStars",
                "type": "uint256"
              }
            ],
            "internalType": "struct SmartActivities.CompleteActivity",
            "name": "completeActivity",
            "type": "tuple"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "activityId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "addr",
            "type": "address"
          }
        ],
        "name": "getInscribed",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getReducedActivities",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "activityId",
                "type": "uint256"
              },
              {
                "internalType": "string",
                "name": "title",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "resume",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "endAllowedJoinActivityDate",
                "type": "uint256"
              }
            ],
            "internalType": "struct SmartActivities.ReducedActivity[]",
            "name": "",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "activityId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "addr",
            "type": "address"
          }
        ],
        "name": "getVoted",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "addedValue",
            "type": "uint256"
          }
        ],
        "name": "increaseAllowance",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "activityId",
            "type": "uint256"
          }
        ],
        "name": "inscribeToActivity",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "name",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "symbol",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "recipient",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "transfer",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "sender",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "recipient",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "transferFrom",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "activityId",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "starsAmount",
            "type": "uint256"
          }
        ],
        "name": "vote",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }];

export default new web3.eth.Contract(abi, address);
