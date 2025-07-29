import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demoUrl: string;
  githubUrl: string;
  category: 'Backend' | 'Frontend' | 'Fullstack';
  icon: string;
}

@Component({
  selector: 'app-projects-overview',
  imports: [CommonModule],
  templateUrl: './projects-overview.component.html',
  styleUrl: './projects-overview.component.css'
})
export class ProjectsOverviewComponent {
  selectedCategory = "All"
  categories: string[] = ["All", "Backend", "Frontend", "Fullstack"]

  projects: Project[] = [
    {
      id: 1,
      title: "desafio-itau-junior",
      description:
        "Este repositório contém a solução para o desafio de programação proposto pelo Itaú Unibanco, onde foi desenvolvido uma API REST para o gerenciamento de transações financeiras e cálculo de estatísticas. A API foi construída utilizando Java e Spring Boot.",
      image: "itau-unibanco.jpg",
      technologies: ["Java", "Spring Boot", "JUnit"],
      demoUrl: "",
      githubUrl: "https://github.com/Airesp4/desafio-itau-junior",
      category: "Backend",
      icon: "💼",
    },
    {
      id: 2,
      title: "ExamManagerApi",
      description:
        "Backend da aplicação ExamManager é uma API RESTful desenvolvida com Spring Boot. Ela fornece recursos para gerenciar exames, provas, questões e usuários. A API se comunica com o banco de dados e oferece endpoints para manipulação dos dados de maneira simples e eficiente.",
      image: "https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg",
      technologies: [
        "Java",
        "Spring Boot",
        "Spring Data JPA",
        "Spring Security",
        "PostgreSQL",
        "JWT Authentication",
        "SpringDoc OpenAPI",
        "Lombok",
      ],
      demoUrl: "",
      githubUrl: "https://github.com/Airesp4/ExamManagerApi",
      category: "Backend",
      icon: "📚",
    },
    {
      id: 3,
      title: "ExamManagerFront",
      description:
        "ExamManager, um sistema para gerenciamento de provas, desenvolvido em Angular para consumir a API de gerenciamento de provas.",
      image: "exam-manager-front.png",
      technologies: ["Angular", "TypeScript", "HTML", "CSS", "Angular Material", "JWT Authentication"],
      demoUrl: "",
      githubUrl: "https://github.com/Airesp4/ExamManagerFront",
      category: "Frontend",
      icon: "🖥️",
    },
    {
      id: 4,
      title: "Todo-List-Angular",
      description:
        "Este projeto consiste em uma aplicação de Lista de Tarefas (To-Do List) desenvolvida com Angular e TypeScript, como parte da entrega da Avaliação Auto Instrucional da disciplina de Desenvolvimento Web Front End do curso de Ciência da Computação da Universidade FUMEC.",
      image: "todo-list-angular.png",
      technologies: ["Angular", "TypeScript", "HTML", "CSS"],
      demoUrl: "https://todo-list-angular-lovat.vercel.app/",
      githubUrl: "https://github.com/Airesp4/Todo-List-Angular",
      category: "Frontend",
      icon: "📝",
    },
    {
      id: 5,
      title: "Url-Shortener-Java",
      description: "Serviço de encurtador de URLs desenvolvido em Java com Spring Boot.",
      image: "url-shortener-java.png",
      technologies: ["Java", "Spring Boot", "Spring Web", "MongoDB", "JUnit", "JavaScript", "HTML", "CSS"],
      demoUrl: "https://shortenjava.onrender.com/",
      githubUrl: "https://github.com/Airesp4/Url-Shortener-Java",
      category: "Fullstack",
      icon: "🔗",
    },
    {
      id: 6,
      title: "RentArise",
      description:
        "Sistema web para facilitar e otimizar o processo de aluguel de equipamentos. A plataforma será desenvolvida para atender tanto administradores quanto clientes, com foco na organização, controle e emissão de relatórios e contratos.",
      image: "rent-arise.png",
      technologies: ["NestJS", "Angular", "TypeScript", "PostgreSQL", "TypeORM", "JWT Authentication", "HTML", "CSS"],
      demoUrl: "",
      githubUrl: "https://github.com/J0rgeGabriel/RentArise",
      category: "Fullstack",
      icon: "🏗️",
    },
  ]

  get filteredProjects(): Project[] {
    if (this.selectedCategory === "All") {
      return this.projects
    }
    return this.projects.filter((project) => project.category === this.selectedCategory)
  }

  selectCategory(category: string): void {
    this.selectedCategory = category
  }

  openLink(url: string): void {
    window.open(url, "_blank", "noopener,noreferrer")
  }
}