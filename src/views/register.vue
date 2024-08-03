<template>
  <div class="container">
    <van-space>
      <van-button type="primary" @click="createWall">创建钱包</van-button>
      <van-button type="primary">导入钱包</van-button>
    </van-space>
  </div>
  <!-- 密码输入弹窗 -->
  <van-dialog
    v-model:show="dialogShow"
    title="请输入密码"
    show-cancel-button
    @confirm="createWallConfirm"
  >
    <van-cell-group inset>
      <van-field
        v-model="password"
        label="密码："
        placeholder="请输入密码"
        type="password"
      />
    </van-cell-group>
  </van-dialog>
  <!-- 助记词生成弹窗 -->
  <van-dialog
    v-model:show="copyMnemonic"
    title="请保管好助记词"
    show-cancel-button
    @confirm="confirmSaveMnemonic"
  >
    <!-- 助记词 -->
    <p>{{ mnemonic }}</p>
  </van-dialog>
  <!-- 助记词确认弹窗 -->
  <van-dialog
    v-model:show="dialogShowMnemonic"
    title="请输入助记词"
    show-cancel-button
    @confirm="mnemonicConfirm"
  >
    <van-cell-group inset>
      <van-field
        v-model="mnemonic2"
        label="助记词："
        placeholder="请输入助记词"
      />
    </van-cell-group>
  </van-dialog>
</template>

<script setup>
import { showNotify } from "vant";
import "vant/es/notify/style";
import { ref } from "vue";
import * as bip39 from "bip39";
import { hdkey } from "ethereumjs-wallet";
import store2 from "store2";
import { useRouter } from "vue-router";
const router = useRouter();

const dialogShow = ref(false);
const password = ref("");
const mnemonic = ref("");
const copyMnemonic = ref(false);
const dialogShowMnemonic = ref(false);
const mnemonic2 = ref("");
// 获取本地缓存账号数据
const store2WalletList = store2.get("walletInfo") || [];
console.log("store2WalletList.length-----", store2WalletList.length);

// 创建钱包
const createWall = () => {
  dialogShow.value = true;
};

// 创建钱包确定
const createWallConfirm = () => {
  if (!password.value) {
    showNotify({ message: "密码不能为空" });
  } else {
    console.log("store2WalletList.length-----", store2WalletList.length);
    // 生成助记词
    if (store2WalletList.length == 0) {
      // 本地缓存无助记词生成展示
      mnemonic.value = bip39.generateMnemonic();
      copyMnemonic.value = true;
    } else {
      // 本地缓存有助记词直接生成账户
      mnemonic.value = store2WalletList[0]["mnemonic"];
      createAccount();
    }
  }
};

// 保存助记词
const confirmSaveMnemonic = () => {
  copyMnemonic.value = false;
  dialogShowMnemonic.value = true;
};

// 助记词确认
const mnemonicConfirm = async () => {
  if (!mnemonic.value) {
    showNotify({ message: "助记词不能为空" });
  } else if (mnemonic2.value != mnemonic.value) {
    showNotify({ message: "助记词输入错误" });
  } else {
    createAccount();
  }
};

// 生成账户
const createAccount = async () => {
  // 生成种子
  const seed = await bip39.mnemonicToSeed(mnemonic.value);
  // 生成HD钱包对象
  const hdWallet = hdkey.fromMasterSeed(seed);
  // 生成地址id
  const addressIndex = store2WalletList.length;
  // 生成密钥对
  const keyPair = hdWallet.derivePath(`m/44'/60'/0'/0/${addressIndex}`);
  // 获取钱包对象
  const wallet = keyPair.getWallet();
  // 获取钱包值
  const walletItme = {
    id: addressIndex,
    lowerCaseAddress: wallet.getAddressString(),
    checksumAddressString: wallet.getChecksumAddressString(),
    privateKey: wallet.getPrivateKey().toString("hex"),
    keyStore: await wallet.toV3(password.value),
    password: password.value,
    mnemonic: mnemonic.value,
    balance: 0,
  };
  store2WalletList.push(walletItme);
  store2("walletInfo", store2WalletList);
  password.value = "";
  mnemonic.value = "";
  showNotify({ message: `账户创建成功当前账户id=${addressIndex}` });
  router.push({ name: "user" });
};
</script>

<style lang="less">
body {
  background-image: url("../assets/web3_bg.jpg");
  background-position: top;

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  p {
    user-select: all;
  }
}
</style>
