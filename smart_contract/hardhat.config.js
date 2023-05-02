//https://eth-goerli.g.alchemy.com/v2/qSBf-nL5ivwyQ4iKtttLWacn8TkMdBAa

require('@nomiclabs/hardhat-waffle');

module.exports={
  solidity:'0.8.0',
  networks:{
    goerli:{
      url:'https://eth-goerli.g.alchemy.com/v2/qSBf-nL5ivwyQ4iKtttLWacn8TkMdBAa',
      accounts:['14db90c28e2c2f4663ceba3be22b1649a017b6a22e2c8d3c79322edd8a20e374']
    }
  }
}
