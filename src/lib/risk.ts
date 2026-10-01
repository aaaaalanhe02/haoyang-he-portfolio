// /risk 子站（金融风险分析师方向）的站点身份与结构化 CV 数据（来自 CV_Risk.pdf，
// 即 raw-assets/CV_Risk.pdf）。与主站共用组件和设计系统，内容按风控岗位重写。改这里即可更新 /risk 首页。
import type { NavItem, Profile } from './site';

export const RISK_NAV: NavItem[] = [
  { label: 'Home', href: '/risk/#home', id: 'home' },
  { label: 'About', href: '/risk/#about', id: 'about' },
  { label: 'Focus', href: '/risk/#focus', id: 'focus' },
  { label: 'Experience', href: '/risk/#experience', id: 'experience' },
  { label: 'Lab → Risk', href: '/risk/#transfer', id: 'transfer' },
  { label: 'Skills', href: '/risk/#skills', id: 'skills' },
  { label: 'Education', href: '/risk/#education', id: 'education' },
  { label: 'Certificates', href: '/risk/#certificates', id: 'certificates' },
  { label: 'Contact', href: '/risk/#contact', id: 'contact' },
];

export const RISK_PROFILE: Profile = {
  name: 'Haoyang He',
  nickname: 'Alan',
  role: 'Aspiring Financial Risk Analyst',
  tagline:
    'Quantitative STEM graduate (MSc UCL, BSc Physics Edinburgh) moving into financial and credit risk — SQL, Python and statistical modelling, turned into clear risk reporting and recommendations.',
  location: 'London, UK',
  email: 'alanhe02@outlook.com',
  cv: '/docs/Haoyang-He-CV-Financial-Risk.pdf',
  home: '/risk/',
  nav: RISK_NAV,
  footerLinks: [{ label: 'Research portfolio', href: '/' }],
};

export const RISK_AFFILIATION = 'MSc Advanced Materials Science, UCL · BSc Physics, University of Edinburgh';

export const heroTags = ['Credit risk', 'SQL', 'Python', 'Statistical modelling', 'Segmentation', 'MI reporting'];

// 对标主站的 Research Interests：四个目标方向
export const focusAreas = [
  { icon: '💳', title: 'Credit Risk', text: 'Assessing creditworthiness from quantified financial data — income, debt, savings and repayment history.' },
  { icon: '📊', title: 'Portfolio Monitoring', text: 'Tracking trends, seasonality and concentration, and explaining the drivers behind each change in performance.' },
  { icon: '🧮', title: 'Quantitative Modelling', text: 'Regression and classification models that are calibrated to the data, validated, and challenged rather than simply trusted.' },
  { icon: '🧭', title: 'Risk Reporting', text: 'Clear management information and recommendations that keep decisions within risk appetite.' },
];

// 「From Lab to Risk」：每条经历里的可迁移能力 → 风控里的对应场景
export const labToRisk = [
  {
    icon: '🧱',
    title: 'Stress testing to failure',
    did: 'Amplitude-sweep stress tests pinpointed the strain at which each biofilm fails; removing one gene raised that failure threshold five-fold.',
    risk: 'Stress testing and scenario analysis: how far can a borrower, or a whole portfolio, be pushed before it breaks?',
  },
  {
    icon: '📍',
    title: 'Thresholds and regime shifts',
    did: 'Located the critical Reynolds number at which a flow shifts regime, and narrowed the parameter range that describes the transition.',
    risk: 'Early-warning indicators and risk-appetite limits: spotting where behaviour changes before it shows up in losses.',
  },
  {
    icon: '🔎',
    title: 'Root cause, not noise',
    did: 'Separated slow ionic drift from fast electronic effects in device data, attributing each change in performance to its driver.',
    risk: 'Explaining why arrears, defaults or losses moved, and whether the move is a real signal or just noise.',
  },
  {
    icon: '📐',
    title: 'Model calibration',
    did: 'Fitted nonlinear regression models to time-dependent data to extract key parameters and benchmark performance across devices.',
    risk: 'Calibrating and benchmarking credit models, such as probability-of-default scores, across segments and over time.',
  },
  {
    icon: '🧩',
    title: 'Segmentation and concentration',
    did: 'Ranked a customer portfolio by value and concentration with RFM and Pareto analysis, querying 10,000+ transactions in SQL.',
    risk: 'Portfolio segmentation and concentration risk: which cohorts drive exposure, and where that exposure is concentrated.',
  },
  {
    icon: '⚖️',
    title: 'Cost against performance',
    did: 'Chose fibreglass over carbon fibre for a Hyperloop pod shell, cutting cost by about 20% while maintaining test performance.',
    risk: 'Risk–return judgement: weighing growth against expected loss, and staying within risk appetite.',
  },
];

export const riskSkills: { label: string; items: string[] }[] = [
  { label: 'Data & Programming', items: ['SQL (MySQL: CTEs, window functions, aggregations)', 'Python (pandas, NumPy, scikit-learn)', 'R'] },
  { label: 'Modelling & Statistics', items: ['Linear and nonlinear regression', 'Classification', 'Decision trees', "Hypothesis testing (Welch's t-test)"] },
  { label: 'Risk Methods', items: ['Credit risk assessment', 'Risk scoring and banding', 'Scenario analysis', 'Risk mitigation', 'Failure Mode & Effects Analysis (FMEA)'] },
  { label: 'Analysis & Reporting', items: ['Trend and seasonality analysis', 'Cohort and RFM segmentation', 'Pareto (concentration) analysis', 'Excel', 'Power BI', 'Tableau'] },
  { label: 'Languages', items: ['English (fluent)', 'Mandarin (native)', 'German (Cambridge Pre-U Distinction)'] },
];

export const riskEducation = [
  {
    degree: 'MSc Advanced Materials Science',
    org: 'University College London',
    period: '2025 – 2026',
    note: 'Predicted Distinction · Research project on data-driven device characterisation and model fitting',
  },
  {
    degree: 'BSc (Hons) Physics',
    org: 'University of Edinburgh',
    period: '2021 – 2025',
    note: 'Quantitative modules: Statistics, Computer Modelling, Thermodynamics, Quantum Physics, Electromagnetism, Condensed Matter Physics',
  },
];

// file = 证书文件（View 链接）；进行中的资格没有文件，用 status 显示状态
export const riskCertificates: {
  year?: string;
  name: string;
  org: string;
  note?: string;
  badge: string;
  file?: string;
  verify?: string;
  status?: string;
}[] = [
  { year: '2026', name: 'Risk Job Simulation', org: 'Goldman Sachs (via Forage)', note: 'An introduction to risk; evaluating client profiles and real estate investments', badge: 'Risk', file: '/docs/goldman-sachs-risk-simulation.pdf' },
  { year: '2026', name: 'Failure Mode & Effects Analysis', org: 'IOM3 Training Academy', note: 'CPD certified · 6 hours', badge: 'Risk', file: '/docs/fmea-cpd-certificate.pdf' },
  { year: '2025', name: 'Business Analytics Specialization — 5 courses', org: 'The Wharton School, UPenn', badge: 'Data', file: '/docs/coursera-2.pdf' },
  { year: '2025', name: 'Supervised Machine Learning: Regression & Classification', org: 'DeepLearning.AI & Stanford (Andrew Ng)', badge: 'ML', file: '/docs/coursera-1.pdf', verify: 'https://coursera.org/verify/7QSU5D87HR7G' },
  { year: '2026', name: 'MySQL for Data Analytics', org: 'Analyst Builder', badge: 'SQL', file: '/docs/mysql-certificate.png' },
  { year: '2025', name: 'Tableau for Data Visualization', org: 'Coursera Project Network', badge: 'Viz', file: '/docs/tableau-certificate.pdf' },
];

// 「Beyond the Numbers」：CV 里的 Interests（链接到主站相册 / 视频页）。
// focus = 窄屏 16:10 裁切时的 object-position（默认居中）
export const beyond: { slug: string; title: string; note: string; href: string; focus?: string }[] = [
  { slug: 'kilimanjaro', title: 'Mount Kilimanjaro', note: '5,895 m summit', href: '/adventures' },
  { slug: 'tmb', title: 'Tour du Mont Blanc', note: '~170 km circuit', href: '/adventures' },
  { slug: 'band', title: 'Drums', note: 'Metal band drummer', href: '/music', focus: 'center 70%' },
];
