import { getJson } from '@/lib/api';

export const fallbackSkills = [
  // Programming
  { id: 'python', name: 'Python', icon: 'lucide:terminal' },
  { id: 'javascript', name: 'JavaScript', icon: 'lucide:braces' },
  { id: 'sql', name: 'SQL', icon: 'lucide:database' },
  { id: 'html', name: 'HTML5', icon: 'lucide:code' },
  { id: 'css', name: 'CSS3', icon: 'lucide:palette' },
  { id: 'php', name: 'PHP', detail: 'Basics', icon: 'lucide:code' },
  { id: 'java', name: 'Java', detail: 'Basics', icon: 'lucide:code' },
  { id: 'cpp', name: 'C++', detail: 'Basics', icon: 'lucide:code' },
  // Frameworks & Libraries
  { id: 'django', name: 'Django', icon: 'lucide:server' },
  { id: 'django-rest', name: 'Django REST Framework', icon: 'lucide:server' },
  { id: 'react', name: 'React.js', icon: 'lucide:atom' },
  { id: 'tailwind', name: 'Tailwind CSS', icon: 'lucide:palette' },
  { id: 'bootstrap', name: 'Bootstrap', icon: 'lucide:layers' },
  // Cloud & DevOps
  { id: 'aws', name: 'AWS', detail: 'EC2, RDS, S3, ECR, IAM, Route 53, ACM, CloudWatch+', icon: 'lucide:server' },
  { id: 'docker', name: 'Docker', icon: 'lucide:layers' },
  { id: 'github-actions', name: 'Github Actions', icon: 'lucide:shield' },
  // Databases
  { id: 'postgresql', name: 'PostgreSQL', icon: 'lucide:database' },
  { id: 'mysql', name: 'MySQL', icon: 'lucide:database' },
  // Tools
  { id: 'git', name: 'Git', icon: 'lucide:braces' },
  { id: 'github', name: 'GitHub', icon: 'lucide:github' },
  { id: 'postman', name: 'Postman', icon: 'lucide:terminal' },
  { id: 'swagger', name: 'Swagger', icon: 'lucide:list' },
  { id: 'jmeter', name: 'JMeter', icon: 'lucide:bar-chart-2' },
  // Languages
  { id: 'arabic', name: 'Arabic', detail: 'Native', icon: 'lucide:flag' },
  { id: 'english', name: 'English', detail: 'Excellent', icon: 'lucide:flag' },
];


export const fallbackProjects = [
  {
    id: 'student-attendance-safety',
    name: 'Smart Student Attendance & Safety System',
    role: 'Backend Developer (Graduation Project)',
    period: 'Jan 2026 – Jun 2026',
    category: 'backend',
    tag: 'MISSION 01',
    description:
      'Mission-critical backend platform for IoT school safety and student monitoring built with Django REST Framework. Connects real-time IoT hardware telemetry (RFID card readers, GPS tracking) with an AI face recognition verification pipeline, automated parental alert notifications, and role-based access control.',
    skills: [
      { name: 'Django REST Framework', color: '#ff432b' },
      { name: 'Python', color: '#ffb800' },
      { name: 'AI Face Recognition', color: '#7952b3' },
      { name: 'IoT Telemetry (RFID & GPS)', color: '#2556e8' },
      { name: 'PostgreSQL', color: '#336791' },
      { name: 'REST APIs', color: '#85ea2d' },
    ],
    github_link: null,
    linkedin_link: 'https://lnkd.in/p/d8B8mtwp',
    website_link: null,
    videos: [
      {
        url: 'https://drive.google.com/file/d/16G7UPTfGO_BTV7AQejy612_vZVbPSrAD/view?pli=1',
        title: 'FEED 1',
        caption: 'RFID Card Readers & Real-Time GPS Tracking Demonstration',
      },
      {
        url: 'https://drive.google.com/file/d/1J55ewCnkhjqhYg-EMDsPCw3bLlYecOiP/view',
        title: 'FEED 2',
        caption: 'AI Face Recognition & Instant Safety Alert Engine Walkthrough',
      },
    ],

    highlights: [
      'Built backend services for an IoT school monitoring platform using Django REST Framework',
      'Implemented REST APIs, JWT authentication, RBAC, and integrations for AI face recognition, RFID, and GPS',
      'Real-time automated parental notification engine for check-in/check-out events',
      'Automated tests covering authentication, permissions, serializers, and core safety logic',
    ],
  },
  {
    id: 'restaurant-ordering-api',
    name: 'Restaurant Ordering API',
    role: 'Fullstack Developer',
    period: 'Aug 2026',
    category: 'backend',
    tag: 'MISSION 02',
    description:
      'Robust backend architecture for multi-restaurant ordering systems built with Django REST Framework and MySQL/RDS on AWS. Implements secure JWT authentication, role-based access control, restaurant-scoped permissions, automated Swagger documentation, Docker containerization, and comprehensive API tests.',
    skills: [
      { name: 'Django REST Framework', color: '#ff432b' },
      { name: 'Python', color: '#ffb800' },
      { name: 'MySQL / RDS', color: '#00758f' },
      { name: 'AWS', color: '#ff9900' },
      { name: 'Docker', color: '#2496ed' },
      { name: 'Swagger', color: '#85ea2d' },
      { name: 'JWT Auth', color: '#2556e8' },
    ],
    github_link: 'https://github.com/1AhmadiS1/resturantordering',
    linkedin_link: 'https://lnkd.in/p/d6xSBzcW',
    website_link: null,
    demo_video: 'https://drive.google.com/file/d/1RhXl0YZ04iOWegy9Lpc8owLYtYn4F-kX/view?usp=drive_link',
    video_caption: 'Restaurant Ordering API — JWT Auth & Order Flow Walkthrough',

    highlights: [
      'Built a Django REST Framework and MySQL/RDS backend for restaurant ordering',
      'Implemented JWT auth, role-based permissions, and restaurant-scoped access control',
      'Interactive Swagger documentation with automated unit and integration API test suites',
      'Dockerized container setup deployed to AWS cloud infrastructure',
    ],
  },
  {
    id: 'mini-jira-backend',
    name: 'Mini Jira Backend API',
    role: 'Backend Developer',
    period: 'Jun 2026 – Jul 2026',
    category: 'backend',
    tag: 'MISSION 03',
    description:
      'Jira-inspired multi-tenant backend architecture built with Django REST Framework and PostgreSQL. Features fine-grained RBAC permissions, hierarchical workspaces, project tracking, issue management with workflows, comment threads, file attachments, and complete AWS production deployment.',
    skills: [
      { name: 'Django REST Framework', color: '#ff432b' },
      { name: 'PostgreSQL', color: '#336791' },
      { name: 'AWS (EC2, RDS, S3, ECR)', color: '#ff9900' },
      { name: 'Docker', color: '#2496ed' },
      { name: 'Nginx', color: '#009639' },
      { name: 'Gunicorn', color: '#499848' },
    ],
    github_link: 'https://github.com/1AhmadiS1/MiniJira',
    linkedin_link: 'https://lnkd.in/p/dK4TdWuQ',
    website_link: null,
    demo_video: null,
    images: [
      {
        image: "/2.jpeg",
      },
      {
        image: '/3.jpeg',
      },
      {
        image: '/4.jpeg',
      },
            {
        image: '/1.jpeg',
      },
    ],
    highlights: [
      'Multi-tenant architecture supporting workspaces, projects, issues, comments, & attachments',
      'JWT authentication with Role-Based Access Control (RBAC) across tenant boundaries',
      'Deployed on AWS using Docker, EC2, RDS, S3, ECR, Nginx reverse proxy, and Gunicorn',
      'Comprehensive automated backend test suite ensuring workflow data integrity',
    ],
  },
  {
    id: 'palestine-real-estate',
    name: 'Palestine Real Estate Platform',
    role: 'Frontend Developer',
    period: 'Aug 2024 – Oct 2024',
    category: 'frontend',
    tag: 'MISSION 04',
    description:
      'High-performance real estate discovery platform built with React and Tailwind CSS. Implemented advanced property exploration with dynamic multi-criteria search, live filtering by price/location, multi-parameter sorting, paginated catalog feeds, and smooth REST API data integration.',
    skills: [
      { name: 'React.js', color: '#2556e8' },
      { name: 'Tailwind CSS', color: '#38bdf8' },
      { name: 'JavaScript', color: '#ffd700' },
      { name: 'REST APIs', color: '#ff432b' },
      { name: 'HTML5 / CSS3', color: '#2556e8' },
    ],
    github_link: 'https://github.com/yousefhantash/real-estate',
    linkedin_link: 'https://lnkd.in/p/dZ69F96r',
    website_link: null,
    demo_video: 'https://drive.google.com/file/d/1greWmJVprw_dJsC2hAVzRwCPt6kkd2IM/view?usp=sharing',
    video_caption: 'Real Estate Platform — Dynamic Search, Filtering & Property Catalog',
    highlights: [
      'Built responsive React/Tailwind features with optimized bundle performance',
      'Integrated REST APIs with multi-parameter search, filtering, sorting, and pagination',
      'Component-driven architecture with reusable UI cards and image carousels',
      'Optimized client-side state management for instantaneous filter interactions',
    ],
  },
  {
    id: 'small-shop-debt-tracker',
    name: 'Small-Shop Debt Management System',
    role: 'Full-Stack Developer',
    period: '2026',
    category: 'fullstack',
    tag: 'MISSION 05',
    description:
      'Full-stack business management application built with React.js, Django REST Framework, and PostgreSQL. Solves credit tracking for small businesses by managing customer credit purchases, installment payments, outstanding balances, payment due dates, and multi-item debt transactions with automatic debt status calculations.',
    skills: [
      { name: 'React.js', color: '#2556e8' },
      { name: 'Django REST Framework', color: '#ff432b' },
      { name: 'PostgreSQL', color: '#336791' },
      { name: 'Tailwind CSS', color: '#38bdf8' },
      { name: 'Python', color: '#ffb800' },
    ],
    github_link: 'https://github.com/1AhmadiS1/Small-Shop-Debt-Tracker.git',
    linkedin_link: null,
    website_link: null,
    images: [
      {
        image: '/projects/debt-tracker/1.png',
      },
      {
        image: '/projects/debt-tracker/2.png',
      },
      {
        image: '/projects/debt-tracker/3.png',
      },
      {
        image: '/projects/debt-tracker/4.png',
      },
      {
        image: '/projects/debt-tracker/5.png',
      },
      {
        image: '/projects/debt-tracker/6.png',
      },
      {
        image: '/projects/debt-tracker/7.png',
      },
      {
        image: '/projects/debt-tracker/8.png',
      },
    ],
    highlights: [
      'Developed full-stack app to manage customer credit purchases, partial payments, and due dates',
      'Implemented customer/inventory management, multi-item debt transactions, and automatic status calculations',
      'Enforced role-based access control for shop owners and employees with shop-level data isolation',
      'Designed transactional workflows to maintain ACID consistency across debt creation, payments, and inventory',
    ],
  },
];

export async function getPortfolioData({ signal } = {}) {
  const [skills, projects] = await Promise.all([
    getJson('/api/skills/', { signal }),
    getJson('/api/projects/', { signal }),
  ]);

  return {
    skills: skills.length ? skills : fallbackSkills,
    projects: projects.length ? projects : fallbackProjects,
  };
}
