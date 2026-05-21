<script setup>
// import { ref } from 'vue'

const habits = [
  {
    id: 1,
    name: '每日阅读',
    icon: '📚',
    streak: 12,
    createdAt: '2025-07-01',
    lastCheckin: '今天',
    completedToday: true,
  },

  {
    id: 2,
    name: '晨跑',
    icon: '🏃',
    streak: 5,
    createdAt: '2025-07-03',
    lastCheckin: '昨天',
    completedToday: false,
  },

  {
    id: 3,
    name: '喝水 8 杯',
    icon: '💧',
    streak: 20,
    createdAt: '2025-07-10',
    lastCheckin: '今天',
    completedToday: true,
  },
  {
    id: 4,
    name: '早起',
    icon: '🌅',
    streak: 5,
    createdAt: '2025-07-10',
    lastCheckin: '今天',
    completedToday: true,
  },
]
</script>

<template>
  <div class="app-layout">
    <div class="content">
      <div class="content-header">
        <div class="header-info">
          <h2 class="title">
            习惯管理
          </h2>

          <div class="direction">
            共4个习惯 长按排序管理
          </div>
        </div>

        <div class="header-action">
          <button>
            添加习惯
          </button>
        </div>
      </div>

      <ul class="habit-list">
        <li
          v-for="habit in habits"
          :key="habit.id"
          class="habit-card"
        >
          <div class="card-left">
            <div class="card-main">
              <div class="habit-icon">
                {{ habit.icon }}
              </div>

              <div class="habit-info">
                <div>
                  {{ habit.name }}
                </div>

                <div>
                  创建于{{ habit.createdAt }},已坚持 {{ habit.streak }} 天
                </div>
              </div>
            </div>
          </div>

          <div class="card-right">
            <div class="card-status">
              <div>最近打卡</div>

              <span>
                {{ habit.lastCheckin }}
              </span>
            </div>

            <div class="card-actions">
              <button>
                编辑
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.app-layout {
  display: flex;
 
}

.section-title {
  font-size: 11px;
  color: #78716c;
  text-transform: uppercase;

  font-weight: 700;
}

.app-layout .content {
  // background-color: #f5e6d3;
  flex: 1;
  padding: 30px;
}

.content .habit-list {
  gap: 15px;
  display: flex;
  flex-direction: column;
}

.content .habit-list .card-main {
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
}

.content .habit-card {
  width: 100%;
  height: 100px;
  background-color: white;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.content .card-right {
  display: flex;
  align-items: center;
  justify-content: center;
}

.content-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
}

.header-info .title {
  font-family: 'Fredoka', sans-serif;
  font-size: 32px;
  font-weight: 600;
  letter-spacing: -0.5px;
}
.header-info .direction {
  font-size: 15px;
  color: #78716c;
  margin-top: 6px;
  font-weight: 500;
}
</style>
