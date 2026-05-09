<script setup>
defineProps({
  list: Array,
  removeItem:Function,
  toggledone:Function
})

</script>

<template>
  <ul>
    <li v-for="(item, index) in list" :key="index">
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
  </ul>
</template>

<style lang='scss' scoped></style>
