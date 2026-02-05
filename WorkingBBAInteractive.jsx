import { useState } from 'react';
import './ProgramTabs.css';

export default function WorkingBBAInteractive() {
  const [selectedElement, setSelectedElement] = useState(null);
  const [activeTab, setActiveTab] = useState('job'); // job | family | venture | periodic

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
      evidence: 'EVIDENCE'
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
    <div className="pt-scope">
      <div className="pt-wrap">
        {/* HEADER */}
        <header className="pt-top">
          <div className="pt-brand">
            <div className="pt-logo" aria-label="Let's Enterprise logo">
              {/* Logo Placeholder */}
              <span style={{ fontSize: 24, fontWeight: 900, letterSpacing: -1, color: '#fff' }}>LE</span>
            </div>
            <div className="pt-kicker">Let’s Enterprise • Undergrad Business Program</div>
          </div>

          <div>
            <h1 className="text-white">India’s First Working BBA</h1>
            <div className="pt-sub"><strong>Work is the Curriculum.</strong> A 3-year business program where students learn by working—faster than any traditional BBA.</div>
            <div className="pt-chips" aria-label="Program pillars">
              <span className="pt-chip"><span className="pt-dot"></span> Learn by working</span>
              <span className="pt-chip"><span className="pt-dot" style={{ background: 'var(--c4)', boxShadow: '0 0 0 3px rgba(30,136,184,.18)' }}></span> Real apprenticeships</span>
              <span className="pt-chip"><span className="pt-dot" style={{ background: 'rgba(255,255,255,.60)', boxShadow: '0 0 0 3px rgba(255,255,255,.12)' }}></span> Portfolio + feedback + references</span>
            </div>
          </div>

          {/* NAV */}
          <nav className="pt-tabs" aria-label="Page tabs">
            <button
              className="pt-tabBtn"
              data-active={activeTab === 'job'}
              onClick={() => setActiveTab('job')}
            >
              Working BBA for Entrepreneurial Jobs
            </button>
            <button
              className="pt-tabBtn"
              data-active={activeTab === 'family'}
              onClick={() => setActiveTab('family')}
            >
              Working BBA for Business Families
            </button>
            <button
              className="pt-tabBtn"
              data-active={activeTab === 'venture'}
              onClick={() => setActiveTab('venture')}
            >
              Working BBA for Venture Starters
            </button>
            <button
              className="pt-tabBtn"
              data-active={activeTab === 'periodic'}
              onClick={() => setActiveTab('periodic')}
            >
              Working BBA Operating System
            </button>
          </nav>
        </header>

        {/* MAIN CONTENT */}
        <main className="pt-section">
          {activeTab === 'job' && <TrackView track="original" />}
          {activeTab === 'family' && <TrackView track="bf" />}
          {activeTab === 'venture' && <TrackView track="solo" />}

          {/* TAB 3: PERIODIC TABLE (Existing Integration) */}
          {activeTab === 'periodic' && (
            <div className="space-y-6">
              {/* NEW: Table Explanation Header */}
              <div className="pt-tableExplain">
                <h2>15 Core Work Skills: How We Track Your Child's Development</h2>

                <div className="pt-explainGrid">
                  <div className="pt-explainBox">
                    <h4>How to read this system:</h4>
                    <ul>
                      <li><strong>Each block</strong> represents one work skill developed through real projects</li>
                      <li><strong>Color coding</strong> shows which skills are practiced each semester</li>
                      <li><strong>Numbers</strong> indicate the sequence skills are introduced and mastered</li>
                      <li><strong>"Proof"</strong> means portfolio evidence plus feedback from work supervisors</li>
                      <li><strong>Yearly sections</strong> show skill building progression from basic to advanced</li>
                      <li><strong>Assessment</strong> happens through real work performance, not classroom tests</li>
                    </ul>
                  </div>

                  <div className="pt-explainBox">
                    <h4>What this system prevents:</h4>
                    <ul>
                      <li><strong>Drift:</strong> Every month has specific skill development targets</li>
                      <li><strong>Low effort:</strong> Skills are only checked off when work supervisors confirm competency</li>
                      <li><strong>Confusion:</strong> Students and parents always know what's being developed and why</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Legend - Responsive Grid (Strict Scale) */}
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-6 p-4 bg-white/5 rounded-xl border border-white/10 shadow-lg backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <div className="w-8 sm:w-10 h-4 sm:h-5 bg-gradient-to-r from-[#334c91] to-[#3663AD] rounded-lg shadow-sm"></div>
                  <span className="text-xs text-white/90 font-medium tracking-wide">Education</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 sm:w-10 h-4 sm:h-5 bg-gradient-to-r from-[#3269ae] to-[#1e88b8] rounded-lg shadow-sm"></div>
                  <span className="text-xs text-white/90 font-medium tracking-wide">Experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 sm:w-10 h-4 sm:h-5 bg-gradient-to-r from-[#1e88b8] to-[#25BCBD] rounded-lg shadow-sm"></div>
                  <span className="text-xs text-white/90 font-medium tracking-wide">Awareness</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 sm:w-10 h-4 sm:h-5 bg-white border border-gray-300 rounded-lg shadow-sm"></div>
                  <span className="text-xs text-white/90 font-medium tracking-wide">Evidence</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 sm:w-10 h-4 sm:h-5 bg-[#160E44] border border-[#D946EF] rounded-full shadow-sm"></div>
                  <span className="text-xs text-white/90 font-medium tracking-wide">Assessments</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 sm:w-10 h-4 sm:h-5 bg-[#160E44] border border-[#FBBF24] rounded-sm shadow-sm"></div>
                  <span className="text-xs text-white/90 font-medium tracking-wide">Roles</span>
                </div>
              </div>

              {/* NEW: Parent Takeaway */}
              <div className="pt-parentTakeaway">
                <h4>Parent Takeaway:</h4>
                <p>You will see evidence every month.</p>
                <ul>
                  <li>Monthly skill development reports from work supervisors</li>
                  <li>Quarterly portfolio reviews showing concrete project outcomes</li>
                  <li>Semester feedback summaries from clients and team members</li>
                  <li>Annual competency assessment by industry professionals</li>
                </ul>
              </div>

              {/* EDUCATION & EXPERIENCE - Navy Background */}
              <div className="bg-[#282f6c] rounded-xl p-4 sm:p-6 overflow-x-auto shadow-xl border border-white/5">
                <h3 className="text-xl font-bold mb-6 text-[#3269ae] border-b border-white/10 pb-3 tracking-wide">EDUCATION & EXPERIENCE</h3>

                <div className="min-w-[800px]"> {/* Force min width for scrolling on mobile */}
                  {/* Header row */}
                  <div className="grid grid-cols-6 gap-3 mb-4">
                    <div></div>
                    <div className="text-xs text-[#3269ae] text-center p-2 font-bold tracking-wider">COURSE</div>
                    <div className="text-xs text-[#3269ae] text-center p-2 font-bold tracking-wider">CHALLENGE</div>
                    <div className="text-xs text-[#1e88b8] text-center p-2 font-bold tracking-wider">BUSINESS</div>
                    <div className="text-xs text-[#1e88b8] text-center p-2 font-bold tracking-wider">CLIENT</div>
                    <div className="text-xs text-[#1e88b8] text-center p-2 font-bold tracking-wider">EMPLOYER</div>
                  </div>

                  {/* COHORT row */}
                  <div className="grid grid-cols-6 gap-4 mb-4 items-center">
                    <div className="text-xs text-white/60 text-right pr-3 font-bold uppercase tracking-wider">COHORT</div>
                    <div className="flex justify-center"><ElementBadge elementKey="course" /></div>
                    <div className="flex justify-center"><ElementBadge elementKey="cohortChallenge" /></div>
                    <div className="flex justify-center"><ElementBadge elementKey="cohortVenture" /></div>
                    <div className="flex justify-center"><ElementBadge elementKey="clientHackathon" /></div>
                    <div className="flex justify-center text-white/20">—</div>
                  </div>

                  {/* TEAM row */}
                  <div className="grid grid-cols-6 gap-4 mb-4 items-center">
                    <div className="text-xs text-white/60 text-right pr-3 font-bold uppercase tracking-wider">TEAM</div>
                    <div className="flex justify-center"><ElementBadge elementKey="teamTrack" /></div>
                    <div className="flex justify-center"><ElementBadge elementKey="teamChallenge" /></div>
                    <div className="flex justify-center"><ElementBadge elementKey="teamVenture" /></div>
                    <div className="flex justify-center"><ElementBadge elementKey="clientProject" /></div>
                    <div className="flex justify-center"><ElementBadge elementKey="teamResidency" /></div>
                  </div>

                  {/* SOLO/DUO row */}
                  <div className="grid grid-cols-6 gap-4 items-center">
                    <div className="text-xs text-white/60 text-right pr-3 font-bold uppercase tracking-wider">SOLO/DUO</div>
                    <div className="flex justify-center"><ElementBadge elementKey="skillTrack" /></div>
                    <div className="flex justify-center"><ElementBadge elementKey="soloChallenge" /></div>
                    <div className="flex justify-center"><ElementBadge elementKey="soloVenture" /></div>
                    <div className="flex justify-center"><ElementBadge elementKey="clientGig" /></div>
                    <div className="flex justify-center"><ElementBadge elementKey="apprenticeship" /></div>
                  </div>
                </div>
              </div>

              {/* AWARENESS - Teal Background */}
              <div className="bg-[#1e88b8] rounded-xl p-4 sm:p-6 overflow-x-auto shadow-xl border border-white/5">
                <h3 className="text-xl font-bold mb-6 text-[#160E44] border-b border-white/10 pb-3 tracking-wide">AWARENESS AND CAREER</h3>

                <div className="min-w-[500px]">
                  {/* Header row */}
                  <div className="grid grid-cols-4 gap-3 mb-4">
                    <div></div>
                    <div className="text-xs text-[#160E44] text-center p-2 font-bold tracking-wider">SELF</div>
                    <div className="text-xs text-[#160E44] text-center p-2 font-bold tracking-wider">CAREER</div>
                    <div className="text-xs text-[#160E44] text-center p-2 font-bold tracking-wider">STORY-SELLS</div>
                  </div>

                  {/* COHORT row */}
                  <div className="grid grid-cols-4 gap-4 mb-4 items-center">
                    <div className="text-xs text-white/80 text-right pr-3 font-bold uppercase tracking-wider">COHORT</div>
                    <div className="flex justify-center"><ElementBadge elementKey="camp" /></div>
                    <div className="flex justify-center"><ElementBadge elementKey="regen" /></div>
                    <div className="flex justify-center"><ElementBadge elementKey="storysellsWorkshop" /></div>
                  </div>

                  {/* TEAM row */}
                  <div className="grid grid-cols-4 gap-4 mb-4 items-center">
                    <div className="text-xs text-white/80 text-right pr-3 font-bold uppercase tracking-wider">TEAM</div>
                    <div className="flex justify-center"><ElementBadge elementKey="mastermind" /></div>
                    <div className="flex justify-center"><ElementBadge elementKey="meetup" /></div>
                    <div className="flex justify-center"><ElementBadge elementKey="storyTell" /></div>
                  </div>

                  {/* SOLO row */}
                  <div className="grid grid-cols-4 gap-4 items-center">
                    <div className="text-xs text-white/80 text-right pr-3 font-bold uppercase tracking-wider">SOLO</div>
                    <div className="flex justify-center"><ElementBadge elementKey="conflexion" /></div>
                    <div className="flex justify-center"><ElementBadge elementKey="careerBlueprint" /></div>
                    <div className="flex justify-center"><ElementBadge elementKey="storyBuild" /></div>
                  </div>
                </div>
              </div>

              {/* EVIDENCE - White Background */}
              <div className="bg-white rounded-xl p-4 sm:p-6 overflow-x-auto shadow-xl border border-gray-200">
                <h3 className="text-xl font-bold mb-6 text-gray-800 border-b border-gray-200 pb-3 tracking-wide">EVIDENCE</h3>

                <div className="min-w-[600px]">
                  {/* Row 1 */}
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div className="flex justify-center"><ElementBadge elementKey="dailyCards" /></div>
                    <div className="flex justify-center"><ElementBadge elementKey="docs" /></div>
                    <div className="flex justify-center"><ElementBadge elementKey="assessmentOutputs" /></div>
                    <div className="flex justify-center"><ElementBadge elementKey="media" /></div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-4 gap-4">
                    <div className="flex justify-center"><ElementBadge elementKey="testimonials" /></div>
                    <div className="flex justify-center"><ElementBadge elementKey="dataSets" /></div>
                    <div className="flex justify-center opacity-0">—</div>
                    <div className="flex justify-center opacity-0">—</div>
                  </div>
                </div>
              </div>

              {/* ASSESSMENTS - Navy Background (Magenta Header) */}
              <div className="bg-[#282f6c] rounded-xl p-4 sm:p-6 overflow-x-auto shadow-xl border border-white/5">
                <h3 className="text-xl font-bold mb-6 text-[#D946EF] border-b border-white/10 pb-3 tracking-wide">ASSESSMENTS</h3>

                <div className="min-w-[500px]">
                  {/* Row 1 */}
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div className="flex justify-center"><ElementBadge elementKey="selfPeerFacRating" /></div>
                    <div className="flex justify-center"><ElementBadge elementKey="industryRating" /></div>
                    <div className="flex justify-center"><ElementBadge elementKey="quiz" /></div>
                    <div className="flex justify-center opacity-0">—</div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-4 gap-4">
                    <div className="flex justify-center"><ElementBadge elementKey="outcomes" /></div>
                    <div className="flex justify-center"><ElementBadge elementKey="engagement" /></div>
                    <div className="flex justify-center"><ElementBadge elementKey="progress" /></div>
                    <div className="flex justify-center"><ElementBadge elementKey="specific" /></div>
                  </div>
                </div>
              </div>

              {/* ROLES - Mid-Blue Background (Yellow Header) */}
              <div className="bg-[#3269ae] rounded-xl p-4 sm:p-6 overflow-x-auto shadow-xl border border-white/20">
                <h3 className="text-xl font-bold mb-6 text-[#FBBF24] border-b border-white/20 pb-3 tracking-wide">ROLES</h3>

                <div className="min-w-[500px]">
                  {/* Row 1 */}
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div className="flex justify-center"><ElementBadge elementKey="facilitator" /></div>
                    <div className="flex justify-center"><ElementBadge elementKey="developer" /></div>
                    <div className="flex justify-center"><ElementBadge elementKey="faculty" /></div>
                    <div className="flex justify-center text-blue-900/30 font-bold">—</div>
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-4 gap-4">
                    <div className="flex justify-center"><ElementBadge elementKey="jury" /></div>
                    <div className="flex justify-center"><ElementBadge elementKey="lighthouse" /></div>
                    <div className="flex justify-center"><ElementBadge elementKey="expert" /></div>
                    <div className="flex justify-center"><ElementBadge elementKey="mentor" /></div>
                  </div>
                </div>
              </div>

              {/* NEW: Progress Tracking Section */}
              <div className="pt-progressTracking">
                <h4>How we track progress:</h4>

                <div className="pt-trackingGrid">
                  <div className="pt-trackingBox">
                    <h5>Four types of regular reviews:</h5>
                    <ul>
                      <li><strong>Weekly reviews:</strong> Work supervisors assess task completion and quality</li>
                      <li><strong>Monthly feedback:</strong> Clients rate communication, reliability, and problem-solving</li>
                      <li><strong>Quarterly submissions:</strong> Portfolio updates with project evidence and outcomes</li>
                      <li><strong>Semester checks:</strong> Comprehensive skill assessment by program supervisors</li>
                    </ul>
                  </div>

                  <div className="pt-trackingBox">
                    <h5>What parents receive:</h5>
                    <ul>
                      <li>Monthly progress summary with specific skill development updates</li>
                      <li>Quarterly detailed report including work supervisor feedback</li>
                      <li>Semester portfolio review with evidence of competency growth</li>
                      <li>Annual comprehensive assessment with industry benchmark comparisons</li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          )}
        </main>
      </div>

      {/* Element Detail Modal */}
      <ElementModal />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                               HELPER COMPONENTS                            */
/* -------------------------------------------------------------------------- */

// Track data for Year 2 & 3 specifics
const trackData = {
  original: {
    name: 'Entrepreneurial Job',
    // Hero section
    heroTitle: 'Build Work Confidence in Growth Companies',
    heroSub: 'Your child works as a business operations associate. Real deadlines. Real managers. Real feedback.',
    mechanism: {
      title: 'How confidence is built here:',
      items: [
        'Weekly one-on-one reviews with company managers',
        'Monthly project deadlines with client consequences',
        'Quarterly performance feedback from 3+ supervisors'
      ]
    },
    // Best for section
    whoFor: 'Students who want fast-track real work and entrepreneurial jobs.',
    // Parent clarity
    whatTheyDo: {
      title: 'What your child will do (in simple terms):',
      items: [
        'Manage projects for 3-5 company clients each semester',
        'Create marketing campaigns that bring in actual customers',
        'Build systems that other employees use daily'
      ]
    },
    accountability: {
      title: 'How we ensure they work:',
      items: [
        'Company managers review their work weekly (not just teachers)',
        'Client feedback determines their project grades',
        'Missing deadlines = immediate parent communication'
      ]
    },
    // Year 1 summary
    year1Summary: 'Your child becomes a reliable project manager who delivers work that company teams depend on.',
    year1Parts: [
      { name: 'Foundation (4 months)', desc: 'Learn to manage one project with daily supervision' },
      { name: 'Application (4 months)', desc: 'Manage 2-3 projects with weekly supervision' },
      { name: 'Leadership (4 months)', desc: 'Train newer students while managing full project load' }
    ],
    // Year 1 content
    year1Content: {
      whatTheyDo: [
        'Manage client projects for 2-3 growing companies',
        'Handle marketing campaigns with real budget responsibility',
        'Coordinate teams of 5-8 employees across departments'
      ],
      whatTheySubmit: [
        'Weekly project status reports to company managers',
        'Monthly budget tracking with spending explanations',
        'End-of-project client feedback and outcome data'
      ],
      feedback: [
        'Company managers rate their reliability and communication',
        'Clients score their project delivery and problem-solving',
        'Peers evaluate their collaboration and leadership'
      ]
    },
    // Progress review
    progressReview: 'Every 6 months, company partners and parents receive a detailed review. This includes client feedback scores, project outcomes, and areas for improvement. Students who don\'t meet work standards receive additional supervision or program adjustments.',
    // Year 2 content
    year2Content: {
      workplace: [
        'Lead marketing projects that generate actual customer leads',
        'Manage operations for company departments',
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
        'Business operations roles at ₹8-12L starting salary',
        'Project management positions in partner companies',
        'Marketing coordinator roles with growth potential'
      ]
    },
    // Legacy fields for compatibility
    promise: 'More industries. Stronger references.',
    outcome: 'Ready for roles where output and proof matter more than pedigree.',
    y2: [
      { t: 'Employer', h: 'Outstation Apprenticeship ×1', d: 'Deeper exposure + stronger network' }
    ],
    y3: [
      { t: 'Employer', h: '9-month Mentored Apprenticeship', d: 'Role clarity + output + strong references' }
    ]
  },
  bf: {
    name: 'Business Family',
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
    y2: [
      { t: 'Employer', h: 'Family Business Apprenticeship', d: 'Learn how other families run business' },
      { t: 'Coaching', h: 'Family Coaching ×2', d: 'Alignment + expectations' },
      { t: 'Mentor', h: 'FB Mentor Meetups ×4', d: 'Succession + governance reps' }
    ],
    y3: [
      { t: 'Capstone', h: '9-month Family Business Project', d: 'Real KPI + ownership' },
      { t: 'Coaching', h: 'Family Coaching ×4', d: 'Role clarity + handover readiness' }
    ]
  },
  solo: {
    name: 'Venture Track',
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
        'Continued non-performance results in program track change'
      ]
    },
    // Myth vs Reality
    mythReality: {
      myth: {
        title: 'Myth: Business building = freedom',
        items: [
          'Work whenever you want',
          'Be your own boss',
          'Focus on big ideas'
        ]
      },
      reality: {
        title: 'Reality: Business building = deadlines + customers + rejection',
        items: [
          'Customer deadlines are harder than employee deadlines',
          'Customers and investors are demanding bosses',
          'Success requires executing hundreds of small details'
        ]
      }
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
        'Conduct 50+ customer interviews to understand real problems',
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
    y2: [
      { t: 'Venture', h: 'Solo Venture ×1', d: 'Offer + first customers' },
      { t: 'Coaching', h: 'Venture Design Coaching ×2', d: 'Offer, pricing, distribution' },
      { t: 'Mentor', h: 'Solo Supervisor Meetups ×4', d: 'Business operator guidance' }
    ],
    y3: [
      { t: 'Venture', h: '9-month Venture Building', d: 'Customers → systems → repeatability' },
      { t: 'Coaching', h: 'Venture Coaching ×4', d: 'Distribution, growth, resilience' }
    ]
  }
};

// TRACK VIEW - Complete 3-year journey for a specific track
const TrackView = ({ track }) => {
  const current = trackData[track];

  const renderDelta = (list) => {
    return list.map((x, i) => {
      const isTeal = x.t === 'Coaching' || x.t === 'Mentor';
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
      {/* ===================== HERO SECTION ===================== */}
      <div className="pt-hero">
        <h2>{current.heroTitle}</h2>
        <h3>{current.heroSub}</h3>
        <div className="pt-mechanism">
          <strong>{current.mechanism.title}</strong>
          {renderList(current.mechanism.items)}
        </div>
      </div>

      {/* ===================== BEST FOR + PARENT CLARITY ===================== */}
      <div className="pt-trackIntro" style={{ marginBottom: 16 }}>
        <div className="pt-trackMeta">
          <div className="pt-trackLine"><span className="lbl">Best for</span><span>{current.whoFor}</span></div>
        </div>
      </div>

      <div className="pt-parentClarity">
        <div className="pt-clarityBox">
          <h4>{current.whatTheyDo.title}</h4>
          {renderList(current.whatTheyDo.items)}
        </div>
        <div className="pt-clarityBox">
          <h4>{current.accountability.title}</h4>
          {renderList(current.accountability.items)}
        </div>
      </div>

      {/* ===================== MYTH VS REALITY (Venture only) ===================== */}
      {current.mythReality && (
        <div className="pt-mythReality">
          <div className="pt-mythCol">
            <h5>{current.mythReality.myth.title}</h5>
            {renderList(current.mythReality.myth.items)}
          </div>
          <div className="pt-realityCol">
            <h5>{current.mythReality.reality.title}</h5>
            {renderList(current.mythReality.reality.items)}
          </div>
        </div>
      )}

      {/* ===================== FAMILY CONNECTION (Business Family only) ===================== */}
      {current.familyConnection && (
        <div className="pt-clarityBox" style={{ marginBottom: 20 }}>
          <h4>{current.familyConnection.title}</h4>
          {renderList(current.familyConnection.items)}
          <p style={{ marginTop: 12, fontSize: 12, color: 'rgba(255,255,255,.78)', fontWeight: 600 }}>
            <strong>Important:</strong> {current.familyConnection.note}
          </p>
        </div>
      )}

      {/* ===================== YEAR 1 SUMMARY ===================== */}
      <div className="pt-yearSummary">
        <h4>Year 1 in one line:</h4>
        <p>{current.year1Summary}</p>
        <div className="pt-threePart">
          <h5>Year 1 has 3 main parts:</h5>
          <ul>
            {current.year1Parts.map((part, i) => (
              <li key={i}><strong>{part.name}:</strong> {part.desc}</li>
            ))}
          </ul>
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
          <div className="pt-yearContent">
            <div className="pt-contentBlock">
              <h5>What they do</h5>
              {renderList(current.year1Content.whatTheyDo)}
            </div>
            <div className="pt-contentBlock">
              <h5>What they submit</h5>
              {renderList(current.year1Content.whatTheySubmit)}
            </div>
            <div className="pt-contentBlock">
              <h5>What feedback looks like</h5>
              {renderList(current.year1Content.feedback)}
            </div>
          </div>
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
            <strong>Year 2 • {track === 'original' ? 'Business Operations' : track === 'bf' ? 'Family Business Skills' : 'Building Business Systems'}</strong>
            <span className="pt-pill">Track-specific focus</span>
          </div>
        </div>

        <div className="pt-body">
          <div className="pt-yearContent">
            <div className="pt-contentBlock">
              <h5>{track === 'original' ? 'Workplace responsibilities' : track === 'bf' ? 'How they use these skills' : 'Building systems means'}</h5>
              {renderList(current.year2Content.workplace)}
            </div>
            <div className="pt-contentBlock">
              <h5>{track === 'original' ? 'Client delivery expectations' : track === 'bf' ? 'Practical applications' : 'What they produce'}</h5>
              {renderList(current.year2Content.clientDelivery)}
            </div>
            <div className="pt-contentBlock">
              <h5>{track === 'original' ? 'Manager feedback process' : 'Feedback process'}</h5>
              {renderList(current.year2Content.feedback)}
            </div>
          </div>

          {/* Legacy track specifics */}
          <div className="pt-panel deltaPanel" style={{ marginTop: 16 }}>
            <div className="pt-panelTitle"><span className="pt-icon">➕</span> Additional track activities (Year 2)</div>
            <div className="pt-deltaCards">
              {renderDelta(current.y2)}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== YEAR 3 ===================== */}
      <section className="pt-section pt-year" aria-label="Year 3 Outcomes" style={{ marginTop: 20 }}>
        <div className="pt-yearHead">
          <div className="pt-yearTitle">
            <strong>Year 3 • {track === 'original' ? 'Job Readiness' : track === 'bf' ? 'Handover-Ready Capability' : 'Venture Progress or Capability'}</strong>
            <span className="pt-pill">Outcome focus</span>
          </div>
        </div>

        <div className="pt-body">
          <div className="pt-outcomeSection">
            <h4>{track === 'original' ? 'Employment preparation' : track === 'bf' ? 'What a "handover-ready" student looks like' : 'Two possible outcomes'}</h4>
            <p>{current.year3Content.intro}</p>
          </div>

          <div className="pt-yearContent" style={{ marginTop: 12 }}>
            <div className="pt-contentBlock">
              <h5>{track === 'original' ? 'Portfolio + references include' : track === 'bf' ? 'Evidence you can expect' : 'Either outcome demonstrates'}</h5>
              {renderList(current.year3Content.portfolio)}
            </div>
            <div className="pt-contentBlock">
              <h5>{track === 'original' ? 'Typical job placements' : track === 'bf' ? 'Readiness outcomes' : 'Possible paths'}</h5>
              {renderList(current.year3Content.placements)}
            </div>
          </div>

          {/* Legacy track capstone */}
          <div className="pt-panel deltaPanel" style={{ marginTop: 16 }}>
            <div className="pt-panelTitle"><span className="pt-icon">➕</span> Track capstone activities (Year 3)</div>
            <div className="pt-deltaCards">
              {renderDelta(current.y3)}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL NOTE */}
      <div className="pt-note" aria-label="Implementation note" style={{ marginTop: 32 }}>
        <strong>Simple idea:</strong> Students graduate with <strong>portfolio + feedback + references</strong>—not just a marksheet.
      </div>
    </div>
  );
};

