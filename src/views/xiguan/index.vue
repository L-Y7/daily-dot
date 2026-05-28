<script setup>
import { computed, ref } from 'vue'

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
        <div
          class="task-card"
          :class="{ done: item.done }"
        >
          <Transition name="pop">
            <div
              v-if="item.done"
              class="check"
            >
              ✔
            </div>
          </Transition>

          <div class="cardup">
            <div class="task-icon">
              {{ item.icon }}
            </div>

            <div class="task-content">
              <div class="task-title">
                {{ item.name }}
              </div>

              <div>
                <span class="task-time">
                  {{ item.time }}
                </span>

                <span class="task-tag">
                  {{ item.day }}
                </span>
              </div>
            </div>
          </div>

          <div class="carddown">
            <div class="l">
              <span
                class="circle"
                :class="{ active: item.done }"
              />

              <span
                class="text"
                :class="{ active: item.done }"
              >
                {{ item.done ? '已完成' : '待打卡' }}
              </span>
            </div>

            <div class="r">
              <button
                class="btn"
                @click="toggle(item)"
              >
                {{ item.done ? '取消' : '打卡✓' }}
              </button>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <Transition name="success">
    <div
      v-if="sucessshow"
      class="biggest"
    >
      <template v-if="type === 'success'">
        <div class="bigger">
          <div class="success-text">
            已打卡
          </div>
          <div class="success-icon">
            ✔
          </div>
        </div>
      </template>

      <template v-else>
        <div class="bigger2">
          <div class="success-text2">
            已取消
          </div>

          <div class="success-icon">
            ✖
          </div>
        </div>
      </template>
    </div>
  </Transition>
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

.task-item {
  width: calc(33.333% - 8px);
  height: 160px;
  margin-top: 20px;
}

.task-card {
  position: relative;
  padding: 20px;
  background-color: white;
  transition: all 0.35s ease;
  border-radius: 20px;
  border: 2px solid #faeee1;
}
.task-item:nth-child(4) {
  margin-top: 32px;
}
.task-card.done {
  transform: translateY(-6px);
  background: #dff7e7;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  text-decoration: none !important;
  border: 2px solid greenyellow;
}

.task-card.done .cardup {
  border-bottom-color: transparent;
}

.cardup {
  width: 100%;
  display: flex;
  gap: 20px;
  padding-bottom: 12px;
  border-bottom: 2px dashed #faeee1;
}

.carddown {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.task-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 26px;
  border-radius: 16px;
  background: #fcf6f0;
  box-shadow:
    0 2px 0 #faeee1,
    0 4px 8px rgba(217, 119, 6, 0.05);
}

.task-content .task-title {
  font-size: 17px;
  font-weight: 600;
  line-height: 1.3;
  font-family: 'Fredoka', sans-serif;
}

.task-time {
  margin-top: 4px;
  font-size: 12px;
  font-weight: 500;
  color: #78716c;
}

.task-tag {
  padding: 5px;
  font-size: 12px;
  font-weight: 500;
  color: #b45309;
  border-radius: 15px;
  background: #fef3c7;
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
.biggest {
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  width: 100%;
  margin-top: 100px;
  justify-content: center;
}
.bigger {
  background-color: #22c55e;
  padding: 20px;
  display: flex;
  border-radius: 30px;
  color: white;
  font-size: 14px;
  font-weight: 700;
  gap: 5px;
}
.bigger2 {
  background-color: red;
  padding: 20px;
  display: flex;
  border-radius: 30px;
  color: white;
  font-size: 14px;
  font-weight: 700;
  gap: 5px;
}
.success-icon {
  border-radius: 50%;
  font-size: 14px;
  color: white;
}
.pop-enter-active {
  transition: all 0.25s ease;
}

.pop-enter-from {
  opacity: 0;
  transform: scale(0.3);
}

.pop-enter-to {
  opacity: 1;
  transform: scale(1);
}
.success-enter-active,
.success-leave-active {
  transition: all 0.35s ease;
}

.success-enter-from,
.success-leave-to {
  opacity: 0;
}

.success-enter-from .bigger,
.success-leave-to .bigger {
  transform: scale(0.7) translateY(20px);
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
