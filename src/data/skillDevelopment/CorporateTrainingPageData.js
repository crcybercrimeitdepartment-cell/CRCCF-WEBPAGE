/**
 * @file Demo.jsx
 * @description Static data file containing all training program definitions
 * with full metadata. Each program includes title, category, duration,
 * difficulty level, rating, enrollment count, weekly time commitment,
 * description, skills list, and multi-phase curriculum outline.
 *
 * @author CRCCF Development Team
 * @version 1.0.0
 */

// ==========================================
// TRAINING PROGRAMS DATA
// Complete dataset of 48 training programs organized by category.
// Each program object contains all properties needed for
// display, filtering, and detail page rendering.
// ==========================================
export const mentorshipPrograms = [

    // ==========================================
    // LEADERSHIP & MANAGEMENT (6 Programs)
    // Core leadership, strategy, and organizational skills.
    // ==========================================
    {
    id: "leadership-development",
    title: "Leadership Development Training",
    category: "Leadership & Management",
    duration: "8 Weeks",
    level: "Beginner",
    rating: 4.8,
    enrolled: "1,350+",
    weeklyCommitment: "4-6 hours",
    description: "Build foundational leadership capabilities. Learn to inspire teams, set vision, and drive organizational success through effective leadership styles.",
    skills: ["Leadership Styles", "Team Inspiration", "Vision Setting"],
    curriculum: [
      "Phase 1: Self-Awareness, Emotional Intelligence, and Leadership Identity",
      "Phase 2: Motivation Techniques, Delegation, and Team Empowerment",
      "Phase 3: Strategic Vision, Change Leadership, and Personal Brand"
    ]
  },
  {
    id: "executive-leadership",
    title: "Executive Leadership Training",
    category: "Leadership & Management",
    duration: "10 Weeks",
    level: "Advanced",
    rating: 4.9,
    enrolled: "820+",
    weeklyCommitment: "6-8 hours",
    description: "Develop C-suite readiness. Master executive decision-making, stakeholder management, corporate governance, and organizational transformation.",
    skills: ["Executive Presence", "Corporate Governance", "Stakeholder Management"],
    curriculum: [
      "Phase 1: Executive Mindset, Board Governance, and Strategic Thinking",
      "Phase 2: Crisis Leadership, Media Training, and Investor Relations",
      "Phase 3: Organizational Transformation and Legacy Building"
    ]
  },
  {
    id: "strategic-management",
    title: "Strategic Management Training",
    category: "Leadership & Management",
    duration: "8 Weeks",
    level: "Intermediate",
    rating: 4.7,
    enrolled: "960+",
    weeklyCommitment: "4-6 hours",
    description: "Learn to formulate and execute business strategies. Master competitive analysis, strategic planning frameworks, and performance measurement.",
    skills: ["Strategic Planning", "Competitive Analysis", "KPI Frameworks"],
    curriculum: [
      "Phase 1: External Analysis, Industry Portfolios, and Competitive Positioning",
      "Phase 2: Strategy Formulation, Blue Ocean, and Balanced Scorecard",
      "Phase 3: Strategy Execution, OKRs, and Strategic Control Systems"
    ]
  },
  {
    id: "project-management",
    title: "Project Management Training",
    category: "Leadership & Management",
    duration: "8 Weeks",
    level: "Beginner",
    rating: 4.8,
    enrolled: "1,580+",
    weeklyCommitment: "4-6 hours",
    description: "Master project delivery from initiation to closure. Learn Agile, Scrum, Waterfall methodologies, risk management, and stakeholder communication.",
    skills: ["Agile/Scrum", "Risk Management", "Stakeholder Communication"],
    curriculum: [
      "Phase 1: Project Lifecycle, Scope Management, and WBS Creation",
      "Phase 2: Scheduling, Budgeting, Resource Allocation, and Risk Registers",
      "Phase 3: Agile Ceremonies, Sprint Planning, and Project Closure"
    ]
  },
  {
    id: "change-management",
    title: "Change Management Training",
    category: "Leadership & Management",
    duration: "6 Weeks",
    level: "Intermediate",
    rating: 4.7,
    enrolled: "740+",
    weeklyCommitment: "4-6 hours",
    description: "Lead organizational change effectively. Learn change models, resistance management, communication strategies, and sustainability planning.",
    skills: ["Change Models", "Resistance Management", "Communication Strategy"],
    curriculum: [
      "Phase 1: Change Theories (Kotter, ADKAR) and Readiness Assessment",
      "Phase 2: Stakeholder Analysis, Resistance Management, and Pilot Programs",
      "Phase 3: Reinforcement, Culture Integration, and Sustaining Change"
    ]
  },
  {
    id: "decision-making",
    title: "Decision-Making Training",
    category: "Leadership & Management",
    duration: "4 Weeks",
    level: "Beginner",
    rating: 4.6,
    enrolled: "1,120+",
    weeklyCommitment: "3-4 hours",
    description: "Sharpen decision-making under uncertainty. Learn structured frameworks, cognitive bias awareness, data-driven decisions, and risk assessment.",
    skills: ["Decision Frameworks", "Cognitive Bias", "Risk Assessment"],
    curriculum: [
      "Phase 1: Decision-Making Models and Cognitive Bias Identification",
      "Phase 2: Data-Driven Decisions, Scenario Analysis, and Probabilistic Thinking",
      "Phase 3: Group Decision-Making, Consensus Building, and Post-Mortem Analysis"
    ]
  },

    // ==========================================
    // COMMUNICATION & SOFT SKILLS (12 Programs)
    // Interpersonal, writing, and professional development.
    // ==========================================
    {
    id: "business-communication",
    title: "Business Communication Training",
    category: "Communication & Soft Skills",
    duration: "6 Weeks",
    level: "Beginner",
    rating: 4.7,
    enrolled: "1,420+",
    weeklyCommitment: "3-4 hours",
    description: "Master professional writing, presentations, and interpersonal communication in corporate environments.",
    skills: ["Professional Writing", "Presentations", "Interpersonal Skills"],
    curriculum: [
      "Phase 1: Email Etiquette, Report Writing, and Business Correspondence",
      "Phase 2: Presentation Design, Delivery Techniques, and Visual Storytelling",
      "Phase 3: Meeting Facilitation, Cross-Cultural Communication, and Negotiation Basics"
    ]
  },
  {
    id: "professional-communication",
    title: "Professional Communication Training",
    category: "Communication & Soft Skills",
    duration: "6 Weeks",
    level: "Beginner",
    rating: 4.7,
    enrolled: "1,280+",
    weeklyCommitment: "3-4 hours",
    description: "Develop executive presence, active listening, and impactful verbal and non-verbal communication skills.",
    skills: ["Executive Presence", "Active Listening", "Body Language"],
    curriculum: [
      "Phase 1: Active Listening, Verbal Delivery, and Non-Verbal Cues",
      "Phase 2: High-Stakes Presentations and Executive Storytelling",
      "Phase 3: Crucial Conversations, Feedback Delivery, and Influence"
    ]
  },
  {
    id: "corporate-etiquette",
    title: "Corporate Etiquette Training",
    category: "Communication & Soft Skills",
    duration: "4 Weeks",
    level: "Beginner",
    rating: 4.5,
    enrolled: "980+",
    weeklyCommitment: "2-3 hours",
    description: "Navigate professional settings with confidence. Learn dining etiquette, meeting protocols, dress codes, and cultural sensitivity.",
    skills: ["Dining Etiquette", "Meeting Protocols", "Cultural Sensitivity"],
    curriculum: [
      "Phase 1: Professional Appearance, Greetings, and Workplace Protocols",
      "Phase 2: Business Dining, Networking Events, and Virtual Meeting Etiquette",
      "Phase 3: Cross-Cultural Norms, International Business Travel, and Client Hosting"
    ]
  },
  {
    id: "workplace-ethics",
    title: "Workplace Ethics Training",
    category: "Communication & Soft Skills",
    duration: "4 Weeks",
    level: "Beginner",
    rating: 4.6,
    enrolled: "1,050+",
    weeklyCommitment: "2-3 hours",
    description: "Build a strong ethical foundation. Understand corporate code of conduct, whistleblowing policies, and ethical dilemma resolution.",
    skills: ["Code of Conduct", "Ethical Decision-Making", "Compliance"],
    curriculum: [
      "Phase 1: Ethical Principles, Corporate Values, and Code of Conduct",
      "Phase 2: Conflict of Interest, Whistleblowing, and Reporting Mechanisms",
      "Phase 3: Case Studies, Ethical Dilemmas, and Building an Ethical Culture"
    ]
  },
  {
    id: "team-building",
    title: "Team Building Training",
    category: "Communication & Soft Skills",
    duration: "4 Weeks",
    level: "Beginner",
    rating: 4.6,
    enrolled: "1,180+",
    weeklyCommitment: "3-4 hours",
    description: "Build high-performing teams. Learn team dynamics, trust building, collaboration tools, and remote team management.",
    skills: ["Team Dynamics", "Trust Building", "Remote Collaboration"],
    curriculum: [
      "Phase 1: Team Stages (Tuckman), Roles, and Psychological Safety",
      "Phase 2: Collaboration Tools, Remote Team Best Practices, and Virtual Offsites",
      "Phase 3: Team Rituals, Retrospectives, and Sustaining High Performance"
    ]
  },
  {
    id: "conflict-resolution",
    title: "Conflict Resolution Training",
    category: "Communication & Soft Skills",
    duration: "4 Weeks",
    level: "Intermediate",
    rating: 4.7,
    enrolled: "890+",
    weeklyCommitment: "3-4 hours",
    description: "Transform workplace conflicts into opportunities. Learn mediation techniques, negotiation strategies, and root cause analysis.",
    skills: ["Mediation", "Negotiation", "Root Cause Analysis"],
    curriculum: [
      "Phase 1: Conflict Styles, Communication Triggers, and Active Listening",
      "Phase 2: Mediation Frameworks, Facilitated Dialogues, and De-Escalation",
      "Phase 3: Systemic Conflict Resolution, Policy Design, and Follow-Up"
    ]
  },
  {
    id: "negotiation-skills",
    title: "Negotiation Skills Training",
    category: "Communication & Soft Skills",
    duration: "4 Weeks",
    level: "Intermediate",
    rating: 4.8,
    enrolled: "1,050+",
    weeklyCommitment: "3-4 hours",
    description: "Master win-win negotiation tactics. Learn BATNA analysis, anchoring, concession strategies, and deal structuring.",
    skills: ["BATNA Analysis", "Anchoring", "Deal Structuring"],
    curriculum: [
      "Phase 1: Negotiation Styles, Preparation, and ZOPA/BATNA Concepts",
      "Phase 2: Anchoring, Framing, and Concession Strategies",
      "Phase 3: Multi-Party Negotiations, Cross-Cultural Negotiating, and Contract Terms"
    ]
  },
  {
    id: "critical-thinking",
    title: "Critical Thinking Training",
    category: "Communication & Soft Skills",
    duration: "4 Weeks",
    level: "Beginner",
    rating: 4.7,
    enrolled: "1,100+",
    weeklyCommitment: "3-4 hours",
    description: "Develop analytical reasoning and logical evaluation skills. Learn to question assumptions, identify fallacies, and construct sound arguments.",
    skills: ["Analytical Reasoning", "Logical Evaluation", "Argument Construction"],
    curriculum: [
      "Phase 1: Logical Reasoning, Argument Mapping, and Evidence Evaluation",
      "Phase 2: Cognitive Biases, Logical Fallacies, and Mental Models",
      "Phase 3: Applied Critical Thinking, Case Analysis, and Strategic Questioning"
    ]
  },
  {
    id: "problem-solving",
    title: "Problem-Solving Training",
    category: "Communication & Soft Skills",
    duration: "4 Weeks",
    level: "Beginner",
    rating: 4.6,
    enrolled: "1,250+",
    weeklyCommitment: "3-4 hours",
    description: "Apply structured problem-solving methodologies. Learn root cause analysis, design thinking, and creative solution generation.",
    skills: ["Root Cause Analysis", "Design Thinking", "Brainstorming"],
    curriculum: [
      "Phase 1: Problem Definition, 5 Whys, and Fishbone Analysis",
      "Phase 2: Design Thinking, Mind Mapping, and Lateral Thinking",
      "Phase 3: Solution Implementation, A/B Testing, and Impact Measurement"
    ]
  },
  {
    id: "time-management",
    title: "Time Management Training",
    category: "Communication & Soft Skills",
    duration: "3 Weeks",
    level: "Beginner",
    rating: 4.5,
    enrolled: "1,680+",
    weeklyCommitment: "2-3 hours",
    description: "Maximize productivity and efficiency. Learn prioritization frameworks, energy management, and overcoming procrastination.",
    skills: ["Prioritization", "Energy Management", "Productivity Systems"],
    curriculum: [
      "Phase 1: Eisenhower Matrix, Time Auditing, and Goal Setting (SMART)",
      "Phase 2: Deep Work, Pomodoro Technique, and Calendar Optimization",
      "Phase 3: Delegation, Automation, and Sustainable Work-Life Integration"
    ]
  },
  {
    id: "stress-management",
    title: "Stress Management Training",
    category: "Communication & Soft Skills",
    duration: "4 Weeks",
    level: "Beginner",
    rating: 4.6,
    enrolled: "1,350+",
    weeklyCommitment: "2-3 hours",
    description: "Build resilience and manage workplace stress. Learn mindfulness, coping strategies, work-life balance, and burnout prevention.",
    skills: ["Mindfulness", "Resilience Building", "Burnout Prevention"],
    curriculum: [
      "Phase 1: Stress Physiology, Triggers, and Self-Assessment Tools",
      "Phase 2: Mindfulness, Breathing Techniques, and Cognitive Reframing",
      "Phase 3: Boundary Setting, Burnout Recovery, and Organizational Wellness"
    ]
  },
  {
    id: "emotional-intelligence",
    title: "Emotional Intelligence Training",
    category: "Communication & Soft Skills",
    duration: "4 Weeks",
    level: "Intermediate",
    rating: 4.8,
    enrolled: "1,150+",
    weeklyCommitment: "3-4 hours",
    description: "Develop self-awareness, empathy, and social skills. Master emotional regulation, relationship management, and compassionate leadership.",
    skills: ["Self-Awareness", "Empathy", "Emotional Regulation"],
    curriculum: [
      "Phase 1: Self-Awareness, Emotional Vocabulary, and Trigger Mapping",
      "Phase 2: Self-Regulation, Impulse Control, and Stress Tolerance",
      "Phase 3: Social Awareness, Relationship Management, and Empathetic Leadership"
    ]
  },

    // ==========================================
    // PEOPLE & HR (4 Programs)
    // Human resources, talent, and employee management.
    // ==========================================
    {
    id: "hr-management",
    title: "Human Resource Management Training",
    category: "People & HR",
    duration: "8 Weeks",
    level: "Beginner",
    rating: 4.7,
    enrolled: "1,050+",
    weeklyCommitment: "4-6 hours",
    description: "Master end-to-end HR operations. Learn recruitment, onboarding, employee relations, compensation, and HR compliance.",
    skills: ["Recruitment", "Employee Relations", "HR Compliance"],
    curriculum: [
      "Phase 1: HR Strategy, Workforce Planning, and Employment Law Basics",
      "Phase 2: Recruitment, Onboarding, and Employee Lifecycle Management",
      "Phase 3: Compensation, Benefits, HRIS Systems, and Analytics"
    ]
  },
  {
    id: "talent-acquisition",
    title: "Talent Acquisition Training",
    category: "People & HR",
    duration: "6 Weeks",
    level: "Intermediate",
    rating: 4.7,
    enrolled: "820+",
    weeklyCommitment: "4-6 hours",
    description: "Build world-class hiring processes. Learn sourcing strategies, interview techniques, employer branding, and recruitment analytics.",
    skills: ["Sourcing Strategies", "Interview Techniques", "Employer Branding"],
    curriculum: [
      "Phase 1: Talent Pipelining, Sourcing Channels, and Boolean Search",
      "Phase 2: Structured Interviews, Assessment Design, and Candidate Experience",
      "Phase 3: Offer Negotiation, Onboarding, and Recruitment Metrics"
    ]
  },
  {
    id: "employee-engagement",
    title: "Employee Engagement Training",
    category: "People & HR",
    duration: "4 Weeks",
    level: "Intermediate",
    rating: 4.6,
    enrolled: "780+",
    weeklyCommitment: "3-4 hours",
    description: "Design programs that boost morale and retention. Learn engagement surveys, recognition systems, and culture building strategies.",
    skills: ["Engagement Surveys", "Recognition Programs", "Culture Building"],
    curriculum: [
      "Phase 1: Engagement Drivers, Survey Design, and Pulse Checks",
      "Phase 2: Recognition Programs, Career Development, and Mentorship",
      "Phase 3: Action Planning, Culture Metrics, and Sustaining Engagement"
    ]
  },
  {
    id: "performance-management",
    title: "Performance Management Training",
    category: "People & HR",
    duration: "6 Weeks",
    level: "Intermediate",
    rating: 4.7,
    enrolled: "850+",
    weeklyCommitment: "4-6 hours",
    description: "Create effective performance systems. Learn goal setting, feedback delivery, performance reviews, and improvement planning.",
    skills: ["Goal Setting", "Feedback Delivery", "Performance Reviews"],
    curriculum: [
      "Phase 1: OKR/KPI Frameworks, Goal Cascading, and Expectation Setting",
      "Phase 2: Continuous Feedback, Coaching Conversations, and 360 Reviews",
      "Phase 3: Performance Improvement Plans, Calibration, and Succession Planning"
    ]
  },

    // ==========================================
    // BUSINESS & SALES (5 Programs)
    // Product, business development, and sales strategies.
    // ==========================================
    {
    id: "product-management",
    title: "Product Management Training",
    category: "Business & Sales",
    duration: "8 Weeks",
    level: "Intermediate",
    rating: 4.8,
    enrolled: "1,100+",
    weeklyCommitment: "4-6 hours",
    description: "Own the product lifecycle. Learn discovery, roadmap planning, stakeholder alignment, and data-driven product decisions.",
    skills: ["Product Discovery", "Roadmap Planning", "Data-Driven Decisions"],
    curriculum: [
      "Phase 1: Product Vision, User Research, and Opportunity Mapping",
      "Phase 2: PRD Writing, Backlog Prioritization, and Agile Delivery",
      "Phase 3: Product Metrics, A/B Testing, and Go-To-Market Strategy"
    ]
  },
  {
    id: "business-development",
    title: "Business Development Training",
    category: "Business & Sales",
    duration: "6 Weeks",
    level: "Beginner",
    rating: 4.6,
    enrolled: "890+",
    weeklyCommitment: "4-6 hours",
    description: "Drive revenue growth through strategic partnerships. Learn prospecting, pipeline management, and deal closure techniques.",
    skills: ["Prospecting", "Pipeline Management", "Deal Closure"],
    curriculum: [
      "Phase 1: Market Research, Ideal Customer Profile, and Lead Generation",
      "Phase 2: Discovery Calls, Value Propositions, and Objection Handling",
      "Phase 3: Partnership Development, Account Planning, and Revenue Forecasting"
    ]
  },
  {
    id: "sales-excellence",
    title: "Sales Excellence Training",
    category: "Business & Sales",
    duration: "6 Weeks",
    level: "Intermediate",
    rating: 4.8,
    enrolled: "950+",
    weeklyCommitment: "4-6 hours",
    description: "Master consultative selling, pipeline optimization, and revenue growth strategies. Build a high-performance sales culture.",
    skills: ["Consultative Selling", "Pipeline Optimization", "Revenue Growth"],
    curriculum: [
      "Phase 1: Sales Methodologies (Challenger, SPIN, MEDDIC)",
      "Phase 2: Pipeline Management, Forecasting, and CRM Optimization",
      "Phase 3: Account Expansion, Upselling, and Sales Team Leadership"
    ]
  },
  {
    id: "crm-training",
    title: "Customer Relationship Management Training",
    category: "Business & Sales",
    duration: "4 Weeks",
    level: "Beginner",
    rating: 4.5,
    enrolled: "1,050+",
    weeklyCommitment: "3-4 hours",
    description: "Leverage CRM platforms to maximize customer lifetime value. Learn Salesforce/HubSpot, pipeline tracking, and customer journey mapping.",
    skills: ["Salesforce/HubSpot", "Pipeline Tracking", "Customer Journey"],
    curriculum: [
      "Phase 1: CRM Fundamentals, Data Hygiene, and Lead Management",
      "Phase 2: Pipeline Configuration, Workflow Automation, and Reporting",
      "Phase 3: Customer Segmentation, Retention Strategies, and NPS Optimization"
    ]
  },
  {
    id: "entrepreneurship-innovation",
    title: "Entrepreneurship & Innovation Training",
    category: "Business & Sales",
    duration: "8 Weeks",
    level: "Intermediate",
    rating: 4.8,
    enrolled: "780+",
    weeklyCommitment: "4-6 hours",
    description: "Transform ideas into viable businesses. Learn lean startup methodology, business modeling, funding strategies, and innovation frameworks.",
    skills: ["Lean Startup", "Business Modeling", "Funding Strategy"],
    curriculum: [
      "Phase 1: Idea Validation, Lean Canvas, and Customer Discovery",
      "Phase 2: MVP Development, Product-Market Fit, and Unit Economics",
      "Phase 3: Pitch Deck Creation, Investor Outreach, and Scaling Operations"
    ]
  },

    // ==========================================
    // MARKETING (3 Programs)
    // Digital, brand, and content marketing strategies.
    // ==========================================
    {
    id: "digital-marketing",
    title: "Digital Marketing Training",
    category: "Marketing",
    duration: "6 Weeks",
    level: "Beginner",
    rating: 4.7,
    enrolled: "1,450+",
    weeklyCommitment: "4-6 hours",
    description: "Master digital channels including SEO, PPC, social media, and email marketing. Learn analytics and conversion optimization.",
    skills: ["SEO/PPC", "Social Media Marketing", "Analytics"],
    curriculum: [
      "Phase 1: Digital Marketing Ecosystem, Buyer Personas, and Funnel Strategy",
      "Phase 2: Search Ads, Social Campaigns, and Email Automation",
      "Phase 3: Analytics (GA4), Conversion Rate Optimization, and ROI Reporting"
    ]
  },
  {
    id: "brand-management",
    title: "Brand Management Training",
    category: "Marketing",
    duration: "6 Weeks",
    level: "Intermediate",
    rating: 4.7,
    enrolled: "750+",
    weeklyCommitment: "4-6 hours",
    description: "Build and protect brand equity. Learn brand positioning, visual identity systems, reputation management, and brand analytics.",
    skills: ["Brand Positioning", "Visual Identity", "Reputation Management"],
    curriculum: [
      "Phase 1: Brand Strategy, Archetypes, and Competitive Positioning",
      "Phase 2: Brand Guidelines, Visual Identity, and Messaging Frameworks",
      "Phase 3: Brand Monitoring, Sentiment Analysis, and Crisis Communication"
    ]
  },
  {
    id: "content-marketing",
    title: "Content Marketing Training",
    category: "Marketing",
    duration: "6 Weeks",
    level: "Beginner",
    rating: 4.6,
    enrolled: "1,100+",
    weeklyCommitment: "4-6 hours",
    description: "Create content that converts. Learn content strategy, SEO writing, storytelling, distribution channels, and performance measurement.",
    skills: ["Content Strategy", "SEO Writing", "Storytelling"],
    curriculum: [
      "Phase 1: Content Audit, Buyer Journey Mapping, and Editorial Calendar",
      "Phase 2: Blog Writing, Video Scripts, and Social Content Creation",
      "Phase 3: Content Distribution, SEO Optimization, and Performance Analytics"
    ]
  },

    // ==========================================
    // FINANCE & RISK (4 Programs)
    // Financial analysis, corporate finance, and risk management.
    // ==========================================
    {
    id: "financial-management",
    title: "Financial Management Training",
    category: "Finance & Risk",
    duration: "6 Weeks",
    level: "Beginner",
    rating: 4.7,
    enrolled: "1,050+",
    weeklyCommitment: "4-6 hours",
    description: "Understand corporate financial principles. Learn budgeting, forecasting, financial reporting, and capital allocation decisions.",
    skills: ["Budgeting", "Forecasting", "Financial Reporting"],
    curriculum: [
      "Phase 1: Financial Statements, Accounting Principles, and Ratio Analysis",
      "Phase 2: Budgeting, Forecasting, and Variance Analysis",
      "Phase 3: Capital Allocation, Working Capital, and Financial Decision-Making"
    ]
  },
  {
    id: "corporate-finance",
    title: "Corporate Finance Training",
    category: "Finance & Risk",
    duration: "8 Weeks",
    level: "Intermediate",
    rating: 4.8,
    enrolled: "780+",
    weeklyCommitment: "4-6 hours",
    description: "Master corporate valuation, capital structure, and investment decisions. Learn M&A analysis and financial strategy.",
    skills: ["Valuation", "Capital Structure", "M&A Analysis"],
    curriculum: [
      "Phase 1: Time Value of Money, DCF Valuation, and Cost of Capital",
      "Phase 2: Capital Structure Decisions, Dividend Policy, and Leverage",
      "Phase 3: M&A Valuation, Synergy Analysis, and Deal Structuring"
    ]
  },
  {
    id: "financial-analysis",
    title: "Financial Analysis Training",
    category: "Finance & Risk",
    duration: "6 Weeks",
    level: "Intermediate",
    rating: 4.8,
    enrolled: "850+",
    weeklyCommitment: "4-6 hours",
    description: "Build advanced financial models. Learn Excel modeling, scenario analysis, valuation techniques, and investment thesis development.",
    skills: ["Excel Modeling", "Scenario Analysis", "Valuation Techniques"],
    curriculum: [
      "Phase 1: Advanced Excel, Financial Modeling Best Practices",
      "Phase 2: Three-Statement Models, DCF, and Comparable Analysis",
      "Phase 3: Scenario Analysis, Sensitivity Tables, and Investment Memos"
    ]
  },
  {
    id: "risk-management",
    title: "Risk Management Training",
    category: "Finance & Risk",
    duration: "6 Weeks",
    level: "Intermediate",
    rating: 4.7,
    enrolled: "720+",
    weeklyCommitment: "4-6 hours",
    description: "Identify, assess, and mitigate business risks. Learn enterprise risk frameworks, compliance, and business continuity planning.",
    skills: ["Risk Assessment", "Compliance", "Business Continuity"],
    curriculum: [
      "Phase 1: Risk Identification, Qualitative and Quantitative Assessment",
      "Phase 2: Enterprise Risk Management (ERM) Frameworks and Controls",
      "Phase 3: Business Continuity Planning, Incident Response, and Risk Reporting"
    ]
  },

    // ==========================================
    // TECHNOLOGY & DIGITAL (8 Programs)
    // Data analytics, AI, cloud, DevOps, and QA.
    // ==========================================
    {
    id: "data-analytics-business",
    title: "Data Analytics for Business Training",
    category: "Technology & Digital",
    duration: "6 Weeks",
    level: "Beginner",
    rating: 4.7,
    enrolled: "1,350+",
    weeklyCommitment: "4-6 hours",
    description: "Turn data into business insights. Learn Excel analytics, SQL queries, data visualization, and basic statistical analysis.",
    skills: ["Excel Analytics", "SQL Queries", "Data Visualization"],
    curriculum: [
      "Phase 1: Data Cleaning, Advanced Excel, and Introduction to SQL",
      "Phase 2: SQL Joins, Subqueries, and Data Aggregation",
      "Phase 3: Dashboard Creation, Data Storytelling, and Business Recommendations"
    ]
  },
  {
    id: "business-intelligence",
    title: "Business Intelligence Training",
    category: "Technology & Digital",
    duration: "6 Weeks",
    level: "Intermediate",
    rating: 4.7,
    enrolled: "920+",
    weeklyCommitment: "4-6 hours",
    description: "Build powerful BI dashboards and reports. Learn Tableau/Power BI, data modeling, and self-service analytics.",
    skills: ["Tableau/Power BI", "Data Modeling", "Self-Service Analytics"],
    curriculum: [
      "Phase 1: Data Modeling Concepts, Star Schema, and ETL Basics",
      "Phase 2: Dashboard Design, Calculated Fields, and Interactive Reports",
      "Phase 3: Embedded Analytics, Governance, and BI Strategy"
    ]
  },
  {
    id: "ai-for-business",
    title: "Artificial Intelligence (AI) for Business Training",
    category: "Technology & Digital",
    duration: "6 Weeks",
    level: "Beginner",
    rating: 4.8,
    enrolled: "1,200+",
    weeklyCommitment: "3-4 hours",
    description: "Understand AI applications in business. Learn machine learning concepts, AI strategy, automation, and ethical AI implementation.",
    skills: ["AI Strategy", "Machine Learning Basics", "AI Ethics"],
    curriculum: [
      "Phase 1: AI/ML Fundamentals, Business Use Cases, and Technology Landscape",
      "Phase 2: AI Strategy Development, Data Requirements, and Vendor Evaluation",
      "Phase 3: AI Implementation, Change Management, and Responsible AI Principles"
    ]
  },
  {
    id: "generative-ai-workplace",
    title: "Generative AI in the Workplace Training",
    category: "Technology & Digital",
    duration: "4 Weeks",
    level: "Beginner",
    rating: 4.8,
    enrolled: "1,580+",
    weeklyCommitment: "3-4 hours",
    description: "Leverage ChatGPT, Copilot, and AI tools for productivity. Learn prompt engineering, workflow automation, and AI governance.",
    skills: ["Prompt Engineering", "AI Productivity Tools", "AI Governance"],
    curriculum: [
      "Phase 1: Generative AI Landscape, ChatGPT/Copilot Mastery, and Prompt Basics",
      "Phase 2: Advanced Prompting, AI Workflows, and Content Generation",
      "Phase 3: AI Governance, Data Privacy, and Building an AI-Ready Culture"
    ]
  },
  {
    id: "cloud-computing",
    title: "Cloud Computing Fundamentals Training",
    category: "Technology & Digital",
    duration: "6 Weeks",
    level: "Beginner",
    rating: 4.6,
    enrolled: "1,050+",
    weeklyCommitment: "4-6 hours",
    description: "Get started with cloud platforms. Learn AWS/Azure/GCP basics, cloud architecture, cost management, and migration strategies.",
    skills: ["AWS/Azure/GCP", "Cloud Architecture", "Cost Management"],
    curriculum: [
      "Phase 1: Cloud Concepts, Service Models (IaaS/PaaS/SaaS), and Provider Overview",
      "Phase 2: Compute, Storage, Networking, and Security Fundamentals",
      "Phase 3: Cloud Migration Planning, Cost Optimization, and Well-Architected Framework"
    ]
  },
  {
    id: "digital-transformation",
    title: "Digital Transformation Training",
    category: "Technology & Digital",
    duration: "6 Weeks",
    level: "Intermediate",
    rating: 4.7,
    enrolled: "880+",
    weeklyCommitment: "4-6 hours",
    description: "Lead digital initiatives. Learn transformation frameworks, technology adoption, process automation, and digital culture building.",
    skills: ["Transformation Frameworks", "Process Automation", "Digital Culture"],
    curriculum: [
      "Phase 1: Digital Maturity Assessment, Vision Setting, and Roadmap Design",
      "Phase 2: Technology Stack Selection, API Strategy, and Integration",
      "Phase 3: Change Management, Digital Skills Development, and Measuring ROI"
    ]
  },
  {
    id: "devops-enterprises",
    title: "DevOps for Enterprises Training",
    category: "Technology & Digital",
    duration: "8 Weeks",
    level: "Intermediate",
    rating: 4.8,
    enrolled: "820+",
    weeklyCommitment: "4-6 hours",
    description: "Implement DevOps at scale. Learn CI/CD pipelines, infrastructure as code, containerization, and site reliability engineering.",
    skills: ["CI/CD Pipelines", "Infrastructure as Code", "Containerization"],
    curriculum: [
      "Phase 1: DevOps Culture, Version Control (Git), and CI/CD Fundamentals",
      "Phase 2: Docker, Kubernetes, and Infrastructure as Code (Terraform)",
      "Phase 3: Monitoring, SRE Practices, and Enterprise DevOps Adoption"
    ]
  },
  {
    id: "software-qa",
    title: "Software Quality Assurance (QA) Training",
    category: "Technology & Digital",
    duration: "6 Weeks",
    level: "Beginner",
    rating: 4.6,
    enrolled: "780+",
    weeklyCommitment: "4-6 hours",
    description: "Ensure software quality. Learn test planning, manual and automated testing, bug tracking, and QA process improvement.",
    skills: ["Test Planning", "Automation Testing", "Bug Tracking"],
    curriculum: [
      "Phase 1: QA Fundamentals, Test Case Design, and Defect Lifecycle",
      "Phase 2: Automation with Selenium/Cypress and API Testing",
      "Phase 3: Performance Testing, Test Strategy, and QA Process Optimization"
    ]
  },

    // ==========================================
    // CYBERSECURITY & COMPLIANCE (6 Programs)
    // Security awareness, information security, and legal compliance.
    // ==========================================
    {
    id: "cybersecurity-awareness",
    title: "Cybersecurity Awareness Training",
    category: "Cybersecurity & Compliance",
    duration: "3 Weeks",
    level: "Beginner",
    rating: 4.6,
    enrolled: "1,850+",
    weeklyCommitment: "2-3 hours",
    description: "Build a security-first mindset. Learn phishing detection, password hygiene, social engineering, and safe browsing practices.",
    skills: ["Phishing Detection", "Password Hygiene", "Social Engineering"],
    curriculum: [
      "Phase 1: Threat Landscape Overview, Common Attack Vectors, and Phishing",
      "Phase 2: Password Security, MFA, and Safe Internet Practices",
      "Phase 3: Data Handling, Incident Reporting, and Security Culture"
    ]
  },
  {
    id: "information-security",
    title: "Information Security Training",
    category: "Cybersecurity & Compliance",
    duration: "6 Weeks",
    level: "Intermediate",
    rating: 4.7,
    enrolled: "920+",
    weeklyCommitment: "4-6 hours",
    description: "Protect organizational data assets. Learn security frameworks, access controls, encryption, and incident response procedures.",
    skills: ["Security Frameworks", "Access Controls", "Encryption"],
    curriculum: [
      "Phase 1: CIA Triad, ISO 27001/NIST Frameworks, and Risk Assessment",
      "Phase 2: Identity and Access Management, Encryption, and Network Security",
      "Phase 3: Incident Response, Forensics Basics, and Security Auditing"
    ]
  },
  {
    id: "data-privacy-compliance",
    title: "Data Privacy & Compliance Training",
    category: "Cybersecurity & Compliance",
    duration: "4 Weeks",
    level: "Intermediate",
    rating: 4.7,
    enrolled: "1,050+",
    weeklyCommitment: "3-4 hours",
    description: "Navigate data protection regulations. Learn GDPR, CCPA, HIPAA compliance, consent management, and privacy by design.",
    skills: ["GDPR/CCPA", "Consent Management", "Privacy by Design"],
    curriculum: [
      "Phase 1: Data Protection Principles, GDPR/CCPA Overview, and Data Mapping",
      "Phase 2: Consent Management, Data Subject Rights, and Breach Notification",
      "Phase 3: Privacy Impact Assessments, Vendor Management, and Compliance Audits"
    ]
  },
  {
    id: "cyber-risk-management",
    title: "Cyber Risk Management Training",
    category: "Cybersecurity & Compliance",
    duration: "6 Weeks",
    level: "Intermediate",
    rating: 4.7,
    enrolled: "680+",
    weeklyCommitment: "4-6 hours",
    description: "Quantify and manage cyber risks. Learn risk assessment methodologies, cyber insurance, third-party risk, and board reporting.",
    skills: ["Cyber Risk Quantification", "Third-Party Risk", "Board Reporting"],
    curriculum: [
      "Phase 1: Cyber Risk Frameworks (NIST CSF, ISO 27005) and Asset Valuation",
      "Phase 2: Threat Modeling, Vulnerability Assessment, and Risk Quantification",
      "Phase 3: Cyber Insurance, Vendor Risk, and Executive Risk Reporting"
    ]
  },
  {
    id: "corporate-law-compliance",
    title: "Corporate Law & Compliance Training",
    category: "Cybersecurity & Compliance",
    duration: "6 Weeks",
    level: "Intermediate",
    rating: 4.7,
    enrolled: "750+",
    weeklyCommitment: "4-6 hours",
    description: "Understand corporate legal obligations. Learn regulatory compliance, corporate governance, anti-corruption, and internal controls.",
    skills: ["Regulatory Compliance", "Corporate Governance", "Anti-Corruption"],
    curriculum: [
      "Phase 1: Corporate Legal Structure, Fiduciary Duties, and Board Governance",
      "Phase 2: Regulatory Frameworks, Anti-Bribery (FCPA/UKBA), and Compliance Programs",
      "Phase 3: Internal Controls, Whistleblower Policies, and Regulatory Filings"
    ]
  },
  {
    id: "legal-risk-management",
    title: "Legal Risk Management Training",
    category: "Cybersecurity & Compliance",
    duration: "4 Weeks",
    level: "Intermediate",
    rating: 4.6,
    enrolled: "620+",
    weeklyCommitment: "3-4 hours",
    description: "Identify and mitigate legal exposures. Learn contract risk, litigation preparedness, IP protection, and regulatory change management.",
    skills: ["Contract Risk", "Litigation Preparedness", "IP Protection"],
    curriculum: [
      "Phase 1: Legal Risk Identification, Contract Review, and Liability Assessment",
      "Phase 2: IP Protection, Trade Secrets, and Non-Compete Agreements",
      "Phase 3: Litigation Preparedness, Regulatory Monitoring, and Risk Mitigation Plans"
    ]
  }
];

import { GraduationCap, Sun, Moon, Heart, ChevronLeft, ChevronRight, ArrowLeft, Clock, Search, BookOpen, Users, Compass, Crown, Target, ClipboardList, Workflow, BrainCircuit, MessageSquare, Volume2, UserCheck, Scale, HeartHandshake, Handshake, Brain, CheckSquare, Timer, Smile, UserPlus, PartyPopper, TrendingUp, Package, Briefcase, DollarSign, Rocket, Megaphone, Tag, FileText, Wallet, PieChart, LineChart, ShieldAlert, Database, Lightbulb, Cpu, Cloud, Zap, Settings, Lock, Key, Shield, AlertTriangle, Gavel, FileSignature, Activity, CheckCircle2, Sparkles, Award } from 'lucide-react';

export const programThemeMap = { 'leadership-development': { icon: Compass, color: '#f97316' }, 'executive-leadership': { icon: Crown, color: '#3b82f6' }, 'strategic-management': { icon: Target, color: '#10b981' }, 'project-management': { icon: ClipboardList, color: '#8b5cf6' }, 'change-management': { icon: Workflow, color: '#ec4899' }, 'decision-making': { icon: BrainCircuit, color: '#d97706' }, 'business-communication': { icon: MessageSquare, color: '#0ea5e9' }, 'professional-communication': { icon: Volume2, color: '#f43f5e' }, 'corporate-etiquette': { icon: UserCheck, color: '#14b8a6' }, 'workplace-ethics': { icon: Scale, color: '#6366f1' }, 'team-building': { icon: Users, color: '#84cc16' }, 'conflict-resolution': { icon: Handshake, color: '#06b6d4' }, 'negotiation-skills': { icon: HeartHandshake, color: '#a855f7' }, 'critical-thinking': { icon: Brain, color: '#be185d' }, 'problem-solving': { icon: CheckSquare, color: '#15803d' }, 'time-management': { icon: Timer, color: '#4338ca' }, 'stress-management': { icon: Activity, color: '#059669' }, 'emotional-intelligence': { icon: Smile, color: '#e11d48' }, 'hr-management': { icon: UserPlus, color: '#2563eb' }, 'talent-acquisition': { icon: Search, color: '#ca8a04' }, 'employee-engagement': { icon: PartyPopper, color: '#db2777' }, 'performance-management': { icon: TrendingUp, color: '#ea580c' }, 'product-management': { icon: Package, color: '#0d9488' }, 'business-development': { icon: Briefcase, color: '#4f46e5' }, 'sales-excellence': { icon: DollarSign, color: '#22c55e' }, 'crm-training': { icon: BookOpen, color: '#7c3aed' }, 'entrepreneurship-innovation': { icon: Rocket, color: '#ef4444' }, 'digital-marketing': { icon: Megaphone, color: '#f97316' }, 'brand-management': { icon: Tag, color: '#ec4899' }, 'content-marketing': { icon: FileText, color: '#0891b2' }, 'financial-management': { icon: Wallet, color: '#0f766e' }, 'corporate-finance': { icon: PieChart, color: '#7c3aed' }, 'financial-analysis': { icon: LineChart, color: '#2563eb' }, 'risk-management': { icon: ShieldAlert, color: '#b91c1c' }, 'data-analytics-business': { icon: Database, color: '#0284c7' }, 'business-intelligence': { icon: Lightbulb, color: '#eab308' }, 'ai-for-business': { icon: Cpu, color: '#6d28d9' }, 'generative-ai-workplace': { icon: Sparkles, color: '#db2777' }, 'cloud-computing': { icon: Cloud, color: '#38bdf8' }, 'digital-transformation': { icon: Zap, color: '#f59e0b' }, 'devops-enterprises': { icon: Settings, color: '#4b5563' }, 'software-qa': { icon: CheckCircle2, color: '#10b981' }, 'cybersecurity-awareness': { icon: Lock, color: '#ef4444' }, 'information-security': { icon: Key, color: '#f97316' }, 'data-privacy-compliance': { icon: Shield, color: '#22c55e' }, 'cyber-risk-management': { icon: AlertTriangle, color: '#ea580c' }, 'corporate-law-compliance': { icon: Gavel, color: '#6366f1' }, 'legal-risk-management': { icon: FileSignature, color: '#0ea5e9' } };

export const CATEGORIES = [ { id: 'All', name: 'All Programs', icon: Compass }, { id: 'Leadership & Management', name: 'Leadership', icon: Award }, { id: 'Communication & Soft Skills', name: 'Communication', icon: MessageSquare }, { id: 'People & HR', name: 'People & HR', icon: Users }, { id: 'Business & Sales', name: 'Business & Sales', icon: TrendingUp }, { id: 'Marketing', name: 'Marketing', icon: Megaphone }, { id: 'Finance & Risk', name: 'Finance & Risk', icon: DollarSign }, { id: 'Technology & Digital', name: 'Technology', icon: Cpu }, { id: 'Cybersecurity & Compliance', name: 'Security & Compliance', icon: Shield } ];

export const constants = { CARDS_PER_PAGE: 12 };

export const labels = { brandName: 'Corporate', brandSub: 'Training', switchLight: 'Switch to Light Mode', switchDark: 'Switch to Dark Mode', knowMore: 'Know More \u2192', clear: 'Clear', allPrograms: 'All Programs', back: 'Back', backToHome: 'Back to Home', backToDashboard: 'Back to Dashboard', madeWith: 'Made with', forLearning: 'for learning' };

export const emptyStateData = { title: 'No Programs Found', description: 'We couldn\'t find any training programs matching your filters or search keywords. Try adjusting your query.', resetBtn: 'Reset Filters' };

export const programDetailNotFoundData = { title: 'Program Not Found', description: 'The program you are looking for does not exist or has been moved.' };

export const programDetailComingSoonData = { subtitle: 'Coming Soon', description: 'We are currently designing the curriculum and scheduling the next cohort for this program. Sign-ups and syllabus information will be made available shortly.' };

export const heroData = { title: 'Corporate Training', subtitle: 'Develop leadership, communication, management, and workplace skills through expert-led corporate training programs.', searchPlaceholder: 'Search programs by name, skills (e.g. React, SQL, GDPR)...' };

export const footerData = { brandTitle: 'Corporate Training', brandDescription: 'Empowering professionals with industry-leading training programs for skill development, leadership growth, and career advancement.', categories: [ { label: 'Leadership & Management', href: '#leadership' }, { label: 'Business & Sales', href: '#business' }, { label: 'Technology & Digital', href: '#technology' }, { label: 'Security & Compliance', href: '#cyber' } ], company: [ { label: 'About Us', href: '#about' }, { label: 'Careers', href: '#careers' }, { label: 'Contact', href: '#contact' } ], socialLinks: [ { label: 'Github', url: 'https://github.com' }, { label: 'LinkedIn', url: 'https://linkedin.com' }, { label: 'Twitter', url: 'https://twitter.com' } ], copyright: `© ${new Date().getFullYear()} Corporate Training. All rights reserved.` };
