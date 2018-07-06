import Web3 from 'web3';
import abi from '../assets/abi/Whitelist.json';

const Whitelist = {
  contract: null,
  init() {
    this.contract = new web3.eth.Contract(abi, '0x4b248E7C083Dd78194a7533EC4fD46775e291319');
    web3.eth.getAccounts((err, account) => this.contract.options.from = account[0]);
  },
  removeAddressFromWhitelist(address) {
    return this.contract.methods.removeAddressFromWhitelist(address).send()
  },
  async getWhitelist() {
    const addedAllAddresses = await this.contract.getPastEvents('WhitelistedAddressAdded', {
      fromBlock: 0,
      toBlock: 'latest'
    }, (error, events) => {
      return events
    })

    const filterList = await Promise.all(addedAllAddresses.map(async address => {
      const result = await this.contract.methods.whitelist(address.returnValues[0]).call()
      return result ? address.returnValues[0] : null
    }))

    const list = filterList.filter(i => i !== null)
    return Array.from(new Set(list))
  },
  addWhitelists(addresses) {
    return this.contract.methods.addAddressesToWhitelist(addresses).send()
  }
}

export default Whitelist
