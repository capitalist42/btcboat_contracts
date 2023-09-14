import * as fs from 'fs';
import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import '@typechain/hardhat';
import '@nomicfoundation/hardhat-ethers';
import '@nomicfoundation/hardhat-chai-matchers';
import 'hardhat-watcher';
import 'solidity-coverage';

// import { HardhatEthersHelpers } from '@nomicfoundation/hardhat-ethers/types/index.js';


/*
Issue the following command to generate a BIP-39 seed phrase
and save it to file:

npm run new-rsktestnet-seed-phrase
OR
npx mnemonics@1.1.3 > .rsktestnet-seed-phrase
*/
let rskTestnetSeedPhrase;
try {
  rskTestnetSeedPhrase = fs
  .readFileSync('.rsktestnet-seed-phrase', 'utf8')
  .toString()
  .trim();
} catch (error) {
  console.error(error);
}
if (!rskTestnetSeedPhrase || rskTestnetSeedPhrase.split(' ').length !== 12) {
  console.error(
    'Put valid BIP-39 seed phrase in a file ".rsktestnet-seed-phrase"',
  );
}

/*
Issue the following command to query RSK Testnet
for its latest block, and save the response to file:

curl \
  -X POST \
  --silent \
  -H "Content-Type:application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["latest", false],"id":1}' \
  https://public-node.testnet.rsk.co/ > .rsktestnet-block-rpc-response.json
*/
let rskTestnetMinimumGasPrice;
try {
  const rskTestnetBlockRpcResponseText = fs
    .readFileSync('.rsktestnet-block-rpc-response.json')
    .toString()
    .trim();
  const rskTestnetBlock = JSON.parse(rskTestnetBlockRpcResponseText);
  rskTestnetMinimumGasPrice = parseInt(
    rskTestnetBlock.result.minimumGasPrice,
    16,
  );
} catch (error) {
  console.error(error);
}

if (
  typeof rskTestnetMinimumGasPrice !== 'number' ||
  isNaN(rskTestnetMinimumGasPrice)
) {
  console.error(
    'unable to retrieve network gas price from .rsktestnet-block-rpc-response.json',
  );
}
// console.log("Minimum gas price for RSK Testnet: " + rskTestnetMinimumGasPrice);

const rskTestnetGasMultiplier = 1.1;

const rskTestnetNetworkConfig =
  (!rskTestnetSeedPhrase || !rskTestnetMinimumGasPrice) ?
  {
    chainId: 31,
    url: 'https://public-node.testnet.rsk.co/',
  } :
  {
    chainId: 31,
    url: 'http://192.168.50.120:44445',
    // url: 'http://143.198.239.150:4444',
    // url: 'https://public-node.testnet.rsk.co/',
    gasPrice: rskTestnetMinimumGasPrice,
    gasMultiplier: rskTestnetGasMultiplier,
    allowUnlimitedContractSize: true,
    accounts: {
      mnemonic: rskTestnetSeedPhrase,
      // Ref: https://developers.rsk.co/rsk/architecture/account-based/#derivation-path-info
      path: "m/44'/37310'/0'/0",
      initialIndex: 0,
      count: 10,
    },
  };


// task('deploy-relay-system-contracts', 'Deploy Relay System contracts to selected network').setAction(
//   async (_, hre: HardhatEthersHelpers) => {  
//     await deployRelaySystemContracts(hre)
//   }
// )

const watcherConfig = {
  compilation: {
    tasks: ['compile'],
    files: ['./contracts'],
    verbose: true,
  },
}

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  watcher: watcherConfig, 
  networks: {
    hardhat: {},
    rsktestnet: rskTestnetNetworkConfig,
  },
  mocha: {
    timeout: 6000000,
  },
  typechain: {
    target: 'ethers-v6',
    outDir: 'typechain-types',
  }
};

// /*
// To verify that we're able to connect to RSK Testnet successfully:

// npx hardhat console --network rsktestnet

// // latest block number
// (await require('hardhat').network.provider.send('eth_getBlockByNumber', ['latest', false])).minimumGasPrice

// // the default EOA that will be used in deployment transactions
// (await hre.ethers.getSigners())[0].address

// .exit
// */

export default config;