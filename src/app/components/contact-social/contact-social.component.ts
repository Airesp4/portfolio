import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-social',
  imports: [CommonModule],
  templateUrl: './contact-social.component.html',
  styleUrl: './contact-social.component.css'
})
export class ContactSocialComponent {
  contactInfo = {
    email: 'pedroaugustogoncalvesribeiro@gmail.com',
    phone: '+55 (31) 99566-9430',
    location: 'Belo Horizonte, Brazil'
  };

  socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/Airesp4',
      icon: 'github',
      bgClass: 'bg-slate-700/50 hover:bg-slate-600/50',
      textClass: 'text-slate-300 hover:text-white',
      borderClass: 'border-slate-600/50 hover:border-slate-500'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/pedro-aires4/',
      icon: 'linkedin',
      bgClass: 'bg-blue-600/20 hover:bg-blue-600/30',
      textClass: 'text-blue-300 hover:text-blue-200',
      borderClass: 'border-blue-500/30 hover:border-blue-400/50'
    }
  ];

  openLink(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  sendEmail(): void {
    window.location.href = `mailto:${this.contactInfo.email}`;
  }

  makeCall(): void {
    window.location.href = `tel:${this.contactInfo.phone}`;
  }
}
