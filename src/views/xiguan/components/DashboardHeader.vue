<script setup>
import { computed } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
})
const username = localStorage.getItem('neirong')
const time = localStorage.getItem('loginTime')
const count = computed(() => {
  return props.items.filter(item => item.done).length
})

const progress = computed(() => {
  return (count.value / props.items.length)
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
</style>
