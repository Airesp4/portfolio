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

  skills = [
    { name: 'Java', level: 95, color: 'bg-orange-500' },
    { name: 'Spring Boot', level: 90, color: 'bg-green-500' },
    { name: 'Angular', level: 85, color: 'bg-red-500' },
    { name: 'PostgreSQL', level: 80, color: 'bg-blue-500' },
    { name: 'Docker', level: 75, color: 'bg-cyan-500' },
    { name: 'AWS', level: 70, color: 'bg-yellow-500' }
  ];

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

  getSkillDelay(index: number): string {
    return `${index * 200}ms`;
  }
}