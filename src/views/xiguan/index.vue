<script setup>
import { ref } from 'vue'
import { useData } from '../../composables/useData'
import DashboardHeader from './components/DashboardHeader.vue'
import TaskCard from './components/TaskCard.vue'
import Toast from './components/Toast.vue'

const sucessshow = ref(false)
const type = ref('')
// 打卡页直接使用共享 habits，切换状态后管理页和统计页都会同步。
const { habits: items, remainingCount, toggleHabit } = useData()

function toggle(item) {
  toggleHabit(item)
  sucessshow.value = true
  if (item.done) {
    type.value = 'success'
  }
  else {
    type.value = 'cancel'
  }
  setTimeout(() => {
    sucessshow.value = false
  }, 2000)
}

const xianshi = remainingCount
</script>

<template>
  <DashboardHeader :items="items" />
  <div class="title">
    <div class="title-left">
      <div class="bar" />
      <div>今日待打卡</div>
    </div>
    <div class="title-right">
      {{ xianshi }} 个待完成 · 共 {{ items.length }} 个
    </div>
  </div>

  <div class="task-section">
    <ul class="task-list">
      <li
        v-for="item in items"
        :key="item.id"
        class="task-item"
      >
        <TaskCard :item="item" @toggle="toggle" />
      </li>
    </ul>
  </div>
  <Toast :show="sucessshow" :type="type" />
</template>

<style lang="scss" scoped>
.wave-icon {
  display: inline-block;
  animation: wave 2.5s infinite;
}

.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  font-size: 20px;
  font-weight: 500;
}

.title-left {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.title-right {
  font-size: 13px;
  color: #78716c;
  font-weight: 600;
}
.bar {
  width: 5px;
  height: 25px;
  border-radius: 999px;
  background-color: #d97706;
}

.task-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 0;
  margin: 0;
  list-style: none;
}
.task-item {
  width: calc(33.333% - 8px);
  height: 160px;
  margin-top: 20px;
}

.task-item:nth-child(4) {
  margin-top: 32px;
}
.check {
  position: absolute;
  top: 12px;
  right: 10px;
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  color: white;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.35);
}

.circle {
  width: 8px;
  height: 8px;
  display: inline-block;
  margin-right: 8px;
  border-radius: 50%;
  background-color: #78716c;
  transition: all 0.3s ease;
}

.circle.active {
  transform: scale(1.5);
  background: #22c55e;
  box-shadow: 0 0 10px rgba(34, 197, 94, 0.5);
}

.text {
  transition: all 0.3s ease;
}

.text.active {
  color: #16a34a;
  font-weight: 600;
}

.btn {
  height: 44px;
  padding: 0 22px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  outline: none;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  border-radius: 10px;
  background: #d97706;
  color: #ffffff;
  font-size: 15px;
  font-weight: 700;
  font-family: 'Nunito', sans-serif;
  text-decoration: none;
  box-shadow:
    0 4px 0 #b45309,
    0 6px 12px rgba(217, 119, 6, 0.25);
}

@keyframes wave {
  0% {
    transform: rotate(0deg);
  }

  15% {
    transform: rotate(14deg);
  }

  30% {
    transform: rotate(-8deg);
  }

  45% {
    transform: rotate(14deg);
  }

  60% {
    transform: rotate(-4deg);
  }

  75% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(0deg);
  }
}
</style>
