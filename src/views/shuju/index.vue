<script setup>
const percent = 80

const statisticsList = [
  {
    id: 1,
    icon: '🌅',
    title: '本月累计打卡',
    value: '30次',
    compareText: '比上个月增加',
  },
  {
    id: 2,
    icon: '🌅',
    title: '本月累计打卡',
    value: '30次',
    compareText: '比上个月增加',
  },
  {
    id: 3,
    icon: '🌅',
    title: '本月累计打卡',
    value: '30次',
    compareText: '比上个月增加',
  },
  {
    id: 4,
    icon: '🌅',
    title: '本月累计打卡',
    value: '30次',
    compareText: '比上个月增加',
  },
]

const habitList = [
  {
    id: 1,
    icon: '🌅',
    title: '早起',
    completionRate: percent,
    completionText: '12/15天',
    streak: [1, 1, 1, 0, 1, 1, 0],
  },
  {
    id: 2,
    icon: '🌅',
    title: '喝水',
    completionRate: percent,
    completionText: '12/15天',
    streak: [1, 1, 1, 0, 0, 1, 0],
  },
  {
    id: 3,
    icon: '🌅',
    title: '阅读',
    completionRate: percent,
    completionText: '12/15天',
    streak: [0, 1, 1, 0, 1, 1, 0],
  },
  {
    id: 4,
    icon: '🌅',
    title: '跑步',
    completionRate: percent,
    completionText: '12/15天',
    streak: [1, 1, 0, 0, 0, 1, 0],
  },
]
</script>

<template>
  <div class="statistics-page">
    <!-- 顶部 -->
    <div class="statistics-header">
      <div class="statistics-header__info">
        <h1>本月统计</h1>
        <p>数据每日0点刷新</p>
      </div>

      <div class="statistics-header__action">
        <button class="statistics-header_btn">
          重新加载
        </button>
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="statistics-content">
      <!-- 核心指标 -->
      <section class="statistics-section">
        <p class="section-title">
          核心指标
        </p>

        <ul class="statistics-list">
          <li
            v-for="statistic in statisticsList"
            :key="statistic.id"
            class="statistics-card"
          >
            <div class="statistics-card__header">
              <span class="statistics-card__icon">
                {{ statistic.icon }}
              </span>

              <span class="statistics-card__title">
                {{ statistic.title }}
              </span>
            </div>

            <div class="statistics-card__body">
              <span class="statistics-card__value">
                {{ statistic.value }}
              </span>

              <span class="statistics-card__desc">
                {{ statistic.compareText }}
              </span>
            </div>
          </li>
        </ul>
      </section>

      <!-- 习惯统计 -->
      <section class="habit-section">
        <p class="section-title">
          习惯完成情况
        </p>

        <ul class="habit-list">
          <li
            v-for="habit in habitList"
            :key="habit.id"
            class="habit-card"
          >
            <div class="habit-card__header">
              <div class="habit-card__info">
                <span class="habit-card__icon">
                  {{ habit.icon }}
                </span>

                <span class="habit-card__title">
                  {{ habit.title }}
                </span>
              </div>

              <span class="habit-card__percent">
                {{ habit.completionRate }}%
              </span>
            </div>

            <div class="habit-card__progress">
              <div
                class="habit-card__progress-inner"
                :style="{ width: `${percent}%` }"
              />
            </div>
            <div class="habit-card__footer">
              <div class="habit-card__footertext">
                <span>{{ habit.completionText }}</span>
              </div>
              <div class="habit-card__days">
                <span
                  v-for="(item, index) in habit.streak"
                  :key="index"
                  :class="{ active: item }"
                />
              </div>
            </div>
          </li>
        </ul>
      </section>
    </div>

    <!-- 底部区域 -->
    <div class="statistics-footer" />
  </div>
</template>

<style lang="scss" scoped>
.statistics-page {
  width: 100%;
}

/* ==================== 顶部区域 ==================== */
.statistics-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.statistics-header__info {
  display: flex;
  flex-direction: column;
}

.statistics-header__action {
  display: flex;
  align-items: center;
}
.statistics-header_btn {
  background: #ffffff;
  color: #0f172a;
  border: 2px solid #f5e6d3;
  box-shadow: 0 3px 0 #f5e6d3;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 44px;
  padding: 0 22px;
  border-radius: 16px;
  font-weight: 700;
  font-size: 15px;
  font-family: 'Nunito', sans-serif;
  border: 2px solid transparent;
  white-space: nowrap;
  user-select: none;
}
/* ==================== 内容区域 ==================== */
.statistics-content {
  margin-top: 20px;
}

/* ==================== 通用标题 ==================== */
.section-title {
  margin-bottom: 16px;
  font-size: 18px;
  font-weight: 600;
}

/* ==================== 核心指标 ==================== */

.statistics-list {
  display: flex;
  gap: 20px;
}

.statistics-card {
  position: relative;
  width: 100%;
  padding: 16px;
  border-radius: 12px;
  box-sizing: border-box;
  overflow: hidden;
}

.statistics-card::before {
  position: absolute;
  top: -36px;
  right: -36px;
  width: 120px;
  height: 120px;
  content: '';
  background: rgba(255, 255, 255, 0.45);
  border-radius: 50%;
  pointer-events: none;
}

.statistics-card__header {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.statistics-card__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  font-size: 22px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 10px;
  box-shadow:
    0 2px 0 #faeee1,
    0 4px 8px rgba(217, 119, 6, 0.05);
}

.statistics-card__title {
  margin-bottom: 5px;
  font-size: 11px;
  font-weight: 700;
  color: #44403c;
  letter-spacing: 1.2px;
  text-transform: uppercase;
}

.statistics-card__body {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;
}

.statistics-card__value {
  font-family: 'Fredoka', sans-serif;
  font-size: 52px;
  font-weight: 700;
  line-height: 1;
  color: black;
  letter-spacing: -1.5px;
}

.statistics-card__desc {
  margin-top: 10px;
  font-size: 13px;
  font-weight: 600;
  color: #44403c;
}

/* 不同卡片颜色 */
.statistics-card:nth-child(1) {
  background-color: aqua;
}

.statistics-card:nth-child(2) {
  background-color: yellow;
}

.statistics-card:nth-child(3) {
  background-color: yellowgreen;
}

.statistics-card:nth-child(4) {
  background-color: pink;
}

/* ==================== 习惯统计 ==================== */
.habit-section {
  margin-top: 32px;
}

.habit-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.habit-card {
  padding: 16px;
  background-color: white;
  border-radius: 12px;
  border: 2px solid #faeee1;
  box-shadow:
    0 3px 0 #faeee1,
    0 6px 12px rgba(217, 119, 6, 0.08);
}

.habit-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.habit-card__info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.habit-card__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #fcf6f0 0%, #ffedd5 100%);
  border-radius: 10px;
}

.habit-card__title {
  font-family: 'Fredoka', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: black;
}

.habit-card__percent {
  font-family: 'Fredoka', sans-serif;
  font-size: 32px;
  font-weight: 700;
  line-height: 1;
  color: #d97706;
  letter-spacing: -1px;
}

.habit-card__progress {
  width: 100%;
  height: 12px;
  margin: 12px 0;
  overflow: hidden;
  background-color: #eee;
  border-radius: 999px;
}

.habit-card__progress-inner {
  height: 100%;
  background: #22c55e;
  border-radius: 999px;
}
.habit-card__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 22px;
}
.habit-card__footertext {
  font-size: 14px;
  color: #666;
}

.habit-card__days {
  display: flex;
  gap: 6px;
}

.habit-card__days span {
  width: 14px;
  height: 14px;
  background: #f5e7d8;
  border-radius: 4px;
}
.habit-card__days span.active {
  background-color: #d97706;
}
/* ==================== 底部区域 ==================== */
.statistics-footer {
  margin-top: 20px;
}
</style>
