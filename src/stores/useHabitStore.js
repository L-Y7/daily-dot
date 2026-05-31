import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

const STORAGE_KEY = 'habit-list'
const DEFAULT_HABIT_TIME = '6:30 前'

const getToday = () => new Date().toISOString().slice(0, 10)
const getId = () => globalThis.crypto?.randomUUID?.() || Date.now().toString()
const getHabitDayText = streak => `连续 ${Number(streak || 0)} 天`

export const useHabitStore = defineStore('habit', () => {
  const iconOptions = [
    '🌱',
    '🌞',
    '💧',
    '📖',
    '🏃',
    '💪',
    '🧘',
    '🎯',
  ]

  function createDefaultHabits() {
    return [
      {
        id: 1,
        name: '每日阅读',
        icon: '📖',
        streak: 12,
        createdAt: getToday(),
        lastCheckin: '未打卡',
        done: false,
        time: DEFAULT_HABIT_TIME,
        day: getHabitDayText(12),
      },
    ]
  }

  function normalizeHabit(habit) {
    const streak = Number(habit.streak || 0)

    return {
      streak: 0,
      createdAt: getToday(),
      lastCheckin: '未打卡',
      done: false,
      ...habit,
      time: habit.time || DEFAULT_HABIT_TIME,
      day: habit.day || getHabitDayText(streak),
    }
  }

  function loadHabits() {
    try {
      const savedHabits = globalThis.localStorage?.getItem(STORAGE_KEY)

      if (!savedHabits)
        return createDefaultHabits()

      const parsedHabits = JSON.parse(savedHabits)

      if (!Array.isArray(parsedHabits))
        return createDefaultHabits()

      return parsedHabits.map(normalizeHabit)
    }
    catch {
      return createDefaultHabits()
    }
  }

  const habits = ref(loadHabits())

  const completedCount = computed(() => {
    return habits.value.filter(habit => habit.done).length
  })

  const remainingCount = computed(() => habits.value.length - completedCount.value)

  const completionPercent = computed(() => {
    if (!habits.value.length)
      return 0

    return Math.round((completedCount.value / habits.value.length) * 100)
  })

  const statisticsList = computed(() => [
    {
      id: 1,
      icon: '🎯',
      title: '今日完成率',
      value: `${completionPercent.value}%`,
      compareText: `${completedCount.value}/${habits.value.length} 个已完成`,
    },
    {
      id: 2,
      icon: '✅',
      title: '今日打卡',
      value: `${completedCount.value}次`,
      compareText: `${remainingCount.value} 个待完成`,
    },
    {
      id: 3,
      icon: '🔥',
      title: '累计坚持',
      value: `${habits.value.reduce((total, habit) => total + Number(habit.streak || 0), 0)}天`,
      compareText: '来自全部习惯',
    },
    {
      id: 4,
      icon: '📌',
      title: '习惯总数',
      value: `${habits.value.length}个`,
      compareText: '本地持久保存',
    },
  ])

  const habitStatistics = computed(() => {
    return habits.value.map((habit) => {
      const streakDays = Math.min(Number(habit.streak || 0), 7)
      const streak = Array.from({ length: 7 }, (_, index) => {
        return index >= 7 - streakDays ? 1 : 0
      })

      return {
        id: habit.id,
        icon: habit.icon,
        title: habit.name,
        completionRate: habit.done ? 100 : 0,
        completionText: habit.done ? '今日已完成' : '今日待完成',
        streak,
      }
    })
  })

  function addHabit(name, icon) {
    habits.value.push({
      id: getId(),
      name: name.trim(),
      icon,
      streak: 0,
      createdAt: getToday(),
      lastCheckin: '未打卡',
      done: false,
      time: DEFAULT_HABIT_TIME,
      day: getHabitDayText(0),
    })
  }

  function removeHabit(id) {
    habits.value = habits.value.filter(habit => habit.id !== id)
  }

  function toggleHabit(habit) {
    habit.done = !habit.done
    habit.lastCheckin = habit.done ? '今天' : '未打卡'
    habit.streak = Math.max(Number(habit.streak || 0) + (habit.done ? 1 : -1), 0)
    habit.day = getHabitDayText(habit.streak)
  }

  watch(
    habits,
    (value) => {
      globalThis.localStorage?.setItem(STORAGE_KEY, JSON.stringify(value))
    },
    { deep: true },
  )

  return {
    iconOptions,
    habits,
    completedCount,
    remainingCount,
    completionPercent,
    statisticsList,
    habitStatistics,
    addHabit,
    removeHabit,
    toggleHabit,
  }
})
