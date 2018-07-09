import Web3 from 'web3';
import abi from '../assets/abi/Product.json';
import BigNumber from 'bignumber.js';

const Product = {
  contract: null,
  async init(productAddress) {
    this.contract = new web3.eth.Contract(abi, productAddress);
    web3.eth.getAccounts((err, account) => this.contract.options.from = account[0]);
  },
  async getProductName() {
    return await this.contract.methods.name().call();
  },
  async getMaxcap() {
    const maxcap = await this.contract.methods.maxcap().call();
    return new BigNumber(maxcap).div(new BigNumber(Math.pow(10, 18))).toNumber();
  },
  async getExceed() {
    const exceed = await this.contract.methods.exceed().call();
    return new BigNumber(exceed).div(new BigNumber(Math.pow(10, 18))).toNumber();
  },
  async getMinimum() {
    const minimum = await this.contract.methods.minimum().call();
    return new BigNumber(minimum).div(new BigNumber(Math.pow(10, 18))).toNumber();
  },
  async getRate() {
    return await this.contract.methods.rate().call();
  },
  async getLockup() {
    return await this.contract.methods.lockup().call();
  }
}

export default Product
