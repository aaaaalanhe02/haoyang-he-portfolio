// 站点级常量与工具。集中在此，页面/组件复用，改一处即可。

export const SITE = {
  name: 'Haoyang He',
  nickname: 'Alan',
  role: 'Materials Science Researcher',
  tagline:
    'MSc Advanced Materials Science @ UCL. I study how materials behave — from perovskite optoelectronics to biofilm rheology — and I climb mountains and play drums in between.',
  location: 'London, UK',
  email: 'ucaqhhe@ucl.ac.uk',
  altEmail: 'aaaaalanhe02@gmail.com',
} as const;

// 主导航（首页由左上角名字链接，故不单列 Home）
export const NAV: { label: string; href: string }[] = [
  { label: 'Research', href: '/research' },
  { label: 'Adventures', href: '/adventures' },
  { label: 'Music', href: '/music' },
  { label: 'About', href: '/about' },
];

// base 路径无关的链接拼接：所有站内链接 / public 资源都经过它，
// 这样 astro.config 的 base 从 '/' 改成 '/repo' 时无需逐个改链接。
const RAW_BASE = import.meta.env.BASE_URL; // 例如 '/' 或 '/personal-web/'
export function withBase(path: string): string {
  const base = RAW_BASE.endsWith('/') ? RAW_BASE.slice(0, -1) : RAW_BASE;
  const p = path.startsWith('/') ? path : `/${path}`;
  const joined = `${base}${p}`;
  return joined === '' ? '/' : joined;
}

// 判断当前路径是否落在某个导航板块内（用于高亮）
export function isActive(currentPath: string, href: string): boolean {
  const cur = currentPath.replace(RAW_BASE, '/').replace(/\/+$/, '') || '/';
  const target = href.replace(/\/+$/, '') || '/';
  if (target === '/') return cur === '/';
  return cur === target || cur.startsWith(`${target}/`);
}
