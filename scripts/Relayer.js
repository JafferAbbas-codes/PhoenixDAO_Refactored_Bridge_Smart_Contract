const Web3 = require("web3")
let web3 = new Web3("wss://bsc-ws-node.nariox.org:443");
// let contract_address="0xbdce36d77305cce80bf314279afed10ed7f56128";
let abi =[
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_phnxAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_signer",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "v",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "r",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "s",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_nonce",
        "type": "uint256"
      }
    ],
    "name": "TokenDeposited",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "v",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "r",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "s",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_nonce",
        "type": "uint256"
      }
    ],
    "name": "TokenWithdrawn",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "_nonce",
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
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint8",
        "name": "v",
        "type": "uint8"
      },
      {
        "internalType": "bytes32",
        "name": "r",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "s",
        "type": "bytes32"
      }
    ],
    "name": "depositToken",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getDomainSeparator",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "phnxAddress",
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
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "sigRepeated",
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
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_nonce",
        "type": "uint256"
      },
      {
        "internalType": "uint8",
        "name": "v1",
        "type": "uint8"
      },
      {
        "internalType": "bytes32",
        "name": "r1",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "s1",
        "type": "bytes32"
      },
      {
        "internalType": "uint8",
        "name": "v2",
        "type": "uint8"
      },
      {
        "internalType": "bytes32",
        "name": "r2",
        "type": "bytes32"
      },
      {
        "internalType": "bytes32",
        "name": "s2",
        "type": "bytes32"
      }
    ],
    "name": "withdrawToken",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

const contract = new web3.eth.Contract(abi,"0xd7d069493685a581d27824fc46eda46b7efc0063");
const contract2 = new web3.eth.Contract(abi,"0xd7d069493685a581d27824fc46eda46b7efc0063");

exports.getEthEvents = async()=>{
	await contract.getPastEvents(
        "TokenDeposited",
        {
		  filter:{id:3},
          fromBlock: 6415956 ,
          toBlock: "latest"
        },
        (err, events) => {
			console.log(err)
            con_events=events
            console.log(events)
        }

      );
}

exports.getBnbEvents = async()=>{
  console.log("He;;p")
	await contract2.getPastEvents(
        "TokenDeposited",
        {
          fromBlock: 
          6423002 ,
          toBlock: 6428001
        },
        (err, events) => {
			console.log(err)
            console.log(events)
        }

      );
}


exports.subscribeLogEvent = async(contract, eventName) => {
	try{
		
		console.log('running')
	  const eventJsonInterface = web3.utils._.find(
		contract._jsonInterface,
		o => o.name === eventName && o.type === 'event',
	  )
	  const subscription = web3.eth.subscribe('logs', {
		address: contract.options.address,
		topics: [eventJsonInterface.signature]
	  }, (error, result) => {
		if (!error) {
			console.log("starting")
		   output = result
		}
		else{
			console.log(error)
		}
	  }).on("data", async function(log){
		count++;
		console.log(log.transactionHash);
		console.log(log.blockNumber)
		console.log("-------------------Event caught # "+count+"---------------------------")
		const eventObj = web3.eth.abi.decodeLog(
			eventJsonInterface.inputs,
			log.data,
			log.topics.slice(1)
		  )
		  console.log(`New ${eventName}!`, eventObj) 
		//   let amount = eventObj[2];
		//   let sender = eventObj[0]
		//   let type = eventObj[1];
	}).on("changed", function(log){
		  console.log("Event Collition reverting Changes")
		//   limit-=amount;
	});
	  
		}
		catch(e){
			console.log("hell")
			console.log(e)
		}
}


async function getLatestBlock() {
  console.log(await web3.eth.getBlockNumber())
}

// exports.subscribeLogEvent(contract2,"TokenDeposited")

// setInterval(getLatestBlock,5000)
exports.getBnbEvents()