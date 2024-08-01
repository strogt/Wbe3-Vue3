<template>
  <van-space>
    <van-button type="primary" @click="createWall">创建钱包</van-button>
    <van-button type="primary">导入钱包</van-button>
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
  </van-space>
  <!-- 助记词 -->
  <div v-if="mnemonic">
    <p>{{ mnemonic }}</p>
    <van-button size="mini" @click="confirmSaveMnemonic">我已保存了</van-button>
  </div>
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
// const { hdkey } = require("ethereumjs-wallet");

const dialogShow = ref(false);
const password = ref("");
const mnemonic = ref("");
const dialogShowMnemonic = ref(false);
const mnemonic2 = ref("");

// 创建钱包
const createWall = () => {
  dialogShow.value = true;
};

// 创建钱包确定
const createWallConfirm = () => {
  if (!password.value) {
    showNotify({ message: "密码不能为空" });
  } else {
    // 生成助记词
    mnemonic.value = bip39.generateMnemonic();
  }
};

// 保存助记词
const confirmSaveMnemonic = () => {
  dialogShowMnemonic.value = true;
};

// 助记词确认
const mnemonicConfirm = async () => {
  console.log(mnemonic2.value);
  if (!mnemonic.value) {
    showNotify({ message: "助记词不能为空" });
  } else if (mnemonic2.value == mnemonic.value) {
    // 生成种子
    const seed = await bip39.mnemonicToSeed(mnemonic.value);
    // 生成HD钱包对象
    const hdWallet = hdkey.fromMasterSeed(seed);
    // 生成密钥对
    const keyPair = hdWallet.derivePath("m/44'/60'/0'/0/0");
    // 获取钱包对象
    const wallet = keyPair.getWallet();
    // 获取钱包值
    const walletInfo = [
      {
        lowerCaseAddress: wallet.lowerCaseAddress(),
        checksumAddressString: wallet.getChecksumAddressString(),
        privateKey: wallet.getPrivateKey().toString("hex"),
        keyStore: wallet.toV3(password.value),
      },
    ];
    console.log(walletInfo);
  } else {
    showNotify({ message: "助记词错误" });
  }
};
</script>

<style lang="less">
p {
  user-select: all;
}
</style>
