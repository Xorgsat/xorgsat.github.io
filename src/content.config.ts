// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Project Case Study Schema
const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum([
      'UI & E2E Automation',
      'API & Backend Quality',
      'Mobile Automation',
      'Performance Engineering',
      'Test Infrastructure',
      'Enterprise Systems',
      'Commercial Project',
    ]),
    projectType: z.enum([
      'Independent Framework',
      'Commercial Production',
      'Demonstration Architecture',
      'Experimental Prototype',
    ]),
    status: z.enum(['Completed', 'In Development', 'Planned', 'Archived']),
    order: z.number().default(99),
    featured: z.boolean().default(false),
    techStack: z.array(z.string()),
    businessProblem: z.string(),
    engineeringFocus: z.string(),
    repositoryUrl: z.string().url(),
    liveDemoUrl: z.string().url().optional(),
    evidenceReferences: z.array(z.string()).optional(),
    limitations: z.array(z.string()).optional(),
  }),
});

// Engineering Notes / Technical Articles Schema
const engineeringNotes = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/engineering-notes' }),
  schema: z.object({
    title: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    summary: z.string(),
    category: z.enum([
      'Automation Architecture',
      'Test Reliability',
      'API Quality',
      'CI/CD & DevOps',
      'Performance Engineering',
      'Quality Strategy',
    ]),
    tags: z.array(z.string()),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  projects,
  'engineering-notes': engineeringNotes,
};
