import { Component, OnInit } from '@angular/core';
import { ContactSocialComponent } from "../contact-social/contact-social.component";

@Component({
  selector: 'app-about-me',
  imports: [ContactSocialComponent],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css'
})
export class AboutMeComponent implements OnInit {

  fullText: string = 'I’m a driven early-career software developer, focused on constantly improving both technically and personally. I care deeply about delivering real value and making a positive impact on every project I’m part of.';
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
