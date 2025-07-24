import { Component, Input, type OnInit, type OnDestroy } from "@angular/core"
import { CommonModule } from "@angular/common"
import { Subject, takeUntil } from "rxjs"
import { ContributionData, ContributionDay, MonthLabel } from "../../interfaces/github.interface"
import { GithubService } from "../../services/github.service"
import { ContributionsUtil } from "../../utils/contributions.util"


@Component({
  selector: "app-github-contributions",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./github-contributions.component.html",
})
export class GithubContributionsComponent implements OnInit, OnDestroy {
  @Input() username!: string

  data: ContributionData | null = null
  loading = true
  error: string | null = null
  monthLabels: MonthLabel[] = []

  tooltipVisible = false
  tooltipX = 0
  tooltipY = 0
  tooltipDay: ContributionDay | null = null

  readonly weekdays = ["", "Mon", "", "Wed", "", "Fri", ""]
  readonly contributionLevels = [0, 1, 2, 3, 4] as const

  private destroy$ = new Subject<void>()

  constructor(private githubService: GithubService) {}

  ngOnInit(): void {
    if (this.username) {
      this.loadContributions()
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  private loadContributions(): void {
    this.loading = true
    this.error = null

    this.githubService
      .getContributions(this.username)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.data = data
          this.monthLabels = ContributionsUtil.getMonthLabels(data.weeks)
          this.loading = false
        },
        error: (error) => {
          this.error = error.message || "Failed to load contributions"
          this.loading = false
        },
      })
  }

  getContributionColor(level: 0 | 1 | 2 | 3 | 4): string {
    return ContributionsUtil.getContributionColor(level)
  }

  getMonthPosition(weekIndex: number): string {
    if (!this.data) return "0%"
    const totalWeeks = this.data.weeks.length
    const leftPercentage = (weekIndex / (totalWeeks - 1)) * 100
    return `${leftPercentage}%`
  }

  showTooltip(day: ContributionDay, event: MouseEvent): void {
    if (!day.date) {
      this.hideTooltip()
      return
    }

    this.tooltipDay = day
    this.tooltipVisible = true

    this.tooltipX = event.clientX + 10;
    this.tooltipY = event.clientY + 10;
  }

  hideTooltip(): void {
    this.tooltipVisible = false
    this.tooltipDay = null
  }

  formatDate(dateStr: string): string {
    return ContributionsUtil.formatDate(dateStr)
  }

  formatCount(count: number): string {
    if (count === 0) {
      return '0';
    }
    return count < 10 ? '0' + count : count.toString();
  }

  getActiveWeeks(): number {
    return this.data ? ContributionsUtil.calculateActiveWeeks(this.data.weeks) : 0
  }

  getLongestStreak(): number {
    return this.data ? ContributionsUtil.calculateLongestStreak(this.data.weeks) : 0
  }
}