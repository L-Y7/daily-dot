<script setup>
import { ref } from 'vue'
import ChangeList from './comonents/ChangeList.vue'
import Shaixuan from './comonents/Shaixuan.vue'

const inputvalue = ref('')
const list = ref([])
const filters = ref('all')

function addevent() {
  const text = inputvalue.value.trim()
  if (!text)
    return

  list.value.push({
    id: Date.now(),
    text,
    done: false,
  })
  inputvalue.value = ''
}

function removeItem(index) {
  list.value.splice(index, 1)
}

function toggledone(index) {
  const item = list.value[index]
  if (!item)
    return

  item.done = !item.done
}
</script>

<template>
  <input
    v-model="inputvalue"
    @keyup.enter="addevent"
  >
  <button @click="addevent">
    add
  </button>
  <Shaixuan v-model:filters="filters" />
  <ChangeList
    :list="list"
    :toggledone="toggledone"
    :remove-item="removeItem"
    :filters="filters"
  />
</template>

<style>
.done {
  color: gray;
  text-decoration: line-through;
}
</style>
