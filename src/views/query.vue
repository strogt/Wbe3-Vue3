<template>
  <h1>使用查询字符串传递参数</h1>
  <p>id: {{ $route.query.id }}</p>
  <p>name: {{ $route.query.name }}</p>
</template>

<script setup>
import { ref } from "vue";
</script>

<style lang="less"></style>
