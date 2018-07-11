import Contract from './Contract'
import BigNumber from 'bignumber.js';

class Product extends Contract {
  constructor(abi, address, from) {
    super(abi, address, from);
  }

  async getProductName() {
    return await this._contract.methods.name().call();
  }

  async getMaxcap() {
    const maxcap = await this._contract.methods.maxcap().call();
    return new BigNumber(maxcap).div(new BigNumber(Math.pow(10, 18))).toNumber();
  }

  async getExceed() {
    const exceed = await this._contract.methods.exceed().call();
    return new BigNumber(exceed).div(new BigNumber(Math.pow(10, 18))).toNumber();
  }

  async getMinimum() {
    const minimum = await this._contract.methods.minimum().call();
    return new BigNumber(minimum).div(new BigNumber(Math.pow(10, 18))).toNumber();
  }

  async getRate() {
    return await this._contract.methods.rate().call();
  }

  async getLockup() {
    return await this._contract.methods.lockup().call();
  }

  getUserName(address) {
    return this._contract.methods.getUserName(address).call();
  }
}

export default Product;
