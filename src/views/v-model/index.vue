<script setup>
import { ref } from 'vue'

const sex = ref('')
const text = ref('')
</script>

<template>
  <input v-model="sex" type="radio" value="男">男
  <input v-model="sex" type="radio" value="女">女
  <input :value="text" @input="event => text = event.target.value">
  {{ text }}
</template>

<style lang='scss' scoped></style>
