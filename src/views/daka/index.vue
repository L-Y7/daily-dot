<script setup>
import { Icon } from '@iconify/vue'
import { nextTick, onMounted, ref, watch } from 'vue'

const getToday = () => new Date().toISOString().slice(0, 10)
const getId = () => crypto.randomUUID?.() || Date.now().toString()

const showModal = ref(false)
const inputRef = ref(null)
const savekey = 'habit-list'
const habits = ref([])
const form = ref({
  habitName: '',
  selectedIcon: '🌱',
})
const isReady = ref(false)
const iconOptions = [
  '🌱',
  '🌅',
  '💧',
  '📚',
  '🏃',
  '💪',
  '🧘',
  '🎯',
]
function setIcon(icon) {
  if (form.value.selectedIcon === icon) {
    inputRef.value?.focus?.()
    return
  }
  form.value.selectedIcon = icon
  inputRef.value?.focus?.()
}
function savehabits() {
  localStorage.setItem(savekey, JSON.stringify(habits.value))
}
onMounted(() => {
  const savedHabits = localStorage.getItem(savekey)
  if (savedHabits) {
    habits.value = JSON.parse(savedHabits)
  }
  else {
    habits.value = [{
      id: 1,
      name: '每日阅读',
      icon: '📚',
      streak: 12,
      createdAt: getToday(),
      lastCheckin: '今天',
      completedToday: true,
    }, {
      id: 2,
      name: '晨跑',
      icon: '🏃',
      streak: 5,
      createdAt: getToday(),
      lastCheckin: '昨天',
      completedToday: false,
    }, {
      id: 3,
      name: '喝水 8 杯',
      icon: '💧',
      streak: 20,
      createdAt: getToday(),
      lastCheckin: '今天',
      completedToday: true,
    }, {
      id: 4,
      name: '早起',
      icon: '🌅',
      streak: 5,
      createdAt: getToday(),
      lastCheckin: '今天',
      completedToday: true,
    }]
  }
  isReady.value = true
})
function resetForm() {
  form.value.habitName = ''
  form.value.selectedIcon = '🌱'
  showModal.value = false
}

function addHabit() {
  if (!form.value.habitName.trim()) {
    alert('请输入习惯名称')
    return
  }

  habits.value.push({
    id: getId(),
    name: form.value.habitName,
    icon: form.value.selectedIcon,
    streak: 0,
    createdAt: getToday(),
    lastCheckin: '今天',
    completedToday: false,
  })

  resetForm()
}

function removeHabit(id, name) {
  const ok = confirm(`确定删除 ${name} 吗？`)

  if (ok) {
    habits.value = habits.value.filter(habit => habit.id !== id)
  }
}

watch(showModal, async (visible) => {
  if (!visible)
    return
  await nextTick()
  inputRef.value?.focus?.()
})
watch(
  () => habits.value,
  () => {
    if (!isReady.value)
      return
    savehabits()
  },

  {
    deep: true,
  },
)
</script>

<template>
  <div class="habit-app">
    <div class="habit-content">
      <div class="habit-header">
        <div class="habit-header__info">
          <h2 class="habit-header__title">
            习惯管理
          </h2>

          <div class="habit-header__desc">
            共 {{ habits.length }} 个习惯 长按排序管理
          </div>
        </div>

        <div class="habit-header__actions">
          <button
            class="habit-header__add-btn"
            @click="showModal = true"
          >
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
          <div class="habit-card__main">
            <div class="habit-card__icon">
              {{ habit.icon }}
            </div>

            <div class="habit-card__info">
              <div class="habit-card__name">
                {{ habit.name }}
              </div>

              <div class="habit-card__meta">
                创建于 {{ habit.createdAt }}，已坚持 {{ habit.streak }} 天
              </div>
            </div>
          </div>

          <div class="habit-card__right">
            <div class="habit-card__status">
              <div>最近打卡</div>

              <span>
                {{ habit.lastCheckin }}
              </span>
            </div>

            <div class="habit-card__actions">
              <button class="habit-card__edit-btn">
                <Icon icon="lucide:pencil-line" />
              </button>

              <button
                class="habit-card__delete-btn"
                @click="removeHabit(habit.id, habit.name)"
              >
                <Icon icon="material-symbols:delete-rounded" />
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div
      v-if="showModal"
      class="habit-modal-mask"
      @click="resetForm"
    >
      <div
        class="habit-modal"
        @click.stop
      >
        <div class="habit-icon-list">
          <div
            v-for="icon in iconOptions"
            :key="icon"
            :class="{ active: form.selectedIcon === icon }"
            class="habit-icon-item"
            @click="setIcon(icon)"
          >
            {{ icon }}
          </div>
        </div>

        <h2>
          添加习惯
        </h2>

        <input
          ref="inputRef"
          v-model="form.habitName"
          type="text"
          placeholder="请输入习惯名称"
          @keyup.enter="addHabit"
        >

        <div class="habit-modal__actions">
          <button @click="resetForm">
            取消
          </button>

          <button @click="addHabit">
            添加
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.habit-app {
  display: flex;
}

.habit-content {
  flex: 1;
  padding: 30px;
}

/* =========================
   header
========================= */

.habit-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
}

.habit-header__title {
  font-family: 'Fredoka', sans-serif;
  font-size: 32px;
  font-weight: 600;
  letter-spacing: -0.5px;
}

.habit-header__desc {
  margin-top: 6px;
  font-size: 15px;
  font-weight: 500;
  color: #78716c;
}

.habit-header__add-btn {
  height: 52px;
  padding: 0 28px;
  border-radius: 16px;
  border-color: transparent;

  font-size: 19px;
  font-weight: 900;
  color: #ffffff;

  background: #d97706;

  box-shadow:
    0 4px 0 #b45309,
    0 6px 12px rgba(217, 119, 6, 0.25);
}

/* =========================
   list
========================= */

.habit-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* =========================
   card
========================= */

.habit-card {
  display: flex;
  justify-content: space-between;

  width: 100%;
  height: 100px;
  padding: 20px;

  border-radius: 15px;
  background-color: #ffffff;
}

.habit-card__main {
  display: flex;
  align-items: center;
  gap: 20px;
}

.habit-card__icon {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 56px;
  height: 56px;

  border: 2px solid #faeee1;
  border-radius: 16px;

  font-size: 28px;

  background: #fcf6f0;

  box-shadow:
    0 2px 0 #faeee1,
    0 4px 8px rgba(217, 119, 6, 0.05);
}

.habit-card__name {
  margin-bottom: 10px;

  font-family: 'Fredoka', sans-serif;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.2px;

  color: #000000;
}

.habit-card__meta {
  font-size: 13px;
  font-weight: 500;
  color: #78716c;
}

.habit-card__right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.habit-card__status {
  padding: 10px;
  border-right: 3px dashed #faeee1;
}

.habit-card__actions {
  display: flex;
  gap: 10px;
}

.habit-card__edit-btn,
.habit-card__delete-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 40px;
  height: 40px;
  padding: 0;

  border-radius: 999px;

  font-size: 20px;
}

.habit-card__edit-btn {
  border: 2px solid #f5e6d3;

  color: #0f172a;
  background: #ffffff;

  box-shadow: 0 3px 0 #f5e6d3;
}

.habit-card__delete-btn {
  border: 2px solid #fecaca;

  color: #dc2626;
  background: #fee2e2;
}

/* =========================
   modal
========================= */

.habit-modal-mask {
  position: fixed;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  background: rgba(0, 0, 0, 0.4);
}

.habit-modal {
  width: 500px;
  padding: 30px;

  background-color: #ffffff;
}

.habit-modal input {
  width: 100%;
  height: 50px;
  margin-top: 20px;
  padding: 0 16px;

  border: 2px solid #f5e6d3;
  border-radius: 14px;

  font-size: 16px;
}

.habit-icon-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;

  margin: 20px 0;
}

.habit-icon-item {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 60px;
  height: 60px;

  border: 2px solid #f5e6d3;
  border-radius: 16px;

  font-size: 28px;
  cursor: pointer;
}

.habit-icon-item.active {
  border-color: #d97706;
  background: #fff7ed;
}

.habit-modal__actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;

  margin-top: 24px;
}

.habit-modal__actions button {
  height: 44px;
  padding: 0 20px;

  border: none;
  border-radius: 12px;

  cursor: pointer;
}
</style>
