import { useState } from 'react';
import './ProgramTabs.css';
import './LightMode.css';

export default function WorkingBBAInteractive() {
  const [selectedElement, setSelectedElement] = useState(null);
  const [activeTab, setActiveTab] = useState('job'); // job | family | venture | periodic
  const [isDarkMode, setIsDarkMode] = useState(true); // true = dark, false = light
  const [audience, setAudience] = useState('parent'); // 'parent' | 'student'
  const [bookingModal, setBookingModal] = useState(null); // null | { section, label }

  const openBooking = (section, label) => setBookingModal({ section, label });
  const closeBooking = () => setBookingModal(null);

  // Brand Colors from LE Guidelines (Strict Scale)
  const brandColors = {
    deepBlue: '#160E44',      // Deepest
    navy2: '#282f6c',
    navy3: '#334c91',
    enterpriseBlue: '#3663AD', // Blue
    blue4: '#3269ae',
    tealBlue: '#1e88b8',
    darkTeal: '#0da3bc',
    brightTeal: '#25BCBD',    // Brightest
    // Highlights
    magenta: '#D946EF',
    yellow: '#FBBF24',
  };

  // Periodic Table Elements Data
  const elements = {
    // Education & Experience - Course (Blue Scale)
    course: {
      name: "COURSE",
      pillar: "education",
      color: "bg-[#3663AD]", // Enterprise Blue
      description: "Structured progression, problem/theme-led learning with no external stakeholder",
      duration: "2-6 weeks",
      size: "medium"
    },

    // Education & Experience - Challenge
    cohortChallenge: {
      name: "COHORT CHALLENGE",
      pillar: "education",
      color: "bg-[#334c91]", // Navy 3
      description: "Entire cohort works on challenge, milestone-based with feedback cycles",
      duration: "1-3 weeks",
      size: "medium"
    },
    teamChallenge: {
      name: "TEAM CHALLENGE",
      pillar: "education",
      color: "bg-[#334c91]",
      description: "Teams work on separate challenge tasks",
      duration: "1-3 weeks",
      size: "medium"
    },
    soloChallenge: {
      name: "SOLO/DUO CHALLENGE",
      pillar: "education",
      color: "bg-[#334c91]",
      description: "Clear goals, weekly check-ins, individual challenge",
      duration: "1-3 weeks",
      size: "medium"
    },

    // Education & Experience - Tracks
    skillTrack: {
      name: "SKILL TRACK",
      pillar: "education",
      color: "bg-[#3269ae]", // Blue 4
      description: "Individual, self-paced, facilitator-supported skill building",
      duration: "2-4 weeks",
      size: "medium"
    },
    teamTrack: {
      name: "TEAM TRACK",
      pillar: "education",
      color: "bg-[#3269ae]",
      description: "Teams work on separate tasks with common timelines",
      duration: "2-4 weeks",
      size: "medium"
    },

    // Education & Experience - Venture (Blue Scale)
    soloVenture: {
      name: "SOLO VENTURE",
      pillar: "experience",
      color: "bg-[#3663AD]", // Enterprise Blue
      description: "Individual launches and runs a real micro-business",
      duration: "Semester",
      size: "long"
    },
    teamVenture: {
      name: "TEAM VENTURE",
      pillar: "experience",
      color: "bg-[#3663AD]",
      description: "Team builds and operates a real business together",
      duration: "Semester",
      size: "long"
    },
    cohortVenture: {
      name: "COHORT VENTURE",
      pillar: "experience",
      color: "bg-[#282f6c]", // Navy 2
      description: "Entire cohort collaborates on a shared venture ecosystem",
      duration: "Semester",
      size: "long"
    },

    // Education & Experience - Client (Blue Scale)
    clientGig: {
      name: "CLIENT GIG",
      pillar: "experience",
      color: "bg-[#3269ae]",
      description: "Student-scoped, part-time work for external client with minimal supervision",
      duration: "2-4 weeks",
      size: "long"
    },
    clientProject: {
      name: "CLIENT PROJECT",
      pillar: "experience",
      color: "bg-[#3269ae]",
      description: "LE-scoped, facilitator-led, full-time team delivery for real client",
      duration: "4-8 weeks",
      size: "long"
    },
    clientHackathon: {
      name: "CLIENT HACKATHON",
      pillar: "experience",
      color: "bg-[#3269ae]",
      description: "1-7 days compressed build for external customer",
      duration: "1-7 days",
      size: "short"
    },

    // Education & Experience - Employer (Deep Scale)
    apprenticeship: {
      name: "APPRENTICE-SHIP",
      pillar: "experience",
      color: "bg-[#160E44]", // Deep Blue
      description: "Clear work description, LE-supported placement inside an organization",
      duration: "4 weeks - 9 months",
      size: "long"
    },
    teamResidency: {
      name: "TEAM RESIDENCY",
      pillar: "experience",
      color: "bg-[#160E44]",
      description: "Group of students with shared manager, shared deliverable, on-site",
      duration: "Semester",
      size: "long"
    },

    // Awareness - Self (Bright Teal #25BCBD)
    conflexion: {
      name: "CONFLEX-ION",
      pillar: "awareness",
      color: "bg-[#25BCBD] text-[#160E44]", // Teal with Dark Text
      description: "Monthly publishing, personal reflection and meaning-making",
      duration: "Monthly",
      size: "ongoing"
    },
    careerBlueprint: {
      name: "CAREER BLUEPRINT",
      pillar: "awareness",
      color: "bg-[#25BCBD] text-[#160E44]",
      description: "Personal and career coaching sessions",
      duration: "Ongoing",
      size: "ongoing"
    },

    // Awareness - Community (Bright Teal)
    mastermind: {
      name: "MASTERMIND",
      pillar: "awareness",
      color: "bg-[#25BCBD] text-[#160E44]",
      description: "Fortnightly/weekly peer-led growth-oriented group sessions",
      duration: "Fortnightly",
      size: "ongoing"
    },
    meetup: {
      name: "MEETUP",
      pillar: "awareness",
      color: "bg-[#25BCBD] text-[#160E44]",
      description: "Guest or industry visit, student-led",
      duration: "As scheduled",
      size: "short"
    },
    storyTell: {
      name: "STORY TELL",
      pillar: "awareness",
      color: "bg-[#25BCBD] text-[#160E44]",
      description: "End of cycle debrief, sense-making, publishing",
      duration: "End of cycle",
      size: "short"
    },

    // Awareness - Events (Bright Teal)
    camp: {
      name: "CAMP",
      pillar: "awareness",
      color: "bg-[#25BCBD] text-[#160E44]",
      description: "Workshop, camp, or travel - immersive experience",
      duration: "1-7 days",
      size: "short"
    },
    regen: {
      name: "REGEN",
      pillar: "awareness",
      color: "bg-[#25BCBD] text-[#160E44]",
      description: "Industry networking event",
      duration: "1-2 days",
      size: "short"
    },
    storysellsWorkshop: {
      name: "STORYSELLS WORKSHOP",
      pillar: "awareness",
      color: "bg-[#25BCBD] text-[#160E44]",
      description: "Engage and connect through storytelling",
      duration: "Half-day",
      size: "short"
    },

    // Evidence - Separate Section (White/Outline)
    dailyCards: {
      name: "DAILY CARDS",
      pillar: "evidence",
      color: "bg-white border-2 border-black text-black",
      description: "Daily reflection cards",
      duration: "Daily",
      size: "medium"
    },
    storyBuild: {
      name: "STORY BUILD",
      pillar: "awareness",
      color: "bg-[#25BCBD] text-[#160E44]", // Teal
      description: "Weekly hygiene, document and organize portfolio artifacts",
      duration: "Weekly",
      size: "medium"
    },
    docs: {
      name: "DOCS",
      pillar: "evidence",
      color: "bg-white border-2 border-black text-black",
      description: "Sheets, docs, presentations, code artifacts",
      duration: "Per deliverable",
      size: "medium"
    },
    assessmentOutputs: {
      name: "ASSESSMENT OUTPUTS",
      pillar: "evidence",
      color: "bg-white border-2 border-black text-black",
      description: "Formal assessment results and evaluation records",
      duration: "Per assessment",
      size: "medium"
    },
    testimonials: {
      name: "TESTIMONIALS",
      pillar: "evidence",
      color: "bg-white border-2 border-black text-black",
      description: "Letters, videos, posts from stakeholders",
      duration: "Per activity",
      size: "medium"
    },
    dataSets: {
      name: "DATA SET",
      pillar: "evidence",
      color: "bg-white border-2 border-black text-black",
      description: "Collected data, research findings, analytics",
      duration: "Per project",
      size: "medium"
    },
    media: {
      name: "MEDIA",
      pillar: "evidence",
      color: "bg-white border-2 border-black text-black",
      description: "Photos, video, audio documentation",
      duration: "Per deliverable",
      size: "medium"
    },

    // Assessments (Deep Blue w/ Magenta Text)
    outcomes: {
      name: "OUTCOMES",
      pillar: "assessment",
      color: "bg-[#160E44] text-[#D946EF]", // Deep Blue + Magenta
      description: "Quarterly assessment based on program outcomes",
      duration: "Quarterly",
      size: "medium"
    },
    engagement: {
      name: "ENGAGEMENT",
      pillar: "assessment",
      color: "bg-[#160E44] text-[#D946EF]",
      description: "Fortnightly rating based on participation",
      duration: "Fortnightly",
      size: "medium"
    },
    progress: {
      name: "PROGRESS",
      pillar: "assessment",
      color: "bg-[#160E44] text-[#D946EF]",
      description: "Fortnightly rating based on publishing",
      duration: "Fortnightly",
      size: "medium"
    },
    selfPeerFacRating: {
      name: "SELF / PEER / FAC RATING",
      pillar: "assessment",
      color: "bg-[#160E44] text-[#D946EF]",
      description: "Rating on a scale of 1 to 5 from self, peers, and facilitator",
      duration: "Per activity",
      size: "medium"
    },
    industryRating: {
      name: "INDUSTRY RATING",
      pillar: "assessment",
      color: "bg-[#160E44] text-[#D946EF]",
      description: "Rating on a scale of 1 to 5 from industry partner",
      duration: "Per placement",
      size: "medium"
    },
    specific: {
      name: "SPECIFIC",
      pillar: "assessment",
      color: "bg-[#160E44] text-[#D946EF]",
      description: "End of activity assessment based on deliverables",
      duration: "Per activity",
      size: "medium"
    },
    quiz: {
      name: "QUIZ",
      pillar: "assessment",
      color: "bg-[#160E44] text-[#D946EF]",
      description: "Closed or open book quizzes for knowledge check",
      duration: "As needed",
      size: "medium"
    },

    // Roles (Deep Blue w/ Yellow Text)
    facilitator: {
      name: "FACILITATOR",
      pillar: "role",
      color: "bg-[#160E44] text-[#FBBF24]", // Deep Blue + Yellow
      description: "Full-time, sets cadence, standards, and calendar",
      duration: "Constant",
      size: "medium"
    },
    developer: {
      name: "DEVELOPER",
      pillar: "role",
      color: "bg-[#160E44] text-[#FBBF24]",
      description: "Develops re-usable experiences, playbooks, assets",
      duration: "Ongoing",
      size: "medium"
    },
    faculty: {
      name: "FACULTY",
      pillar: "role",
      color: "bg-[#160E44] text-[#FBBF24]",
      description: "External, conducts a course or workshop",
      duration: "Per course",
      size: "medium"
    },
    mentor: {
      name: "MENTOR",
      pillar: "role",
      color: "bg-[#160E44] text-[#FBBF24]",
      description: "Hosts a project or venture with domain expertise",
      duration: "Per project",
      size: "medium"
    },
    expert: {
      name: "EXPERT",
      pillar: "role",
      color: "bg-[#160E44] text-[#FBBF24]",
      description: "Supports a project or venture with domain expertise",
      duration: "As needed",
      size: "medium"
    },
    lighthouse: {
      name: "LIGHT-HOUSE",
      pillar: "role",
      color: "bg-[#160E44] text-[#FBBF24]",
      description: "Inspiration and role modeling",
      duration: "Per event",
      size: "medium"
    },
    jury: {
      name: "JURY",
      pillar: "role",
      color: "bg-[#160E44] text-[#FBBF24]",
      description: "Students present or pitch to them for evaluation",
      duration: "Per event",
      size: "medium"
    },

    // Program Specific Outcomes (PSOs)
    pso1: {
      name: "PSO1 PROFESSIONAL READINESS",
      pillar: "pso",
      color: "bg-[#160E44] text-white border-2 border-[#25BCBD]",
      description: "Students will be able to make informed career decisions based on self-awareness, market understanding, and reflective practice. They will present themselves through a strong body of work, communicate professionally with diverse stakeholders, and conduct themselves with responsibility, ethics, and personal leadership in real-world environments.",
      duration: "Outcome",
      size: "pso"
    },
    pso2: {
      name: "PSO2 COMMERCIAL READINESS",
      pillar: "pso",
      color: "bg-[#160E44] text-white border-2 border-[#25BCBD]",
      description: "Students will understand key commercial, financial, and legal aspects of running a business and apply analytical and digital tools to make proposals, perform calculations, and evaluate business decisions. They will be able to negotiate win-win arrangements and contribute meaningfully to sustainable value creation.",
      duration: "Outcome",
      size: "pso"
    },
    pso3: {
      name: "PSO3 ENTREPRENEURIAL READINESS",
      pillar: "pso",
      color: "bg-[#160E44] text-white border-2 border-[#25BCBD]",
      description: "Students will be able to identify opportunities, assess market potential, analyse internal and external factors, and validate ideas through customer research and experimentation. They will make calculated decisions, leverage networks and resources, and take initiative to enter new markets or develop new products and services.",
      duration: "Outcome",
      size: "pso"
    },
    pso4: {
      name: "PSO4 MARKETING READINESS",
      pillar: "pso",
      color: "bg-[#160E44] text-white border-2 border-[#25BCBD]",
      description: "Students will understand markets, customers, and behavioural drivers; conduct qualitative and quantitative research; and use technology-enabled tools to segment, analyse, and interpret data. They will be able to create persuasive marketing collateral, practise storytelling and storyselling, and design communication that supports sales and business development.",
      duration: "Outcome",
      size: "pso"
    },
    pso5: {
      name: "PSO5 INNOVATION READINESS",
      pillar: "pso",
      color: "bg-[#160E44] text-white border-2 border-[#25BCBD]",
      description: "Students will observe deeply, identify opportunities for innovation, and apply design thinking processes to generate ideas, prototype solutions, gather stakeholder feedback, and iterate toward commercially viable outcomes. They will use appropriate technologies and creative tools to strengthen innovation and improve user experience.",
      duration: "Outcome",
      size: "pso"
    },
    pso6: {
      name: "PSO6 OPERATIONS READINESS",
      pillar: "pso",
      color: "bg-[#160E44] text-white border-2 border-[#25BCBD]",
      description: "Students will be able to plan, execute, and monitor projects and routine operations using structured processes, digital tools, and collaborative practices. They will identify opportunities for improving efficiency and effectiveness, document workflows, coordinate teams, and apply systems thinking to enhance organisational performance.",
      duration: "Outcome",
      size: "pso"
    },
  };

  // Get shape/style based on pillar
  const getShapeStyle = (pillar) => {
    switch (pillar) {
      case 'education':
      case 'experience':
      case 'evidence':
        return 'rounded-lg'; // Standard rounded
      case 'awareness':
        return 'rounded-lg'; // Same as education
      case 'assessment':
        return 'rounded-full'; // Pill shape
      case 'role':
        return 'rounded-sm'; // Squared corners
      default:
        return 'rounded-lg';
    }
  };

  // Get width - standardized based on duration
  const getWidthStyle = (size) => {
    switch (size) {
      case 'short':
        return 'w-24'; // 96px - Days/Weeks
      case 'medium':
        return 'w-36'; // 144px - Months
      case 'long':
        return 'w-48'; // 192px - Semester
      case 'ongoing':
        return 'w-40'; // Distinct size for ongoing
      default:
        return 'w-36';
    }
  };

  const ElementBadge = ({ elementKey, showSize = true }) => {
    const element = elements[elementKey];
    if (!element) return null;

    const shapeStyle = getShapeStyle(element.pillar);
    const widthStyle = showSize ? getWidthStyle(element.size) : 'w-auto px-4';

    // Handle outline style text color
    const isOutline = element.color.includes('bg-white');
    const textColor = isOutline ? 'text-black' : 'text-white text-shadow-sm';

    return (
      <button
        onClick={() => setSelectedElement(selectedElement === elementKey ? null : elementKey)}
        className={`
          ${element.color} 
          ${shapeStyle}
          ${widthStyle}
          h-10 py-1
          flex items-center justify-center
          text-[10px] sm:text-xs font-bold ${textColor} leading-tight text-center
          transition-all duration-300 ease-out
          hover:scale-105 hover:shadow-lg hover:brightness-110
          cursor-pointer 
          shadow-md
          ${selectedElement === elementKey ? 'ring-2 ring-[var(--color-highlight-magenta)] ring-offset-2 ring-offset-[#160E44] z-10 scale-110' : ''}
        `}
      >
        {element.name}
      </button>
    );
  };

  // Element Detail Modal
  const ElementModal = () => {
    if (!selectedElement) return null;
    const element = elements[selectedElement];

    const pillarLabels = {
      education: 'EDUCATION',
      experience: 'EXPERIENCE',
      awareness: 'AWARENESS',
      assessment: 'ASSESSMENT',
      role: 'ROLE',
      evidence: 'EVIDENCE',
      pso: 'PROGRAM SPECIFIC OUTCOME'
    };

    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm" onClick={() => setSelectedElement(null)}>
        <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden transform transition-all animate-in fade-in zoom-in duration-200" onClick={e => e.stopPropagation()}>

          {/* Header with Element Color */}
          <div className={`${element.color.includes('bg-[') ? element.color : 'bg-gray-800'} p-6 relative`}>
            <div className="text-white/80 text-xs uppercase tracking-wider font-bold mb-1 opacity-90">{pillarLabels[element.pillar]}</div>
            <h3 className="text-2xl font-bold text-white leading-tight pr-8">{element.name}</h3>
            <button
              onClick={() => setSelectedElement(null)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/20 text-white hover:bg-black/30 transition-colors"
            >
              ×
            </button>
          </div>

          {/* Body with Dark Text */}
          <div className="p-6">
            <p className="text-gray-700 text-lg leading-relaxed mb-6 font-medium">
              {element.description}
            </p>

            <div className="flex items-center gap-3 text-sm border-t border-gray-100 pt-4">
              <span className="text-gray-400 font-semibold uppercase tracking-wide text-xs">DURATION</span>
              <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full font-bold">
                {element.duration}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Pillar indicator component (from 3 pillars image)
  const PillarIndicator = ({ type }) => {
    const styles = {
      education: { bg: 'bg-gradient-to-r from-[#3663AD] to-[#4A7CC9]', label: 'EDUCATION' },
      experience: { bg: 'bg-gradient-to-r from-[#25BCBD] to-[#2E9B9C]', label: 'EXPERIENCE' },
      awareness: { bg: 'bg-gradient-to-r from-[#160E44] to-[#3D2B7A]', label: 'AWARENESS' },
    };
    const style = styles[type];
    return (
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-16 h-3 ${style.bg} rounded-sm`}></div>
        <span className="text-xs font-semibold text-white/80">{style.label}</span>
      </div>
    );
  };

  // RENDER
  return (
    <div className={`pt-scope${isDarkMode ? '' : ' light-mode'}`}>
      <div className="pt-wrap">
        {/* HEADER */}
        <header className="pt-top">
          <div className="pt-brand">
            <div className="pt-logo" aria-label="Let's Enterprise logo">
              <img src="/Let's-Enterprise-Final-Logo_PNG.png" alt="Let's Enterprise" style={{ height: '62px', width: 'auto', filter: 'none' }} />
            </div>
          </div>

          {/* Top-right controls row */}
          <div className="pt-topControls">
            {/* Audience Toggle */}
            <div className="pt-audienceToggle" role="radiogroup" aria-label="Audience selector">
              <button
                className={`pt-audBtn${audience === 'parent' ? ' active' : ''}`}
                onClick={() => setAudience('parent')}
                aria-pressed={audience === 'parent'}
              >
                👨‍👩‍👧 For Parents
              </button>
              <button
                className={`pt-audBtn${audience === 'student' ? ' active' : ''}`}
                onClick={() => setAudience('student')}
                aria-pressed={audience === 'student'}
              >
                🎓 For Students
              </button>
            </div>

            {/* Theme Toggle Button */}
            <button
              className="pt-theme-toggle"
              onClick={() => setIsDarkMode(!isDarkMode)}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </div>

          <div>
            <h1 className="pt-headline">India’s First Working BBA</h1>
            <div className="pt-sub"><strong>Work is the Curriculum.</strong> A 3-year business program where students learn by working—faster than any traditional BBA.</div>
            <div className="pt-chips" aria-label="Program pillars">
              <span className="pt-chip"><span className="pt-dot"></span> Learn by working</span>
              <span className="pt-chip"><span className="pt-dot" style={{ background: 'var(--c4)', boxShadow: '0 0 0 3px rgba(30,136,184,.18)' }}></span> Real apprenticeships</span>
              <span className="pt-chip"><span className="pt-dot" style={{ background: 'rgba(255,255,255,.60)', boxShadow: '0 0 0 3px rgba(255,255,255,.12)' }}></span> Portfolio + feedback + references</span>
            </div>
            {/* IMG_1: Main Header Tab */}
            <div className="mt-8 mb-4">
              <img src="/IMG_1.png" alt="Program Outcomes Header" className="w-full rounded-xl shadow-lg" />
            </div>
          </div>

          {/* NAV */}
          <nav className="pt-tabs" aria-label="Page tabs">
            <button
              className="pt-tabBtn"
              data-active={activeTab === 'job'}
              onClick={() => setActiveTab('job')}
            >
              Working BBA — Entrepreneurial Jobs
            </button>
            <button
              className="pt-tabBtn"
              data-active={activeTab === 'family'}
              onClick={() => setActiveTab('family')}
            >
              Working BBA — Business Families
            </button>
            <button
              className="pt-tabBtn"
              data-active={activeTab === 'venture'}
              onClick={() => setActiveTab('venture')}
            >
              Working BBA — Venture Starters
            </button>
            <button
              className="pt-tabBtn"
              data-active={activeTab === 'periodic'}
              onClick={() => setActiveTab('periodic')}
            >
              How It Works
            </button>
          </nav>
        </header>

        {/* MAIN CONTENT */}
        <main className="pt-section">
          {activeTab === 'job' && <ProgramView programKey="original" audience={audience} onCTA={openBooking} />}
          {activeTab === 'family' && <ProgramView programKey="bf" audience={audience} onCTA={openBooking} />}
          {activeTab === 'venture' && <ProgramView programKey="solo" audience={audience} onCTA={openBooking} />}

          {/* TAB 3: PERIODIC TABLE (Existing Integration) */}
          {activeTab === 'periodic' && (
            <div className="space-y-6">

              {/* HOW IT WORKS — CAPABILITY CARDS */}
              <div className="pt-osExplainer mb-6">
                <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 6 }}>How It Works</h2>
                <p className="text-white/90 text-lg leading-relaxed max-w-4xl">
                  One integrated system that tracks and connects every part of your child's education and work experience—complete transparency, zero gaps.
                </p>
              </div>

              {/* 6 Capability Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
                {[
                  { icon: '🔧', title: 'Work Discipline', desc: 'Students build adult habits: punctuality, follow-through, hygiene, and weekly delivery. Not vibes. Not motivation. Output.' },
                  { icon: '🗣️', title: 'Communication Under Pressure', desc: 'Updates, follow-ups, presentations, stakeholder calls—done repeatedly. They learn to speak clearly even when nervous.' },
                  { icon: '📊', title: 'Real Business Execution', desc: 'Sales, operations, research, basic finance thinking, and structured problem-solving—done through challenges and real projects.' },
                  { icon: '📁', title: 'Proof-Based Portfolio', desc: 'Everything is documented: docs, media, testimonials, feedback scores, and project outcomes. Proof beats potential.' },
                  { icon: '🔄', title: 'Feedback Loops (Not Exams)', desc: 'Assessment happens through supervisors, clients, peers, facilitators—and real deliverables. They improve by being evaluated, not by cramming.' },
                  { icon: '🧭', title: 'Career Clarity Through Work', desc: 'Students don\u2019t \u201cchoose\u201d blindly. They experience roles, environments, and expectations—then decide with evidence.' }
                ].map((card, i) => (
                  <div key={i} style={{
                    background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)',
                    borderRadius: 12, padding: 20, transition: 'all .2s ease'
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,.08)'; e.currentTarget.style.borderColor = 'rgba(37,188,189,.25)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.08)'; }}
                  >
                    <div style={{ fontSize: 28, marginBottom: 8 }}>{card.icon}</div>
                    <h4 style={{ fontSize: 15, fontWeight: 800, color: 'rgba(255,255,255,.95)', marginBottom: 6 }}>{card.title}</h4>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,.70)', lineHeight: 1.5, margin: 0 }}>{card.desc}</p>
                  </div>
                ))}
              </div>

              {/* Typical Week Schedule */}
              <div style={{
                background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)',
                borderRadius: 12, padding: 20, marginTop: 16
              }}>
                <h4 style={{ fontSize: 15, fontWeight: 800, color: 'rgba(255,255,255,.95)', marginBottom: 10 }}>📅 Typical Week</h4>
                <p style={{ fontSize: 14, color: '#25BCBD', fontWeight: 700, marginBottom: 4 }}>Monday to Friday: 10:00 AM – 5:00 PM</p>
                <p style={{ fontSize: 14, color: '#25BCBD', fontWeight: 700, marginBottom: 12 }}>Saturday: 10:00 AM – 1:00 PM (student presentations + reviews)</p>
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  <li style={{ fontSize: 13, color: 'rgba(255,255,255,.75)', marginBottom: 4 }}>A structured weekly rhythm</li>
                  <li style={{ fontSize: 13, color: 'rgba(255,255,255,.75)', marginBottom: 4 }}>Regular presentations and feedback loops</li>
                  <li style={{ fontSize: 13, color: 'rgba(255,255,255,.75)', marginBottom: 0 }}>A culture of showing work, not just talking about it</li>
                </ul>
              </div>

              {/* Comparison Table */}
              <div style={{
                background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)',
                borderRadius: 12, overflow: 'hidden', marginTop: 16
              }}>
                <h4 style={{ padding: '14px 20px 10px', margin: 0, fontSize: 15, fontWeight: 800, color: 'rgba(255,255,255,.95)', letterSpacing: '.5px', textTransform: 'uppercase' }}>Working BBA vs Typical BBA</h4>
                <div>
                  {[
                    { feature: 'Curriculum', le: 'Work + challenges + projects', typical: 'Mostly classroom theory' },
                    { feature: 'Proof', le: 'Portfolio + feedback + references', typical: 'Marksheets + exams' },
                    { feature: 'Accountability', le: 'Deadlines + reviews + delivery', typical: 'Attendance + exams' },
                    { feature: 'Skill-building', le: 'Repetition under real pressure', typical: 'Limited real output cycles' },
                    { feature: 'Parent visibility', le: 'Ongoing evidence + progress signals', typical: 'Syllabus + grades' },
                    { feature: 'Outcome', le: 'Work-ready capability', typical: 'Degree + uncertain readiness' }
                  ].map((row, i) => (
                    <div key={i} style={{
                      display: 'grid', gridTemplateColumns: '1fr 1.5fr 1.5fr',
                      borderTop: '1px solid rgba(255,255,255,.06)'
                    }}>
                      <div style={{ padding: '10px 16px', fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,.85)' }}>{row.feature}</div>
                      <div style={{ padding: '10px 16px', fontSize: 13, fontWeight: 600, color: 'rgba(37,188,189,.95)', borderLeft: '1px solid rgba(255,255,255,.06)' }}>{row.le}</div>
                      <div style={{ padding: '10px 16px', fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,.45)', borderLeft: '1px solid rgba(255,255,255,.06)' }}>{row.typical}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Proof Quotes */}
              <div style={{
                background: 'rgba(37,188,189,.06)', border: '1px solid rgba(37,188,189,.12)',
                borderRadius: 12, padding: 20, marginTop: 16
              }}>
                <h4 style={{ fontSize: 14, fontWeight: 800, color: '#25BCBD', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '.5px' }}>What students say</h4>
                {[
                  { year: 'Y2', quote: '\u201cI used to wait for instructions. Now I just start.\u201d' },
                  { year: 'Y2', quote: '\u201cIt\u2019s not easy. But it feels real.\u201d' },
                  { year: 'Y3', quote: '\u201cDeadlines changed me. I don\u2019t like it\u2026 but I needed it.\u201d' },
                  { year: 'Y3', quote: '\u201cI still get nervous. I just do it anyway.\u201d' },
                  { year: 'Y2/Y3', quote: '\u201cMy parents stopped asking \u2018what are you studying?\u2019 Now they ask \u2018what did you build this week?\u2019\u201d' }
                ].map((sp, i) => (
                  <div key={i} style={{ marginBottom: i < 4 ? 10 : 0, paddingLeft: 12, borderLeft: '3px solid rgba(37,188,189,.30)' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(37,188,189,.70)', marginRight: 8 }}>{sp.year}</span>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,.80)', fontWeight: 500, fontStyle: 'italic' }}>{sp.quote}</span>
                  </div>
                ))}
              </div>

              <div className="pt-ctaBlock">
                <button className="pt-ctaBtn" onClick={() => openBooking('howItWorks', ctaCopy.howItWorks[audience])}>{ctaCopy.howItWorks[audience]} →</button>
              </div>









            </div>
          )}
        </main>

        {/* PERSISTENT FOOTER BANNER */}
        <div className="pt-footerBanner">
          <p>Students graduate with a <strong>portfolio, references, and real work experience</strong> — not just a marksheet.</p>
        </div>
      </div>

      {/* Element Detail Modal */}
      <ElementModal />

      {/* ===================== BOOKING MODAL ===================== */}
      {bookingModal && (() => {
        const contextDescriptions = {
          howItWorks: 'You were exploring how the program works — let\u2019s walk you through it live.',
          challenges: 'The 9 Challenges caught your eye — let\u2019s talk about what Year 1 looks like.',
          portfolio: 'You\u2019re curious about the proof students graduate with — great place to start.',
          final: 'You\u2019ve seen enough — let\u2019s find out if this is the right fit.'
        };
        const contextLine = contextDescriptions[bookingModal.section] || 'Let\u2019s connect and answer any questions you have.';

        return (
          <div className="bk-overlay" onClick={closeBooking}>
            <div className="bk-modal" onClick={e => e.stopPropagation()}>
              <button className="bk-close" onClick={closeBooking}>&times;</button>

              <div className="bk-header">
                <h3>Book a Call</h3>
                <p className="bk-context">{contextLine}</p>
              </div>

              <div className="bk-zoho">
                <iframe
                  src="https://letsenterprise.zohobookings.com/portal-embed#/Admissionhelp"
                  title="Book a Call — Zoho Bookings"
                  frameBorder="0"
                  allowFullScreen
                  style={{ width: '100%', height: 520, border: 'none', borderRadius: 8 }}
                />
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                               HELPER COMPONENTS                            */
/* -------------------------------------------------------------------------- */
// CTA destination (placeholder — replace with real URL)
const CTA_URL = '#';

// 9 Challenges for Year 1
const year1Challenges = [
  { num: '01', name: 'Kickstart', sub: 'Start like an adult.', desc: 'Students enter the work rhythm: hygiene, communication, cadence, and delivery standards.' },
  { num: '02', name: 'Product Design', sub: 'Build things people want.', desc: 'User needs, prototyping, iteration—students learn to design solutions that solve real problems.' },
  { num: '03', name: 'Design Thinking', sub: 'Think like a problem solver.', desc: 'Empathy, ideation, testing—structured frameworks for tackling ambiguous challenges.' },
  { num: '04', name: 'Digital Marketing', sub: 'Get attention. Drive action.', desc: 'Campaigns, content, analytics—students learn to reach audiences and measure what works.' },
  { num: '05', name: 'Business Analysis', sub: 'Turn data into decisions.', desc: 'Requirements, process mapping, stakeholder alignment—how to analyze and recommend solutions.' },
  { num: '06', name: 'Sales & Outreach', sub: 'Rejection is training.', desc: 'Pitching, follow-ups, closing—confidence is built through repetition and real conversations.' },
  { num: '07', name: 'User Research', sub: 'Learn to see the market.', desc: 'Interviews, insights, patterns—then turn research into decisions and actions.' },
  { num: '08', name: 'Accounting & Financial Analysis', sub: 'Become numerate enough to be trusted.', desc: 'P&L, cash flow, margins, decision math—applied financial thinking, not theory.' },
  { num: '09', name: 'Spreadsheets', sub: 'Master the tool of business.', desc: 'Formulas, data modeling, dashboards—students build fluency in the language of work.' }
];

// CTA copy per section × audience
const ctaCopy = {
  hero: { parent: 'See if your child is a fit', student: 'See if you\u2019re built for this' },
  bestFor: { parent: 'Check fit checklist', student: 'Pick your track' },
  howItWorks: { parent: 'Get the full program structure', student: 'See the weekly rhythm' },
  yearJourney: { parent: 'View Year 1\u20133 roadmap', student: 'See what you\u2019ll do each year' },
  challenges: { parent: 'Explore the 9 challenges', student: 'See what you\u2019ll build' },
  portfolio: { parent: 'See proof-based portfolio', student: 'See what you\u2019ll graduate with' },
  tracking: { parent: 'Understand how progress is measured', student: 'See how you\u2019ll be evaluated' },
  final: { parent: 'Book a parent call', student: 'Book a student call' }
};

// Portfolio images + captions
const portfolioItems = [
  { src: '/portfolio-messy-desk-evidence.png', caption: 'This is what a year of real work looks like. Every item is earned, not assigned.', hero: true },
  { src: '/portfolio-client-pitch-room.png', caption: 'Client Project \u2014 presenting a live marketing strategy to company leadership. Week 4 of a real engagement.' },
  { src: '/portfolio-whiteboard-brainstorm.png.png', caption: 'The thinking behind the work \u2014 a business model canvas built during the Kickstart challenge.' },
  { src: '/portfolio-reference-letter-desk.png', caption: 'The letter you take home \u2014 a real reference from the manager who supervised 9 weeks of real work.' },
  { src: '/portfolio-daily-cards-stack.png', caption: '200+ daily reflection cards. The habit that turns experience into learning.' },
  { src: '/portfolio-storysells-stage.png', caption: 'Telling your story to a room \u2014 the professional storytelling presentation every student delivers.' },
  { src: '/portfolio-jury-saturday.png', caption: 'Saturday jury review \u2014 presenting real project work to industry professionals who score and challenge you.' },
  { src: '/portfolio-apprenticeship-workspace.png', caption: '9 weeks inside a real company. Not visiting. Not observing. Working.', hero: true },
  { src: '/portfolio-client-project-urbanbrew.png', caption: 'Real deliverable \u2014 a marketing campaign execution for Urban Brew, driving actual footfall and sales.' }
];

// Program data for Year 2 & 3 specifics
const programData = {
  original: {
    name: 'Entrepreneurial Job',
    images: {
      y1: { src: portfolioItems[2].src, caption: portfolioItems[2].caption },
      y2: { src: portfolioItems[1].src, caption: portfolioItems[1].caption },
      y3: { src: portfolioItems[7].src, caption: portfolioItems[7].caption }
    },
    // Fear-first hero
    fearHero: {
      parent: {
        title: 'Your child will graduate with a degree.',
        sub: 'But without real work pressure, they still won\u2019t be \u201cwork-ready.\u201d This program forces deadlines, manager feedback, and real delivery\u2014before graduation.'
      },
      student: {
        title: 'If you\u2019re scared you won\u2019t survive a real job\u2026 good.',
        sub: 'You\u2019ll build work confidence the only way it\u2019s built: doing real work under real deadlines.'
      }
    },
    // Myth vs Reality
    mythReality: {
      pairs: [
        { myth: '\u201cA BBA makes you job-ready.\u201d', reality: 'Job readiness comes from deadlines, managers, and delivery.' },
        { myth: '\u201cConfidence comes from knowledge.\u201d', reality: 'Confidence comes from shipping work and being evaluated.' },
        { myth: '\u201cInternships are enough.\u201d', reality: 'Apprenticeships + client projects build real reliability and proof.' },
        { myth: '\u201cMarks show capability.\u201d', reality: 'Portfolio + feedback + references show capability.' }
      ]
    },
    // Hero section
    heroTitle: 'Build Work Confidence in Growth Companies',
    heroSub: 'Get ready to work in fast growing companies, close to decision makers. Real deadlines. Real managers. Real feedback.',
    mechanism: {
      title: 'How confidence is built here:',
      items: [
        'Weekly presentations to Industry Professionals',
        'Facing project deadline pressure',
        'Quarterly performance feedback'
      ]
    },
    // Best for section
    whoFor: 'Students who want fast-track real work and entrepreneurial jobs.',
    // Parent clarity
    whatTheyDo: {
      title: 'What your child will do (in simple terms):',
      items: [
        'Manage realprojects for 4 - 5 company clients',
        'Create marketing campaigns that bring in actual customers',
        'Build systems that are used daily'
      ]
    },
    accountability: {
      title: 'How we ensure they work:',
      items: [
        'Industry mentors review their project work weekly (not just teachers)',
        'Client feedback determines their project assessment',
        'Missing deadlines 3 times = immediate parent communication'
      ]
    },
    // Year 1 summary
    year1Summary: 'Your child becomes a reliable project manager who founders and decision makers depend on.',
    year1Parts: [
      { name: 'Foundation (4 months)', desc: 'Learn to manage one project with daily supervision' },
      { name: 'Application (4 months)', desc: 'Manage 2-3 projects with weekly supervision' },
      { name: 'Leadership (4 months)', desc: 'Working in teams while managing full project load' }
    ],
    // Year 1 content
    year1Content: {
      whatTheyDo: [
        'Manage client projects for 2-3 growing companies',
        'Handle marketing campaigns with real budget responsibility',
        'Coordinate teams of 5–8 employees across departments to deliver project outcomes',
      ],
      whatTheySubmit: [
        'Weekly project status reports to company managers',
        'Monthly budget tracking with spending explanations',
        'End-of-project client feedback and outcome data',
      ],
      feedback: [
        'Company managers rate their reliability and communication',
        'Clients score their project delivery and problem-solving',
        'Peers evaluate their collaboration and leadership',
      ],
    },
    // Progress review
    progressReview: 'Every 6 months, students and parents receive a detailed review. This includes client feedback scores, project outcomes, and areas for improvement. Students who don\'t meet work standards receive additional supervision or program adjustments.',
    // Year 2 content
    year2Content: {
      workplace: [
        'Do 2 mentored apprenticeships of 2 months each',
        'Lead marketing projects that generate actual customer leads',
        'Work on 3-',
        'Present project results to company leadership teams'
      ],
      clientDelivery: [
        'Deliver projects that companies continue using after program ends',
        'Handle customer service for 100+ company clients',
        'Train company employees on systems they\'ve built'
      ],
      feedback: [
        'Monthly performance reviews using company HR standards',
        'Quarterly goal-setting with department heads',
        'Annual review process identical to company employees'
      ]
    },
    // Year 3 content
    year3Content: {
      intro: 'Students graduate with work experience equivalent to 2+ years in business operations. Partner companies provide reference letters. Portfolio includes measurable business results.',
      portfolio: [
        'Recommendation letters from 3+ company managers',
        'Project portfolio with client feedback scores',
        'Documented business results (cost savings, revenue growth, efficiency improvements)'
      ],
      placements: [
        'Targeted placement in business operations, project management, and marketing roles at growth-stage companies.',
        'Project management positions in partner companies',
        'Marketing coordinator roles with growth potential'
      ]
    },
    // Legacy fields for compatibility
    promise: 'More industries. Stronger references.',
    outcome: 'Ready for roles where output and proof matter more than pedigree.',
    y1: [
      { t: 'Immersion', h: 'Self-Awareness Camp + Rural Project', d: '3-day workshop + 7-day rural immersion' },
      { t: 'Coaching', h: 'Career Blueprint ×4', d: 'Skills mapping & goal setting' },
      { t: 'Network', h: 'Regen Networking Week', d: 'Connecting with industry professionals' },
      { t: 'Skills', h: 'StorySells 1', d: 'Portfolio refinement & LinkedIn branding' },
      { t: 'Employer', h: 'Mentored Apprenticeship (1)', d: 'Industry immersion + workplace dynamics' },
      { t: 'Client', h: 'Client Project ×1', d: 'Learn sales, outreach and marketing' }
    ],
    y2: [
      { t: 'Immersion', h: 'Solo Travel Project', d: '1-week independent service project' },
      { t: 'Coaching', h: 'StorySells 2', d: 'Personal branding & narrative building' },
      { t: 'Skills', h: 'Advanced Challenges', d: 'Data analysis, automation & prototyping' },
      { t: 'Employer', h: 'Outstation Apprenticeship', d: '9 weeks in a new city with broader exposure' },
      { t: 'Employer', h: 'Mentored Apprenticeship (2)', d: 'Deeper industry immersion (Common Core)' },
      { t: 'Client', h: 'Client Project ×2', d: 'Proposal making, deal negotiation, systems' }
    ],
    y3: [
      { t: 'Client', h: 'Client Multi-domain Project', d: 'Integrated marketing, data & legal outcome' },
      { t: 'Skills', h: 'Final Challenges', d: 'Business ethics, governance & legal aspects' },
      { t: 'Coaching', h: 'StorySells 3', d: 'Purpose, values & transition planning' },
      { t: 'Employer', h: '9-Month Capstone Role', d: 'Full-time role: output + references' }
    ]
  },
  bf: {
    name: 'Business Family',
    images: {
      y1: { src: portfolioItems[4].src, caption: portfolioItems[4].caption },
      y2: { src: portfolioItems[6].src, caption: portfolioItems[6].caption },
      y3: { src: portfolioItems[3].src, caption: portfolioItems[3].caption }
    },
    // Fear-first hero
    fearHero: {
      parent: {
        title: 'A family business doesn\u2019t need \u201cideas.\u201d It needs reliability.',
        sub: 'This program trains your child to show up, follow through, communicate professionally, and earn responsibility.'
      },
      student: {
        title: 'If you want respect inside your own family business, you need proof\u2014not excuses.',
        sub: 'You\u2019ll build trust by delivering, communicating, and handling responsibility like an adult.'
      }
    },
    // Myth vs Reality
    mythReality: {
      pairs: [
        { myth: '\u201cThey\u2019ll learn inside our business.\u201d', reality: 'Without baseline maturity, they become a burden, not an asset.' },
        { myth: '\u201cThey\u2019ll become responsible over time.\u201d', reality: 'Responsibility is trained through commitments, follow-through, and feedback loops.' },
        { myth: '\u201cBusiness needs \u201cbig ideas\u201d from youth.\u201d', reality: 'Business first needs discipline: punctuality, communication, ownership, decision logic.' },
        { myth: '\u201cWe just need them to join.\u201d', reality: 'You need them to be handover-ready: trusted, consistent, and professional.' }
      ]
    },
    // Hero section
    heroTitle: 'Build Business Reliability and Leadership',
    heroSub: 'For students who will manage established businesses. Focus on responsibility, not ventures.',
    mechanism: {
      title: 'What your child becomes by Year 3:',
      items: [
        'Someone who can manage teams and processes reliably',
        'Someone who communicates professionally with all business stakeholders',
        'Someone ready to take on significant business responsibility'
      ]
    },
    // Best for section
    whoFor: 'Families 100% clear: the child joins the family business after graduation.',
    // Parent clarity - maturity development
    whatTheyDo: {
      title: 'What changes in your child:',
      items: [
        'Responsibility: They follow through on commitments without reminders',
        'Communication: They speak confidently with customers, suppliers, and employees',
        'Decision-making: They analyze situations and make sound business choices'
      ]
    },
    accountability: {
      title: 'What changes in how they show up at work:',
      items: [
        'Punctuality: They arrive on time and manage deadlines consistently',
        'Ownership: They take responsibility for problems and find solutions',
        'Follow-through: They complete tasks fully and communicate progress'
      ]
    },
    // Family business connection
    familyConnection: {
      title: 'How this connects to your family business:',
      items: [
        'Process improvement: They learn to make existing operations more efficient',
        'Team management: They practice leading long-term employees respectfully',
        'Strategic thinking: They develop skills to grow established customer relationships'
      ],
      note: 'This is preparation and capability building, not immediate business takeover. They graduate ready to contribute meaningfully while learning your specific business.'
    },
    // Year 1 summary
    year1Summary: 'Your child builds foundational work habits and learns professional reliability through structured project work.',
    year1Parts: [
      { name: 'Foundation (4 months)', desc: 'Learn professional work habits with daily guidance' },
      { name: 'Application (4 months)', desc: 'Apply skills to team projects with increasing responsibility' },
      { name: 'Leadership (4 months)', desc: 'Begin coordinating others while maintaining personal standards' }
    ],
    // Year 1 content (same structure, different focus)
    year1Content: {
      whatTheyDo: [
        'Work on team projects that require consistent daily effort',
        'Communicate progress updates to supervisors and team members',
        'Meet deadlines and handle accountability for results'
      ],
      whatTheySubmit: [
        'Weekly progress reports demonstrating consistent work',
        'Team collaboration feedback and self-assessments',
        'Project deliverables reviewed by industry professionals'
      ],
      feedback: [
        'Supervisors assess reliability, punctuality, and follow-through',
        'Team members evaluate collaboration and communication',
        'Self-reflection on growth areas and improvement plans'
      ]
    },
    // Progress review
    progressReview: 'Every 6 months, parents receive a detailed maturity assessment. This includes work habit scores, communication evaluations, and readiness indicators for business responsibility.',
    // Year 2 content - family business application
    year2Content: {
      workplace: [
        'Process documentation: They can map and improve your current workflows',
        'Customer relationships: They can handle customer communication professionally',
        'Team coordination: They can manage projects across different departments'
      ],
      clientDelivery: [
        'Basic execution: They can implement improvements without disrupting operations',
        'Problem-solving: They can identify issues and propose practical solutions',
        'Stakeholder management: They can work with suppliers, customers, and employees'
      ],
      feedback: [
        'Monthly reliability assessments from work supervisors',
        'Quarterly communication and leadership evaluations',
        'Semester reviews measuring business readiness progression'
      ]
    },
    // Year 3 content - handover readiness
    year3Content: {
      intro: 'A "handover-ready" student can manage business processes without constant supervision, handle difficult conversations, make decisions considering long-term relationships, and document systems for others to follow.',
      portfolio: [
        'Portfolio artifacts: Process improvements they\'ve implemented in real businesses',
        'Management feedback: Reviews from business owners who supervised their work',
        'Reliability record: Track record of meeting deadlines and handling responsibility',
        'Team testimonials: Feedback from employees they\'ve worked with and managed'
      ],
      placements: [
        'Ready to join family business with meaningful contribution capability',
        'Able to manage a department or project independently',
        'Prepared for gradual responsibility increase over 2-3 years'
      ]
    },
    // Legacy fields for compatibility
    promise: 'Succession readiness + family alignment.',
    outcome: 'Ready to take responsibility inside the family business—with alignment and proof.',
    y1: [
      { t: 'Immersion', h: 'Self-Awareness Camp + Rural Project', d: '3-day workshop + 7-day rural immersion' },
      { t: 'Coaching', h: 'Career Blueprint ×4', d: 'Skills mapping & goal setting' },
      { t: 'Network', h: 'Regen Networking Week', d: 'Connecting with industry professionals' },
      { t: 'Skills', h: 'StorySells 1', d: 'Portfolio refinement & LinkedIn branding' },
      { t: 'Employer', h: 'Mentored Apprenticeship (1)', d: 'Industry immersion + workplace dynamics' },
      { t: 'Client', h: 'Client Project ×1', d: 'Learn sales, outreach and marketing' }
    ],
    y2: [
      { t: 'Immersion', h: 'Solo Travel Project', d: '1-week independent service project' },
      { t: 'Coaching', h: 'StorySells 2', d: 'Personal branding & narrative building' },
      { t: 'Skills', h: 'Advanced Challenges', d: 'Data analysis, automation & prototyping' },
      { t: 'Employer', h: 'Family Business Project', d: '2 months inside another family business' },
      { t: 'Coaching', h: 'Family Coaching ×2', d: 'Alignment + expectations' },
      { t: 'Employer', h: 'Mentored Apprenticeship (2)', d: 'Deeper industry immersion (Common Core)' },
      { t: 'Client', h: 'Client Project ×2', d: 'Proposal making, deal negotiation, systems' }
    ],
    y3: [
      { t: 'Client', h: 'Client Multi-domain Project', d: 'Integrated marketing, data & legal outcome' },
      { t: 'Skills', h: 'Final Challenges', d: 'Business ethics, governance & legal aspects' },
      { t: 'Coaching', h: 'StorySells 3', d: 'Purpose, values & transition planning' },
      { t: 'Capstone', h: '9-month Family Business Project', d: 'Real KPI + ownership inside family biz' }
    ]
  },
  solo: {
    name: 'Venture Starters',
    images: {
      y1: { src: portfolioItems[0].src, caption: portfolioItems[0].caption },
      y2: { src: portfolioItems[5].src, caption: portfolioItems[5].caption },
      y3: { src: portfolioItems[8].src, caption: "Building a venture requires an ecosystem." }
    },
    // Fear-first hero
    fearHero: {
      parent: {
        title: 'Most \u201cstartup kids\u201d love ideas and hate execution.',
        sub: 'That becomes expensive. This program builds a disciplined founder: customers, deadlines, systems, repeatability.'
      },
      student: {
        title: 'If you want to start a venture, you don\u2019t need motivation. You need output.',
        sub: 'Here, you ship every week\u2014customers, feedback, and uncomfortable truth included.'
      }
    },
    // Hero section
    heroTitle: 'Build Your Own Business Through Disciplined Execution',
    heroSub: 'This is for students ready for execution. Not for idea dreamers.',
    mechanism: {
      title: 'What makes ventures disciplined here:',
      items: [
        'Customer work: Every week requires direct customer interaction and feedback',
        'Weekly shipping: Students must deliver something measurable every 7 days',
        'Feedback loops: Monthly reviews with business owners who\'ve built successful companies'
      ]
    },
    // Best for section
    whoFor: 'Families clear and supportive: the child builds their own venture by graduation.',
    // Execution requirements
    whatTheyDo: {
      title: 'What they must do weekly:',
      items: [
        'Talk to 5+ potential customers about their business idea',
        'Ship one improvement or test one business assumption',
        'Document lessons learned and share with supervisor group'
      ]
    },
    accountability: {
      title: 'What happens if they don\'t execute:',
      items: [
        'Weekly check-ins flag missing deliverables immediately',
        'Supervisors provide additional structure and supervision',
        'Continued non-performance results in program adjustment'
      ]
    },
    // Myth vs Reality
    mythReality: {
      pairs: [
        { myth: '\u201cBusiness building = freedom.\u201d', reality: 'Customer deadlines are harder than employee deadlines.' },
        { myth: '\u201cBe your own boss.\u201d', reality: 'Customers and investors are demanding bosses.' },
        { myth: '\u201cFocus on big ideas.\u201d', reality: 'Success requires executing hundreds of small details.' }
      ]
    },
    // Year 1 summary
    year1Summary: 'Your child learns that real business building means talking to customers, testing ideas, and shipping work every single week.',
    year1Parts: [
      { name: 'Foundation (4 months)', desc: 'Learn customer research and basic testing methods' },
      { name: 'Application (4 months)', desc: 'Run multiple customer experiments with real feedback' },
      { name: 'Leadership (4 months)', desc: 'Build first working prototype based on validated needs' }
    ],
    // Year 1 content - validation
    year1Content: {
      whatTheyDo: [
        'Explore business problems through structured customer conversations',
        'Test 10+ different solutions with potential paying customers',
        'Build and improve 3+ working prototypes based on customer feedback'
      ],
      whatTheySubmit: [
        'Customer notes: Documented conversations showing what customers actually want',
        'Working prototypes: Simple versions of products that customers can test',
        'Pricing tests: Evidence of what customers will actually pay for'
      ],
      feedback: [
        'Weekly progress reviews on customer conversation counts',
        'Monthly assessments of learning quality and hypothesis testing',
        'Quarterly evaluations by experienced business builders'
      ]
    },
    // Progress review
    progressReview: 'Every 6 months, parents receive a detailed execution report. This includes customer conversation counts, shipping frequency, and business validation progress. Students who don\'t execute consistently receive additional structure or track recommendations.',
    // Year 2 content - systems
    year2Content: {
      workplace: [
        'Conduct 50+ customer interviews to validate and deepen business understanding',
        'Daily customer communication and service delivery',
        'Weekly financial tracking and business decision-making',
        'Monthly team management and performance reviews'
      ],
      clientDelivery: [
        'Business serving 20+ regular paying customers',
        'Team of 3-5 people working on defined roles and schedules',
        'Financial systems tracking revenue, costs, and profit accurately'
      ],
      feedback: [
        'Weekly shipping reviews - what did you deliver this week?',
        'Monthly customer satisfaction and retention metrics',
        'Quarterly business health assessments by industry supervisors'
      ]
    },
    // Year 3 content - outcomes
    year3Content: {
      intro: 'Two possible outcomes: (1) Successful venture generating consistent profit with growth potential, or (2) Venture-ready capability with proven ability to build businesses systematically.',
      portfolio: [
        'Ability to find and serve customers consistently',
        'Experience managing people, budgets, and business operations',
        'Track record of building something from nothing through persistent work',
        'Either a running business or documented capability proof'
      ],
      placements: [
        'Continue growing their own venture independently',
        'Join early-stage companies in operational roles',
        'Apply business-building skills to family enterprise'
      ]
    },
    // Legacy fields for compatibility
    promise: 'Customer validation + founder discipline.',
    outcome: 'Ready to build a real venture—customers, systems, and repeatability.',
    y1: [
      { t: 'Immersion', h: 'Self-Awareness Camp + Rural Project', d: '3-day workshop + 7-day rural immersion' },
      { t: 'Coaching', h: 'Career Blueprint ×4', d: 'Skills mapping & goal setting' },
      { t: 'Network', h: 'Regen Networking Week', d: 'Connecting with industry professionals' },
      { t: 'Skills', h: 'StorySells 1', d: 'Portfolio refinement & LinkedIn branding' },
      { t: 'Employer', h: 'Mentored Apprenticeship (1)', d: 'Industry immersion + workplace dynamics' },
      { t: 'Client', h: 'Client Project ×1', d: 'Learn sales, outreach and marketing' }
    ],
    y2: [
      { t: 'Immersion', h: 'Solo Travel Project', d: '1-week independent service project' },
      { t: 'Coaching', h: 'StorySells 2', d: 'Personal branding & narrative building' },
      { t: 'Skills', h: 'Advanced Challenges', d: 'Data analysis, automation & prototyping' },
      { t: 'Venture', h: 'Business Prototyping Project', d: '2 months building & testing venture idea' },
      { t: 'Coaching', h: 'Venture Design Coaching ×2', d: 'Offer, pricing, distribution' },
      { t: 'Employer', h: 'Mentored Apprenticeship (2)', d: 'Deeper industry immersion (Common Core)' },
      { t: 'Client', h: 'Client Project ×2', d: 'Proposal making, deal negotiation, systems' }
    ],
    y3: [
      { t: 'Client', h: 'Client Multi-domain Project', d: 'Integrated marketing, data & legal outcome' },
      { t: 'Skills', h: 'Final Challenges', d: 'Business ethics, governance & legal aspects' },
      { t: 'Coaching', h: 'StorySells 3', d: 'Purpose, values & transition planning' },
      { t: 'Venture', h: '9-month Venture Building', d: 'Customers → systems → repeatability' }
    ]
  }
};

// PROGRAM VIEW - Complete 3-year journey for a specific program
const ProgramView = ({ programKey, audience, onCTA }) => {
  const current = programData[programKey];
  const [expandedChallenge, setExpandedChallenge] = useState(null);

  const renderDelta = (list) => {
    return list.map((x, i) => {
      const isTeal = x.t === 'Client' || x.t === 'Coaching' || x.t === 'Coach';
      return (
        <div key={i} className={`pt-card${isTeal ? ' teal' : ''}`}>
          <div className="t">{x.t}</div>
          <div className="h">{x.h}</div>
          <div className="d">{x.d}</div>
        </div>
      );
    });
  };

  const renderList = (items) => (
    <ul>
      {items.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
  );

  return (
    <div className="pt-tabPane active fade-in">
      {/* ===================== FEAR-FIRST HERO ===================== */}
      {current.fearHero && (
        <div className="pt-fearHero">
          <h2>{current.fearHero[audience].title}</h2>
          <p>{current.fearHero[audience].sub}</p>
        </div>
      )}

      {/* ===================== HERO SECTION ===================== */}
      <div className="pt-hero">
        <h2>{current.heroTitle}</h2>
        <h3>{current.heroSub}</h3>
      </div>

      {/* ===================== MYTH VS REALITY ===================== */}
      {current.mythReality && current.mythReality.pairs && (
        <div className="pt-mythReality">
          <h4 className="pt-mythTitle">Myth vs Reality</h4>
          <div className="pt-mythTable">
            <div className="pt-mythRow pt-mythHeader">
              <div className="pt-mythCell">❌ Myth</div>
              <div className="pt-realityCell">✅ Reality</div>
            </div>
            {current.mythReality.pairs.map((pair, i) => (
              <div key={i} className="pt-mythRow">
                <div className="pt-mythCell">{pair.myth}</div>
                <div className="pt-realityCell">{pair.reality}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===================== BEST FOR + PARENT CLARITY ===================== */}
      <div className="pt-trackIntro" style={{ marginBottom: 16 }}>
        <div className="pt-trackMeta">
          <div className="pt-trackLine"><span className="lbl">Best for</span><span>{current.whoFor}</span></div>
        </div>
      </div>





      {/* ===================== YEAR 1 (DETAILED) ===================== */}
      <section className="pt-section pt-year" aria-label="Year 1 Foundation">
        <div className="pt-yearHead">
          <div className="pt-yearTitle">
            <strong>Year 1 • Foundation Building</strong>
            <span className="pt-pill" style={{ background: 'rgba(37,188,189,0.2)', color: '#25BCBD' }}>Common for all 3 programs</span>
          </div>
        </div>

        <div className="pt-body">
          {/* ===== 9 CHALLENGES GRID ===== */}
          <h4 style={{ fontSize: 15, fontWeight: 800, color: 'rgba(255,255,255,.95)', marginBottom: 12 }}>The 9 Challenges of Year 1</h4>
          <div className="pt-challengeGrid">
            {year1Challenges.map((ch, i) => (
              <div
                key={i}
                className={`pt-challengeCard${expandedChallenge === i ? ' expanded' : ''}`}
                onClick={() => setExpandedChallenge(expandedChallenge === i ? null : i)}
              >
                <div className="ch-num">CHALLENGE {ch.num}</div>
                <div className="ch-name">{ch.name}</div>
                <div className="ch-sub">{ch.sub}</div>
                <div className="ch-desc">{ch.desc}</div>
                <span className="ch-toggle">{expandedChallenge === i ? '▲ Less' : '▼ More'}</span>
              </div>
            ))}
          </div>

          <div className="pt-ctaBlock">
            <button className="pt-ctaBtn" onClick={() => onCTA('challenges', ctaCopy.challenges[audience])}>{ctaCopy.challenges[audience]} →</button>
          </div>



          {/* NEW: Year 1 Delta Cards */}
          <div className="pt-panel deltaPanel" style={{ marginTop: 16 }}>
            <div className="pt-panelTitle">CAPSTONE ACTIVITIES YEAR 1</div>
            <div className="pt-deltaCards">
              {renderDelta(current.y1)}
            </div>
          </div>

          {/* Program Image Y1 */}
          {current.images?.y1 && (
            <div className="mt-6 mb-6">
              <img src={current.images.y1.src} alt={current.images.y1.caption} className="w-full rounded-xl shadow-lg" />
              <p className="text-sm text-center text-gray-400 mt-2 italic">{current.images.y1.caption}</p>
            </div>
          )}
        </div>
      </section>



      {/* ===================== PROGRESS REVIEW ===================== */}
      <div className="pt-progressCheck">
        <h4>Progress Review:</h4>
        <p>{current.progressReview}</p>
      </div>

      {/* ===================== YEAR 2 ===================== */}
      <section className="pt-section pt-year" aria-label="Year 2 Business Operations" style={{ marginTop: 20 }}>
        <div className="pt-yearHead">
          <div className="pt-yearTitle">
            <strong>Year 2 • {programKey === 'original' ? 'Business Operations' : programKey === 'bf' ? 'Family Business Skills' : 'Building Business Systems'}</strong>
            <span className="pt-pill">Program focus</span>
          </div>
        </div>

        <div className="pt-body">


          {/* Legacy program specifics */}
          <div className="pt-panel deltaPanel" style={{ marginTop: 16 }}>
            <div className="pt-panelTitle">CAPSTONE ACTIVITIES YEAR 2</div>
            <div className="pt-deltaCards">
              {renderDelta(current.y2)}
            </div>
          </div>

          {/* Program Image Y2 */}
          {current.images?.y2 && (
            <div className="mt-6 mb-6">
              <img src={current.images.y2.src} alt={current.images.y2.caption} className="w-full rounded-xl shadow-lg" />
              <p className="text-sm text-center text-gray-400 mt-2 italic">{current.images.y2.caption}</p>
            </div>
          )}
        </div>
      </section>

      {/* ===================== YEAR 3 ===================== */}
      <section className="pt-section pt-year" aria-label="Year 3 Outcomes" style={{ marginTop: 20 }}>
        <div className="pt-yearHead">
          <div className="pt-yearTitle">
            <strong>Year 3 • {programKey === 'original' ? 'Job Readiness' : programKey === 'bf' ? 'Handover-Ready Capability' : 'Venture Progress or Capability'}</strong>
            <span className="pt-pill">Outcome focus</span>
          </div>
        </div>

        <div className="pt-body">

          <div className="pt-yearContent" style={{ marginTop: 12 }}>
            <div className="pt-contentBlock">
              <h5>{programKey === 'original' ? 'Portfolio + references include' : programKey === 'bf' ? 'Evidence you can expect' : 'Either outcome demonstrates'}</h5>
              {renderList(current.year3Content.portfolio)}
            </div>
            <div className="pt-contentBlock">
              <h5>{programKey === 'original' ? 'Typical job placements' : programKey === 'bf' ? 'Readiness outcomes' : 'Possible paths'}</h5>
              {renderList(current.year3Content.placements)}
            </div>
          </div>

          {/* Legacy program capstone */}
          <div className="pt-panel deltaPanel" style={{ marginTop: 16 }}>
            <div className="pt-panelTitle">CAPSTONE ACTIVITIES YEAR 3</div>
            <div className="pt-deltaCards">
              {renderDelta(current.y3)}
            </div>
          </div>

          {/* Program Image Y3 */}
          {current.images?.y3 && (
            <div className="mt-6 mb-6">
              <img src={current.images.y3.src} alt={current.images.y3.caption} className="w-full rounded-xl shadow-lg" />
              <p className="text-sm text-center text-gray-400 mt-2 italic">{current.images.y3.caption}</p>
            </div>
          )}
        </div>
      </section>



      {/* ===================== FINAL CTA ===================== */}
      <div className="pt-ctaBlock">
        <button className="pt-ctaBtn" onClick={() => onCTA('final', ctaCopy.final[audience])}>{ctaCopy.final[audience]} →</button>
      </div>
    </div>
  );
};

