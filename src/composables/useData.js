import { storeToRefs } from 'pinia'
import { useHabitStore } from '../stores/useHabitStore'

export function useData() {
  const habitStore = useHabitStore()
  const {
    habits,
    completedCount,
    remainingCount,
    completionPercent,
    statisticsList,
    habitStatistics,
  } = storeToRefs(habitStore)

  return {
    iconOptions: habitStore.iconOptions,
    habits,
    completedCount,
    remainingCount,
    completionPercent,
    statisticsList,
    habitStatistics,
    addHabit: habitStore.addHabit,
    removeHabit: habitStore.removeHabit,
    toggleHabit: habitStore.toggleHabit,
  }
}
