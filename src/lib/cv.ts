// 首页学术主页用的结构化 CV 数据（来自 CV_V2.pdf）。改这里即可更新首页。

export const education = [
  {
    degree: 'MSc Advanced Materials Science',
    org: 'University College London',
    period: '2025 – 2026',
    note: 'Predicted Distinction · Sustainability & materials-innovation focus',
  },
  {
    degree: 'BSc Physics',
    org: 'University of Edinburgh',
    period: '2021 – 2025',
    note: 'Second Class Honours · Microstructural control, nanoscale processing, condensed matter',
  },
];

export type ExperienceItem = {
  role: string;
  org: string;
  period: string;
  tag: string;
  points: string[];
  project?: string; // 对应 research 项目 slug，卡片可链接过去
};

export const experience: ExperienceItem[] = [
  {
    role: 'Semiconductor Optoelectronic Characterisation',
    org: 'University College London',
    period: 'Nov 2025 – Present',
    tag: 'Research',
    project: 'perovskite-optoelectronics',
    points: [
      'Investigating how bias-induced ion migration affects internal fields, charge extraction and hysteresis in perovskite optoelectronic devices.',
      'Building Python-based ionic–electronic transport models with nonlinear fitting to extract ionic relaxation times.',
    ],
  },
  {
    role: 'Sales Performance & Customer Segmentation Analysis',
    org: 'Independent Project',
    period: 'Sep 2025',
    tag: 'Data',
    project: 'sales-analytics',
    points: [
      'Analysed 10,000+ transactions with SQL (CTEs, window functions) for YoY growth, seasonality and product performance.',
      'Delivered ABC (Pareto) and RFM segmentation to prioritise high-value products and customer cohorts.',
    ],
  },
  {
    role: 'Biofilm Rheology Project',
    org: 'University of Edinburgh',
    period: 'Jan – Apr 2025',
    tag: 'Research',
    project: 'biofilm-rheology',
    points: [
      'Led a 10-week study of Bacillus subtilis biofilm mechanics using amplitude- and frequency-sweep rheometry.',
      'Found TasA deletion caused a >75% drop in storage modulus, establishing TasA fibres as the primary cross-linker.',
    ],
  },
  {
    role: 'Blood Fluid Mechanics Intern',
    org: 'University of Edinburgh',
    period: 'Jun – Aug 2024',
    tag: 'Research',
    project: 'blood-fluid-mechanics',
    points: [
      'Characterised secondary flows in Taylor–Couette cylinders above a critical Reynolds number using rotational rheometry.',
      'Extended Ellenberger (1985) to non-Newtonian fluids, showing a consistent critical modified Reynolds number.',
    ],
  },
  {
    role: 'Solid State Microstructures Lab Volunteer',
    org: 'Nanjing University',
    period: 'Aug – Sep 2023',
    tag: 'Research',
    project: 'nanjing-thin-films',
    points: [
      'Fabricated Fe₃O₄ thin-film substrates via PVD and spin-coating; operated photolithography for circuit patterning.',
      'Self-studied Scanning Tunnelling Microscopy and its role in 2D crystal growth and atomic-scale storage.',
    ],
  },
  {
    role: 'HYPED Shell Engineer (Hyperloop Team)',
    org: 'University of Edinburgh',
    period: 'Sep 2022 – Jul 2023',
    tag: 'Engineering',
    project: 'hyped-hyperloop',
    points: [
      "Owned aerodynamic design and manufacturing of the shell for the UK's first student-built Hyperloop test pod.",
      'Selected fibreglass composite to cut shell cost by ~20%, balancing performance against budget.',
    ],
  },
];

export const skills: { label: string; items: string[] }[] = [
  { label: 'Programming', items: ['Python (scikit-learn, pandas, NumPy)', 'MySQL', 'R'] },
  {
    label: 'Characterisation',
    items: ['XRD', 'FTIR', 'STM', 'SEM', 'Profilometry', 'UV-Vis', 'PVD / thin-film deposition'],
  },
  {
    label: 'Data & Analysis',
    items: ['Machine learning', 'A/B testing', 'Statistical hypothesis testing', 'Business analysis (AARRR, cohort, funnel)'],
  },
  { label: 'Tools', items: ['Excel', 'Tableau', 'Power BI', 'ImageJ', 'LaTeX'] },
  { label: 'Languages', items: ['English (fluent)', 'Mandarin (native)', 'German (working)'] },
];

export const interests: { emoji: string; label: string; text: string }[] = [
  { emoji: '🏔️', label: 'Mountaineering', text: 'Mount Kilimanjaro summiter and Tour du Mont Blanc finisher.' },
  { emoji: '🥁', label: 'Drums', text: 'Drummer in a thrash-metal band — fast hands, loud rooms.' },
  { emoji: '🧗', label: 'Climbing', text: 'Rock and alpine climbing whenever the weather allows.' },
  { emoji: '🔬', label: 'Sustainable materials', text: 'IOM3 member; drawn to materials that make cleaner technology possible.' },
];
