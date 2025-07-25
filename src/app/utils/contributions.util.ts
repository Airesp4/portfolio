import type { ContributionWeek, MonthLabel } from "../interfaces/github.interface"

export class ContributionsUtil {
  static getContributionColor(level: 0 | 1 | 2 | 3 | 4): string {
    const colors = {
      0: "bg-slate-700", // Cinza escuro para sem contribuições
      1: "bg-green-900", // Verde muito escuro
      2: "bg-green-700", // Verde médio escuro
      3: "bg-green-500", // Verde médio
      4: "bg-green-400", // Verde claro
    }
    return colors[level]
  }

  static formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC"
    });
  }

  static getMonthLabels(weeks: ContributionWeek[]): MonthLabel[] {
    const labels: MonthLabel[] = []
    const seenMonths = new Set<string>()

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    weeks.forEach((week, weekIndex) => {
      const firstValidDay = week.days.find((day) => day.date)
      if (!firstValidDay?.date) return

      const date = new Date(firstValidDay.date)
      const monthKey = `${date.getFullYear()}-${date.getMonth()}`

      if (!seenMonths.has(monthKey)) {
        seenMonths.add(monthKey)

        const dayOfMonth = date.getDate()

        if (dayOfMonth <= 7 || !seenMonths.has(monthKey)) {
          labels.push({
            name: monthNames[date.getMonth()],
            weekIndex: weekIndex,
          })
        }
      }
    })

    return labels
  }

  static calculateActiveWeeks(weeks: ContributionWeek[]): number {
    let activeWeeks = 0

    for (const week of weeks) {
      const hasContributions = week.days.some((day) => day.count > 0)
      if (hasContributions) {
        activeWeeks++
      }
    }

    return activeWeeks
  }

  static calculateLongestStreak(weeks: ContributionWeek[]): number {
    const allDays = weeks.flatMap((week) => week.days)
    let maxStreak = 0
    let currentStreak = 0

    for (const day of allDays) {
      if (day.count > 0) {
        currentStreak++
        maxStreak = Math.max(maxStreak, currentStreak)
      } else {
        currentStreak = 0
      }
    }

    return maxStreak
  }
}