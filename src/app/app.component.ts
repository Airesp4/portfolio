import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PresentationComponent } from "./components/presentation/presentation.component";
import { AboutMeComponent } from "./components/about-me/about-me.component";
import { HeaderComponent } from "./components/header/header.component";
import { GithubContributionsComponent } from "./components/github-contributions/github-contributions.component";
import { ProjectsOverviewComponent } from "./components/projects-overview/projects-overview.component";
import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PresentationComponent, AboutMeComponent, HeaderComponent, GithubContributionsComponent, ProjectsOverviewComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'airesdev';
}
