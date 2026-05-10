<script setup>
defineProps({
  filters: String,
})

const emit = defineEmits(['update:filters'])
</script>

<template>
  <button @click="emit('update:filters', 'all')">
    全部
  </button>
  <button @click="emit('update:filters', 'done')">
    已完成
  </button>
  <button @click="emit('update:filters', 'todo')">
    未完成
  </button>
</template>

<style lang="scss" scoped></style>
