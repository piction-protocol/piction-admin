import Contract from './Contract'
import BigNumber from 'bignumber.js';

class PXL extends Contract {
  constructor(abi, address, from) {
    super(abi, address, from);
  }

  async totalSupply() {
    const totalSupply = await this._contract.methods.totalSupply().call();
    return new BigNumber(totalSupply).div(new BigNumber(Math.pow(10, 18))).toNumber();
  }

  mint(amount) {
    const mintAmount = new BigNumber(amount).multipliedBy(new BigNumber(Math.pow(10, 18)));
    return this._contract.methods.mint(mintAmount).send()
  }

  burn(amount) {
    const burnAmount = new BigNumber(amount).multipliedBy(new BigNumber(Math.pow(10, 18)));
    return this._contract.methods.burn(burnAmount).send()
  }

  async balanceOf(address) {
    const balance = await this._contract.methods.balanceOf(address).call();
    return new BigNumber(balance).div(new BigNumber(Math.pow(10, 18))).toNumber();
  }

  addOwner(address) {
    return this._contract.methods.addOwner(address).send()
  }

  transfer(address, amount) {
    const sendAmount = new BigNumber(amount).multipliedBy(new BigNumber(Math.pow(10, 18)));
    return this._contract.methods.transfer(address, sendAmount).send()
  }

  unlock() {
    return this._contract.methods.unlock().send()
  }
  
  async getLockState() {
    const isLocked = await this._contract.methods.getTokenTransferable().call()
    return !isLocked
  }
}

export default PXL;
