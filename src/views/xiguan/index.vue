<script setup>
const username = localStorage.getItem('neirong')
const time = localStorage.getItem('loginTime')

const items = [
  { id: 1, name: '早起', time: '6.30前·', day: '连续三天', icon: '🌅' },
  { id: 2, name: '早起', time: '6.30前·', day: '连续三天', icon: '🌅' },
  { id: 3, name: '早起', time: '6.30前·', day: '连续三天', icon: '🌅' },
  { id: 4, name: '早起', time: '6.30前·', day: '连续三天', icon: '🌅' },
]
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
      <div class="progress-inner">
        0/4
      </div>
    </div>
  </div>

  <div class="task-section">
    <ul class="task-list">
      <li
        v-for="item in items"
        :key="item.id"
        class="task-item"
      >
        <div class="task-card">
          <div class="cardup">
            <div class="task-icon">
              {{ item.icon }}
            </div>
            <div class="task-content">
              <div class="task-title">
                {{ item.name }}
              </div>

              <div>
                <span class="task-time">{{ item.time }}</span>
                <span class="task-tag">{{ item.day }}</span>
              </div>
            </div>
          </div>
          <div class="carddown">
            <div class="l">
              <span class="circle" />
              <span class="text">待打卡</span>
            </div>
            <div class="r">
              <button class="btn">
                打卡✓
              </button>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang='scss' scoped>
.task-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.task-card .cardup {
  border-bottom: 2px dashed #faeee1;
  padding-bottom: 12px;
  width: 100%;
  display: flex;
  gap: 20px;
}
.task-icon {
  width: 48px;
  height: 48px;
  border-radius: 16px;
  background: #fcf6f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  flex-shrink: 0;
  box-shadow:
    0 2px 0 #faeee1,
    0 4px 8px rgba(217, 119, 6, 0.05);
}

.task-content .task-title {
  font-family: 'Fredoka', sans-serif;
  font-size: 17px;
  font-weight: 600;
  line-height: 1.3;
}

.task-item {
  width: calc(33.333% - 8px);
  background-color: white;
  height: 160px;
  padding: 20px;
}

.task-time {
  font-size: 12px;
  color: #78716c;
  margin-top: 4px;
  font-weight: 500;
}

.task-tag {
  background: #fef3c7;
  color: #b45309;
  font-size: 12px;
  font-weight: 500;
  border-radius: 15px;
  padding: 5px;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
}

.header-time {
  margin-top: 8px;
  font-size: 15px;
  color: #78716c;
  font-weight: 500;
  margin-top: 15px;
}

.wave-icon {
  animation: wave 2.5s infinite;
  display: inline-block;
}

.progress-card {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

.progress-inner {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  filter: drop-shadow(0 2px 20px orange);
}
.carddown {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.circle {
  display: inline-block;
  background-color: #78716c;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 8px;
}
.btn {
  background: #d97706;
  color: #ffffff;
  box-shadow:
    0 4px 0 #b45309,
    0 6px 12px rgba(217, 119, 6, 0.25);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 44px;
  padding: 0 22px;
  border-radius:10px;
  font-weight: 700;
  font-size: 15px;
  font-family: 'Nunito', sans-serif;
  border: 2px solid transparent;
  white-space: nowrap;
  user-select: none;
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
