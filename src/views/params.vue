<template>
  <h1>使用路径传递参数</h1>
  <p>id: {{ $route.params.id }}</p>
  <p>name: {{ $route.params.name }}</p>
</template>

<script setup>
import { ref } from "vue";
</script>

<style lang="less"></style>
