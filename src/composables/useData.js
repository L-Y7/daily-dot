import { computed, ref, watch } from 'vue'

const STORAGE_KEY = 'habit-list'
const DEFAULT_HABIT_TIME = '6:30 前'

const getToday = () => new Date().toISOString().slice(0, 10)
const getId = () => globalThis.crypto?.randomUUID?.() || Date.now().toString()
const getHabitDayText = streak => `连续 ${Number(streak || 0)} 天`

// 习惯图标选项。
// 负责页面：src/views/daka/index.vue，也就是“习惯管理”页面。
// 用途：新增习惯弹窗会遍历这个数组，让用户选择一个图标。
// 数据流：daka 页面通过 useData() 拿到 iconOptions，然后用 v-for 渲染图标列表。
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

// 创建默认习惯数据。
// 负责场景：本地 localStorage 里还没有 habit-list，或者读取到的数据格式不正确时使用。
// 用途：保证用户第一次打开应用时，三个页面都有一份可展示的初始数据。
// 返回值：一个习惯数组，数组里的字段会被 daka、xiguan、shuju 三个页面共同使用。
// time/day 字段：负责 xiguan 页面 TaskCard 里的时间和连续天数展示。
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

// 统一补齐习惯对象字段。
// 负责场景：localStorage 里可能存着旧版本数据，旧数据可能没有 done、time、day 等字段。
// 参数 habit：从 localStorage 解析出来的单个习惯对象，来源于 loadHabits() 里的 parsedHabits。
// 操作方式：先放一组默认字段，再用 ...habit 覆盖默认值；这样旧数据缺字段时能补齐，有字段时保留原值。
// 影响页面：三个页面都依赖这些字段，补齐后页面读取时不会因为字段不存在而异常。
// time/day 处理：如果旧数据里是空字符串，也会重新补成 xiguan 页面可展示的默认时间和连续天数。
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

// 从本地存储读取习惯列表。
// 负责场景：useData.js 第一次被任意页面引入时，会调用 loadHabits() 初始化共享 habits。
// 操作方式：读取 localStorage 中 STORAGE_KEY 对应的数据，JSON.parse 成数组，再逐个 normalizeHabit。
// 异常处理：没有数据、数据不是数组、JSON 解析失败时，都回退到 createDefaultHabits()。
// 影响页面：daka 管理页、xiguan 打卡页、shuju 数据页都会从这里拿到同一份初始数据。
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

// 共享习惯列表。
// 负责页面：daka、xiguan、shuju 三个页面都会通过 useData() 拿到这个 habits。
// 用途：这是全应用唯一的一份习惯数据；新增、删除、打卡、统计都围绕它完成。
// 操作方式：因为它定义在 useData() 外层，所以不同页面 import/useData 时拿到的是同一个 ref，而不是各自新建一份。
const habits = ref(loadHabits())

// 已完成数量。
// 负责页面：xiguan 页面用于计算今日完成情况，shuju 页面用于统计卡片展示。
// 操作方式：从共享 habits 里筛选 done 为 true 的习惯数量。
const completedCount = computed(() => {
  return habits.value.filter(habit => habit.done).length
})

// 未完成数量。
// 负责页面：xiguan 页面顶部“待完成”数量，shuju 页面统计卡片中的待完成说明。
// 操作方式：总习惯数减去 completedCount。
const remainingCount = computed(() => habits.value.length - completedCount.value)

// 今日完成百分比。
// 负责页面：shuju 页面“今日完成率”统计卡片。
// 操作方式：completedCount / habits 总数，再四舍五入成整数；没有习惯时返回 0，避免除以 0。
const completionPercent = computed(() => {
  if (!habits.value.length)
    return 0

  return Math.round((completedCount.value / habits.value.length) * 100)
})

// 统计页顶部四张核心指标卡片的数据。
// 负责页面：src/views/shuju/index.vue。
// 数据来源：全部从共享 habits、completedCount、remainingCount、completionPercent 派生。
// 操作方式：shuju 页面通过 useData() 拿到 statisticsList，然后 v-for 渲染统计卡片。
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

// 统计页“习惯完成情况”列表数据。
// 负责页面：src/views/shuju/index.vue。
// 数据来源：共享 habits。
// 操作方式：把 habits 的字段转换成统计页模板需要的字段名，比如 name 转成 title、done 转成 completionRate。
// 说明：这里保持统计页原来的列表结构，避免 shuju 页面模板里写复杂转换逻辑。
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

// 新增一个习惯。
// 负责页面：src/views/daka/index.vue，也就是“习惯管理”页面的新增弹窗。
// 参数 name：来自 daka 页面 form.habitName，用户在输入框里填写的习惯名称。
// 参数 icon：来自 daka 页面 form.selectedIcon，用户在 iconOptions 中选中的图标。
// 操作方式：把新习惯 push 到共享 habits；watch 会监听到变化并自动保存到 localStorage。
// 联动效果：新增后，xiguan 打卡页会出现这个习惯，shuju 统计页也会立即参与统计。
// time/day 字段：新增时给 xiguan 页面一个默认时间和“连续 0 天”，避免卡片空白。
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

// 删除一个习惯。
// 负责页面：src/views/daka/index.vue。
// 参数 id：来自 daka 页面 removeHabit(habit.id, habit.name) 中传入的 habit.id。
// 操作方式：用 filter 生成新数组，只保留 id 不等于传入 id 的习惯。
// 联动效果：删除后，xiguan 打卡页和 shuju 统计页会同步移除这条数据，watch 会同步更新 localStorage。
function removeHabit(id) {
  habits.value = habits.value.filter(habit => habit.id !== id)
}

// 切换习惯的今日打卡状态。
// 负责页面：src/views/xiguan/index.vue，也就是“今日打卡”页面。
// 参数 habit：来自 TaskCard 组件点击按钮时 emit('toggle', item) 传回来的 item；item 本身来自共享 habits。
// 操作方式：直接修改这个 habit 对象的 done、lastCheckin、streak 字段。
// 联动效果：打卡状态变化后，daka 管理页能看到最近打卡状态，shuju 统计页的完成率和完成数量会同步变化。
// day 字段：streak 变化后同步更新“连续 X 天”，让 xiguan 页面 TaskCard 继续显示连续天数。
function toggleHabit(habit) {
  habit.done = !habit.done
  habit.lastCheckin = habit.done ? '今天' : '未打卡'
  habit.streak = Math.max(Number(habit.streak || 0) + (habit.done ? 1 : -1), 0)
  habit.day = getHabitDayText(habit.streak)
}

// 持久化共享数据。
// 负责场景：只要 habits 发生变化，就把最新数组写入 localStorage。
// 监听范围：deep: true 表示数组里的对象字段变化也会触发，比如 xiguan 页面修改 habit.done。
// 覆盖操作：新增、删除、打卡都会最终写入同一个 STORAGE_KEY，也就是 habit-list。
// 保存结果：刷新页面或重新打开浏览器后，loadHabits() 会从 localStorage 把数据恢复回来。
watch(
  habits,
  (value) => {
    globalThis.localStorage?.setItem(STORAGE_KEY, JSON.stringify(value))
  },
  { deep: true },
)

// 对外暴露共享数据和操作方法。
// 使用页面：
// 1. daka 页面拿 iconOptions、habits、addHabit、removeHabit，负责习惯管理。
// 2. xiguan 页面拿 habits、remainingCount、toggleHabit，负责今日打卡。
// 3. shuju 页面拿 statisticsList、habitStatistics，负责数据统计展示。
// 关键点：这个函数只是返回上面定义好的同一批 ref/computed/function，不会重新创建一份独立数据。
export function useData() {
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
}
