const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
let fs = require("fs");

let source = fs.readFileSync("./build/SmartActivities.sol.json", "utf8");
let smartActivities = JSON.parse(source).SmartActivities;

const provider = new HDWalletProvider(
  "",

  "https://rinkeby.infura.io/v3/"
);
const web3 = new Web3(provider);

const deploy = async () => {
	const accounts = await web3.eth.getAccounts();
	var myContract = new web3.eth.Contract([smartActivities.abi]);

	console.log("Attempting to deploy from account", accounts[0]);
	myContract.deploy({
		data: smartActivities.evm.bytecode.object
	})
	.send({
		from: accounts[0],
		gas: 10000000
	})
	.then(function(newContractInstance){
		console.log("Contract deployed to", newContractInstance.options.address)
	});
}

deploy();
