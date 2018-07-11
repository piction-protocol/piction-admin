import Contract from './Contract'
import BigNumber from 'bignumber.js';

class TokenDistributor extends Contract {
  constructor(abi, address, from) {
    super(abi, address, from);
  }

  async getTokenAddress() {
    return await this._contract.methods.getTokenAddress().call();
  }

  addOwner(saleAddress) {
    return this._contract.methods.addOwner(saleAddress).send()
  }

  addPurchase(buyerAddress, productAddress, pxlAmount, etherAmount) {
    const pxl = new BigNumber(pxlAmount).multipliedBy(new BigNumber(Math.pow(10, 18)));
    const ether = new BigNumber(etherAmount).multipliedBy(new BigNumber(Math.pow(10, 18)));
    return this._contract.methods.addPurchase(buyerAddress, productAddress, pxl, ether).send()
  }

  releaseByCount(productAddress, releaseCount) {
    return this._contract.methods.releaseByCount(productAddress, releaseCount).send()
  }

  withdrawToken() {
    return this._contract.methods.withdrawToken().send()
  }

  async getAllReceipt() {
    const FIELD_PRODUCT  = 0
    const FIELD_BUYER = 1
    const FIELD_ID = 2
    const FIELD_AMOUNT = 3
    const FIELD_ETHER = 4
    const FIELD_RELEASE = 5
    const FIELD_REFUND = 6

    const receiptData = await this._contract.methods.getAllReceipt().call();

    const items = [];
    for (let i = 0; i < receiptData[0].length; i++) {
      const receipt = {
        id: receiptData[FIELD_ID][i],
        product: receiptData[FIELD_PRODUCT][i],
        buyer: receiptData[FIELD_BUYER][i],
        amount: new BigNumber(receiptData[FIELD_AMOUNT][i]).div(new BigNumber(Math.pow(10, 18))).toNumber(),
        ether: new BigNumber(receiptData[FIELD_ETHER][i]).div(new BigNumber(Math.pow(10, 18))).toNumber(),
        action: receiptData[FIELD_RELEASE][i] ? "released" : receiptData[FIELD_REFUND][i] ? "refunded" : "none"
      }
      items.push(receipt)
    }
    return items
  }

  release(index) {
    return this._contract.methods.release(index).send()
  }

  async getCriterionTime() {
    return await this._contract.methods.criterionTime().call()
  }

  setCriterionTime(timestamp) {
    return this._contract.methods.setCriterionTime(timestamp).send()
  }
}

export default TokenDistributor;
