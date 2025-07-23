export interface ContributionDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

export interface ContributionWeek {
  days: ContributionDay[]
}

export interface ContributionData {
  weeks: ContributionWeek[]
  totalContributions: number
  user: {
    login: string
    name?: string
    avatarUrl?: string
  }
}

export interface MonthLabel {
  name: string
  weekIndex: number
}