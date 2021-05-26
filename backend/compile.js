const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');
const buildPath = path.resolve(__dirname, 'build');

const inboxPath1 = path.resolve(__dirname, 'contracts', 'Context.sol');
const inboxPath2 = path.resolve(__dirname, 'contracts', 'ERC20.sol');
const inboxPath3 = path.resolve(__dirname, 'contracts', 'IERC20.sol');
const inboxPath4 = path.resolve(__dirname, 'contracts', 'IERC20Metadata.sol');
const inboxPath5 = path.resolve(__dirname, 'contracts', 'SmartActivities.sol');
const source1 = fs.readFileSync(inboxPath1, 'utf8');
const source2 = fs.readFileSync(inboxPath2, 'utf8');
const source3 = fs.readFileSync(inboxPath3, 'utf8');
const source4 = fs.readFileSync(inboxPath4, 'utf8');
const source5 = fs.readFileSync(inboxPath5, 'utf8');

fs.removeSync(buildPath);



var input = {
  language: 'Solidity',
  sources: {
    'Context.sol': {
      content: source1
    },
	'ERC20.sol': {
      content: source2
    },
	'IERC20.sol': {
      content: source3
    },
	'IERC20Metadata.sol': {
      content: source4
    },
	'SmartActivities.sol': {
      content: source5
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*']
      }
    }
  }
};

var output = JSON.parse(solc.compile(JSON.stringify(input)));

console.log(output);

fs.ensureDirSync(buildPath);

for (let contract in output.contracts) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract + ".json"),
    output.contracts[contract]
  );
}
