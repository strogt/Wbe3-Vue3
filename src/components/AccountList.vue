<template>
  <van-field
    v-model="fieldValue"
    is-link
    readonly
    label="当前账户"
    @click="showPicker = true"
  />
  <van-popup v-model:show="showPicker" round position="bottom">
    <van-picker
      :columns="store2WalletList"
      @cancel="showPicker = false"
      @confirm="onConfirm"
    />
  </van-popup>
</template>

<script setup>
import { ref, computed } from "vue";
import store2 from "store2";
import { AccoutFormat } from "../utils/format";
// 获取本地缓存账号数据
const store2WalletList = store2.get("walletInfo") || [];
console.log("store2WalletList", store2WalletList);

store2WalletList.map((item) => {
  item.text = AccoutFormat(item.lowerCaseAddress);
  item.value = item.lowerCaseAddress;
});

const fieldValue = ref(store2WalletList[0]["text"]);
const showPicker = ref(false);

const onConfirm = ({ selectedOptions }) => {
  showPicker.value = false;
  fieldValue.value = selectedOptions[0].text;
};
</script>

<style lang="less">
body {
  background-image: none;
}
</style>
