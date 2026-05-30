<script setup>
defineProps({
  show: Boolean,
  type: String,
})
</script>

<template>
  <Transition name="success">
    <div
      v-if="show"
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
</style>
