<template>
  <div class="container">
    <img src="../assets/logo.png" alt="" />
    <van-loading color="#1989fa">loading...</van-loading>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import store2 from "store2";
import { useRouter } from "vue-router";
// 获取本地缓存账号数据
const store2WalletList = store2.get("walletInfo") || [];
const router = useRouter();
onMounted(() => {
  setTimeout(() => {
    // 判断是否有账户
    if (store2WalletList.length == 0) {
      // 注册
      router.push({ name: "register" });
    } else {
      // 登录
      router.push({ name: "login" });
    }
  }, 1000);
});
</script>

<style lang="less">
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
</style>
