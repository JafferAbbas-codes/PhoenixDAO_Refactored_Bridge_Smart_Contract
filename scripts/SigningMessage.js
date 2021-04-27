let ethers = require("ethers/lib/utils")
let ethereumjs= require("ethereumjs-util")
let privateKey1 = "0xe94758a8c21df8a01f86af459566a9dd20708ef4974d0eefc6d786ea683cb0fa";
const Web3 = require("web3")
let web3 = new Web3("wss://kovan.infura.io/ws/v3/c89f216154d84b83bb9344a7d0a91108");
let bnb_Phnx = "0x2eea92312710894783000150Fe6DEd036beCd8Ad"
let ether_Phnx = "0xfe1b6abc39e46cec54d275efb4b29b33be176c2a"
let Phnx_Abi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "addOwner",
		"outputs": [],
		"stateMutability": "nonpayable",
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
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "burn",
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
				"internalType": "string",
				"name": "name_",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "symbol_",
				"type": "string"
			}
		],
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
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "mint",
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
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "removeOwner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
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
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
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
				"name": "",
				"type": "address"
			}
		],
		"name": "isOwner",
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
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
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
	}
]



function getDomainSeperator(Contract_address){
  let Hash_1 = "0x63c7f5cdb1d38bbec4fca06b08adbb3c338e225bf61b79696076f193b0a70f07";
  let Hash_2 = "0xc17d317ce8d3846b73214929c7cc4a2a2679e1c043b10e5612748890112fb726";
  let Hash_3 = "0x521953684645f878093bce1437e3c6d4d19a8a16cb0cb7379b2da2e14f5bb7cb";


  let value =ethers.keccak256(
    ethers.defaultAbiCoder.encode(
      ["bytes32", "bytes32", "bytes32", "uint256", "address"],
      [
        Hash_1,
        Hash_2,
        Hash_3,
        4,
        Contract_address,
      ]
    ))

    console.log("Domain Seperator",value)
    return value;
	}
	
// async function getDepositETHVRS(amount,address,nonce,Contract_address){

// 	const encodeData = ethers.keccak256(
//         ethers.defaultAbiCoder.encode(
//           ["address","uint256","uint256"],
//           [
//             address,
//             web3.utils.toWei(amount.toString()),
//             nonce
//           ]
//         )
//       );
//       let digrestSeperator = getDomainSeperator(Contract_address);
//       const digest = ethers.keccak256(
//         ethers.solidityPack(
//           ["bytes1", "bytes1", "bytes32", "bytes32"],
//           ["0x19", "0x01", digrestSeperator, encodeData]
//         )
//       );
     
//       const { v, r, s } =await ethereumjs.ecsign(
//         Buffer.from(digest.slice(2), "hex"),
//         Buffer.from(privateKey1.slice(2), "hex")
// 	  );
	  
// 	  console.log(v+"\n0x"+r.toString('hex')+"\n0x"+s.toString('hex'))

//       return {v:v,r:'0x'+r.toString('hex'),s:'0x'+s.toString('hex')}

// }


function getClaimVRS(amount,sender,nonce,Contract_address){

	const encodeData = ethers.keccak256(
        ethers.defaultAbiCoder.encode(
          ["uint256","address","uint256"],
          [
			web3.utils.toWei(amount.toString()),
			sender,
            nonce
          ]
        )
      );
      let digrestSeperator = getDomainSeperator(Contract_address);
      const digest = ethers.keccak256(
        ethers.solidityPack(
          ["bytes1", "bytes1", "bytes32", "bytes32"],
          ["0x19", "0x01", digrestSeperator, encodeData]
        )
      );
     
      const { v, r, s } = ethereumjs.ecsign(
        Buffer.from(digest.slice(2), "hex"),
        Buffer.from(privateKey1.slice(2), "hex")
      );

      return {v:v,r:'0x'+r.toString('hex'),s:'0x'+s.toString('hex')}

}

// function getDepositBSCVRS(amount,address,nonce,Contract_address){

// 	const encodeData = ethers.keccak256(
//         ethers.defaultAbiCoder.encode(
//           ["address","uint256","uint256"],
//           [
//             address,
//             web3.utils.toWei(amount.toString()),
//             nonce
//           ]
//         )
//       );
//       let digrestSeperator = getDomainSeperator(Contract_address);
//       const digest = ethers.keccak256(
//         ethers.solidityPack(
//           ["bytes1", "bytes1", "bytes32", "bytes32"],
//           ["0x19", "0x01", digrestSeperator, encodeData]
//         )
//       );
     
//       const { v, r, s } = ethereumjs.ecsign(
//         Buffer.from(digest.slice(2), "hex"),
//         Buffer.from(privateKey2.slice(2), "hex")
//       );

//       return {v:v,r:'0x'+r.toString('hex'),s:'0x'+s.toString('hex')}

// }


// function getClaimBSCVRS(v1,r1,s1,nonce,Contract_address){

// 	const encodeData = ethers.keccak256(
//         ethers.defaultAbiCoder.encode(
//           ["uint256","bytes32","bytes32","uint256"],
//           [
// 			v1,
// 			r1,
// 			s1,
//             nonce
//           ]
//         )
//       );
//       let digrestSeperator = getDomainSeperator(Contract_address);
//       const digest = ethers.keccak256(
//         ethers.solidityPack(
//           ["bytes1", "bytes1", "bytes32", "bytes32"],
//           ["0x19", "0x01", digrestSeperator, encodeData]
//         )
//       );
     
//       const { v, r, s } = ethereumjs.ecsign(
//         Buffer.from(digest.slice(2), "hex"),
//         Buffer.from(privateKey2.slice(2), "hex")
//       );

//       return {v:v,r:'0x'+r.toString('hex'),s:'0x'+s.toString('hex')}

// }


function getVRS(amount,address,deadline,nonce,Contract_address){
  if(Contract_address == "0x1Edfdd1f61426adE92ea45BA8791fE626FDAf650"){
    const contract = new web3.eth.Contract(Phnx_Abi,ether_Phnx);
    let balance = contract.methods.balanceOf(address);
    if(amount>balance){
      return false
    }
  }
  else{
    const contract = new web3.eth.Contract(Phnx_Abi,bnb_Phnx);
    let balance = contract.methods.balanceOf(address);
    if(amount>balance){
      return false
    }
  }
    // const contract = new web3.eth.Contract(abi,contract_address);
    const encodeData = ethers.keccak256(
        ethers.defaultAbiCoder.encode(
          ["address","uint256","uint256","uint256"],
          [
            address,
            web3.utils.toWei(amount.toString()),
            deadline,
            nonce
          ]
        )
      );
      let digrestSeperator = getDomainSeperator(Contract_address);
      const digest = ethers.keccak256(
        ethers.solidityPack(
          ["bytes1", "bytes1", "bytes32", "bytes32"],
          ["0x19", "0x01", digrestSeperator, encodeData]
        )
      );
     
      const { v, r, s } = ethereumjs.ecsign(
        Buffer.from(digest.slice(2), "hex"),
        Buffer.from(privateKey.slice(2), "hex")
      );

      return {v:v,r:'0x'+r.toString('hex'),s:'0x'+s.toString('hex')}
      }

// console.log(getVRS(7,"0x51a73C48c8A9Ef78323ae8dc0bc1908A1C49b6c6",1613129668,0,"0x98BfC9Dc91a6D5cFfE0ed2495dCE3D4629c70A14"));

// getDepositETHVRS(100,"0x51a73C48c8A9Ef78323ae8dc0bc1908A1C49b6c6",0,"0x98BfC9Dc91a6D5cFfE0ed2495dCE3D4629c70A14")



module.exports={getClaimVRS}