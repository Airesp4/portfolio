import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { VisitorsData, VisitorStat } from '../../interfaces/visitors.interface';
import { VisitorsStatsService } from '../../services/visitors-stats.service';

@Component({
  selector: 'app-visitors-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './visitors-stats.component.html',
  styleUrls: ['./visitors-stats.component.css']
})
export class VisitorsStatsComponent implements OnInit, OnDestroy {
  public visitorsData: VisitorsData = {
    uniqueVisitors: 0,
    totalVisits: 0,
    lastVisit: '',
    returnRate: 0
  };

  public stats: VisitorStat[] = [];

  private destroy$ = new Subject<void>();

  constructor(private visitorsStatsService: VisitorsStatsService) {}

  ngOnInit(): void {
    this.visitorsStatsService.visitorsData$
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.visitorsData = data;
        this.updateStats();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateStats(): void {
    this.stats = [
      {
        title: 'Visitantes Únicos',
        value: this.visitorsData.uniqueVisitors,
        icon: 'users',
        description: 'Total de usuários únicos',
        gradient: 'bg-gradient-to-br from-[#00ff55] to-[#00d4ff]'
      },
      {
        title: 'Total de Visitas',
        value: this.visitorsData.totalVisits,
        icon: 'eye',
        description: 'Todas as visualizações',
        gradient: 'bg-gradient-to-br from-[#007bff] to-[#8a2be2]'
      },
      {
        title: 'Taxa de Retorno',
        value: this.visitorsData.returnRate,
        icon: 'arrow-trend-up',
        description: 'Visitantes que retornaram',
        gradient: 'bg-gradient-to-br from-[#8a2be2] to-[#ff7f50]',
        suffix: '%'
      }
    ];
  }
}