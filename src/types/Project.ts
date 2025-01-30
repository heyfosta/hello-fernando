// src/types/Project.ts
export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  link?: string;
  githubLink?: string;
  thumbnailImage: string;
  images: string[];
}
