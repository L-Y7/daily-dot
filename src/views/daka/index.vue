<script setup>
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

const showmodal = ref(false)
const habitname = ref('')
const selectIcon = ref('🌱')
const habits = ref([
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
])
const icons = [
  '🌱',
  '🌅',
  '💧',
  '📚',
  '🏃',
  '💪',
  '🧘',
  '🎯',
]
function remove(id, name) {
  const ok = confirm(`确定删除${name}吗？`)

  if (ok) {
    habits.value = habits.value.filter(habit => habit.id !== id)
  }
}
function addhabit() {
  habits.value.push({ id: Date.now(), name: habitname.value, icon: selectIcon.value, streak: 0, createdAt: '2025-07-10', lastCheckin: '今天', completedToday: false },
  )
  habitname.value = ''
  selectIcon.value = '🌱'
  showmodal.value = false
}
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
          <button class="header-action-btn" @click="showmodal = true">
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
                <div class="text1">
                  {{ habit.name }}
                </div>

                <div class="text2">
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
              <button class="card-actions-btn">
                <Icon icon="lucide:pencil-line" />
              </button>
              <button class="card-actions-btn2" @click="remove(habit.id, habit.name)">
                <Icon icon="material-symbols:delete-rounded" />
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div v-if="showmodal" class="modal-mask">
      <div class="modal">
        <div class="icon-list">
          <div
            v-for="icon in icons"
            :key="icon"
            :class="{ active: selectIcon === icon }"
            class="icon-item"
            @click="selectIcon = icon"
          >
            {{ icon }}
          </div>
        </div>
        <h2>
          添加习惯
        </h2>
        <input v-model="habitname" type="text" placeholder="请输入习惯名称">
        {{ habitname }}
        <div class="modal-actions">
          <button @click="showmodal = false">
            取消
          </button>
          <button @click="addhabit">
            添加
          </button>
        </div>
      </div>
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
.header-action-btn {
  color: #ffffff;
  box-shadow:
    0 4px 0 #b45309,
    0 6px 12px rgba(217, 119, 6, 0.25);
  background: #d97706;
  border-color: transparent;
  height: 52px;
  font-size: 19px;
  padding: 0px 28px;
  border-radius: 16px;
  font-weight: 900;
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
  gap: 20px;
}
.card-right .card-status {
  border-right: 3px dashed #faeee1;
  padding: 10px;
}
.content-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
}
.card-main .habit-icon {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: #fcf6f0;
  border: 2px solid #faeee1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  box-shadow:
    0 2px 0 #faeee1,
    0 4px 8px rgba(217, 119, 6, 0.05);
}

.card-main .habit-info .text1 {
  font-family: 'Fredoka', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: black;
  letter-spacing: -0.2px;
  margin-bottom: 10px;
}
.card-main .habit-info .text2 {
  font-size: 13px;
  color: #78716c;
  font-weight: 500;
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
.card-actions {
  display: flex;
  gap: 10px;
}
.card-actions .card-actions-btn {
  width: 40px;
  height: 40px;
  padding: 0;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  color: #0f172a;
  border: 2px solid #f5e6d3;
  box-shadow: 0 3px 0 #f5e6d3;
  font-size: 20px;
}
.card-actions .card-actions-btn2 {
  background: #fee2e2;
  color: #dc2626;
  border: 2px solid #fecaca;
  width: 40px;
  height: 40px;
  padding: 0;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}
.modal-mask {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.4);
}
.modal {
  background-color: #ffffff;
  width: 500px;
  padding: 30px;
}
.modal input {
  width: 100%;
  height: 50px;
  border-radius: 14px;
  border: 2px solid #f5e6d3;
  padding: 0 16px;
  font-size: 16px;
  margin-top: 20px;
}
.icon-list {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin: 20px 0;
}

.icon-item {
  width: 60px;
  height: 60px;
  border-radius: 16px;
  border: 2px solid #f5e6d3;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 28px;
  cursor: pointer;
}

.icon-item.active {
  background: #fff7ed;
  border-color: #d97706;
}
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}

.modal-actions button {
  height: 44px;
  padding: 0 20px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
}
</style>
