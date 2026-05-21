<script setup lang="ts">
import Aside from './components/Aside.vue'
</script>

<template>
  <div class="layout">
    <Aside />
    <div class="main">
      <RouterView />
    </div>
  </div>
</template>

<style lang='scss' scoped>
.layout {
  width: 100vw;
  height: 100vh;
  display: flex;
  .main {
    flex: 1;
    background-color: #fffbeb;
    min-height: 100%;
    padding: 50px;
  }
}
</style>
