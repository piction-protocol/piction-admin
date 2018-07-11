import Contract from './Contract'

class Whitelist extends Contract {
  constructor(abi, address, from) {
    super(abi, address, from);
  }

  removeAddressFromWhitelist(address) {
    return this._contract.methods.removeAddressFromWhitelist(address).send()
  }

  async getWhitelist() {
    const addedAllAddresses = await this._contract.getPastEvents('RoleAdded', 'whitelist', {
      fromBlock: 0,
      toBlock: 'latest'
    }, (error, events) => {
      return events
    })

    const filterList = await Promise.all(addedAllAddresses.map(async address => {
      const result = await this._contract.methods.whitelist(address.returnValues[0]).call()
      return result ? address.returnValues[0] : null
    }))

    const list = filterList.filter(i => i !== null)
    return Array.from(new Set(list))
  }

  addWhitelists(addresses) {
    return this._contract.methods.addAddressesToWhitelist(addresses).send()
  }
}

export default Whitelist;
