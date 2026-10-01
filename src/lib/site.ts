// 站点级常量与工具。集中在此，页面/组件复用，改一处即可。

export const SITE = {
  name: 'Haoyang He',
  nickname: 'Alan',
  role: 'Materials Science Researcher',
  affiliation: 'MSc Advanced Materials Science · University College London',
  tagline:
    'MSc Advanced Materials Science @ UCL. I study how materials behave — from perovskite optoelectronics to biofilm rheology — and I climb mountains and play drums in between.',
  location: 'London, UK',
  email: 'ucaqhhe@ucl.ac.uk',
  altEmail: 'aaaaalanhe02@gmail.com',
} as const;

// UCL 硕士课题组（FMED）
export const GROUP = {
  name: 'Functional Materials & Energy Devices (FMED)',
  short: 'FMED group, UCL',
  lead: 'Dr Mojtaba Abdi-Jalebi',
  href: 'https://www.ucl.ac.uk/mathematical-physical-sciences/functional-materials-and-energy-devices-group-fmed',
} as const;

export type NavItem = { label: string; href: string; id: string };

// 单页锚点导航（顶部 + 左侧 side-nav 共用）。href 指向首页对应 section；
// 在子页点击会先回首页再滚到锚点。
export const NAV: NavItem[] = [
  { label: 'Home', href: '/#home', id: 'home' },
  { label: 'About', href: '/#about', id: 'about' },
  { label: 'Interests', href: '/#interests', id: 'interests' },
  { label: 'Experience', href: '/#projects', id: 'projects' },
  { label: 'Skills', href: '/#skills', id: 'skills' },
  { label: 'Education', href: '/#education', id: 'education' },
  { label: 'Photography', href: '/#photography', id: 'photography' },
  { label: 'Adventures', href: '/#adventures', id: 'adventures' },
  { label: 'App', href: '/#app', id: 'app' },
];

// 一个「站点身份」：Nav / Footer / <head> 用到的名字、头衔、联系方式和导航。
// 主站用 MAIN_PROFILE（BaseLayout 默认值）；/risk 子站传入自己的（见 lib/risk.ts）。
export type Profile = {
  name: string;
  nickname: string;
  role: string;
  tagline: string;
  location: string;
  email: string;
  cv: string; // public/ 下的 CV 路径
  home: string; // 该站首页路径；side-nav 只在这一页显示
  nav: NavItem[];
  footerLinks?: { label: string; href: string }[]; // 页脚额外链接（可选）
};

export const MAIN_PROFILE: Profile = {
  name: SITE.name,
  nickname: SITE.nickname,
  role: SITE.role,
  tagline: SITE.tagline,
  location: SITE.location,
  email: SITE.email,
  cv: '/docs/CV.pdf',
  home: '/',
  nav: NAV,
};

// base 路径无关的链接拼接
const RAW_BASE = import.meta.env.BASE_URL;
export function withBase(path: string): string {
  const base = RAW_BASE.endsWith('/') ? RAW_BASE.slice(0, -1) : RAW_BASE;
  const p = path.startsWith('/') ? path : `/${path}`;
  const joined = `${base}${p}`;
  return joined === '' ? '/' : joined;
}
