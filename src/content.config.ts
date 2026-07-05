import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 研究 / 工程 / 数据项目：每个项目一篇 MDX，正文写详细说明，
// frontmatter 提供卡片元数据、封面图、可选画廊目录与视频。
const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      subtitle: z.string().optional(),
      org: z.string().optional(),
      period: z.string().optional(),
      // 用于卡片分组与标签配色
      category: z.enum(['research', 'engineering', 'data']).default('research'),
      tags: z.array(z.string()).default([]),
      summary: z.string(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      // src/assets 下的子目录名，详情页据此加载整组画廊图
      gallery: z.string().optional(),
      // public/videos 下的文件名（可多个）
      videos: z.array(z.string()).default([]),
      // 相关文档 / 外链
      links: z
        .array(z.object({ label: z.string(), href: z.string() }))
        .default([]),
      featured: z.boolean().default(false),
      order: z.number().default(99),
    }),
});

export const collections = { projects };
