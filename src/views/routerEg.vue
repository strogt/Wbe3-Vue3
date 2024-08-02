<template>
  <h1>路由跳转方式</h1>
  <!-- // router-link 本质就是个a标签 -->
  <RouterLink to="/query?id=100&name=strogt"
    >router-link使用查询字符串传递参数</RouterLink
  >
  <br />
  <router-link to="/params/100/name/strogt"
    >router-link使用路径传递参数</router-link
  >
  <br />
  <router-link :to="{ path: '/query', query: { id: 100, name: 'strogt' } }"
    >router-link使用查询字符串动态传递参数</router-link
  >
  <br />
  <!-- 路径动态传参没有path,使用别名name -->
  <router-link :to="{ name: 'params', params: { id: 100, name: 'strogt' } }"
    >rrouter-link使用路径动态传递参数</router-link
  >
  <br />
  <van-button type="primary" @click="go">编程式导航</van-button>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
// 实例化
const router = useRouter();

const go = () => {
  //   router.push("/query?id=100&name=strogt");
  router.push({ name: "params", params: { id: 100, name: "strogt" } });
};
</script>

<style lang="less"></style>
