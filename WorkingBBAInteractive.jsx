import { useState } from 'react';

export default function WorkingBBAInteractive() {
  const [selectedElement, setSelectedElement] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Brand Colors from LE Guidelines
  const brandColors = {
    enterpriseBlue: '#3663AD',
    deepBlue: '#160E44',
    brightTeal: '#25BCBD',
    // Complementary colors
    coral: '#E07B54',      // Assessments
    slate: '#64748B',      // Roles
    amber: '#D97706',      // Evidence
  };

  // Periodic Table Elements Data
  const elements = {
    // Education & Experience - Course (Enterprise Blue family)
    course: {
      name: "COURSE",
      pillar: "education",
      color: "bg-[#3663AD]",
      description: "Structured progression, problem/theme-led learning with no external stakeholder",
      duration: "2-6 weeks",
      size: "medium"
    },

    // Education & Experience - Challenge
    cohortChallenge: {
      name: "COHORT CHALLENGE",
      pillar: "education",
      color: "bg-[#2952A3]",
      description: "Entire cohort works on challenge, milestone-based with feedback cycles",
      duration: "1-3 weeks",
      size: "medium"
    },
    teamChallenge: {
      name: "TEAM CHALLENGE",
      pillar: "education",
      color: "bg-[#2952A3]",
      description: "Teams work on separate challenge tasks",
      duration: "1-3 weeks",
      size: "medium"
    },
    soloChallenge: {
      name: "SOLO/DUO CHALLENGE",
      pillar: "education",
      color: "bg-[#2952A3]",
      description: "Clear goals, weekly check-ins, individual challenge",
      duration: "1-3 weeks",
      size: "medium"
    },

    // Education & Experience - Tracks
    skillTrack: {
      name: "SKILL TRACK",
      pillar: "education",
      color: "bg-[#4A7CC9]",
      description: "Individual, self-paced, facilitator-supported skill building",
      duration: "2-4 weeks",
      size: "medium"
    },
    teamTrack: {
      name: "TEAM TRACK",
      pillar: "education",
      color: "bg-[#4A7CC9]",
      description: "Teams work on separate tasks with common timelines",
      duration: "2-4 weeks",
      size: "medium"
    },

    // Education & Experience - Venture (Teal family)
    soloVenture: {
      name: "SOLO VENTURE",
      pillar: "experience",
      color: "bg-[#25BCBD]",
      description: "Individual launches and runs a real micro-business",
      duration: "Semester",
      size: "long"
    },
    teamVenture: {
      name: "TEAM VENTURE",
      pillar: "experience",
      color: "bg-[#25BCBD]",
      description: "Team builds and operates a real business together",
      duration: "Semester",
      size: "long"
    },
    cohortVenture: {
      name: "COHORT VENTURE",
      pillar: "experience",
      color: "bg-[#1FA8A9]",
      description: "Entire cohort collaborates on a shared venture ecosystem",
      duration: "Semester",
      size: "long"
    },

    // Education & Experience - Client (Teal-Blue blend)
    clientGig: {
      name: "CLIENT GIG",
      pillar: "experience",
      color: "bg-[#2E9B9C]",
      description: "Student-scoped, part-time work for external client with minimal supervision",
      duration: "2-4 weeks",
      size: "medium"
    },
    clientProject: {
      name: "CLIENT PROJECT",
      pillar: "experience",
      color: "bg-[#2E9B9C]",
      description: "LE-scoped, facilitator-led, full-time team delivery for real client",
      duration: "4-8 weeks",
      size: "long"
    },
    clientHackathon: {
      name: "CLIENT HACKATHON",
      pillar: "experience",
      color: "bg-[#2E9B9C]",
      description: "1-7 days compressed build for external customer",
      duration: "1-7 days",
      size: "short"
    },

    // Education & Experience - Employer (Deep Blue family)
    apprenticeship: {
      name: "APPRENTICE-SHIP",
      pillar: "experience",
      color: "bg-[#1E3A5F]",
      description: "Clear work description, LE-supported placement inside an organization",
      duration: "4 weeks - 9 months",
      size: "long"
    },
    teamResidency: {
      name: "TEAM RESIDENCY",
      pillar: "experience",
      color: "bg-[#1E3A5F]",
      description: "Group of students with shared manager, shared deliverable, on-site",
      duration: "Semester",
      size: "long"
    },

    // Awareness - Self (Deep Blue/Purple family)
    conflexion: {
      name: "CONFLEX-ION",
      pillar: "awareness",
      color: "bg-[#160E44]",
      description: "Monthly publishing, personal reflection and meaning-making",
      duration: "Monthly",
      size: "ongoing"
    },
    careerBlueprint: {
      name: "CAREER BLUEPRINT",
      pillar: "awareness",
      color: "bg-[#2D1B69]",
      description: "Personal and career coaching sessions",
      duration: "Ongoing",
      size: "ongoing"
    },

    // Awareness - Community
    mastermind: {
      name: "MASTERMIND",
      pillar: "awareness",
      color: "bg-[#160E44]",
      description: "Fortnightly/weekly peer-led growth-oriented group sessions",
      duration: "Fortnightly",
      size: "ongoing"
    },
    meetup: {
      name: "MEETUP",
      pillar: "awareness",
      color: "bg-[#2D1B69]",
      description: "Guest or industry visit, student-led",
      duration: "As scheduled",
      size: "short"
    },
    storyTell: {
      name: "STORY TELL",
      pillar: "awareness",
      color: "bg-[#160E44]",
      description: "End of cycle debrief, sense-making, publishing",
      duration: "End of cycle",
      size: "short"
    },

    // Awareness - Events
    camp: {
      name: "CAMP",
      pillar: "awareness",
      color: "bg-[#3D2B7A]",
      description: "Workshop, camp, or travel - immersive experience",
      duration: "1-7 days",
      size: "short"
    },
    regen: {
      name: "REGEN",
      pillar: "awareness",
      color: "bg-[#3D2B7A]",
      description: "Industry networking event",
      duration: "1-2 days",
      size: "short"
    },
    storysellsWorkshop: {
      name: "STORYSELLS WORKSHOP",
      pillar: "awareness",
      color: "bg-[#3D2B7A]",
      description: "Engage and connect through storytelling",
      duration: "Half-day",
      size: "short"
    },

    // Evidence - Now part of Awareness (outline style)
    dailyCards: {
      name: "DAILY CARDS",
      pillar: "awareness",
      color: "bg-white border-2 border-black text-black",
      description: "Daily reflection cards",
      duration: "Daily",
      size: "medium"
    },
    storyBuild: {
      name: "STORY BUILD",
      pillar: "awareness",
      color: "bg-white border-2 border-black text-black",
      description: "Weekly hygiene, document and organize portfolio artifacts",
      duration: "Weekly",
      size: "medium"
    },
    docs: {
      name: "DOCS",
      pillar: "awareness",
      color: "bg-white border-2 border-black text-black",
      description: "Sheets, docs, presentations, code artifacts",
      duration: "Per deliverable",
      size: "medium"
    },
    assessmentOutputs: {
      name: "ASSESSMENT OUTPUTS",
      pillar: "awareness",
      color: "bg-white border-2 border-black text-black",
      description: "Formal assessment results and evaluation records",
      duration: "Per assessment",
      size: "medium"
    },
    testimonials: {
      name: "TESTIMONIALS",
      pillar: "awareness",
      color: "bg-white border-2 border-black text-black",
      description: "Letters, videos, posts from stakeholders",
      duration: "Per activity",
      size: "medium"
    },
    dataSets: {
      name: "DATA SET",
      pillar: "awareness",
      color: "bg-white border-2 border-black text-black",
      description: "Collected data, research findings, analytics",
      duration: "Per project",
      size: "medium"
    },
    media: {
      name: "MEDIA",
      pillar: "awareness",
      color: "bg-white border-2 border-black text-black",
      description: "Photos, video, audio documentation",
      duration: "Per deliverable",
      size: "medium"
    },

    // Assessments (Outline style)
    outcomes: {
      name: "OUTCOMES",
      pillar: "assessment",
      color: "bg-white border-2 border-black text-black",
      description: "Quarterly assessment based on program outcomes",
      duration: "Quarterly",
      size: "medium"
    },
    engagement: {
      name: "ENGAGEMENT",
      pillar: "assessment",
      color: "bg-white border-2 border-black text-black",
      description: "Fortnightly rating based on participation",
      duration: "Fortnightly",
      size: "medium"
    },
    progress: {
      name: "PROGRESS",
      pillar: "assessment",
      color: "bg-white border-2 border-black text-black",
      description: "Fortnightly rating based on publishing",
      duration: "Fortnightly",
      size: "medium"
    },
    selfPeerFacRating: {
      name: "SELF / PEER / FAC RATING",
      pillar: "assessment",
      color: "bg-white border-2 border-black text-black",
      description: "Rating on a scale of 1 to 5 from self, peers, and facilitator",
      duration: "Per activity",
      size: "medium"
    },
    industryRating: {
      name: "INDUSTRY RATING",
      pillar: "assessment",
      color: "bg-white border-2 border-black text-black",
      description: "Rating on a scale of 1 to 5 from industry partner",
      duration: "Per placement",
      size: "medium"
    },
    specific: {
      name: "SPECIFIC",
      pillar: "assessment",
      color: "bg-white border-2 border-black text-black",
      description: "End of activity assessment based on deliverables",
      duration: "Per activity",
      size: "medium"
    },
    quiz: {
      name: "QUIZ",
      pillar: "assessment",
      color: "bg-white border-2 border-black text-black",
      description: "Closed or open book quizzes for knowledge check",
      duration: "As needed",
      size: "medium"
    },

    // Roles (Dark Navy - High Contrast)
    facilitator: {
      name: "FACILITATOR",
      pillar: "role",
      color: "bg-[#1E1B4B]",
      description: "Full-time, sets cadence, standards, and calendar",
      duration: "Constant",
      size: "medium"
    },
    developer: {
      name: "DEVELOPER",
      pillar: "role",
      color: "bg-[#312E81]",
      description: "Develops re-usable experiences, playbooks, assets",
      duration: "Ongoing",
      size: "medium"
    },
    faculty: {
      name: "FACULTY",
      pillar: "role",
      color: "bg-[#1E1B4B]",
      description: "External, conducts a course or workshop",
      duration: "Per course",
      size: "medium"
    },
    mentor: {
      name: "MENTOR",
      pillar: "role",
      color: "bg-[#312E81]",
      description: "Hosts a project or venture with domain expertise",
      duration: "Per project",
      size: "medium"
    },
    expert: {
      name: "EXPERT",
      pillar: "role",
      color: "bg-[#1E1B4B]",
      description: "Supports a project or venture with domain expertise",
      duration: "As needed",
      size: "medium"
    },
    lighthouse: {
      name: "LIGHT-HOUSE",
      pillar: "role",
      color: "bg-[#0284C7]",
      description: "Inspiration and role modeling",
      duration: "Per event",
      size: "medium"
    },
    jury: {
      name: "JURY",
      pillar: "role",
      color: "bg-[#1E1B4B]",
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
        return 'rounded-lg'; // Standard rounded
      case 'awareness':
        return 'rounded-lg'; // Same as education
      case 'assessment':
        return 'rounded-full'; // Pill shape
      case 'role':
        return 'rounded-sm'; // Squared corners
      case 'evidence':
        return 'rounded-lg border-2 border-white/30'; // Outline style
      default:
        return 'rounded-lg';
    }
  };

  // Get width - standardized for all buttons
  const getWidthStyle = (size) => {
    // All buttons same size now
    return 'min-w-[120px]';
  };

  const ElementBadge = ({ elementKey, showSize = true }) => {
    const element = elements[elementKey];
    if (!element) return null;

    const shapeStyle = getShapeStyle(element.pillar);
    const widthStyle = showSize ? getWidthStyle(element.size) : '';

    return (
      <button
        onClick={() => setSelectedElement(selectedElement === elementKey ? null : elementKey)}
        className={`
          ${element.color} 
          ${shapeStyle}
          ${widthStyle}
          h-8 px-4 py-2
          text-xs font-bold
          transition-all hover:scale-105 hover:shadow-lg hover:brightness-110
          cursor-pointer 
          flex items-center justify-center
          shadow-md
          ${selectedElement === elementKey ? 'ring-2 ring-white ring-offset-2 ring-offset-[#160E44]' : ''}
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
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => setSelectedElement(null)}>
        <div className={`${element.color} rounded-2xl p-6 max-w-md w-full shadow-2xl border border-white/20`} onClick={e => e.stopPropagation()}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="text-white/70 text-xs uppercase tracking-wider font-medium">{pillarLabels[element.pillar]}</div>
              <div className="text-xl font-bold text-white mt-1">{element.name}</div>
            </div>
            <button onClick={() => setSelectedElement(null)} className="text-white/70 hover:text-white text-2xl leading-none">×</button>
          </div>
          <p className="text-white/90 mb-4 text-sm leading-relaxed">{element.description}</p>
          <div className="bg-white/20 rounded-lg px-3 py-2 inline-block">
            <span className="text-white/70 text-sm">Duration: </span>
            <span className="text-white font-semibold">{element.duration}</span>
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
      awareness: { bg: 'bg-gradient-to-r from-[#9CA3AF] via-[#6B7280] to-[#3663AD]', label: 'AWARENESS' },
    };
    const style = styles[type];
    return (
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-16 h-3 ${style.bg} rounded-sm`}></div>
        <span className="text-xs font-semibold text-white/80">{style.label}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0D0828] text-white">

      {/* Header with gradient like brand imagery */}
      <div className="bg-gradient-to-r from-[#3663AD] to-[#160E44] border-b border-white/10 p-6 text-center">
        <h1 className="text-3xl font-bold mb-1 tracking-tight">THE WORKING BBA</h1>
        <p className="text-[#25BCBD] italic text-lg">"Work is the Curriculum"</p>
      </div>

      {/* Tabs */}
      <div className="bg-[#160E44] border-b border-white/10">
        <div className="max-w-6xl mx-auto flex">
          {[
            { id: 'overview', label: 'Program Overview' },
            { id: 'comparison', label: 'Track Comparison' },
            { id: 'periodic', label: 'Periodic Table' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-semibold transition-colors ${activeTab === tab.id ? 'text-[#25BCBD] border-b-2 border-[#25BCBD]' : 'text-white/50 hover:text-white'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">

            {/* Year 1 Common Block */}
            <div>
              <div className="text-center mb-4">
                <div className="text-white/50 text-sm uppercase tracking-wider">Common Foundation</div>
                <h2 className="text-2xl font-bold text-[#25BCBD]">YEAR 1: GROWTH</h2>
                <p className="text-white/50 text-sm mt-1">Click any element to see details</p>
              </div>

              <div className="bg-[#1E1458] rounded-2xl p-6 border border-[#25BCBD]/30">

                {/* 3 Pillars Reference */}
                <div className="flex justify-center gap-8 mb-6 pb-4 border-b border-white/10">
                  <PillarIndicator type="education" />
                  <PillarIndicator type="experience" />
                  <PillarIndicator type="awareness" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                  {/* Challenges */}
                  <div className="bg-[#160E44]/50 rounded-xl p-4">
                    <div className="text-xs text-[#3663AD] uppercase tracking-wider mb-3 font-semibold">Primary Learning</div>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-white">12×</span>
                        <ElementBadge elementKey="soloChallenge" />
                      </div>
                      <div className="text-xs text-white/50 leading-relaxed">
                        Sales, Product Design, Design Thinking, Digital Marketing, Spreadsheets, Business Analysis, Accounting, UI/UX, Financial Analysis, E-Commerce, 3D Printing, Market Research
                      </div>
                    </div>
                  </div>

                  {/* Client Work */}
                  <div className="bg-[#160E44]/50 rounded-xl p-4">
                    <div className="text-xs text-[#25BCBD] uppercase tracking-wider mb-3 font-semibold">Client Exposure</div>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-white">1×</span>
                        <ElementBadge elementKey="clientProject" />
                      </div>
                    </div>
                  </div>

                  {/* Employer */}
                  <div className="bg-[#160E44]/50 rounded-xl p-4">
                    <div className="text-xs text-[#25BCBD] uppercase tracking-wider mb-3 font-semibold">Industry Immersion</div>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-white">1×</span>
                        <ElementBadge elementKey="apprenticeship" />
                      </div>
                      <div className="text-xs text-white/50">External firm</div>
                    </div>
                  </div>

                  {/* Coaching */}
                  <div className="bg-[#160E44]/50 rounded-xl p-4">
                    <div className="text-xs text-[#9CA3AF] uppercase tracking-wider mb-3 font-semibold">Self Awareness</div>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-white">4×</span>
                        <ElementBadge elementKey="careerBlueprint" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Continuous Elements */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="text-xs text-white/50 uppercase tracking-wider mb-3 font-semibold">Continuous Throughout Year 1</div>
                  <div className="flex flex-wrap gap-2">
                    <ElementBadge elementKey="mastermind" />
                    <ElementBadge elementKey="dailyCards" />
                    <ElementBadge elementKey="storyBuild" />
                    <ElementBadge elementKey="storyTell" />
                    <ElementBadge elementKey="storysellsWorkshop" />
                    <ElementBadge elementKey="regen" />
                    <ElementBadge elementKey="camp" />
                  </div>
                </div>

                {/* Roles */}
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="text-xs text-white/50 uppercase tracking-wider mb-3 font-semibold">Roles Engaged</div>
                  <div className="flex flex-wrap gap-2">
                    <ElementBadge elementKey="facilitator" />
                    <ElementBadge elementKey="faculty" />
                    <ElementBadge elementKey="mentor" />
                    <ElementBadge elementKey="jury" />
                  </div>
                </div>
              </div>
            </div>

            {/* Divergence */}
            <div className="text-center py-4">
              <div className="inline-flex items-center gap-4">
                <div className="h-px w-20 bg-white/20"></div>
                <span className="text-white/50 text-sm">Then choose your track →</span>
                <div className="h-px w-20 bg-white/20"></div>
              </div>
            </div>

            {/* Three Tracks Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: "ORIGINAL", color: "#3663AD", subtitle: "Entrepreneurial Careers", icon: "🏢", outcome: "Placed in entrepreneurial role" },
                { name: "BUSINESS FAMILIES", color: "#6B21A8", subtitle: "Join Family Business", icon: "👨👩👧👦", outcome: "Ready to contribute to family business" },
                { name: "SOLO-PRENEURS", color: "#25BCBD", subtitle: "Launch Own Venture", icon: "🚀", outcome: "Venture launched & operational" },
              ].map((track, i) => (
                <div key={i}
                  className="rounded-xl p-5 text-center border"
                  style={{
                    backgroundColor: `${track.color}20`,
                    borderColor: `${track.color}50`
                  }}>
                  <div className="text-4xl mb-2">{track.icon}</div>
                  <div className="font-bold text-lg">{track.name}</div>
                  <div className="text-white/50 text-sm mb-3">{track.subtitle}</div>
                  <div className="text-sm px-3 py-1 rounded-full inline-block font-medium"
                    style={{ backgroundColor: `${track.color}40` }}>
                    {track.outcome}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: COMPARISON */}
        {activeTab === 'comparison' && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold">Track Comparison</h2>
              <p className="text-white/50 text-sm">Click any element to see details • Differences highlighted</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="bg-[#0D0828] p-4 text-left border border-white/10 w-32"></th>
                    <th className="bg-[#3663AD] p-4 text-center border border-white/10">
                      <div className="text-2xl mb-1">🏢</div>
                      <div className="font-bold">ORIGINAL</div>
                      <div className="text-sm text-white/70">Entrepreneurial Careers</div>
                    </th>
                    <th className="bg-[#6B21A8] p-4 text-center border border-white/10">
                      <div className="text-2xl mb-1">👨👩👧👦</div>
                      <div className="font-bold">BUSINESS FAMILIES</div>
                      <div className="text-sm text-white/70">Join Family Business</div>
                    </th>
                    <th className="bg-[#0F766E] p-4 text-center border border-white/10">
                      <div className="text-2xl mb-1">🚀</div>
                      <div className="font-bold">SOLO-PRENEURS</div>
                      <div className="text-sm text-white/70">Launch Own Venture</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Year 1 */}
                  <tr>
                    <td className="bg-[#25BCBD] p-3 font-bold border border-white/10 text-center text-[#160E44]" colSpan="4">
                      YEAR 1: GROWTH (Common)
                    </td>
                  </tr>
                  <tr>
                    <td className="bg-[#1E1458] p-3 border border-white/10 text-sm text-white/50">Primary</td>
                    <td className="bg-[#160E44] p-3 border border-white/10 text-center" colSpan="3">
                      <div className="flex flex-wrap justify-center gap-2 items-center">
                        <span className="text-white mr-1">12×</span>
                        <ElementBadge elementKey="soloChallenge" showSize={false} />
                        <span className="text-white/50 mx-1">+</span>
                        <ElementBadge elementKey="clientProject" showSize={false} />
                        <span className="text-white/50 mx-1">+</span>
                        <ElementBadge elementKey="apprenticeship" showSize={false} />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="bg-[#1E1458] p-3 border border-white/10 text-sm text-white/50">Coaching</td>
                    <td className="bg-[#160E44] p-3 border border-white/10 text-center" colSpan="3">
                      <div className="flex justify-center items-center gap-2">
                        <span className="text-white">4×</span>
                        <ElementBadge elementKey="careerBlueprint" showSize={false} />
                      </div>
                    </td>
                  </tr>

                  {/* Year 2 */}
                  <tr>
                    <td className="bg-[#3663AD] p-3 font-bold border border-white/10 text-center" colSpan="4">
                      YEAR 2: PROJECTS (Differences Begin)
                    </td>
                  </tr>
                  <tr>
                    <td className="bg-[#1E1458] p-3 border border-white/10 text-sm text-white/50">Apprenticeships</td>
                    <td className="bg-[#160E44] p-3 border border-white/10 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-white text-sm">2× External</span>
                        <ElementBadge elementKey="apprenticeship" showSize={false} />
                      </div>
                    </td>
                    <td className="bg-[#6B21A8]/20 p-3 border border-[#6B21A8]/50 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-white text-sm">1× External</span>
                        <span className="text-[#A855F7] font-semibold text-xs">+ 1× Other Family's Business ★</span>
                        <ElementBadge elementKey="apprenticeship" showSize={false} />
                      </div>
                    </td>
                    <td className="bg-[#0F766E]/20 p-3 border border-[#0F766E]/50 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-white text-sm">1× External only</span>
                        <ElementBadge elementKey="apprenticeship" showSize={false} />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="bg-[#1E1458] p-3 border border-white/10 text-sm text-white/50">Venture</td>
                    <td className="bg-[#160E44] p-3 border border-white/10 text-center text-white/30">—</td>
                    <td className="bg-[#160E44] p-3 border border-white/10 text-center text-white/30">—</td>
                    <td className="bg-[#0F766E]/20 p-3 border border-[#0F766E]/50 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-[#25BCBD] font-semibold text-xs">1× ★</span>
                        <ElementBadge elementKey="soloVenture" showSize={false} />
                        <span className="text-white/50 text-xs">or Team Venture</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="bg-[#1E1458] p-3 border border-white/10 text-sm text-white/50">Client Work</td>
                    <td className="bg-[#160E44] p-3 border border-white/10 text-center" colSpan="3">
                      <div className="flex justify-center items-center gap-2">
                        <span className="text-white">2×</span>
                        <ElementBadge elementKey="clientProject" showSize={false} />
                      </div>
                    </td>
                  </tr>

                  {/* Year 3 */}
                  <tr>
                    <td className="bg-[#E07B54] p-3 font-bold border border-white/10 text-center text-white" colSpan="4">
                      YEAR 3: WORK (Major Differentiation)
                    </td>
                  </tr>
                  <tr>
                    <td className="bg-[#1E1458] p-3 border border-white/10 text-sm text-white/50">Primary (9-mo)</td>
                    <td className="bg-[#3663AD]/20 p-3 border border-[#3663AD]/50 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <ElementBadge elementKey="apprenticeship" showSize={false} />
                        <span className="text-white/50 text-xs">OR</span>
                        <ElementBadge elementKey="soloVenture" showSize={false} />
                      </div>
                    </td>
                    <td className="bg-[#6B21A8]/20 p-3 border border-[#6B21A8]/50 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <ElementBadge elementKey="apprenticeship" showSize={false} />
                        <span className="text-[#A855F7] font-semibold text-xs">in OWN FAMILY BUSINESS ★</span>
                        <span className="text-white/50 text-xs">OR</span>
                        <ElementBadge elementKey="clientProject" showSize={false} />
                        <span className="text-[#A855F7] text-xs">(family as client)</span>
                      </div>
                    </td>
                    <td className="bg-[#0F766E]/20 p-3 border border-[#0F766E]/50 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <ElementBadge elementKey="soloVenture" showSize={false} />
                        <span className="text-[#25BCBD] font-semibold text-xs">Full Focus ★</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="bg-[#1E1458] p-3 border border-white/10 text-sm text-white/50">Coaching Focus</td>
                    <td className="bg-[#3663AD]/20 p-3 border border-[#3663AD]/50 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-white text-sm">6×</span>
                        <ElementBadge elementKey="careerBlueprint" showSize={false} />
                        <span className="text-[#3663AD] text-xs font-semibold">Career Transition</span>
                      </div>
                    </td>
                    <td className="bg-[#6B21A8]/20 p-3 border border-[#6B21A8]/50 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-white text-sm">6×</span>
                        <ElementBadge elementKey="careerBlueprint" showSize={false} />
                        <span className="text-[#A855F7] text-xs font-semibold">Succession ★</span>
                        <span className="text-[#A855F7] text-xs">(joint with family)</span>
                      </div>
                    </td>
                    <td className="bg-[#0F766E]/20 p-3 border border-[#0F766E]/50 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-white text-sm">6×</span>
                        <ElementBadge elementKey="careerBlueprint" showSize={false} />
                        <span className="text-[#25BCBD] text-xs font-semibold">Venture Launch/Scale ★</span>
                      </div>
                    </td>
                  </tr>

                  {/* Outcome */}
                  <tr>
                    <td className="bg-[#1E1458] p-3 font-bold border border-white/10 text-sm">OUTCOME</td>
                    <td className="bg-[#3663AD] p-3 border border-white/10 text-center font-semibold text-sm">
                      Placed in entrepreneurial role
                    </td>
                    <td className="bg-[#6B21A8] p-3 border border-white/10 text-center font-semibold text-sm">
                      Ready to contribute to family business
                    </td>
                    <td className="bg-[#0F766E] p-3 border border-white/10 text-center font-semibold text-sm">
                      Venture launched & operational
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="text-center text-white/50 text-sm">
              ★ = Key differentiator from Original track
            </div>
          </div>
        )}

        {/* TAB 3: PERIODIC TABLE */}
        {activeTab === 'periodic' && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold">LE Periodic Table of Experiences</h2>
              <p className="text-white/50 text-sm">Click any element to see details • Width indicates relative duration</p>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-6 mb-6 p-4 bg-[#1E1458] rounded-xl">
              <div className="flex items-center gap-2">
                <div className="w-10 h-5 bg-gradient-to-r from-[#3663AD] to-[#4A7CC9] rounded-lg"></div>
                <span className="text-xs text-white/70">Education</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-5 bg-gradient-to-r from-[#25BCBD] to-[#2E9B9C] rounded-lg"></div>
                <span className="text-xs text-white/70">Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-5 bg-gradient-to-r from-[#160E44] to-[#3D2B7A] rounded-lg"></div>
                <span className="text-xs text-white/70">Awareness</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-5 bg-white border-2 border-black rounded-full"></div>
                <span className="text-xs text-white/70">Assessments</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-5 bg-[#1E1B4B] rounded-sm"></div>
                <span className="text-xs text-white/70">Roles</span>
              </div>
            </div>

            {/* EDUCATION & EXPERIENCE */}
            <div className="bg-[#1E1458] rounded-xl p-5">
              <h3 className="text-lg font-bold mb-4 text-[#3663AD] border-b border-white/10 pb-2">EDUCATION & EXPERIENCE</h3>

              {/* Header row */}
              <div className="grid grid-cols-6 gap-3 mb-3">
                <div></div>
                <div className="text-xs text-[#3663AD] text-center p-2 font-semibold">COURSE</div>
                <div className="text-xs text-[#3663AD] text-center p-2 font-semibold">CHALLENGE</div>
                <div className="text-xs text-[#25BCBD] text-center p-2 font-semibold">BUSINESS</div>
                <div className="text-xs text-[#25BCBD] text-center p-2 font-semibold">CLIENT</div>
                <div className="text-xs text-[#25BCBD] text-center p-2 font-semibold">EMPLOYER</div>
              </div>

              {/* COHORT row */}
              <div className="grid grid-cols-6 gap-3 mb-3 items-center">
                <div className="text-xs text-white/50 text-right pr-2 font-semibold">COHORT</div>
                <div className="flex justify-center"><ElementBadge elementKey="course" /></div>
                <div className="flex justify-center"><ElementBadge elementKey="cohortChallenge" /></div>
                <div className="flex justify-center"><ElementBadge elementKey="cohortVenture" /></div>
                <div className="flex justify-center"><ElementBadge elementKey="clientHackathon" /></div>
                <div className="flex justify-center text-white/20">—</div>
              </div>

              {/* TEAM row */}
              <div className="grid grid-cols-6 gap-3 mb-3 items-center">
                <div className="text-xs text-white/50 text-right pr-2 font-semibold">TEAM</div>
                <div className="flex justify-center"><ElementBadge elementKey="teamTrack" /></div>
                <div className="flex justify-center"><ElementBadge elementKey="teamChallenge" /></div>
                <div className="flex justify-center"><ElementBadge elementKey="teamVenture" /></div>
                <div className="flex justify-center"><ElementBadge elementKey="clientProject" /></div>
                <div className="flex justify-center"><ElementBadge elementKey="teamResidency" /></div>
              </div>

              {/* SOLO/DUO row */}
              <div className="grid grid-cols-6 gap-3 items-center">
                <div className="text-xs text-white/50 text-right pr-2 font-semibold">SOLO/DUO</div>
                <div className="flex justify-center"><ElementBadge elementKey="skillTrack" /></div>
                <div className="flex justify-center"><ElementBadge elementKey="soloChallenge" /></div>
                <div className="flex justify-center"><ElementBadge elementKey="soloVenture" /></div>
                <div className="flex justify-center"><ElementBadge elementKey="clientGig" /></div>
                <div className="flex justify-center"><ElementBadge elementKey="apprenticeship" /></div>
              </div>
            </div>

            {/* AWARENESS & PORTFOLIO */}
            <div className="bg-[#1E1458] rounded-xl p-5">
              <h3 className="text-lg font-bold mb-4 text-[#9CA3AF] border-b border-white/10 pb-2">AWARENESS & PORTFOLIO</h3>

              {/* Header row */}
              <div className="grid grid-cols-5 gap-3 mb-3">
                <div></div>
                <div className="text-xs text-[#9CA3AF] text-center p-2 font-semibold">SELF</div>
                <div className="text-xs text-[#9CA3AF] text-center p-2 font-semibold">CAREER</div>
                <div className="text-xs text-[#9CA3AF] text-center p-2 font-semibold">STORY-SELLS</div>
                <div className="text-xs text-[#9CA3AF] text-center p-2 font-semibold">EVIDENCE</div>
              </div>

              {/* COHORT row */}
              <div className="grid grid-cols-5 gap-3 mb-3 items-center">
                <div className="text-xs text-white/50 text-right pr-2 font-semibold">COHORT</div>
                <div className="flex justify-center"><ElementBadge elementKey="camp" /></div>
                <div className="flex justify-center"><ElementBadge elementKey="regen" /></div>
                <div className="flex justify-center"><ElementBadge elementKey="storysellsWorkshop" /></div>
                <div className="flex justify-center"><ElementBadge elementKey="dailyCards" /></div>
              </div>

              {/* TEAM row */}
              <div className="grid grid-cols-5 gap-3 mb-3 items-center">
                <div className="text-xs text-white/50 text-right pr-2 font-semibold">TEAM</div>
                <div className="flex justify-center"><ElementBadge elementKey="mastermind" /></div>
                <div className="flex justify-center"><ElementBadge elementKey="meetup" /></div>
                <div className="flex justify-center"><ElementBadge elementKey="storyTell" /></div>
                <div className="flex justify-center"><ElementBadge elementKey="docs" /></div>
              </div>

              {/* SOLO row */}
              <div className="grid grid-cols-5 gap-3 items-center">
                <div className="text-xs text-white/50 text-right pr-2 font-semibold">SOLO</div>
                <div className="flex justify-center"><ElementBadge elementKey="conflexion" /></div>
                <div className="flex justify-center"><ElementBadge elementKey="careerBlueprint" /></div>
                <div className="flex justify-center"><ElementBadge elementKey="storyBuild" /></div>
                <div className="flex justify-center"><ElementBadge elementKey="media" /></div>
              </div>
            </div>

            {/* ASSESSMENTS */}
            <div className="bg-[#1E1458] rounded-xl p-5">
              <h3 className="text-lg font-bold mb-4 text-white border-b border-white/10 pb-2">ASSESSMENTS</h3>

              {/* Row 1 */}
              <div className="grid grid-cols-4 gap-3 mb-3">
                <div className="flex justify-center"><ElementBadge elementKey="selfPeerFacRating" /></div>
                <div className="flex justify-center"><ElementBadge elementKey="industryRating" /></div>
                <div className="flex justify-center"><ElementBadge elementKey="quiz" /></div>
                <div className="flex justify-center"><ElementBadge elementKey="testimonials" /></div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-4 gap-3">
                <div className="flex justify-center"><ElementBadge elementKey="outcomes" /></div>
                <div className="flex justify-center"><ElementBadge elementKey="engagement" /></div>
                <div className="flex justify-center"><ElementBadge elementKey="progress" /></div>
                <div className="flex justify-center"><ElementBadge elementKey="specific" /></div>
              </div>
            </div>

            {/* ROLES */}
            <div className="bg-[#1E1458] rounded-xl p-5">
              <h3 className="text-lg font-bold mb-4 text-[#8B5CF6] border-b border-white/10 pb-2">ROLES</h3>

              {/* Row 1 */}
              <div className="grid grid-cols-4 gap-3 mb-3">
                <div className="flex justify-center"><ElementBadge elementKey="facilitator" /></div>
                <div className="flex justify-center"><ElementBadge elementKey="developer" /></div>
                <div className="flex justify-center"><ElementBadge elementKey="faculty" /></div>
                <div className="flex justify-center text-white/20">—</div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-4 gap-3">
                <div className="flex justify-center"><ElementBadge elementKey="jury" /></div>
                <div className="flex justify-center"><ElementBadge elementKey="lighthouse" /></div>
                <div className="flex justify-center"><ElementBadge elementKey="expert" /></div>
                <div className="flex justify-center"><ElementBadge elementKey="mentor" /></div>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* Element Detail Modal */}
      <ElementModal />
    </div>
  );
}
