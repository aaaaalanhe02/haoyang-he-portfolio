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

// 单页锚点导航（顶部 + 左侧 side-nav 共用）。href 指向首页对应 section；
// 在子页点击会先回首页再滚到锚点。
export const NAV: { label: string; href: string; id: string }[] = [
  { label: 'Home', href: '/#home', id: 'home' },
  { label: 'Interests', href: '/#interests', id: 'interests' },
  { label: 'Work', href: '/#projects', id: 'projects' },
  { label: 'Skills', href: '/#skills', id: 'skills' },
  { label: 'Education', href: '/#education', id: 'education' },
  { label: 'Experience', href: '/#experience', id: 'experience' },
  { label: 'Photography', href: '/#photography', id: 'photography' },
  { label: 'Adventures', href: '/#adventures', id: 'adventures' },
  { label: 'About', href: '/#about', id: 'about' },
];

// base 路径无关的链接拼接
const RAW_BASE = import.meta.env.BASE_URL;
export function withBase(path: string): string {
  const base = RAW_BASE.endsWith('/') ? RAW_BASE.slice(0, -1) : RAW_BASE;
  const p = path.startsWith('/') ? path : `/${path}`;
  const joined = `${base}${p}`;
  return joined === '' ? '/' : joined;
}
