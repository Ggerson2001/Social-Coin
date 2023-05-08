//https://eth-goerli.g.alchemy.com/v2/qSBf-nL5ivwyQ4iKtttLWacn8TkMdBAa

require('@nomiclabs/hardhat-waffle');

module.exports={
  solidity:'0.8.0',
  networks:{
    sepolia:{
      url:'https://eth-sepolia.g.alchemy.com/v2/jtsYQZYNZS2Fr5UhIsHqEN4iwAwR91XH',
      accounts:['151f3ac659b0b5c513fa9f38e1fa68ec0f8c49f40c79e276b5bb3c2f67d0e982']
    }
  }
}
