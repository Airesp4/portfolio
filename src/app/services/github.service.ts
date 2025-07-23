import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ContributionData } from '../interfaces/github.interface';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private GITHUB_API = 'https://api.github.com/graphql';
  private TOKEN = environment.githubToken;

  constructor(private http: HttpClient) {}

  getContributions(username: string): Observable<ContributionData> {
    const query = `
      query($login: String!) {
        user(login: $login) {
          login
          name
          avatarUrl
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                }
              }
            }
          }
        }
      }
    `

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.TOKEN}`,
      "Content-Type": "application/json",
    })

    const body = {
      query,
      variables: { login: username },
    }

    return this.http.post<any>(this.GITHUB_API, body, { headers }).pipe(
      map((response) => {
        if (response.errors) {
          throw new Error(`GraphQL errors: ${response.errors.map((e: any) => e.message).join(", ")}`)
        }

        if (!response.data?.user) {
          throw new Error(`User ${username} not found`)
        }

        const user = response.data.user
        const calendar = user.contributionsCollection.contributionCalendar

        // Transform GitHub data to our format
        return {
          weeks: calendar.weeks.map((week: any) => ({
            days: week.contributionDays.map((day: any) => ({
              date: day.date,
              count: day.contributionCount,
              level: this.getContributionLevel(day.contributionCount),
            })),
          })),
          totalContributions: calendar.totalContributions,
          user: {
            login: user.login,
            name: user.name,
            avatarUrl: user.avatarUrl,
          },
        } as ContributionData
      }),
    )
  }

  private getContributionLevel(count: number): 0 | 1 | 2 | 3 | 4 {
    if (count === 0) return 0
    if (count <= 3) return 1
    if (count <= 6) return 2
    if (count <= 9) return 3
    return 4
  }
}
