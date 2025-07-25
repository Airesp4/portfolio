export interface VisitorStat {
  title: string;
  value: number;
  icon: string;
  description: string;
  gradient: string;
  suffix?: string;
}

export interface VisitorsData {
  uniqueVisitors: number;
  totalVisits: number;
  lastVisit: string;
  returnRate: number;
}