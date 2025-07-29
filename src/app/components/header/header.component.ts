import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  navigationItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' }
  ];

  isMobileMenuOpen: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  scrollToSectionAndCloseMenu(event: Event, fragment: string): void {
    event.preventDefault();
    this.isMobileMenuOpen = false;
    this.scrollToSection(event, fragment);
  }

  scrollToSection(event: Event, fragment: string): void {
    event.preventDefault();
    const element = document.querySelector(fragment);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    if (window.innerWidth >= 768) {
      this.isMobileMenuOpen = false;
    }
  }
}