<script setup>
import { computed, ref } from 'vue'
import List from './comonents/List.vue'

const inputvalue = ref('')
const list = ref([])
const filters = ref('all')
function addevent() {
  list.value.push(
    {
      id: Date.now(),
      text: inputvalue.value,
      done: false,
    },
  )
  inputvalue.value = ''
}
function removeItem(index) {
  list.value.splice(index, 1)
}
function toggledone(index) {
  list.value[index].done = !list.value[index].done
}
const filteredList = computed(() => {
  if (filters.value === 'done') {
    return list.value.filter(item => item.done)
  }
  if (filters.value === 'todo') {
    return list.value.filter(item => !item.done)
  }
  return list.value
})
</script>

<template>
  <input v-model="inputvalue">
  <button @click="addevent">
    add
  </button>
  <button @click="filters = 'all'">
    全部
  </button>
  <button @click="filters = 'done'">
    已完成
  </button>
  <button @click="filters = 'todo'">
    未完成
  </button>
  <!-- <ul>
    <li v-for="(item, index) in filteredList" :key="index">
      <span :class="{ done: item.done }">
        {{ item.text }}
        {{ item.done }}
      </span>
      <button @click="removeItem(index)">
        删除
      </button>
      <button @click="toggledone(index)">
        {{ item.done ? '取消' : '完成' }}
      </button>
    </li>
  </ul> -->
  <List :list="filteredList" :toggledone :remove-item />
</template>

<style>
.done {
  text-decoration: line-through;
  color: gray;
}
</style>
