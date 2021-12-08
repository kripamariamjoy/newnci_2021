// web3 ethereum talker dependency
const Web3 = require('web3')

// transaction crafting dependency
const Tx = require('ethereumjs-tx').Transaction

require('dotenv').config()

infuraToken ="84ba0eafe11d4934ac7fdc1b0117ef5a"
contractAddress ="0xae0e06babc80b4d5543c990f2bee60f3cdde4e7e"
ownerAddress ="0x6bfdbc92868befb7d9e4312e22ea872ee256eee1"
privateKey = Buffer.from("8d92ab799bf1c49505f461d6c4c5a827130c9e36efa581c491879db13f486bc6", 'hex')

// get the ABI (interface) for our contract
const abi = [
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
	}
]

// instantiate web3 with the infura rpc url
const web3 = new Web3("https://ropsten.infura.io/v3/84ba0eafe11d4934ac7fdc1b0117ef5a");

const address = "0x56b9d8d5375f133bbe567e5508264ed2f2688316";
const owner = "0x6bfdbc92868befb7d9e4312e22ea872ee256eee1";

// connect to our contract
const contract = new web3.eth.Contract(abi, address);

// set up a send transaction method
const sendTx = async(raw) => {
    return await web3.eth.sendSignedTransaction(raw);
}

const transferETH = async(toAccount, amount) => {

    // generate a nonce
    let txCount = await web3.eth.getTransactionCount(owner);
    console.log("tx count is " + txCount);

    // generate tx data
    const txObject = {
        nonce: web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(21000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('100', 'gwei')),
        to: toAccount,
        //data: contract.methods.transfer(toAccount, amount).encodeABI()
        value: web3.utils.toHex(web3.utils.toWei(amount, 'ether'))
    }

    // assign a chain id (ropsten: 3)
    const tx = new Tx(txObject, {chain: 'ropsten', hardfork: 'petersburg'})

    // sign the tx - THIS USES THE SECRET PRIVATE KEY
    tx.sign(privateKey);

    console.log("signed transaction with super secret private key");

    // serialize the raw tx
    const serializedTx = tx.serialize();
    const raw = '0x' + serializedTx.toString('hex');

    console.log('about to send transaction' + raw)

    // broadcast the transaction
    let txResponse = await sendTx(raw);
    console.log("transaction hash: " + txResponse.transactionHash)
    console.log("transaction in block: " + txResponse.blockNumber)
}

transferETH("0x4d60E7f9d4901816981a0E4c6D95F394159C6371", "0.25")