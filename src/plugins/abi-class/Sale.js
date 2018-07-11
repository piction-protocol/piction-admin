import Contract from './Contract'
import BigNumber from 'bignumber.js';

class Sale extends Contract {
  constructor(abi, address, from) {
    super(abi, address, from);
  }

  async getState() {
    return await this._contract.methods.getState().call();
  }

  setState(methodName) {
    return eval(`this._contract.${methodName}()`).send()
  }

  buyerAddressTransfer(receiptId, productAddress, fromAddress, toAddress) {
    return this._contract.methods.buyerAddressTransfer(receiptId, productAddress, fromAddress, toAddress).send()
  }

  refund(refundAmount, receiptId, productAddress, buyerAddress) {
    let etherAmount = new BigNumber(refundAmount).multipliedBy(new BigNumber(Math.pow(10, 18)));
    return this._contract.methods.refund(receiptId, productAddress, buyerAddress).send({ value: etherAmount })
  }

  async getProductAddress() {
    return await this._contract.methods.product().call();
  }

  registerProduct(productAddress) {
    return this._contract.methods.registerProduct(productAddress).send()
  }

  async getTokenDistributorAddress() {
    return await this._contract.methods.tokenDistributor().call();
  }

  setTokenDistributor(tokenDistributorAddress) {
    return this._contract.methods.setTokenDistributor(tokenDistributorAddress).send()
  }

  async getWalletAddress() {
    return await this._contract.methods.wallet().call();
  }

  setWallet(walletAddress) {
    return this._contract.methods.setWallet(walletAddress).send()
  }

  async getWhitelistAddress() {
    return await this._contract.methods.whiteList().call();
  }

  setWhitelist(whitelistAddress) {
    return this._contract.methods.setWhitelist(whitelistAddress).send()
  }

  async getProductWeiRaised(productAddress) {
    const weiRaised = await this._contract.methods.getProductWeiRaised(productAddress).call();
    return new BigNumber(weiRaised).div(new BigNumber(Math.pow(10, 18))).toNumber();
  }
}

export default Sale;
