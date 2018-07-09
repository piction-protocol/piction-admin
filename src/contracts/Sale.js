import Web3 from 'web3';
import abi from '../assets/abi/Sale.json';
import BigNumber from 'bignumber.js';

const Sale = {
  contract: null,
  init() {
    this.contract = new web3.eth.Contract(abi, '0x3Fc5003790F0Cf3B67E0868832Df81592c27F636');
    web3.eth.getAccounts((err, account) => this.contract.options.from = account[0]);
  },
  async getState() {``
    return await this.contract.methods.getState().call();
  },
  setState(methodName) {
    return eval(`this.contract.${methodName}()`).send()
  },
  buyerAddressTransfer(receiptId, productAddress, fromAddress, toAddress) {
    return this.contract.methods.buyerAddressTransfer(receiptId, productAddress, fromAddress, toAddress).send()
  },
  refund(refundAmount, receiptId, productAddress, buyerAddress) {
    let etherAmount = new BigNumber(refundAmount).multipliedBy(new BigNumber(Math.pow(10, 18)));
    return this.contract.methods.refund(receiptId, productAddress, buyerAddress).send({ value: etherAmount })
  },
  async getProductAddress() {
    return await this.contract.methods.product().call();
  },
  registerProduct(productAddress) {
    return this.contract.methods.registerProduct(productAddress).send()
  },
  async getTokenDistributorAddress() {
    return await this.contract.methods.tokenDistributor().call();
  },
  setTokenDistributor(tokenDistributorAddress) {
    return this.contract.methods.setTokenDistributor(tokenDistributorAddress).send()
  },
  async getWalletAddress() {
    return await this.contract.methods.wallet().call();
  },
  setWallet(walletAddress) {
    return this.contract.methods.setWallet(walletAddress).send()
  },
  async getWhitelistAddress() {
    return await this.contract.methods.whiteList().call();
  },
  setWhitelist(whitelistAddress) {
    return this.contract.methods.setWhitelist(whitelistAddress).send()
  },
  async getProductWeiRaised(productAddress) {
    const weiRaised = await this.contract.methods.getProductWeiRaised(productAddress).call();
    return new BigNumber(weiRaised).div(new BigNumber(Math.pow(10, 18))).toNumber();
  }
}

export default Sale
