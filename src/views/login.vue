<template>
  <div class="container">
    <van-icon name="user-circle-o" size="68" />
    <van-cell-group inset>
      <van-field
        v-model="password"
        label="密码："
        placeholder="请输入密码"
        type="password"
      />
    </van-cell-group>
    <van-button type="primary" @click="login">登录</van-button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import store2 from "store2";
import { useRouter } from "vue-router";

const router = useRouter();

const password = ref("");
// 获取本地缓存账号数据
const store2WalletList = store2.get("walletInfo") || [];

const login = () => {
  let accountInfo = store2WalletList.filter((item) => {
    return password.value == item.password;
  });
  if (accountInfo.length > 0) {
    router.push({ name: "accountList" });
  }
};
</script>

<style lang="less">
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
