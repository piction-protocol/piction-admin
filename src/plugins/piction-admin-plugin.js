import Sale from './abi-class/Sale'
import Product from './abi-class/Product'
import PXL from './abi-class/PXL'
import TokenDistributor from './abi-class/TokenDistributor'
import Whitelist from './abi-class/Whitelist'

import SaleSource from '../assets/abi/Sale.json'
import ProductSource from '../assets/abi/Product.json'
import PXLSource from '../assets/abi/PXL.json'
//import StateableSource from '../assets/abi/Stateable.json'
import TokenDistributorSource from '../assets/abi/TokenDistributor.json'
import WhitelistSource from '../assets/abi/Whitelist.json'

const PictionAdminPlugin = {
  async install(Vue, options) {
    Vue.prototype.$contract = {};

    const pxl = new PXL(
      PXLSource.abi,
      localStorage.getItem('PXLAddress'),
      options.account
    )
    Vue.prototype.$contract.pxl = pxl

    const whitelist = new Whitelist(
      WhitelistSource.abi,
      localStorage.getItem('whitelistAddress'),
      options.account
    )
    Vue.prototype.$contract.whitelist = whitelist

    const sale = new Sale(
      SaleSource.abi,
      localStorage.getItem('saleAddress'),
      options.account
    )
    Vue.prototype.$contract.sale = sale

    const productAddress = await sale.getProductAddress()
    const product = new Product(
      ProductSource.abi,
      productAddress,
      options.account
    )
    Vue.prototype.$contract.product = product

    const tokenDistributorAddress = await sale.getTokenDistributorAddress()
    const tokenDistributor = new TokenDistributor(
      TokenDistributorSource.abi,
      tokenDistributorAddress,
      options.account
    )
    Vue.prototype.$contract.tokenDistributor = tokenDistributor
  }
}

export default PictionAdminPlugin;
