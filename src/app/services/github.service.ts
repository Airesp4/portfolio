import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private GITHUB_API = 'https://api.github.com/graphql';
  private TOKEN = environment.githubToken;

  constructor(private http: HttpClient) {}

  getContributions(username: string): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.TOKEN}`
    });

    const body = {
      query: `
        query($user: String!) {
          user(login: $user) {
            contributionsCollection {
              contributionCalendar {
                weeks {
                  contributionDays {
                    date
                    contributionCount
                    color
                  }
                }
              }
            }
          }
        }`,
      variables: {
        user: username
      }
    };

    return this.http.post<any>(this.GITHUB_API, body, { headers })
      .pipe(
        map(res => {
          const weeks = res.data.user.contributionsCollection.contributionCalendar.weeks;
          return weeks.flatMap((w: any) => w.contributionDays);
        })
      );
  }
}
