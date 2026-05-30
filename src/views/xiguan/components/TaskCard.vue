<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },

})
const emit = defineEmits(['toggle'])
</script>

<template>
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
          @click="emit('toggle', item)"
        >
          {{ item.done ? '取消' : '打卡✓' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.task-card {
  position: relative;
  padding: 20px;
  background-color: white;
  transition: all 0.35s ease;
  border-radius: 20px;
  border: 2px solid #faeee1;
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
</style>
