import type { ImageMetadata } from 'astro';

// 一次性拿到 src/assets 下所有照片（eager import），供各板块按目录 slug 取用。
// Astro/sharp 会在构建时把它们优化成响应式 WebP。
const modules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/**/*.{jpg,jpeg,png}',
  { eager: true },
);

/** 取某个 slug 目录（如 'kilimanjaro'）下的全部图片，按文件名排序 */
export function getGallery(slug: string): ImageMetadata[] {
  const prefix = `/src/assets/${slug}/`;
  return Object.entries(modules)
    .filter(([path]) => path.startsWith(prefix))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, mod]) => mod.default);
}

/** 取某目录第一张图（常用作封面/预览） */
export function getCover(slug: string): ImageMetadata | undefined {
  return getGallery(slug)[0];
}
