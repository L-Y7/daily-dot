<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const list = [
  { id: 1, name: '每日打卡', path: '/daka' },
  { id: 2, name: '深度管理', path: '/manage' },
  { id: 3, name: '数据统计', path: '/stats' },
]
</script>

<template>
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
          :class="{ active: route.path === item.path }"
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
</template>

<style lang='scss' scoped>
.sidebar {
  background-color: white;
  height: 100vh;
  width: 200px;
  padding: 25px;
}

.sidebar .sidebar-header {
  display: flex;
  border-bottom: 3px dashed #faeee1;
  margin-bottom: 10px;

  align-items: center;
  justify-content: center;
  gap: 12px;
}

.sidebar .sidebar-header .logo-icon {
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
</style>
