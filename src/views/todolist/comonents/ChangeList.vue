<script setup>
import { computed } from 'vue'

const { list, removeItem, toggledone, filters } = defineProps({
  list: Array,
  removeItem: Function,
  toggledone: Function,
  filters: String,
})

const filteredList = computed(() => {
  if (filters === 'done')
    return list.filter(item => item.done)

  if (filters === 'todo')
    return list.filter(item => !item.done)

  return list
})
</script>

<template>
  <ul>
    <li
      v-for="(item, index) in filteredList"
      :key="item.id"
    >
      <span :class="{ done: item.done }">
        {{ item.text }}
      </span>
      <button @click="removeItem(index)">
        删除
      </button>
      <button @click="toggledone(index)">
        {{ item.done ? '取消' : '完成' }}
      </button>
    </li>
  </ul>
</template>

<style lang="scss" scoped></style>
