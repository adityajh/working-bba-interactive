import { useState } from 'react';
import './ProgramTabs.css';

export default function WorkingBBAInteractive() {
  const [selectedElement, setSelectedElement] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

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
            <div className="pt-sub"><strong>Work is the Curriculum.</strong> A 3-year experiential business program that gets students into real work—faster than any traditional BBA.</div>
            <div className="pt-chips" aria-label="Program pillars">
              <span className="pt-chip"><span className="pt-dot"></span> Experiential business learning</span>
              <span className="pt-chip"><span className="pt-dot" style={{ background: 'var(--c4)', boxShadow: '0 0 0 3px rgba(30,136,184,.18)' }}></span> Industry immersion</span>
              <span className="pt-chip"><span className="pt-dot" style={{ background: 'rgba(255,255,255,.60)', boxShadow: '0 0 0 3px rgba(255,255,255,.12)' }}></span> Proof of work</span>
            </div>
          </div>

          {/* NAV */}
          <nav className="pt-tabs" aria-label="Page tabs">
            <button
              className="pt-tabBtn"
              data-active={activeTab === 'overview'}
              onClick={() => setActiveTab('overview')}
            >
              Year 1
            </button>
            <button
              className="pt-tabBtn"
              data-active={activeTab === 'tracks'}
              onClick={() => setActiveTab('tracks')}
            >
              Year 2 & 3
            </button>
            <button
              className="pt-tabBtn"
              data-active={activeTab === 'periodic'}
              onClick={() => setActiveTab('periodic')}
            >
              Periodic Table
            </button>
          </nav>
        </header>

        {/* MAIN CONTENT */}
        <main className="pt-section">
          {activeTab === 'overview' && <OverviewTab navToTracks={() => setActiveTab('tracks')} />}
          {activeTab === 'tracks' && <TracksTab navToOverview={() => setActiveTab('overview')} />}

          {/* TAB 3: PERIODIC TABLE (Existing Integration) */}
          {activeTab === 'periodic' && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold">LE Periodic Table of Experiences</h2>
                <p className="text-white/50 text-sm">An experiential learning operating system that keeps the student journey organised, practical and serious.</p>
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

// OVERVIEW TAB
const OverviewTab = ({ navToTracks }) => {
  return (
    <div className="pt-tabPane active fade-in">
      {/* YEAR 1 (Common Growth Year) */}
      <section className="pt-section pt-year" aria-label="Year 1 Growth Year">
        <div className="pt-yearHead">
          <div className="pt-yearTitle">
            <strong>Year 1 • Growth Year (Common)</strong>
            <span className="pt-pill">Pune base • Build hunger + rhythm • Low → mid stakes</span>
          </div>
          <div className="pt-hint">Year 1 is the same for every student. You build skill reps, delivery discipline, and reliability—before choosing a track for Years 2 & 3.</div>
        </div>

        <div className="pt-body">
          <div className="pt-panel">
            <div className="pt-panelTitle"><span className="pt-icon">🧩</span> Year 1 structure (time sense)</div>

            <div className="pt-cards">
              <div className="pt-card">
                <div className="t">Challenge cycles</div>
                <div className="h">Challenges — 60%</div>
                <div className="d">Cohort + Team + Solo/Duo reps. Build execution muscle through repeated cycles.</div>
              </div>
              <div className="pt-card">
                <div className="t">Client delivery</div>
                <div className="h">Client Project — 20%</div>
                <div className="d">One real client cycle. Scope + feedback loop + delivery standards.</div>
              </div>
              <div className="pt-card">
                <div className="t">Work reliability</div>
                <div className="h">Apprenticeship — 20%</div>
                <div className="d">A short placement. Learn manager expectations, reliability, and workplace behaviour.</div>
              </div>
            </div>

            <div className="pt-barWrap" aria-label="Year 1 time allocation">
              <div className="pt-bar" title="Challenges 60%, Client Project 20%, Apprenticeship 20%">
                <div className="pt-seg pt-s1" style={{ width: '60%' }}></div>
                <div className="pt-seg pt-s2" style={{ width: '20%' }}></div>
                <div className="pt-seg pt-s4" style={{ width: '20%' }}></div>
              </div>
              <div className="pt-barLegend">
                <span className="pt-key"><span className="pt-sw pt-s1"></span> Challenges (60%)</span>
                <span className="pt-key"><span className="pt-sw pt-s2"></span> Client Project (20%)</span>
                <span className="pt-key"><span className="pt-sw pt-s4"></span> Apprenticeship (20%)</span>
              </div>
            </div>

            <div className="pt-panel" style={{ marginTop: 12, background: 'rgba(255,255,255,.03)' }}>
              <div className="pt-panelTitle"><span className="pt-icon">🧭</span> Always-on spine (runs alongside everything)</div>
              <div className="pt-spineGrid" aria-label="Always-on spine sections">
                <div className="pt-spineSeg">
                  <div className="k">Coaching</div>
                  <div className="v">Career Blueprint ×6</div>
                  <div className="s">Clarity, confidence, decision-making</div>
                </div>
                <div className="pt-spineSeg">
                  <div className="k">Networking</div>
                  <div className="v">Regen (every year)</div>
                  <div className="s">Industry exposure + introductions</div>
                </div>
                <div className="pt-spineSeg">
                  <div className="k">Communication</div>
                  <div className="v">Storysells</div>
                  <div class="s">Pitch, publish, and build presence</div>
                </div>
                <div className="pt-spineSeg">
                  <div className="k">Proof</div>
                  <div className="v">Daily + Weekly Proof</div>
                  <div className="s">Docs, media, data, testimonials</div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-strip" aria-label="Year 1 outcomes">
            <strong>Year 1 outcome</strong>
            <span>A student who can <span className="pt-opTag">show up, deliver, communicate</span>—with real proof. This is the foundation for higher-stakes work in Years 2 & 3.</span>
          </div>

          <div className="pt-ctaRow" aria-label="Compare tracks CTA">
            <button className="pt-ctaBtn" onClick={navToTracks}>Compare tracks →</button>
            <div className="pt-ctaHint">Years 2 & 3 change based on track.</div>
          </div>

          <div className="pt-note"><strong>What parents should notice:</strong> Year 1 builds responsibility and work habits through repeated delivery cycles. It’s not “learning about business.” It’s learning by doing—under standards, deadlines, and feedback.</div>
        </div>
      </section>
    </div>
  );
};

// TRACKS TAB
const TracksTab = ({ navToOverview }) => {
  const [activeTrack, setActiveTrack] = useState('original');
  const [openYear, setOpenYear] = useState('y2'); // 'y2' | 'y3' | null

  const trackCopy = {
    original: {
      whoFor: 'Students who want fast-track real work and entrepreneurial jobs.',
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
      whoFor: 'Families 100% clear: the child joins the family business after graduation.',
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
      whoFor: 'Families clear and supportive: the child builds their own venture by graduation.',
      promise: 'Traction + founder systems.',
      outcome: 'Ready to build a real venture—traction, systems, and repeatability.',
      y2: [
        { t: 'Venture', h: 'Solo Venture ×1', d: 'Offer + first customers' },
        { t: 'Coaching', h: 'Venture Design Coaching ×2', d: 'Offer, pricing, distribution' },
        { t: 'Mentor', h: 'Solo Mentor Meetups ×4', d: 'Founder operator reps' }
      ],
      y3: [
        { t: 'Venture', h: '9-month Venture Building', d: 'Traction → systems → repeatability' },
        { t: 'Coaching', h: 'Venture Coaching ×4', d: 'Distribution, growth, resilience' }
      ]
    }
  };

  const current = trackCopy[activeTrack];

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

  return (
    <div className="pt-tabPane active fade-in">
      <div className="pt-miniTop">
        <button className="pt-linkBtn" onClick={navToOverview}>← Program overview</button>
      </div>

      {/* TRACK SELECTOR */}
      <section className="pt-section pt-selector" aria-label="Track selection">
        <div className="pt-selectorHead pt-stickyBar">
          <strong style={{ letterSpacing: '.8px', textTransform: 'uppercase' }}>Choose your track (Years 2 & 3)</strong>
          <div className="pt-hint">Same structure. Different focus.</div>

          <div className="pt-segControl" role="group" aria-label="Track buttons">
            <button
              className="pt-trackBtn"
              data-active={activeTrack === 'original'}
              onClick={() => setActiveTrack('original')}
            >
              Entrepreneurial Jobs <span className="pt-opTag">(Operator)</span>
            </button>
            <button
              className="pt-trackBtn"
              data-active={activeTrack === 'bf'}
              onClick={() => setActiveTrack('bf')}
            >
              Business Families
            </button>
            <button
              className="pt-trackBtn"
              data-active={activeTrack === 'solo'}
              onClick={() => setActiveTrack('solo')}
            >
              Solo-preneurs
            </button>
          </div>

          <div className="pt-trackIntro" aria-label="Track outcome box">
            <div className="pt-trackMeta">
              <div className="pt-trackLine"><span className="lbl">Best for</span><span>{current.whoFor}</span></div>
              <div className="pt-trackLine"><span className="lbl">Promise</span><span>{current.promise}</span></div>
              <div className="pt-trackLine"><span className="lbl">Outcome</span><span>{current.outcome}</span></div>
            </div>
          </div>
        </div>

        <div className="pt-trackBody active">
          {/* YEAR 2 */}
          <details className="pt-yearDetails" open={openYear === 'y2'} onToggle={(e) => { if (e.target.open) setOpenYear('y2'); }}>
            <summary className="pt-sumRow" onClick={(e) => { e.preventDefault(); setOpenYear(openYear === 'y2' ? null : 'y2'); }}>
              <span className="pt-sumTitle">Year 2 • Projects Year</span>
              <span className="pt-sumPill">Common spine + track adds</span>
            </summary>
            {openYear === 'y2' && (
              <div className="pt-body">
                <div className="pt-split">
                  <div className="pt-panel commonPanel">
                    <div className="pt-panelTitle"><span className="pt-icon">🧬</span> Common (Year 2)</div>
                    <div className="pt-spineGrid" aria-label="Year 2 common spine">
                      <div className="pt-spineSeg"><div className="k">Client</div><div className="v">Client Project ×1</div><div className="s">Real scope + feedback</div></div>
                      <div className="pt-spineSeg"><div className="k">Venture</div><div className="v">Team Venture</div><div className="s">Build + ship</div></div>
                      <div className="pt-spineSeg"><div className="k">Employer</div><div className="v">Apprenticeship ×1</div><div className="s">Professional standards</div></div>
                      <div className="pt-spineSeg"><div className="k">Communication</div><div className="v">Storysells</div><div className="s">Pitch + publish</div></div>
                      <div className="pt-spineSeg"><div className="k">Coaching</div><div className="v">Career Blueprint ×4</div><div className="s">Direction + decisions</div></div>
                      <div className="pt-spineSeg"><div className="k">Network</div><div className="v">Regen</div><div className="s">Introductions</div></div>
                    </div>
                  </div>

                  <div className="pt-panel deltaPanel">
                    <div className="pt-panelTitle"><span className="pt-icon">➕</span> Track adds (Year 2)</div>
                    <div className="pt-deltaCards">
                      {renderDelta(current.y2)}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </details>

          {/* YEAR 3 */}
          <details className="pt-yearDetails" style={{ marginTop: 12 }} open={openYear === 'y3'} onToggle={(e) => { if (e.target.open) setOpenYear('y3'); }}>
            <summary className="pt-sumRow" onClick={(e) => { e.preventDefault(); setOpenYear(openYear === 'y3' ? null : 'y3'); }}>
              <span className="pt-sumTitle">Year 3 • Work Year</span>
              <span className="pt-sumPill">Common spine + track capstone</span>
            </summary>
            {openYear === 'y3' && (
              <div className="pt-body">
                <div className="pt-split">
                  <div className="pt-panel commonPanel">
                    <div className="pt-panelTitle"><span className="pt-icon">🧬</span> Common (Year 3)</div>
                    <div className="pt-spineGrid" aria-label="Year 3 common spine">
                      <div className="pt-spineSeg"><div className="k">Network</div><div className="v">Regen</div><div className="s">Introductions</div></div>
                      <div className="pt-spineSeg"><div className="k">Proof</div><div className="v">Proof Packs</div><div className="s">Docs + media + data</div></div>
                      <div className="pt-spineSeg"><div className="k">Coaching</div><div className="v">Career Blueprint ×6</div><div className="s">Transition ×4</div></div>
                      <div className="pt-spineSeg"><div className="k">Client</div><div className="v">Team Residency (6 weeks)</div><div class="s">On-site delivery</div></div>
                    </div>
                  </div>

                  <div className="pt-panel deltaPanel">
                    <div className="pt-panelTitle"><span className="pt-icon">➕</span> Track capstone (Year 3)</div>
                    <div className="pt-deltaCards">
                      {renderDelta(current.y3)}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </details>
        </div>
      </section>

      <div className="pt-note" aria-label="Implementation note">
        <strong>Simple idea:</strong> Students graduate with <strong>proof of work</strong> and <strong>real references</strong>—not just a marksheet.
      </div>
    </div>
  );
};

