<script setup>
import { computed, ref } from 'vue'
import TaskCard from './components/TaskCard.vue'

const username = localStorage.getItem('neirong')
const time = localStorage.getItem('loginTime')
const sucessshow = ref('')
const type = ref('')
function toggle(item) {
  item.done = !item.done
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

const items = ref([
  { id: 1, name: '早起', time: '6.30前·', day: '连续三天', icon: '🌅', done: false },
  { id: 2, name: '早起', time: '6.30前·', day: '连续三天', icon: '🌅', done: false },
  { id: 3, name: '早起', time: '6.30前·', day: '连续三天', icon: '🌅', done: false },
  { id: 4, name: '早起', time: '6.30前·', day: '连续三天', icon: '🌅', done: false },
])

const count = computed(() => {
  return items.value.filter(item => item.done).length
})

const progress = computed(() => {
  return (count.value / items.value.length)
})
const xianshi = computed(() => {
  return (4 - count.value)
})
const r = 45
const c = 2 * r * Math.PI
const set = computed(() => {
  return c * (1 - Math.max(progress.value, 0.005))
})
</script>

<template>
  <div class="dashboard-header">
    <div class="header-left">
      <h1>
        <span>早上好,</span>
        <span>{{ username }}</span>
        <span class="wave-icon">👋</span>
      </h1>

      <div class="header-time">
        {{ time }}·今天也要加油啊
      </div>
    </div>

    <div class="progress-card">
      <svg class="progress-svg " width="135" height="135">
        <circle
          class="bg-circle"
          cx="67.5"
          cy="67.5"
          r="45"
        />
        <circle
          class="progress-circle"
          cx="67.5"
          cy="67.5"
          r="45"
          :stroke-dasharray="c"
          :stroke-dashoffset="set"
        />

      </svg>
      <div class="progress-inner">
        <span class="num">{{ count }}</span>/{{ items.length }}
      </div>
    </div>
  </div>

  <div class="title">
    <div class="title-left">
      <div class="bar" />
      <div>今日待打卡</div>
    </div>
    <div class="title-right">
      {{ xianshi }}个待完成·共4个
    </div>
  </div>

  <div class="task-section">
    <ul class="task-list">
      <li
        v-for="item in items"
        :key="item.id"
        class="task-item"
      >
        <TaskCard :item="item" @toggle="toggle(item)" />
      </li>
    </ul>
  </div>
  
</template>

<style lang="scss" scoped>
.dashboard-header {
  display: flex;
  justify-content: space-between;
}

.header-time {
  margin-top: 15px;
  font-size: 15px;
  color: #78716c;
  font-weight: 500;
}

.wave-icon {
  display: inline-block;
  animation: wave 2.5s infinite;
}

.progress-card {
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: white;
  transition: all 0.3s ease;
  position: relative;
}

.progress-inner {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
}
.progress-svg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-90deg);
}

.bg-circle {
  fill: none;
  stroke: #faeee1;
  stroke-width: 12;
}
.progress-circle {
  fill: none;
  stroke: #d97706;
  stroke-width: 12;
  stroke-linecap: round;
  transition: all 0.5s ease;
  transform-origin: center;
}
.num {
  font-family: 'Fredoka', sans-serif;
  font-size: 30px;
  font-weight: 700;
  color: #d97706;
  line-height: 1;
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
