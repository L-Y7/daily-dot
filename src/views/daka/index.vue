<script setup>
import { ref } from 'vue'

const current = ref(1)
const list = [
  { id: 1, name: '每日打卡', path: '/daily' },
  { id: 2, name: '深度管理', path: '/manage' },
  { id: 3, name: '数据统计', path: '/stats' },
]
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
    <div class="sidebar">
      <div class="sidebar-header">
        <div class="logo-icon">
          🌱
        </div>

        <div>
          <p class="logo-title">
            DailyDot
          </p>

          <p>1.0</p>
        </div>
      </div>

      <div class="sidebar-main">
        <div class="section-title">
          主导航
        </div>

        <div class="nav-menu">
          <RouterLink
            v-for="item in list"
            :key="item.id"
            :to="item.path"
            :class="{ active: current === item.id }"
            @click="current = item.id"
          >
            {{ item.name }}
          </RouterLink>
        </div>
      </div>

      <div class="sidebar-footer">
        <div class="section-title">
          其他
        </div>

        <a href="#" class="footer-link">
          原型概览
        </a>
      </div>
    </div>

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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

a {
  text-decoration: none;
  color: inherit;
}

li {
  list-style: none;
}

.app-layout {
  display: flex;
}

.app-layout .sidebar {
  background-color: white;
  height: 100vh;
  width: 200px;
  padding: 25px;
}

.app-layout .sidebar .sidebar-header {
  display: flex;
  border-bottom: 3px dashed #faeee1;
  margin-bottom: 10px;

  align-items: center;
  justify-content: center;
  gap: 12px;
}

.app-layout .sidebar .sidebar-header .logo-icon {
  font-size: 20px;
  background-color: orange;
  border-radius: 10px;
  width: 40px;
  height: 40px;
  text-align: center;
}

.sidebar-header .logo-title {
  font-weight: 500;
  font-size: 20px;
}

.section-title {
  font-size: 11px;
  color: #78716c;
  text-transform: uppercase;

  font-weight: 700;
}

.nav-menu a.active {
  background: linear-gradient(135deg, #fed7aa 0%, #fcd9b0 100%);
  color: #b45309;
  border: 2px solid orange;
}

.nav-menu {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
}

.nav-menu a {
  border-radius: 5px;
  padding: 10px;
  color: #44403c;
  font-weight: 600;
  font-size: 14px;
}

.sidebar-footer {
  margin-top: 12px;
}

.sidebar-footer .section-title {
  margin-bottom: 20px;
}

.sidebar-footer .footer-link {
  color: #44403c;
  font-weight: 600;
  font-size: 14px;
}

.app-layout .content {
  background-color: #f5e6d3;
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
  color: #78716C;
  margin-top: 6px;
  font-weight: 500;
}
</style>
