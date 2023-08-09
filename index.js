const solc=require("solc");
const fs=require("fs")
const Web3 = require('web3');

// Using an HTTP provider (Infura)
const httpProviderUrl = 'HTTP://127.0.0.1:7545';
const httpProvider = new Web3.providers.HttpProvider(httpProviderUrl);

// Creating a Web3 instance using the provider
const web3 = new Web3(httpProvider);
//console.log(web3)
let fileContent=fs.readFileSync("demo.sol","utf-8");
// console.log(fileContent);
var input={
    language:"Solidity",
    sources:{
        "demo.sol":{
            content:fileContent,
        },
    },

    settings:{
        outputSelection:{
            "*":{
                "*":["*"],
            },
        },
    },
};

var output=JSON.parse(solc.compile(JSON.stringify(input)));
// console.log(output);
const ABI=output.contracts["demo.sol"]["demo"].abi;
const bytecode=output.contracts["demo.sol"]["demo"].evm.bytecode.object;
contract = new web3.eth.Contract(ABI);
let defaultAccount;
web3.eth.getAccounts().then((accounts) => {
  console.log("Accounts:", accounts); //it will show all the ganache accounts

  defaultAccount = accounts[0];
  console.log("Default Account:", defaultAccount);  //to deploy the contract from default Account
  contract
    .deploy({ data: bytecode })
    .send({ from: defaultAccount, gas: 470000 })
    .on("receipt", (receipt) => { //event,transactions,contract address will be returned by blockchain
      console.log("Contract Address:", receipt.contractAddress);
    })
    .then((demoContract) => {
      demoContract.methods.x().call((data) => {
        console.log("Initial Value:", data);
      });
    });
  
});

  
  