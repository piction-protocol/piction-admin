import Web3 from 'web3';
import abi from '../assets/abi/PXL.json';
import BigNumber from 'bignumber.js';

const PXL = {
  contract: null,
  init() {
    this.contract = new web3.eth.Contract(abi, '0x66e8954E4209C1BCF17EE95e6805154f815a57E9');
    web3.eth.getAccounts((err, account) => this.contract.options.from = account[0]);
  },
  async totalSupply() {
    const totalSupply = await this.contract.methods.totalSupply().call();
    return new BigNumber(totalSupply).div(new BigNumber(Math.pow(10, 18))).toNumber();
  },
  mint(amount) {
    const mintAmount = new BigNumber(amount).multipliedBy(new BigNumber(Math.pow(10, 18)));
    return this.contract.methods.mint(mintAmount).send()
  },
  burn(amount) {
    const burnAmount = new BigNumber(amount).multipliedBy(new BigNumber(Math.pow(10, 18)));
    return this.contract.methods.burn(burnAmount).send()
  },
  async balanceOf(address) {
    const balance = await this.contract.methods.balanceOf(address).call();
    return new BigNumber(balance).div(new BigNumber(Math.pow(10, 18))).toNumber();
  },
  addOwner(address) {
    return this.contract.methods.addOwner(address).send()
  },
  transfer(address, amount) {
    const sendAmount = new BigNumber(amount).multipliedBy(new BigNumber(Math.pow(10, 18)));
    return this.contract.methods.transfer(address, sendAmount).send()
  },
  unlock() {
    return this.contract.methods.unlock().send()
  },
  async getLockState() {
    const isLocked = await this.contract.methods.getTokenTransferable().call()
    return !isLocked
  }
}

export default PXL
