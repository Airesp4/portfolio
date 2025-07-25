import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { VisitorsData } from '../interfaces/visitors.interface';

@Injectable({
  providedIn: 'root'
})
export class VisitorsStatsService {
  private visitorsDataSubject = new BehaviorSubject<VisitorsData>({
    uniqueVisitors: 0,
    totalVisits: 0,
    lastVisit: '',
    returnRate: 0
  });

  public visitorsData$: Observable<VisitorsData> = this.visitorsDataSubject.asObservable();

  constructor() {
    this.trackVisit();
  }

  private getVisitorId(): string {
    let visitorId = localStorage.getItem('visitor_id');
    if (!visitorId) {
      visitorId = 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('visitor_id', visitorId);
    }
    return visitorId;
  }

  private trackVisit(): void {
    const visitorId = this.getVisitorId();
    const visitorsKey = 'unique_visitors';
    const visitsKey = 'total_visits';
    const lastVisitKey = 'last_visit';

    const storedVisitors = JSON.parse(localStorage.getItem(visitorsKey) || '[]');
    const storedVisits = parseInt(localStorage.getItem(visitsKey) || '0');

    let uniqueVisitors = storedVisitors.length;

    if (!storedVisitors.includes(visitorId)) {
      const updatedVisitors = [...storedVisitors, visitorId];
      localStorage.setItem(visitorsKey, JSON.stringify(updatedVisitors));
      uniqueVisitors = updatedVisitors.length;
    }

    const newTotalVisits = storedVisits + 1;
    localStorage.setItem(visitsKey, newTotalVisits.toString());

    const now = new Date().toLocaleString('pt-BR');
    localStorage.setItem(lastVisitKey, now);

    const returnRate = newTotalVisits > 0 ? Math.round((newTotalVisits - uniqueVisitors) / newTotalVisits * 100) : 0;

    const visitorsData: VisitorsData = {
      uniqueVisitors,
      totalVisits: newTotalVisits,
      lastVisit: now,
      returnRate
    };

    this.visitorsDataSubject.next(visitorsData);
  }
}