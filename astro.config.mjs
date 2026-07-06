// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// GitHub Pages 部署说明：
// - 用户页仓库（<user>.github.io）：base 保持 '/'。
// - 项目页仓库（如 personal-web）：把 base 改成 '/personal-web'，并保证 site 正确。
// 站内链接和 PDF 都用 import.meta.env.BASE_URL 前缀（见 src/lib/site.ts 的 withBase），
// 所以改 base 后无需逐个改链接。
export default defineConfig({
  site: 'https://aaaaalanhe02.github.io',
  base: '/haoyang-he-portfolio',
  trailingSlash: 'ignore',
  integrations: [mdx(), sitemap()],
  image: {
    // 允许 sharp 生成的响应式格式
    responsiveStyles: true,
  },
});
