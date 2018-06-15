<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="info">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="#">Admin</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item href="#" active>PXL</b-nav-item>
          <b-nav-item href="#" disabled>WhiteList</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <!-- navbar-1.vue -->
    <br>
    <b-alert show align="left">
      <div>TOTAL SUPPLY : {{totalSupply}} PXL</div>
      <div>CONTRACT ADDRESS : {{contractAddress}}</div>
    </b-alert>
    <b-card title="Mint"
            img-top
            tag="article">
      <p class="card-text">
        PXL 토큰을 추가 발행합니다. 발행된 토큰은 오너의 계좌로 전송됩니다.
      </p>
      <b-input-group>
        <b-form-input id="mintAmount"
                      v-model.trim="mintAmount"
                      type="text"
                      :state="mintAmountState"
                      placeholder="Amount"></b-form-input>
        <b-input-group-append>
          <b-btn variant="info"
                 :disabled="!mintAmountState || mintProgress"
                 v-on:click="mint()">실행
          </b-btn>
        </b-input-group-append>
      </b-input-group>
      <b-progress v-if="mintProgress" :value="100" variant="danger" :animated="true"></b-progress>
      <div v-if="mintTransactionHash">
        TransactionHash : <a target="_blank"
                             v-bind:href="getEtherscanURL(mintTransactionHash)">{{mintTransactionHash}}</a>
      </div>
    </b-card>
    <br>
    <b-card title="Burn"
            img-top
            tag="article">
      <p class="card-text">
        PXL 토큰을 소각합니다.
      </p>
      <b-input-group>
        <b-form-input id="burnAmount"
                      v-model.trim="burnAmount"
                      type="text"
                      :state="burnAmountState"
                      placeholder="Amount"></b-form-input>
        <b-input-group-append>
          <b-btn variant="info"
                 :disabled=!burnAmountState
                 v-on:click="burn()">실행
          </b-btn>
        </b-input-group-append>
      </b-input-group>
      <b-progress v-if="burnProgress" :value="100" variant="danger" :animated="true"></b-progress>
      <div v-if="burnTransactionHash">
        TransactionHash : <a target="_blank"
                             v-bind:href="getEtherscanURL(burnTransactionHash)">{{burnTransactionHash}}</a>
      </div>
    </b-card>
    <br>
    <b-card title="BalanceOf"
            img-top
            tag="article">
      <p class="card-text">
        보유중인 PXL 토큰을 조회합니다.
      </p>
      <b-input-group>
        <b-form-input id="balanceOfAddress"
                      v-model.trim="balanceOfAddress"
                      type="text"
                      :state="balanceOfAddressState"
                      placeholder="Address"></b-form-input>
        <b-input-group-append>
          <b-btn variant="info"
                 :disabled="!balanceOfAddressState"
                 v-on:click="balanceOf()">실행
          </b-btn>
        </b-input-group-append>
      </b-input-group>
      <div v-if="balanceOfAmount">balanceOf : {{balanceOfAmount}} PXL</div>
    </b-card>
    <br>
    <b-card title="Transfer"
            img-top
            tag="article">
      <p class="card-text">
        PXL 토큰을 전송합니다.
      </p>
      <b-input-group>
        <b-form-input id="transferAddress"
                      v-model.trim="transferAddress"
                      type="text"
                      :state="transferAddressState"
                      placeholder="Address"></b-form-input>
        <b-form-input id="transferAmount"
                      v-model.trim="transferAmount"
                      type="text"
                      :state="transferAmountState"
                      placeholder="Amount"></b-form-input>
        <b-input-group-append>
          <b-btn variant="info"
                 :disabled="!transferAddressState || !transferAmountState || transferProgress"
                 v-on:click="transfer()">실행
          </b-btn>
        </b-input-group-append>
      </b-input-group>
      <b-progress v-if="transferProgress" :value="100" variant="danger" :animated="true"></b-progress>
      <div v-if="transferTransactionHash">
        TransactionHash : <a target="_blank" v-bind:href="getEtherscanURL(transferTransactionHash)">{{transferTransactionHash}}</a>
      </div>
    </b-card>
    <br>
    <b-card title="AddOwner"
            img-top
            tag="article">
      <p class="card-text">
        신규 오너를 등록합니다.
      </p>
      <b-input-group>
        <b-form-input id="addOwnerAddress"
                      v-model.trim="addOwnerAddress"
                      type="text"
                      :state="addOwnerAddressState"
                      placeholder="Address"></b-form-input>
        <b-input-group-append>
          <b-btn variant="info"
                 :disabled="!addOwnerAddressState || addOwnerProgress"
                 v-on:click="addOwner()">실행
          </b-btn>
        </b-input-group-append>
      </b-input-group>
      <b-progress v-if="addOwnerProgress" :value="100" variant="danger" :animated="true"></b-progress>
      <div v-if="addOwnerTransactionHash">
        TransactionHash : <a target="_blank" v-bind:href="getEtherscanURL(addOwnerTransactionHash)">{{addOwnerTransactionHash}}</a>
      </div>
    </b-card>
  </div>
</template>

<script>
  import Web3 from 'web3'
  import BigNumber from 'bignumber.js';
  import abi from '../assets/abi/PXL.json';

  web3 = new Web3(web3.currentProvider);
  const contract = new web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS.PXL);
  web3.eth.getAccounts((err, account) => contract.options.from = account[0]);

  export default {
    name: 'Admin',
    computed: {
      mintAmountState() {
        return parseInt(this.mintAmount) > 0 ? true : false
      },
      burnAmountState() {
        return parseInt(this.burnAmount) > 0 ? true : false
      },
      balanceOfAddressState() {
        return this.balanceOfAddress && this.balanceOfAddress.length > 0 ? true : false
      },
      transferAddressState() {
        return this.transferAddress && this.transferAddress.length > 0 ? true : false
      },
      transferAmountState() {
        return parseInt(this.transferAmount) > 0 ? true : false
      },
      addOwnerAddressState() {
        return this.addOwnerAddress && this.addOwnerAddress.length > 0 ? true : false
      },
    },
    data() {
      return {
        contractAddress: process.env.CONTRACT_ADDRESS.PXL,
        totalSupply: null,
        mintAmount: null,
        mintProgress: false,
        mintTransactionHash: null,
        burnAmount: null,
        burnProgress: false,
        burnTransactionHash: null,
        balanceOfAddress: null,
        balanceOfAmount: null,
        transferAddress: null,
        transferAmount: null,
        transferProgress: false,
        transferTransactionHash: null,
        addOwnerAddress: null,
        addOwnerProgress: false,
        addOwnerTransactionHash: null,
      }
    },
    methods: {
      getTotalSupply() {
        contract.methods.totalSupply().call((err, receipt) => {
          this.totalSupply = new BigNumber(receipt).div(new BigNumber(Math.pow(10, 18))).toNumber();
        });
      },
      mint() {
        this.mintProgress = true;
        let amount = new BigNumber(this.mintAmount).multipliedBy(new BigNumber(Math.pow(10, 18)));
        contract.methods.mint(amount).send()
          .on('transactionHash', (hash) => {
            this.mintTransactionHash = hash;
          })
          .on('receipt', (receipt) => {
            this.mintProgress = false;
            this.getTotalSupply();
          })
          .on('error', (err) => {
            this.mintProgress = false;
            alert(err);
          });
      },
      burn() {
        this.burnProgress = true;
        let amount = new BigNumber(this.burnAmount).multipliedBy(new BigNumber(Math.pow(10, 18)));
        contract.methods.burn(amount).send()
          .on('transactionHash', (hash) => {
            this.burnTransactionHash = hash;
          })
          .on('receipt', (receipt) => {
            this.burnProgress = false;
            this.getTotalSupply();
          })
          .on('error', (err) => {
            this.burnProgress = false;
            alert(err);
          });
      },
      balanceOf() {
        contract.methods.balanceOf(this.balanceOfAddress).call((err, receipt) => {
          this.balanceOfAmount = new BigNumber(receipt).div(new BigNumber(Math.pow(10, 18))).toNumber();
        });
      },
      transfer() {
        this.transferProgress = true;
        let amount = new BigNumber(this.transferAmount).multipliedBy(new BigNumber(Math.pow(10, 18)));
        contract.methods.transfer(this.transferAddress, amount).send()
          .on('transactionHash', (hash) => {
            this.transferTransactionHash = hash;
          })
          .on('receipt', (receipt) => {
            this.transferProgress = false;
          })
          .on('error', (err) => {
            this.transferProgress = false;
            alert(err);
          });
      },
      addOwner() {
        this.addOwnerProgress = true;
        contract.methods.addOwner(this.addOwnerAddress).send()
          .on('transactionHash', (hash) => {
            this.addOwnerTransactionHash = hash;
          })
          .on('receipt', (receipt) => {
            this.addOwnerProgress = false;
          })
          .on('error', (err) => {
            this.addOwnerProgress = false;
            alert(err);
          });
      },
      getEtherscanURL(hash) {
        if (process.env.NODE_ENV == 'production') {
          return `https://etherscan.io/tx/${hash}`
        } else {
          return `https://ropsten.etherscan.io/tx/${hash}`
        }
      }
    },
    created() {
      this.getTotalSupply();
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
