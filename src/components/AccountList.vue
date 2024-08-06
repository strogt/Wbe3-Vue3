<template>
  <div>
    <van-cell
      :title="item.text"
      icon="user-o"
      v-for="item in walletInfoAddressFilter"
    >
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <template #right-icon>
        <van-button @click="send(item)">{{ item.balance }}</van-button>
      </template>
    </van-cell>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import store2 from "store2";
import { AccoutFormat } from "../utils/format";
import Web3 from "web3";
import ethwallet from "ethereumjs-wallet";
import Tx from "ethereumjs-tx";
const web3 = new Web3(
  Web3.givenProvider ||
    "wss://sepolia.infura.io/ws/v3/896a24513f854dbd9e56cc6bc929328a"
);

// 获取本地缓存账号数据
const store2WalletList = store2.get("walletInfo") || [];

const walletInfoAddressFilter = computed(() => {
  store2WalletList.forEach(async (item) => {
    item.text = AccoutFormat(item.lowerCaseAddress);
    item.value = item.lowerCaseAddress;
    // 根据地址获取余额
    const result = await web3.eth.getBalance(item.lowerCaseAddress);
    item.balance = web3.utils.fromWei(result, "ether");
  });
  return store2WalletList;
});

const send = async (item) => {
  console.log("item----", item);
  const wallObj = await ethwallet.fromV3(item.keyStore, item.password);
  const key = wallObj.getPrivateKey().toString("hex");
  console.log("key---", key);
  const privateKey = Buffer(key, "hex");
  console.log("privateKey---", privateKey);
  const fromAddress = item.value;
  // 获取账户交易次数
  const nonce = await web3.eth.getTransactionCount(fromAddress);
  // 获取预计转账gas
  const gasPrice = await web3.eth.getGasPrice();

  // 转账金额以wei为单外
  let value = web3.utils.toWei("0.001", "ether");
  let rawTx = {
    from: fromAddress,
    nonce,
    gasPrice,
    to: "0xaA5bb004Ae4756eBd33dd1377B59263C130efA21",
    value,
    data: "0x00",
  };

  // 2.生成serializedTx
  // gas 估算
  let gas = await web3.eth.estimateGas(rawTx);
  console.log("gas----", gas);
  rawTx.gas = gas;
  console.log("rawTx----", rawTx);
  // 使用ethereumjs-tx 实现秘钥加密
  const tx = new Tx(rawTx);
  tx.sign(privateKey);
  console.log(111);

  // 生成serializedTx
  const serializedTx = tx.serialize();
  console.log("serializedTx----", serializedTx);

  // 开始转账
  // const trans = web3.eth.sendSignedTransaction(
  //   "0x" + serializedTx.toString("hex")
  // );
  // console.log("trans----", trans);
  // trans.on("transactionHash", (txid) => {
  //   console.log("交易id:", txid);
  //   console.log(`https://sepolia.etherscan.io/tx/${txid}`);
  // });
};
</script>

<style lang="less">
body {
  background-image: none;
}
</style>
