<!-- 路由嵌套需要在父页面增加router-view煊染 -->
<template>
  <Header />
  <RouterView />
  <Footer />
</template>

<script setup>
import { ref } from "vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import { RouterView } from "vue-router";
</script>

<style lang="less"></style>
