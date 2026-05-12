<script setup>
import Subitem from './Subitem.vue'

const p = {
  id: 10,
  name: 'a',
  age: 22,
}
</script>

<template>
  <Subitem v-bind="p" />
</template>

<style lang='scss' scoped></style>
