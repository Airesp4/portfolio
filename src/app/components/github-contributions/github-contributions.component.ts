import { Component, Input, OnInit } from '@angular/core';
import { GithubService } from '../../services/github.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-github-contributions',
  imports: [CommonModule],
  templateUrl: './github-contributions.component.html',
  styleUrl: './github-contributions.component.css'
})
export class GithubContributionsComponent implements OnInit {
  @Input() login!: string
  weeks: any[][] = []

  constructor(private github: GithubService) {}

  ngOnInit(): void {
    this.github.getContributions(this.login).subscribe((days) => {
      const weeks: any[][] = []
      let week: any[] = []

      days.forEach((day, index) => {
        week.push(day)
        if (week.length === 7) {
          weeks.push(week)
          week = []
        }
      })

      if (week.length > 0) {
        weeks.push(week)
      }

      this.weeks = weeks
    })
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return ""
    const date = new Date(dateStr)
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  getTotalContributions(): number {
    return this.weeks.flat().reduce((total, day) => total + (day.contributionCount || 0), 0)
  }

  getContributionClass(count: number): string {
    if (count === 0) return "bg-slate-700 border border-slate-600"
    if (count >= 10) return "bg-green-400 border border-green-300 shadow-green-400/50"
    if (count >= 7) return "bg-green-500 border border-green-400 shadow-green-500/50"
    if (count >= 4) return "bg-green-600 border border-green-500 shadow-green-600/50"
    if (count >= 2) return "bg-green-700 border border-green-600 shadow-green-700/50"
    return "bg-green-900 border border-green-800 shadow-green-900/50"
  }
}
