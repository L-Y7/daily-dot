<script setup lang="ts">
const props = defineProps({
  id:Number,
  name: String,
  age: Number,
 
})
console.warn('这是subitem', props)
</script>

<template>
  <div>
    <p>id是:{{ id }}</p>
    <p>name是:{{ name }}</p>
    <p>年龄是:{{ age }}</p>
  </div>
</template>

<style lang='scss' scoped></style>
