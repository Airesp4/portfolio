import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-presentation',
  imports: [CommonModule],
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.css']
})
export class PresentationComponent implements OnInit {

  typingText = '';
  fullText = 'public class Developer extends Human implements Passionate, Creative';
  typingIndex = 0;
  isTyping = true;

  constructor() { }

  ngOnInit(): void {
    this.startTypingEffect();
  }

  private startTypingEffect(): void {
    const typingInterval = setInterval(() => {
      if (this.typingIndex < this.fullText.length) {
        this.typingText += this.fullText.charAt(this.typingIndex);
        this.typingIndex++;
      } else {
        this.isTyping = false;
        clearInterval(typingInterval);
      }
    }, 100);
  }
}