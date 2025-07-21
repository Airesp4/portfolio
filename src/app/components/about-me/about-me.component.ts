import { Component, OnInit } from '@angular/core';
import { ContactSocialComponent } from "../contact-social/contact-social.component";

@Component({
  selector: 'app-about-me',
  imports: [ContactSocialComponent],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css'
})
export class AboutMeComponent implements OnInit {

  fullText: string = 'I’m an early‑career software developer passionate about solving problems through computing and programming. I love creating solutions, learning new technologies, and growing my skills while contributing to impactful projects.';
  displayText: string = '';
  currentIndex: number = 0;
  typingSpeed: number = 50;

  ngOnInit(): void {
    this.typeWriterEffect();
  }

  typeWriterEffect() {
    if (this.currentIndex < this.fullText.length) {
      this.displayText += this.fullText.charAt(this.currentIndex);
      this.currentIndex++;
      setTimeout(() => this.typeWriterEffect(), this.typingSpeed);
    }
  }
}
