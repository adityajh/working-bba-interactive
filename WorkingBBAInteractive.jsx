import { useState, useEffect } from 'react';
import './ProgramTabs.css';
import './LightMode.css';

const ProgramInvestment = () => {
  const [feesData, setFeesData] = useState(null);

  useEffect(() => {
    fetch('/program_fees.md')
      .then(res => res.text())
      .then(text => setFeesData(text))
      .catch(console.error);
  }, []);

  if (!feesData) {
    return <div className="p-8 text-center text-white opacity-50">Loading comparison...</div>;
  }

  const lines = feesData.split('\n');
  const tables = [];
  let currentTable = null;
  const otherContent = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim().startsWith('|')) {
      if (!currentTable) {
        currentTable = [];
        tables.push(currentTable);
      }
      if (!line.includes('---')) {
        const cells = line.split('|').map(cell => cell.trim()).filter((cell, index, arr) => index !== 0 && index !== arr.length - 1);
        currentTable.push(cells);
      }
    } else {
      currentTable = null;
      otherContent.push(line);
    }
  }

  return (
    <div className="pt-compareTracks p-4 md:p-8 animate-fade-in fade-in-up pb-[100px]">
      <div className="mb-10 text-center">
        <h2 style={{ fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 900, margin: 0, lineHeight: 1.1, textTransform: 'uppercase' }} className="text-white">Program Investment & Comparison</h2>
        <div style={{ marginTop: '12px', fontSize: '16px', opacity: 0.8, fontWeight: 400 }} className="max-w-2xl mx-auto">
          Compare the three Working BBA programs side-by-side to understand the different outcomes, deliverables, and fees.
        </div>
      </div>

      {tables.map((tableRows, tableIdx) => {
        const isDifferencesTable = tableRows[0][0]?.includes('Year');
        const title = isDifferencesTable ? "Program Differences (Deliverables)" : "Investment (Fees 2026)";

        return (
          <div key={tableIdx} className="mb-16">
            <h2 className="mb-6 text-[#25BCBD] font-black text-xl md:text-2xl uppercase text-center md:text-left px-2">{title}</h2>
            <div className="overflow-x-auto rounded-xl shadow-2xl pt-tableWrap" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
              <table className="w-full text-left border-collapse table-fixed">
                <thead>
                  {tableRows.length > 0 && (
                    <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
                      {tableRows[0].map((header, idx) => (
                        <th key={idx} className={`p-4 md:p-5 font-bold text-[#c1cbf5] border-b border-[rgba(255,255,255,0.1)] text-xs md:text-sm ${idx === 0 ? 'w-[20%] md:w-[25%]' : 'w-[26.6%] md:w-[25%]'}`}>{header}</th>
                      ))}
                    </tr>
                  )}
                </thead>
                <tbody>
                  {tableRows.slice(1).map((row, rowIdx) => {
                    const isTotalFees = row[0]?.includes('Total Fees');
                    const isOutcome = row[0]?.includes('Outcome');

                    return (
                      <tr key={rowIdx} className="hover:bg-[rgba(255,255,255,0.04)] transition-colors group">
                        {row.map((cell, idx) => {
                          let cssClasses = `p-3 md:p-4 border-b border-[rgba(255,255,255,0.05)] text-[13px] md:text-sm leading-relaxed align-top `;

                          // Text wrapping and breaking for mobile
                          cssClasses += (isOutcome || isDifferencesTable) ? 'whitespace-normal break-words hyphens-auto ' : '';

                          if (isTotalFees) {
                            cssClasses += idx === 0 ? 'font-bold text-white text-sm md:text-base ' : 'font-extrabold text-[#25BCBD] text-base md:text-xl drop-shadow-[0_0_8px_rgba(37,188,189,0.5)] ';
                          } else {
                            cssClasses += idx === 0 ? 'font-semibold text-white ' : 'text-gray-300 group-hover:text-white ';
                          }
                          return (
                            <td
                              key={idx}
                              className={cssClasses}
                              dangerouslySetInnerHTML={{ __html: cell.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
                            />
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}

      <div className="text-gray-300 space-y-4 max-w-4xl mx-auto">
        {otherContent.map((line, idx) => {
          if (line.includes('Program Differences') || line.includes('Investment (Fees')) return null;
          if (line.startsWith('### ')) return <h3 key={idx} className="mt-10 mb-5 text-[#3663AD] font-bold text-lg md:text-xl uppercase tracking-wide border-b border-[rgba(255,255,255,0.1)] pb-2">{line.replace('### ', '')}</h3>;
          if (line.startsWith('## ')) return <h2 key={idx} className="mt-14 mb-8 text-[#25BCBD] font-black text-xl md:text-2xl uppercase">{line.replace('## ', '')}</h2>;
          if (line.startsWith('# ')) return null;
          if (line.startsWith('- ')) return <li key={idx} className="ml-6 mb-3 text-sm md:text-[15px] leading-relaxed marker:text-[#25BCBD]" dangerouslySetInnerHTML={{ __html: line.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} />;
          if (line.trim() === '') return null;
          if (line.match(/^\d+\./)) {
            return <div key={idx} className="mb-4 pl-4 text-sm md:text-[15px] leading-relaxed border-l-2 border-[#1e88b8]" dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} />;
          }
          return <p key={idx} className="mb-4 opacity-90 text-sm md:text-[15px] leading-relaxed">{line}</p>;
        })}
      </div>
    </div>
  );
};

export default function WorkingBBAInteractive() {
  const [selectedElement, setSelectedElement] = useState(null);
  const [activeTab, setActiveTab] = useState('job'); // job | family | venture | compare | periodic
  const [isDarkMode, setIsDarkMode] = useState(true); // true = dark, false = light
  const [audience, setAudience] = useState('student'); // 'parent' | 'student'
  const [bookingModal, setBookingModal] = useState(null); // null | { section, label }

  const openBooking = (section, label) => setBookingModal({ section, label });
  const closeBooking = () => setBookingModal(null);

  // Theme auto-switch based on audience
  useEffect(() => {
    setIsDarkMode(audience === 'student');
  }, [audience]);

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
      description: "Individual launches and runs a micro-business",
      duration: "Semester",
      size: "long"
    },
    teamVenture: {
      name: "TEAM VENTURE",
      pillar: "experience",
      color: "bg-[#3663AD]",
      description: "Team builds and operates a business together",
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
      description: "LE-scoped, facilitator-led, full-time team delivery for clients",
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
      name: "CONFLEXION",
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
      description: "Students will be able to make informed career decisions based on self-awareness, market understanding, and reflective practice. They will present themselves through a strong body of work, communicate professionally with diverse stakeholders, and conduct themselves with responsibility, ethics, and personal leadership in professional environments.",
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
    <div className={`pt-scope ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      <div className="pt-wrap">
        {/* HEADER */}
        <header className="pt-top">
          <div className="pt-brand">
            <div className="pt-logo" aria-label="Let's Enterprise logo">
              <img
                src="/Let's-Enterprise-Final-Logo_PNG.png"
                alt="Let's Enterprise"
                style={{ height: '62px', width: 'auto', filter: 'none' }}
              />
            </div>
            {/* Audience Toggle — inline with logo */}
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
          </div>

          <div>
            <h1 className="pt-headline">India’s First Working BBA</h1>
            <div className="pt-sub">
              <strong>Work is the Curriculum.</strong> A 3-year business program where students learn by working—faster than any traditional BBA.
              <br /><br />
              Graduate with a Working BBA Program (Let's Enterprise) + UGC Approved Online University BBA Degree
            </div>
            <div className="pt-chips" aria-label="Program pillars">
              <span className="pt-chip"><span className="pt-dot" style={{ background: 'var(--c6)' }}></span> Client Projects</span>
              <span className="pt-chip"><span className="pt-dot" style={{ background: 'var(--c4)', boxShadow: '0 0 0 3px rgba(30,136,184,.18)' }}></span> Apprenticeships</span>
              <span className="pt-chip"><span className="pt-dot" style={{ background: 'var(--c2)' }}></span> Business Knowledge</span>
              <span className="pt-chip"><span className="pt-dot" style={{ background: '#fff', boxShadow: '0 0 0 3px rgba(255,255,255,.12)' }}></span> Proof of Work Portfolio</span>
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
              Working BBA — Family Business
            </button>
            <button
              className="pt-tabBtn"
              data-active={activeTab === 'venture'}
              onClick={() => setActiveTab('venture')}
            >
              Working BBA — Venture Builder
            </button>
            <button
              className="pt-tabBtn"
              data-active={activeTab === 'compare'}
              onClick={() => setActiveTab('compare')}
            >
              Program Investment
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
          {activeTab === 'venture' && <ProgramView programKey="venture" audience={audience} onCTA={openBooking} />}
          {activeTab === 'compare' && <ProgramInvestment />}

          {/* TAB 3: PERIODIC TABLE (Existing Integration) */}
          {activeTab === 'periodic' && (
            <div className="space-y-6">

              {/* HOW IT WORKS — CAPABILITY CARDS */}
              <div className="pt-osExplainer mb-6">
                <h2 style={{ fontSize: 19, fontWeight: 800, marginBottom: 6 }} className="hiw-heading">How It Works</h2>
                <p className="hiw-intro" style={{ fontSize: '14px', lineHeight: 1.5, maxWidth: '720px', margin: '0 0 16px', opacity: 0.85 }}>
                  {audience === 'parent'
                    ? 'One integrated system that tracks and connects every part of your child\u2019s education and work experience—complete transparency, zero gaps.'
                    : 'One integrated system that tracks and connects every part of your education and work experience—complete transparency, zero gaps.'}
                </p>
              </div>

              {/* 6 Capability Cards */}
              <div className="hiw-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 10 }}>
                {[
                  { icon: '\ud83d\udd27', title: 'Work Discipline', desc: 'Students build adult habits: punctuality, follow-through, hygiene, and weekly delivery. Not vibes. Not motivation. Output.' },
                  { icon: '\ud83d\udde3\ufe0f', title: 'Communication Under Pressure', desc: 'Updates, follow-ups, presentations, stakeholder calls—done repeatedly. They learn to speak clearly even when nervous.' },
                  { icon: '\ud83d\udcca', title: 'Business Execution', desc: 'Sales, operations, research, basic finance thinking, and structured problem-solving—done through challenges and projects.' },
                  { icon: '\ud83d\udcc1', title: 'Proof-Based Portfolio', desc: 'Everything is documented: docs, media, testimonials, feedback scores, and project outcomes. Proof beats potential.' },
                  { icon: '\ud83d\udd04', title: 'Feedback Loops (Not Exams)', desc: 'Assessment happens through supervisors, clients, peers, facilitators—and professional deliverables. They improve by being evaluated, not by cramming.' },
                  { icon: '\ud83e\udded', title: 'Career Clarity Through Work', desc: 'Students don\u2019t \u201cchoose\u201d blindly. They experience roles, environments, and expectations—then decide with evidence.' }
                ].map((card, i) => (
                  <div key={i} className="hiw-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontSize: 23, lineHeight: 1 }}>{card.icon}</span>
                      <h4 className="hiw-card-title" style={{ fontSize: 14, fontWeight: 800, margin: 0 }}>{card.title}</h4>
                    </div>
                    <p className="hiw-card-desc" style={{ fontSize: 13, lineHeight: 1.45, margin: 0, opacity: 0.75 }}>{card.desc}</p>
                  </div>
                ))}
              </div>

              {/* Typical Week Schedule */}
              <div className="hiw-section" style={{ borderRadius: 12, padding: '16px 20px', marginTop: 14 }}>
                <h4 className="hiw-section-title" style={{ fontSize: 15, fontWeight: 800, marginBottom: 10 }}>📅 A Typical Week</h4>
                <p className="hiw-section-subtitle" style={{ fontSize: 13, fontWeight: 700, color: '#25BCBD', marginBottom: 10 }}>Monday to Friday: 10:00 AM – 5:00 PM &nbsp;|&nbsp; Saturday: 10:00 AM – 1:00 PM</p>
                <div className="hiw-week-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 8 }}>
                  {[
                    { day: 'Mon', items: ['Challenge / Project sprint', 'Team stand-up', 'Work blocks (3–4 hrs)', 'Daily Card reflection'] },
                    { day: 'Tue', items: ['Skill track deep-work', 'Client project sessions', 'Peer review & feedback', 'Daily Card reflection'] },
                    { day: 'Wed', items: ['Challenge sprint contd.', 'Masterminds / Coaching', 'Portfolio documentation', 'Daily Card reflection'] },
                    { day: 'Thu', items: ['Apprenticeship prep', 'Stakeholder updates', 'Self-study blocks', 'Daily Card reflection'] },
                    { day: 'Fri', items: ['Weekly deliverable wrap', 'Presentation prep', 'Feedback debrief', 'Daily Card reflection'] },
                    { day: 'Sat', items: ['Student presentations', 'Industry jury review', 'Weekly progress score'] }
                  ].map((d, i) => (
                    <div key={i} className="hiw-day-card" style={{ borderRadius: 8, padding: '10px', textAlign: 'center' }}>
                      <div style={{ fontSize: 13, fontWeight: 900, marginBottom: 6, color: '#25BCBD' }}>{d.day}</div>
                      {d.items.map((item, j) => (
                        <div key={j} className="hiw-day-item" style={{ fontSize: 11, lineHeight: 1.35, marginBottom: 3, opacity: 0.8 }}>{item}</div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Comparison Table */}
              <div className="hiw-section hiw-comparison" style={{ borderRadius: 12, overflow: 'hidden', marginTop: 14 }}>
                <h4 className="hiw-section-title" style={{ padding: '12px 16px 8px', margin: 0, fontSize: 15, fontWeight: 800, letterSpacing: '.3px', textTransform: 'uppercase' }}>Working BBA vs Typical BBA</h4>
                {/* Table Header */}
                <div className="hiw-table-header" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr 1.5fr' }}>
                  <div style={{ padding: '8px 12px', fontSize: 12, fontWeight: 800, opacity: 0.6 }}></div>
                  <div style={{ padding: '8px 12px', fontSize: 12, fontWeight: 800, color: '#25BCBD', borderLeft: '1px solid var(--hiw-border)' }}>Working BBA</div>
                  <div style={{ padding: '8px 12px', fontSize: 12, fontWeight: 800, opacity: 0.5, borderLeft: '1px solid var(--hiw-border)' }}>Typical BBA</div>
                </div>
                <div>
                  {[
                    { feature: 'Curriculum', le: 'Work + challenges + projects', typical: 'Mostly classroom theory' },
                    { feature: 'Proof', le: 'Portfolio + feedback + references', typical: 'Marksheets + exams' },
                    { feature: 'Accountability', le: 'Deadlines + reviews + delivery', typical: 'Attendance + exams' },
                    { feature: 'Skill-building', le: 'Repetition under industry pressure', typical: 'Limited output cycles' },
                    { feature: 'Parent visibility', le: 'Ongoing evidence + progress signals', typical: 'Syllabus + grades' },
                    { feature: 'Outcome', le: 'Work-ready capability', typical: 'Degree + uncertain readiness' }
                  ].map((row, i) => (
                    <div key={i} className="hiw-table-row" style={{
                      display: 'grid', gridTemplateColumns: '1fr 1.5fr 1.5fr',
                      borderTop: '1px solid var(--hiw-border)'
                    }}>
                      <div style={{ padding: '8px 12px', fontSize: 13, fontWeight: 700 }}>{row.feature}</div>
                      <div style={{ padding: '8px 12px', fontSize: 13, fontWeight: 600, color: '#25BCBD', borderLeft: '1px solid var(--hiw-border)' }}>{row.le}</div>
                      <div className="hiw-typical" style={{ padding: '8px 12px', fontSize: 13, fontWeight: 500, opacity: 0.55, borderLeft: '1px solid var(--hiw-border)' }}>{row.typical}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Proof Quotes */}
              <div className="hiw-section hiw-quotes" style={{ borderRadius: 12, padding: '16px 20px', marginTop: 14 }}>
                <h4 style={{ fontSize: 14, fontWeight: 800, color: '#25BCBD', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '.3px' }}>What students say</h4>
                {[
                  '\u201cI used to wait for instructions. Now I just start.\u201d',
                  '\u201cIt\u2019s not easy. But it feels authentic.\u201d',
                  '\u201cDeadlines changed me. I don\u2019t like it\u2026 but I needed it.\u201d',
                  '\u201cI still get nervous. I just do it anyway.\u201d',
                  '\u201cMy parents stopped asking \u2018what are you studying?\u2019 Now they ask \u2018what did you build this week?\u2019\u201d'
                ].map((quote, i) => (
                  <div key={i} style={{ marginBottom: i < 4 ? 8 : 0, paddingLeft: 10, borderLeft: '3px solid rgba(37,188,189,.30)' }}>
                    <span className="hiw-quote-text" style={{ fontSize: 13, fontWeight: 500, fontStyle: 'italic', opacity: 0.85 }}>{quote}</span>
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
          <p style={{ color: '#fff' }}>
            {audience === 'parent'
              ? <><strong style={{ color: '#25BCBD' }}>Students graduate with</strong> recognised BBA degree + a portfolio of 5 shipped client projects, 15 months of work experiences, and industry connections — not just a marksheet</>
              : <><strong style={{ color: '#25BCBD' }}>You graduate with</strong> a recognised BBA degree + a portfolio of 5 shipped client projects, 15 months of work experiences, and industry connections — not just a marksheet</>
            }
          </p>
        </div>
      </div >

      {/* Element Detail Modal */}
      < ElementModal />

      {/* ===================== BOOKING MODAL ===================== */}
      {
        bookingModal && (() => {
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
        })()
      }
    </div >
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
  { num: '02', name: 'Product Design', sub: 'Build things people want.', desc: 'User needs, prototyping, iteration—students learn to design solutions that solve business problems.' },
  { num: '03', name: 'Design Thinking', sub: 'Think like a problem solver.', desc: 'Empathy, ideation, testing—structured frameworks for tackling ambiguous challenges.' },
  { num: '04', name: 'Digital Marketing', sub: 'Get attention. Drive action.', desc: 'Campaigns, content, analytics—students learn to reach audiences and measure what works.' },
  { num: '05', name: 'Business Analysis', sub: 'Turn data into decisions.', desc: 'Requirements, process mapping, stakeholder alignment—how to analyze and recommend solutions.' },
  { num: '06', name: 'Sales & Outreach', sub: 'Rejection is training.', desc: 'Pitching, follow-ups, closing—confidence is built through repetition and professional conversations.' },
  { num: '07', name: 'User Research', sub: 'Learn to see the market.', desc: 'Interviews, insights, patterns—then turn research into decisions and actions.' },
  { num: '08', name: 'Accounting & Financial Analysis', sub: 'Become numerate enough to be trusted.', desc: 'P&L, cash flow, margins, decision math—applied financial thinking, not theory.' },
  { num: '09', name: 'Spreadsheets', sub: 'Master the tool of business.', desc: 'Formulas, data modeling, dashboards—students build fluency in the language of work.' }
];

// CTA copy per section × audience
const ctaCopy = {
  hero: { parent: 'See if your child is a fit', student: 'See if you\u2019re built for this' },
  bestFor: { parent: 'Check fit checklist', student: 'Pick your program' },
  howItWorks: { parent: 'Get the full program structure', student: 'See the weekly rhythm' },
  yearJourney: { parent: 'View Year 1\u20133 roadmap', student: 'See what you\u2019ll do each year' },
  challenges: { parent: 'Explore the 9 challenges', student: 'See what you\u2019ll build' },
  portfolio: { parent: 'See proof-based portfolio', student: 'See what you\u2019ll graduate with' },
  tracking: { parent: 'Understand how progress is measured', student: 'See how you\u2019ll be evaluated' },
  final: { parent: 'Book a parent call', student: 'Book a student call' }
};

// Portfolio images + captions
const portfolioItems = [
  { src: '/MakingBusinessHappen.jpg', caption: 'This is what a year of work looks like. Every item is earned, not assigned.', hero: true },
  { src: '/PitchingToClients.jpg', caption: 'Client Project — presenting a live marketing strategy to company leadership. Week 4 of an engagement.' },
  { src: '/ThinkingBEhindtheWork.jpg', caption: 'The thinking behind the work — a business model canvas built during the Kickstart challenge.' },
  { src: '/BusinessFamilies.png', caption: 'The letter you take home — a reference from the manager who supervised 9 weeks of professional work.' },
  { src: '/BuildingPortfolio.jpg', caption: '200+ daily reflection cards. The habit that turns experience into learning.' },
  { src: '/ImplementChanges.jpg', caption: 'Telling your story to a room — the professional storytelling presentation every student delivers.' },
  { src: '/PresentingtoJury.jpg', caption: 'Saturday jury review — presenting project work to industry professionals who score and challenge you.' },
  { src: '/WorkingInaCompany.png', caption: '9 weeks inside a company. Not visiting. Not observing. Working.', hero: true },
  { src: '/VenturePlanning.png', caption: 'Deliverable — a marketing campaign execution for Urban Brew, driving actual footfall and sales.' }
];

// ====== NEW PROGRAM ROLLUP SCHEMA ======

const year1Common = {
  pillars: [
    {
      name: 'EDUCATION',
      items: [
        { title: '9 Business Challenges', detail: 'Kickstart | Product Design | Design Thinking | Digital Marketing | Sales | Research Methods | Accounting & Financial Analysis | Spreadsheets (delivered in short 2–4 week sprints across the year)', badge: 'ALL', category: 'core' },
        { title: '2 Client Engagements', detail: 'Solving business problems for companies (typically 1–8 weeks each)', badge: 'ALL', category: 'core' },
        { title: '2 Self Paced Skill Tracks', detail: 'Choose 2 Self-paced specialized tracks for deep skill building', badge: 'ALL', category: 'core' },
        { title: 'University Subjects*', detail: 'Principles of Management | Business Communication | Business Accounting | Business Economics – Micro | Business Mathematics | Business Demography | Business Organisations & Systems | Principles of Marketing | Principles of Finance | Basics of Cost Accounting | Business Statistics | Business Informatics', badge: 'ALL', category: 'university' }
      ]
    },
    {
      name: 'EXPERIENCE',
      items: [
        { title: 'Apprenticeship 1', detail: 'Professional experience in a company, supervised by industry mentors (2 months)', badge: 'ALL', category: 'core' }
      ]
    },
    {
      name: 'AWARENESS',
      items: [
        { title: 'Outdoor immersion & team bonding', detail: 'Self Awareness Workshop (3 days) + Rural Project (5 days)', badge: 'ALL', category: 'core' },
        { title: 'Conflexion & Masterminds', detail: '6 Reflection & Coaching Sessions + fortnightly Mastermind groups + Daily Cards (daily reflection journal)', badge: 'ALL', category: 'core' },
        { title: 'Professional networking', detail: 'Industry networking week culminating in a Mega Networking Event', badge: 'ALL', category: 'core' },
        { title: 'Career Blueprint sessions', detail: '4 individual sessions — mapping skills, interests, and goals into an actionable career path', badge: 'ALL', category: 'core' },
        { title: 'Portfolio & LinkedIn', detail: '3 days: crafting your professional story', badge: 'ALL', category: 'core' }
      ]
    }
  ]
};

const year2Data = {
  original: {
    pillars: [
      {
        name: 'EDUCATION',
        items: [
          { title: '4 Advanced Challenges', detail: 'Product & Display Prototyping | Business Automation | Value Proposition Design | Data Analysis & Visualisation', badge: 'ALL', category: 'core' },
          { title: 'Self-Study Skill Tracks', detail: 'Choose 2 from: Organisation Dynamics, Consulting Frameworks, Business & Consumer Psychology', badge: 'ALL', category: 'core' },
          { title: 'Consulting Project', detail: 'Business Consulting Team Project — consulting engagement with a client company (typically 4–8 weeks)', badge: 'ALL', category: 'core' },
          { title: 'Venture Project', detail: 'Kickstart / #Karo Venture Project — build and test a business (typically 4–8 weeks)', badge: 'ALL', category: 'core' },
          { title: 'University Subjects*', detail: 'Business Law | Human Resources | Management Accounting | Business Economics – Macro | I.T. in Management | Production & Operations Management | Industrial Relations & Labour Laws | Business Taxation | International Business | Management Information Systems', badge: 'ALL', category: 'university' }
        ]
      },
      {
        name: 'EXPERIENCE',
        items: [
          { title: '2nd Apprenticeship', detail: 'Professional Apprenticeship 2 — deeper industry immersion, increased responsibility (2 months)', badge: 'ALL', category: 'core' },
          { title: 'Outstation Apprenticeship', detail: 'Work in a new city with a different employer — broader exposure and network (2 months)', badge: 'EJ', category: 'focus' }
        ]
      },
      {
        name: 'AWARENESS',
        items: [
          { title: 'Camp', detail: 'Solo Travel Service Project (typically ~3–7 days) — independent immersion experience', badge: 'ALL', category: 'core' },
          { title: 'Career + Reflection', detail: '4 Career Blueprint sessions + StorySells 2 + Reflection & Coaching Sessions + Industry Networking Week + Daily Cards', badge: 'ALL', category: 'core' }
        ]
      },
      {
        name: 'ASSESSMENT',
        items: [
          { title: 'How We Track Progress (Year 2)', detail: 'Progress Visibility: Self & Mentor Assessments · Apprenticeship Feedback · Peer Feedback · Skills progression dashboard\nEvidence produced (Year 2): Challenge Artefacts + Consulting Client Letter + Venture Report + Apprenticeship Letter + Working Documents + Quarterly Portfolio reviews', badge: 'ALL', category: 'core' }
        ]
      }
    ]
  },
  bf: {
    pillars: [
      {
        name: 'EDUCATION',
        items: [
          { title: '4 Advanced Challenges', detail: 'Product & Display Prototyping | Business Automation | Value Proposition Design | Data Analysis & Visualisation', badge: 'ALL', category: 'core' },
          { title: 'Self-Study Skill Tracks', detail: 'Choose 2 from: Organisation Dynamics, Consulting Frameworks, Business & Consumer Psychology', badge: 'ALL', category: 'core' },
          { title: 'Consulting Project', detail: 'Business Consulting Team Project — consulting engagement with a client company (typically 4–8 weeks)', badge: 'ALL', category: 'core' },
          { title: 'Venture Project', detail: 'Kickstart / #Karo Venture Project — build and test a business (typically 4–8 weeks)', badge: 'ALL', category: 'core' },
          { title: 'Founder Led Workshop', detail: 'Learn from experienced family business founders', badge: 'FAM', category: 'focus' },
          { title: 'University Subjects*', detail: 'Business Law | Human Resources | Management Accounting | Business Economics – Macro | I.T. in Management | Production & Operations Management | Industrial Relations & Labour Laws | Business Taxation | International Business | Management Information Systems', badge: 'ALL', category: 'university' }
        ]
      },
      {
        name: 'EXPERIENCE',
        items: [
          { title: '2nd Apprenticeship', detail: 'Professional Apprenticeship 2 — deeper industry immersion, increased responsibility (2 months)', badge: 'ALL', category: 'core' },
          { title: 'Family Business Project', detail: 'Work inside another family\'s business — learn how others do it (2 months)', badge: 'FAM', category: 'focus' }
        ]
      },
      {
        name: 'AWARENESS',
        items: [
          { title: 'Camp', detail: 'Solo Travel Service Project (typically ~3–7 days) — independent immersion experience', badge: 'ALL', category: 'core' },
          { title: 'Career + Reflection', detail: '4 Career Blueprint sessions + StorySells 2 + Reflection & Coaching Sessions + Industry Networking Week + Daily Cards', badge: 'ALL', category: 'core' },
          { title: 'Business Coaching', detail: '2 Individual + 2 Family coaching sessions (Family alignment & expectations)', badge: 'FAM', category: 'focus' }
        ]
      },
      {
        name: 'ASSESSMENT',
        items: [
          { title: 'How We Track Progress (Year 2)', detail: 'Progress Visibility: Self & Mentor Assessments · Apprenticeship Feedback · Peer Feedback · Skills progression dashboard\nEvidence produced (Year 2): Challenge Artefacts + Consulting Client Letter + Venture Report + Apprenticeship Letter + Working Documents + Quarterly Portfolio reviews', badge: 'ALL', category: 'core' }
        ]
      }
    ]
  },
  venture: {
    pillars: [
      {
        name: 'EDUCATION',
        items: [
          { title: '4 Advanced Challenges', detail: 'Product & Display Prototyping | Business Automation | Value Proposition Design | Data Analysis & Visualisation', badge: 'ALL', category: 'core' },
          { title: 'Self-Study Skill Tracks', detail: 'Choose 2 from: Organisation Dynamics, Consulting Frameworks, Business & Consumer Psychology', badge: 'ALL', category: 'core' },
          { title: 'Consulting Project', detail: 'Business Consulting Team Project — consulting engagement with a client company (typically 4–8 weeks)', badge: 'ALL', category: 'core' },
          { title: 'Venture Project', detail: 'Kickstart / #Karo Venture Project — build and test a business (typically 4–8 weeks)', badge: 'ALL', category: 'core' },
          { title: 'Founder-Led Venture Workshop', detail: '2-day Founder Led Venture Workshop, Learn to refine and execute your business ideas', badge: 'VEN', category: 'focus' },
          { title: 'University Subjects*', detail: 'Business Law | Human Resources | Management Accounting | Business Economics – Macro | I.T. in Management | Production & Operations Management | Industrial Relations & Labour Laws | Business Taxation | International Business | Management Information Systems', badge: 'ALL', category: 'university' }
        ]
      },
      {
        name: 'EXPERIENCE',
        items: [
          { title: '2nd Apprenticeship', detail: 'Professional Apprenticeship 2 — deeper industry immersion, increased responsibility (2 months)', badge: 'ALL', category: 'core' },
          { title: 'Venture Project', detail: 'Venture Project, come up with an idea, do the market research, and go to market with an MVP', badge: 'VEN', category: 'focus' }
        ]
      },
      {
        name: 'AWARENESS',
        items: [
          { title: 'Camp', detail: 'Solo Travel Service Project (typically ~3–7 days) — independent immersion experience', badge: 'ALL', category: 'core' },
          { title: 'Career + Reflection', detail: '4 Career Blueprint sessions + StorySells 2 + Reflection & Coaching Sessions + Industry Networking Week + Daily Cards', badge: 'ALL', category: 'core' },
          { title: 'Business Coaching', detail: '2 Individual + 2 Family coaching sessions (Family alignment & expectations)', badge: 'VEN', category: 'focus' }
        ]
      },
      {
        name: 'ASSESSMENT',
        items: [
          { title: 'How We Track Progress (Year 2)', detail: 'Progress Visibility: Self & Mentor Assessments · Apprenticeship Feedback · Peer Feedback · Skills progression dashboard\nEvidence produced (Year 2): Challenge Artefacts + Consulting Client Letter + Venture Report + Apprenticeship Letter + Working Documents + Quarterly Portfolio reviews', badge: 'ALL', category: 'core' }
        ]
      }
    ]
  }
};

const year3Data = {
  original: {
    pillars: [
      {
        name: 'EDUCATION',
        items: [
          { title: 'Final Challenges', detail: 'Legal Aspects of Business + Business Ethics & Governance (typically 2–4 weeks total)', badge: 'ALL', category: 'core' },
          { title: 'Client Multi-domain Project', detail: 'Integrated project or team residency covering marketing, data analysis, legal aspects, client management (typically 4–8 weeks)', badge: 'ALL', category: 'core' },
          { title: 'University Subjects*', detail: 'Supply Chain & Logistics | Environment & Sustainability | Entrepreneurship Development | Business Ethics | Research Methodology | Business Planning & Project Management | Personal Finance | Event Management | Management Control Systems | E-Commerce', badge: 'ALL', category: 'university' }
        ]
      },
      {
        name: 'EXPERIENCE',
        items: [
          { title: '9‑Month Apprenticeship', detail: 'Entrepreneurial Jobs: full‑time apprenticeship role with clear outputs + strong references', badge: 'EJ', category: 'focus' },
          { title: 'Self-Study Skill Tracks', detail: 'Choose 2 from: Team Design & Performance Mgmt, Technology in Business, Design in Business', badge: 'ALL', category: 'core' }
        ]
      },
      {
        name: 'AWARENESS',
        items: [
          { title: 'Career Coaching', detail: '4 Career Blueprint sessions + StorySells 3 (Purpose & Values) + Reflection & Coaching Sessions + Industry Networking Week + Daily Cards', badge: 'ALL', category: 'core' }
        ]
      },
      {
        name: 'ASSESSMENT',
        items: [
          { title: 'How We Track Progress (Year 3)', detail: 'Progress Visibility: 9-month capstone reviews · Employer/client/family feedback reports · Final portfolio assessment · Industry Benchmark comparison · Career Readiness Certification\nEvidence produced (Year 3): Integrated Client deliverable + Capstone Uutputs (performance reviews / KPIs / venture traction) + References + Final portfolio', badge: 'ALL', category: 'core' }
        ]
      }
    ]
  },
  bf: {
    pillars: [
      {
        name: 'EDUCATION',
        items: [
          { title: 'Final Challenges', detail: 'Legal Aspects of Business + Business Ethics & Governance (typically 2–4 weeks total)', badge: 'ALL', category: 'core' },
          { title: 'Client Multi-domain Project', detail: 'Integrated project or team residency covering marketing, data analysis, legal aspects, client management (typically 4–8 weeks)', badge: 'ALL', category: 'core' },
          { title: 'Founder-Led Workshop', detail: '3-day Founder Led Business Transition Workshop, How successful families navigate transitions', badge: 'FAM', category: 'focus' },
          { title: 'University Subjects*', detail: 'Supply Chain & Logistics | Environment & Sustainability | Entrepreneurship Development | Business Ethics | Research Methodology | Business Planning & Project Management | Personal Finance | Event Management | Management Control Systems | E-Commerce', badge: 'ALL', category: 'university' }
        ]
      },
      {
        name: 'EXPERIENCE',
        items: [
          { title: '9-Month Family Business Project', detail: 'Work inside your own family\'s business, Own KPIs and deliver outcomes., Graduate ready for succession.', badge: 'FAM', category: 'focus' },
          { title: 'Self-Study Skill Tracks', detail: 'Choose 2 from: Team Design & Performance Mgmt, Technology in Business, Design in Business', badge: 'ALL', category: 'core' }
        ]
      },
      {
        name: 'AWARENESS',
        items: [
          { title: 'Career Coaching', detail: '4 Career Blueprint sessions + StorySells 3 (Purpose & Values) + Reflection & Coaching Sessions + Industry Networking Week + Daily Cards', badge: 'ALL', category: 'core' },
          { title: 'Business Coaching', detail: '6 Individual + 2 Family sessions, Focus: Succession & Integration', badge: 'FAM', category: 'focus' }
        ]
      },
      {
        name: 'ASSESSMENT',
        items: [
          { title: 'How We Track Progress (Year 3)', detail: 'Progress Visibility: 9-month capstone reviews · Employer/client/family feedback reports · Final portfolio assessment · Industry Benchmark comparison · Career Readiness Certification\nEvidence produced (Year 3): Integrated Client deliverable + Capstone Uutputs (performance reviews / KPIs / venture traction) + References + Final portfolio', badge: 'ALL', category: 'core' }
        ]
      }
    ]
  },
  venture: {
    pillars: [
      {
        name: 'EDUCATION',
        items: [
          { title: 'Final Challenges', detail: 'Legal Aspects of Business + Business Ethics & Governance (typically 2–4 weeks total)', badge: 'ALL', category: 'core' },
          { title: 'Client Multi-domain Project', detail: 'Integrated project or team residency covering marketing, data analysis, legal aspects, client management (typically 4–8 weeks)', badge: 'ALL', category: 'core' },
          { title: 'Founder-Led Workshop', detail: '3-day Founder Led Business Incubation Workshop, How founders scale from idea to traction', badge: 'VEN', category: 'focus' },
          { title: 'University Subjects*', detail: 'Supply Chain & Logistics | Environment & Sustainability | Entrepreneurship Development | Business Ethics | Research Methodology | Business Planning & Project Management | Personal Finance | Event Management | Management Control Systems | E-Commerce', badge: 'ALL', category: 'university' }
        ]
      },
      {
        name: 'EXPERIENCE',
        items: [
          { title: '9-Month Venture Building', detail: 'Build your own business from scratch., Find customers, build systems, create repeatability., Graduate with a running business or proven capability.', badge: 'VEN', category: 'focus' },
          { title: 'Self-Study Skill Tracks', detail: 'Choose 2 from: Team Design & Performance Mgmt, Technology in Business, Design in Business', badge: 'ALL', category: 'core' }
        ]
      },
      {
        name: 'AWARENESS',
        items: [
          { title: 'Career Coaching', detail: '4 Career Blueprint sessions + StorySells 3 (Purpose & Values) + Reflection & Coaching Sessions + Industry Networking Week + Daily Cards', badge: 'ALL', category: 'core' },
          { title: 'Business Coaching', detail: '7 Individual + 1 Family sessions, Focus: Growth & Resilience', badge: 'VEN', category: 'focus' }
        ]
      },
      {
        name: 'ASSESSMENT',
        items: [
          { title: 'How We Track Progress (Year 3)', detail: 'Progress Visibility: 9-month capstone reviews · Employer/client/family feedback reports · Final portfolio assessment · Industry Benchmark comparison · Career Readiness Certification\nEvidence produced (Year 3): Integrated Client deliverable + Capstone Uutputs (performance reviews / KPIs / venture traction) + References + Final portfolio', badge: 'ALL', category: 'core' }
        ]
      }
    ]
  }
};

// ======================================

const programData = {
  original: {
    name: 'Entrepreneurial Jobs',
    images: {
      y1: { src: portfolioItems[2].src, caption: portfolioItems[2].caption },
      y2: { src: portfolioItems[1].src, caption: portfolioItems[1].caption },
      y3: { src: portfolioItems[7].src, caption: portfolioItems[7].caption }
    },
    // Myth vs Reality
    mythReality: {
      pairs: [
        { myth: '\u201cA BBA makes you job-ready.\u201d', reality: 'Job readiness comes from deadlines, managers, and delivery.' },
        { myth: '\u201cConfidence comes from knowledge.\u201d', reality: 'Confidence comes from shipping work and being evaluated.' },
        { myth: '\u201cInternships are enough.\u201d', reality: 'Apprenticeships + client projects build reliability and proof.' }
      ]
    },
    // Hero section
    heroTitle: 'Build Work Confidence in Growth Companies',
    heroSub: 'Get ready to work in fast growing companies, close to decision makers. Industry deadlines. Professional managers. Direct feedback.',
    mechanism: {
      title: 'How confidence is built here:',
      items: [
        'Weekly presentations to Industry Professionals',
        'Facing project deadline pressure',
        'Quarterly performance feedback'
      ]
    },
    // Best for section
    whoFor: 'Students who want fast-track work and entrepreneurial jobs.',
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
        'Handle marketing campaigns with budget responsibility',
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
    y1: {
      workExp: [
        { t: '9 Business Challenges', h: 'Business sprints', d: 'Kickstart · Product Design · Design Thinking · Digital Marketing · Sales · Research Methods · Accounting & Financial Analysis · Spreadsheets (delivered in short 2–4 week sprints across the year)' },
        { t: 'Client Projects / Hackathon', h: '2 client engagements', d: 'Solving business problems for companies (typically 1–8 weeks each)' },
        { t: 'First Apprenticeship', h: '1st Apprenticeship', d: 'Professional experience in a company, supervised by industry mentors (2 months)' },
        { t: 'Self-Study Skill Tracks', h: 'Deep skill building', d: 'Choose 2 Self-paced specialized tracks for deep skill building' }
      ],
      skills: [
        { t: 'Camp & Immersions', h: 'Outdoor immersion & team bonding', d: 'Self Awareness Workshop (3 days) + Rural Project (5 days)' },
        { t: 'Self-Reflection', h: 'Conflexion & Masterminds', d: '6 Reflection & Coaching Sessions + fortnightly Mastermind groups + Daily Cards (daily reflection journal)' },
        { t: 'Industry Networking Week', h: 'Professional networking', d: 'Industry networking week culminating in a Mega Networking Event' },
        { t: 'Career Coaching', h: 'Career Blueprint sessions', d: '4 individual sessions — mapping skills, interests, and goals into an actionable career path' },
        { t: 'StorySells Workshop 1', h: 'Portfolio & LinkedIn', d: '3 days: crafting your professional story' }
      ]
    },
    y2: {
      common: [
        { t: 'Work Experience', h: '4 Advanced Challenges', d: 'Product & Display Prototyping · Business Automation · Value Proposition Design · Data Analysis & Visualisation' },
        { t: 'Work Experience', h: 'Consulting Project', d: 'Business Consulting Team Project — consulting engagement with a client company (typically 4–8 weeks)' },
        { t: 'Work Experience', h: 'Venture Project', d: 'Kickstart / #Karo Venture Project — build and test a business (typically 4–8 weeks)' },
        { t: 'Work Experience', h: '2nd Apprenticeship', d: 'Professional Apprenticeship 2 — deeper industry immersion, increased responsibility (2 months)' },
        { t: 'Work Experience', h: 'Self-Study Skill Tracks', d: 'Choose 2 from: Organisation Dynamics, Consulting Frameworks, Business & Consumer Psychology' }
      ],
      skills: [
        { t: 'Skills & Coaching', h: 'Camp', d: 'Solo Travel Service Project (typically ~3–7 days) — independent immersion experience' },
        { t: 'Skills & Coaching', h: 'Career + Reflection', d: '4 Career Blueprint sessions + StorySells 2 + Reflection & Coaching Sessions + Industry Networking Week + Daily Cards' }
      ],
      focus: [
        { t: 'Program Focus', h: 'Outstation Apprenticeship', d: 'Work in a new city with a different employer — broader exposure and network (2 months)' }
      ],
      tracking: {
        visibility: 'Quarterly portfolio reviews · Client & employer feedback reports · Industry ratings from apprenticeship hosts · Skills progression dashboard',
        evidence: 'Advanced challenge artefacts + consulting deliverable + venture experiment report + apprenticeship feedback + focus‑area samples + quarterly portfolio reviews'
      }
    },
    y3: {
      intro: 'Your child completes a final client project and 2 capstone challenges, then spends 9 months in their ultimate specialisation — the defining experience of the program.',
      common: [
        { t: 'Common Core', h: 'Client Multi-domain Project', d: 'Integrated project or team residency covering marketing, data analysis, legal aspects, client management (typically 4–8 weeks)' },
        { t: 'Common Core', h: 'Final Challenges', d: 'Legal Aspects of Business + Business Ethics & Governance (typically 2–4 weeks total)' },
        { t: 'Common Core', h: 'Self-Study Skill Tracks', d: 'Choose 2 from: Team Design & Performance Mgmt, Technology in Business, Design in Business' }
      ],
      skills: [
        { t: 'Coaching', h: 'Career Coaching', d: '4 Career Blueprint sessions + StorySells 3 (Purpose & Values) + Reflection & Coaching Sessions + Industry Networking Week + Daily Cards' }
      ],
      focus: [
        { t: 'Program Focus', h: '9‑Month Apprenticeship', d: 'Entrepreneurial Jobs: full‑time apprenticeship role with clear outputs + strong references' }
      ],
      tracking: {
        visibility: '9-month capstone reviews · Employer/client/family feedback reports · Final portfolio assessment · Industry benchmark comparison · Career readiness certification',
        evidence: 'Integrated client deliverable + capstone outputs (performance reviews / KPIs / venture traction) + references + final portfolio + readiness certification'
      },
      gradOutcome: {
        portfolio: ['Client project deliverables with measurable results', 'Apprentice work samples across industries', '15 challenge outputs'],
        references: ['Recommendation letters from 3+ company managers', 'Client feedback scores', 'Industry ratings from hosts'],
        readiness: ['Business operations roles at ₹8-12L+', 'Project management readiness', 'Professional network of 50+ contacts']
      }
    }
  },
  bf: {
    name: 'Family Business',
    images: {
      y1: { src: portfolioItems[4].src, caption: portfolioItems[4].caption },
      y2: { src: portfolioItems[6].src, caption: portfolioItems[6].caption },
      y3: { src: portfolioItems[3].src, caption: portfolioItems[3].caption }
    },
    // Myth vs Reality
    mythReality: {
      pairs: [
        { myth: '\u201cThey\u2019ll learn inside our business.\u201d', reality: 'Without baseline maturity, they become a burden, not an asset.' },
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
        'Portfolio artifacts: Process improvements they\'ve implemented in businesses',
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

    y1: {
      workExp: [
        { t: '9 Business Challenges', h: 'Business sprints', d: 'Kickstart · Product Design · Design Thinking · Digital Marketing · Sales · Research Methods · Accounting & Financial Analysis · Spreadsheets (delivered in short 2–4 week sprints across the year)' },
        { t: 'Client Projects / Hackathon', h: '2 client engagements', d: 'Solving business problems for companies (typically 1–8 weeks each)' },
        { t: 'First Apprenticeship', h: '1st Apprenticeship', d: 'Professional experience in a company, supervised by industry mentors (2 months)' },
        { t: 'Self-Study Skill Tracks', h: 'Deep skill building', d: 'Choose 2 Self-paced specialized tracks for deep skill building' }
      ],
      skills: [
        { t: 'Camp & Immersions', h: 'Outdoor immersion & team bonding', d: 'Self Awareness Workshop (3 days) + Rural Project (5 days)' },
        { t: 'Self-Reflection', h: 'Conflexion & Masterminds', d: '6 Reflection & Coaching Sessions + fortnightly Mastermind groups + Daily Cards (daily reflection journal)' },
        { t: 'Industry Networking Week', h: 'Professional networking', d: 'Industry networking week culminating in a Mega Networking Event' },
        { t: 'Career Coaching', h: 'Career Blueprint sessions', d: '4 individual sessions — mapping skills, interests, and goals into an actionable career path' },
        { t: 'StorySells Workshop 1', h: 'Portfolio & LinkedIn', d: '3 days: crafting your professional story' }
      ]
    },
    y2: {
      common: [
        { t: 'Work Experience', h: '4 Advanced Challenges', d: 'Product & Display Prototyping · Business Automation · Value Proposition Design · Data Analysis & Visualisation' },
        { t: 'Work Experience', h: 'Consulting Project', d: 'Business Consulting Team Project — consulting engagement with a client company (typically 4–8 weeks)' },
        { t: 'Work Experience', h: 'Venture Project', d: 'Kickstart / #Karo Venture Project — build and test a business (typically 4–8 weeks)' },
        { t: 'Work Experience', h: '2nd Apprenticeship', d: 'Professional Apprenticeship 2 — deeper industry immersion, increased responsibility (2 months)' },
        { t: 'Work Experience', h: 'Self-Study Skill Tracks', d: 'Choose 2 from: Organisation Dynamics, Consulting Frameworks, Business & Consumer Psychology' }
      ],
      skills: [
        { t: 'Skills & Coaching', h: 'Camp', d: 'Solo Travel Service Project (typically ~3–7 days) — independent immersion experience' },
        { t: 'Skills & Coaching', h: 'Career + Reflection', d: '4 Career Blueprint sessions + StorySells 2 + Reflection & Coaching Sessions + Industry Networking Week + Daily Cards' }
      ],
      focus: [
        { t: 'Program Focus', h: 'Family Business Project', d: 'Work inside another family\'s business — learn how others do it (2 months)' },
        { t: 'Program Focus', h: 'Founder Led Workshop', d: 'Learn from experienced family business founders' },
        { t: 'Program Focus', h: 'Business Coaching', d: '2 Individual + 2 Family coaching sessions (Family alignment & expectations)' }
      ],
      tracking: {
        visibility: 'Quarterly portfolio reviews · Client & employer feedback reports · Industry ratings from apprenticeship hosts · Skills progression dashboard',
        evidence: 'Advanced challenge artefacts + consulting deliverable + venture experiment report + apprenticeship feedback + focus‑area samples + quarterly portfolio reviews'
      }
    },
    y3: {
      intro: 'Your child completes a final client project and 2 capstone challenges, then spends 9 months in their ultimate specialisation — the defining experience of the program.',
      common: [
        { t: 'Common Core', h: 'Client Multi-domain Project', d: 'Integrated project or team residency covering marketing, data analysis, legal aspects, client management (typically 4–8 weeks)' },
        { t: 'Common Core', h: 'Final Challenges', d: 'Legal Aspects of Business + Business Ethics & Governance (typically 2–4 weeks total)' },
        { t: 'Common Core', h: 'Self-Study Skill Tracks', d: 'Choose 2 from: Team Design & Performance Mgmt, Technology in Business, Design in Business' }
      ],
      skills: [
        { t: 'Coaching', h: 'Career Coaching', d: '4 Career Blueprint sessions + StorySells 3 (Purpose & Values) + Reflection & Coaching Sessions + Industry Networking Week + Daily Cards' }
      ],
      focus: [
        { t: 'Program Focus', h: '9-Month Family Business Project', d: 'Work inside your own family\'s business, Own KPIs and deliver outcomes., Graduate ready for succession.' },
        { t: 'Program Focus', h: 'Founder-Led Workshop', d: '3-day Founder Led Business Transition Workshop, How successful families navigate transitions' },
        { t: 'Program Focus', h: 'Business Coaching', d: '6 Individual + 2 Family sessions, Focus: Succession & Integration' }
      ],
      tracking: {
        visibility: '9-month capstone reviews · Employer/client/family feedback reports · Final portfolio assessment · Industry benchmark comparison · Career readiness certification',
        evidence: 'Integrated client deliverable + capstone outputs (performance reviews / KPIs / venture traction) + references + final portfolio + readiness certification'
      },
      gradOutcome: {
        portfolio: ['Family business process improvements', 'Cross-family project documentation', 'Professional skill evidence'],
        references: ['Management feedback from family business owners', 'Cross-family mentor testimonials', 'Reliability records'],
        readiness: ['Ready to join family business independently', 'Can manage a department or project', 'Aligned family expectations']
      }
    }
  },
  venture: {
    name: 'Venture Builder',
    images: {
      y1: { src: portfolioItems[0].src, caption: portfolioItems[0].caption },
      y2: { src: portfolioItems[5].src, caption: portfolioItems[5].caption },
      y3: { src: portfolioItems[8].src, caption: "Building a venture requires an ecosystem." }
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
    year1Summary: 'Your child learns that business building means talking to customers, testing ideas, and shipping work every single week.',
    year1Parts: [
      { name: 'Foundation (4 months)', desc: 'Learn customer research and basic testing methods' },
      { name: 'Application (4 months)', desc: 'Run multiple customer experiments with client feedback' },
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
    progressReview: 'Every 6 months, parents receive a detailed execution report. This includes customer conversation counts, shipping frequency, and business validation progress. Students who don\'t execute consistently receive additional structure or program recommendations.',
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
    outcome: 'Ready to build a venture—customers, systems, and repeatability.',
    y1: {
      workExp: [
        { t: '9 Business Challenges', h: 'Business sprints', d: 'Kickstart · Product Design · Design Thinking · Digital Marketing · Sales · Research Methods · Accounting & Financial Analysis · Spreadsheets (delivered in short 2–4 week sprints across the year)' },
        { t: 'Client Projects / Hackathon', h: '2 client engagements', d: 'Solving business problems for companies (typically 1–8 weeks each)' },
        { t: 'First Apprenticeship', h: '1st Apprenticeship', d: 'Professional experience in a company, supervised by industry mentors (2 months)' },
        { t: 'Self-Study Skill Tracks', h: 'Deep skill building', d: 'Choose 2 Self-paced specialized tracks for deep skill building' }
      ],
      skills: [
        { t: 'Camp & Immersions', h: 'Outdoor immersion & team bonding', d: 'Self Awareness Workshop (3 days) + Rural Project (5 days)' },
        { t: 'Self-Reflection', h: 'Conflexion & Masterminds', d: '6 Reflection & Coaching Sessions + fortnightly Mastermind groups + Daily Cards (daily reflection journal)' },
        { t: 'Industry Networking Week', h: 'Professional networking', d: 'Industry networking week culminating in a Mega Networking Event' },
        { t: 'Career Coaching', h: 'Career Blueprint sessions', d: '4 individual sessions — mapping skills, interests, and goals into an actionable career path' },
        { t: 'StorySells Workshop 1', h: 'Portfolio & LinkedIn', d: '3 days: crafting your professional story' }
      ]
    },
    y2: {
      common: [
        { t: 'Work Experience', h: '4 Advanced Challenges', d: 'Product & Display Prototyping · Business Automation · Value Proposition Design · Data Analysis & Visualisation' },
        { t: 'Work Experience', h: 'Consulting Project', d: 'Business Consulting Team Project — consulting engagement with a client company (typically 4–8 weeks)' },
        { t: 'Work Experience', h: 'Venture Project', d: 'Kickstart / #Karo Venture Project — build and test a business (typically 4–8 weeks)' },
        { t: 'Work Experience', h: '2nd Apprenticeship', d: 'Professional Apprenticeship 2 — deeper industry immersion, increased responsibility (2 months)' },
        { t: 'Work Experience', h: 'Self-Study Skill Tracks', d: 'Choose 2 from: Organisation Dynamics, Consulting Frameworks, Business & Consumer Psychology' }
      ],
      skills: [
        { t: 'Skills & Coaching', h: 'Camp', d: 'Solo Travel Service Project (typically ~3–7 days) — independent immersion experience' },
        { t: 'Skills & Coaching', h: 'Career + Reflection', d: '4 Career Blueprint sessions + StorySells 2 + Reflection & Coaching Sessions + Industry Networking Week + Daily Cards' }
      ],
      focus: [
        { t: 'Program Focus', h: 'Venture Project', d: 'Venture Project, come up with an idea, do the market research, and go to market with an MVP' },
        { t: 'Program Focus', h: 'Founder-Led Venture Workshop', d: '2-day Founder Led Venture Workshop, Learn to refine and execute your business ideas' },
        { t: 'Program Focus', h: 'Business Coaching', d: '2 Individual + 2 Family coaching sessions (Family alignment & expectations)' }
      ],
      tracking: {
        visibility: 'Quarterly portfolio reviews · Client & employer feedback reports · Industry ratings from apprenticeship hosts · Skills progression dashboard',
        evidence: 'Advanced challenge artefacts + consulting deliverable + venture experiment report + apprenticeship feedback + focus‑area samples + quarterly portfolio reviews'
      }
    },
    y3: {
      intro: 'Your child completes a final client project and 2 capstone challenges, then spends 9 months in their ultimate specialisation — the defining experience of the program.',
      common: [
        { t: 'Common Core', h: 'Client Multi-domain Project', d: 'Integrated project or team residency covering marketing, data analysis, legal aspects, client management (typically 4–8 weeks)' },
        { t: 'Common Core', h: 'Final Challenges', d: 'Legal Aspects of Business + Business Ethics & Governance (typically 2–4 weeks total)' },
        { t: 'Common Core', h: 'Self-Study Skill Tracks', d: 'Choose 2 from: Team Design & Performance Mgmt, Technology in Business, Design in Business' }
      ],
      skills: [
        { t: 'Coaching', h: 'Career Coaching', d: '4 Career Blueprint sessions + StorySells 3 (Purpose & Values) + Reflection & Coaching Sessions + Industry Networking Week + Daily Cards' }
      ],
      focus: [
        { t: 'Program Focus', h: '9-Month Venture Building', d: 'Build your own business from scratch., Find customers, build systems, create repeatability., Graduate with a running business or proven capability.' },
        { t: 'Program Focus', h: 'Founder-Led Workshop', d: '3-day Founder Led Business Incubation Workshop, How founders scale from idea to traction' },
        { t: 'Program Focus', h: 'Business Coaching', d: '7 Individual + 1 Family sessions, Focus: Growth & Resilience' }
      ],
      tracking: {
        visibility: '9-month capstone reviews · Employer/client/family feedback reports · Final portfolio assessment · Industry benchmark comparison · Career readiness certification',
        evidence: 'Integrated client deliverable + capstone outputs (performance reviews / KPIs / venture traction) + references + final portfolio + readiness certification'
      },
      gradOutcome: {
        portfolio: ['Business plan with customer data', 'Financial records and systems', 'Product/service documentation'],
        references: ['Customer testimonials', 'Mentor feedback', 'Business performance metrics'],
        readiness: ['Continue growing own venture', 'Join early-stage companies', 'Proven business-building capability']
      }
    }
  }
};

// ====== NEW COMPONENTS ======

const ActivityItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false);
  
  // Format details for bullets if there's a delimiter (like | or ·)
  const formatDetail = (text) => {
    let parts = [];
    if (text.includes(' | ')) parts = text.split(' | ');
    else if (text.includes(' · ')) parts = text.split(' · ');
    
    if (parts.length > 1) {
      return (
        <ul style={{ listStyle: 'disc', color: 'inherit', paddingLeft: '16px', marginTop: '4px' }}>
          {parts.map((p, idx) => <li key={idx} style={{ marginBottom: '2px' }}>{p.trim()}</li>)}
        </ul>
      );
    }
    // Handle manual newlines from CSV
    if (text.includes('\n')) {
      return text.split('\n').map((line, idx) => (
        <p key={idx} style={{ marginTop: idx > 0 ? '4px' : '0' }}>{line.trim()}</p>
      ));
    }
    return <p>{text}</p>;
  };

  const getBadgeClass = (badge) => {
    switch (badge) {
      case 'EJ': return 'pt-badge ej';
      case 'FAM': return 'pt-badge fam';
      case 'VEN': return 'pt-badge ven';
      default: return 'pt-badge';
    }
  };

  const getBadgeText = (badge) => {
    switch (badge) {
      case 'EJ': return 'Entrepreneurial Jobs';
      case 'FAM': return 'Family Business';
      case 'VEN': return 'Venture Builder';
      default: return badge;
    }
  };

  return (
    <div className={`pt-activityItem ${item.category}`} onClick={() => setExpanded(!expanded)}>
      <div className="pt-activityHeader">
        <div className="pt-activityLeft">
          <div className="pt-activityTitle">{item.title}</div>
        </div>
        {item.badge !== 'ALL' && (
          <div className={getBadgeClass(item.badge)}>{getBadgeText(item.badge)}</div>
        )}
      </div>
      {(expanded || item.category === 'focus') && item.detail && (
        <div className="pt-activityDetail fade-in">
          {formatDetail(item.detail)}
        </div>
      )}
    </div>
  );
};

const ImageStrip = ({ images }) => {
  if (!images || images.length === 0) return null;
  // Convert array back into a list if it was a single image object
  const imageList = Array.isArray(images) ? images : [images];
  
  return (
    <div className="pt-imageStrip">
      {imageList.map((img, i) => (
        <div key={i} className="pt-imageThumbContainer">
          <img src={img.src} alt="Program thumbnail" className="pt-imageThumb" />
          {img.caption && <div className="pt-imageCaption">{img.caption}</div>}
        </div>
      ))}
    </div>
  );
};

const PillarSection = ({ pillar, programKey }) => {
  const isAssessment = pillar.name === 'ASSESSMENT';
  
  // Filter out items not relevant to this program
  const visibleItems = pillar.items.filter(item => 
    item.badge === 'ALL' || item.badge.toLowerCase() === programKey || 
    (programKey === 'bf' && item.badge === 'FAM') ||
    (programKey === 'original' && item.badge === 'EJ') ||
    (programKey === 'venture' && item.badge === 'VEN')
  );

  if (visibleItems.length === 0) return null;

  const renderItems = () => (
    <>
      {visibleItems.map((item, i) => (
        <ActivityItem key={i} item={item} />
      ))}
      {visibleItems.some(item => item.category === 'university') && (
        <div className="pt-uniNote fade-in">
          <p><strong>* Note regarding University Subjects:</strong></p>
          <ul style={{ listStyle: 'decimal', paddingLeft: '16px', marginTop: '4px' }}>
            <li>Lectures / Exams on University subjects are not provided by Let's Enterprise.</li>
            <li>Student is expected to conduct self-study for University subjects.</li>
            <li>Important and relevant topics from subjects are incorporated in The Working BBA Curriculum.</li>
          </ul>
        </div>
      )}
    </>
  );

  if (isAssessment) {
    // Get the first item (typically one Tracking item per year/program)
    const assessmentItem = visibleItems[0];
    
    const formatAssessmentDetail = (text) => {
      if (!text) return null;
      if (text.includes('\n')) {
        return text.split('\n').map((line, idx) => (
          <p key={idx} style={{ marginTop: idx > 0 ? '8px' : '0' }}>{line.trim()}</p>
        ));
      }
      return <p>{text}</p>;
    };

    return (
      <details className="pt-assessment mb-6">
        <summary className="font-bold text-[#FBBF24] uppercase text-sm tracking-wide cursor-pointer">
          Tracking & Assessment
        </summary>
        <div className="mt-3 text-[13px] leading-[1.45] text-white/90 border-l-2 border-[#FBBF24] pl-3 ml-1">
          {assessmentItem && formatAssessmentDetail(assessmentItem.detail)}
        </div>
      </details>
    );
  }

  return (
    <div className="pt-pillar">
      <h4 className={`pt-pillarTitle ${pillar.name.toLowerCase()}`}>{pillar.name}</h4>
      {renderItems()}
    </div>
  );
};

// ======================================

// PROGRAM VIEW - Complete 3-year journey for a specific program
const ProgramView = ({ programKey, audience, onCTA }) => {
  const current = programData[programKey];
  const [expandedChallenge, setExpandedChallenge] = useState(null);



  const GradOutcomeSection = ({ data, audience }) => (
    <div className="pt-grad-outcome">
      <h3 style={{ fontSize: '17px', fontWeight: 800, marginBottom: '12px', letterSpacing: '.3px' }}>
        {audience === 'parent' ? 'WHAT YOUR CHILD GRADUATES WITH' : 'WHAT YOU GRADUATE WITH'}
      </h3>
      <div className="pt-grad-grid">
        <div className="card-outcome" style={{ padding: '12px', borderRadius: '12px' }}>
          <h5 className="font-bold mb-2 text-teal-400" style={{ fontSize: '13px' }}>WORK PORTFOLIO</h5>
          <ul className="list-disc pl-4 text-xs opacity-90" style={{ lineHeight: '1.4' }}>
            {data.portfolio.map((item, i) => <li key={i} style={{ marginBottom: '2px' }}>{item}</li>)}
          </ul>
        </div>
        <div className="card-outcome" style={{ padding: '12px', borderRadius: '12px' }}>
          <h5 className="font-bold mb-2 text-teal-400" style={{ fontSize: '13px' }}>REFERENCES & FEEDBACK</h5>
          <ul className="list-disc pl-4 text-xs opacity-90" style={{ lineHeight: '1.4' }}>
            {data.references.map((item, i) => <li key={i} style={{ marginBottom: '2px' }}>{item}</li>)}
          </ul>
        </div>
        <div className="card-outcome" style={{ padding: '12px', borderRadius: '12px' }}>
          <h5 className="font-bold mb-2 text-teal-400" style={{ fontSize: '13px' }}>CAREER READINESS</h5>
          <ul className="list-disc pl-4 text-xs opacity-90" style={{ lineHeight: '1.4' }}>
            {data.readiness.map((item, i) => <li key={i} style={{ marginBottom: '2px' }}>{item}</li>)}
          </ul>
        </div>
      </div>

      {/* Common Degree Info */}
      <div className="mt-4 p-3 bg-white/10 rounded-lg border border-white/20">
        <h5 className="font-bold mb-1" style={{ fontSize: '13px' }}>Recognised BBA Degree (Common)</h5>
        <p style={{ fontSize: '12px', lineHeight: '1.4' }}>
          BBA degree from partner Online University — completed in parallel with the Working BBA Program (Let's Enterprise). {audience === 'parent' ? 'Your child earns' : 'You earn'} a recognised degree while gaining professional experience.
        </p>
      </div>
    </div>
  );

  return (
    <div className="pt-tabPane active fade-in">

      {/* ===================== HERO SECTION ===================== */}
      <div className="pt-hero">
        <h2>{current.heroTitle}</h2>
        <h3>{current.heroSub}</h3>
      </div>

      {/* ===================== MYTH VS REALITY ===================== */}
      {/* ===================== MYTH VS REALITY ===================== */}
      {current.mythReality && current.mythReality.pairs && (
        <div className="pt-mythReality">
          {current.mythReality.pairs.map((pair, i) => (
            <div key={i} className="pt-mythRow">
              <span className="myth">Myth: {pair.myth}</span>
              <span className="reality">Reality: {pair.reality}</span>
            </div>
          ))}
        </div>
      )}

      {/* ===================== BEST FOR + PARENT CLARITY ===================== */}
      <div className="pt-trackIntro pt-bestFor" style={{ marginBottom: 16 }}>
        <div className="pt-trackMeta">
          <div className="pt-trackLine">
            <span className="lbl" style={{ fontSize: '14px', fontWeight: 900, color: '#25BCBD' }}>Best for</span>
            <span style={{ fontSize: '15px', fontWeight: 600 }}>{current.whoFor}</span>
          </div>
        </div>
      </div>





      {/* ===================== YEAR 1 (DETAILED) ===================== */}
      <section className="pt-section pt-year" aria-label="Year 1 Foundation">
        <div className="pt-yearHead">
          <div className="pt-yearTitle">
            <h2 style={{ fontSize: 'clamp(25px, 4vw, 37px)', fontWeight: 900, margin: 0, lineHeight: 1.1 }}>YEAR 1 • GROWTH YEAR</h2>
            <span className="pt-tealBox" style={{ fontSize: '12px' }}>Common for all 3 programs</span>
            <div style={{ marginTop: '4px', fontSize: '14px', opacity: 0.8, fontWeight: 400 }}>Foundation building</div>
          </div>
          <ImageStrip images={current.images?.y1} />
        </div>

        <div className="pt-body">
          {year1Common.pillars.map((pillar, i) => (
            <PillarSection key={`y1-${i}`} pillar={pillar} programKey={programKey} />
          ))}
        </div>
      </section>



      {/* ===================== PROGRESS REVIEW ===================== */}
      <div className="pt-progressCheck">
        <h4>Progress Review:</h4>
        <p>{audience === 'parent' ? current.progressReview : current.progressReview.replace(/parents receive/g, 'you receive').replace(/students and parents/g, 'you').replace(/Students who/g, 'If you')}</p>
      </div>

      {/* ===================== YEAR 2 ===================== */}
      {/* ===================== YEAR 2 ===================== */}
      <section className="pt-section pt-year" aria-label="Year 2 Operations">
        <div className="pt-yearHead">
          <div className="pt-yearTitle">
            <h2 style={{ fontSize: 'clamp(25px, 4vw, 37px)', fontWeight: 900, margin: 0, lineHeight: 1.1 }}>YEAR 2 • PROJECTS YEAR</h2>
            <span className="pt-tealBox" style={{ fontSize: '12px' }}>{current.name}</span>
            <div style={{ marginTop: '4px', fontSize: '14px', opacity: 0.8, fontWeight: 400 }}>Transition to Industry</div>
            <div style={{ marginTop: '6px', fontSize: '13px', opacity: 0.9, fontWeight: 300, borderLeft: '2px solid #25BCBD', paddingLeft: '8px' }}>
              → {audience === 'parent' ? 'Your child tackles' : 'You tackle'} advanced challenges, {audience === 'parent' ? 'runs' : 'run'} a consulting project and a venture, {audience === 'parent' ? 'completes' : 'complete'} a 2nd apprenticeship — then {audience === 'parent' ? 'enters their' : 'enter your'} program-specific Focus Area.
            </div>
          </div>
          <ImageStrip images={current.images?.y2} />
        </div>

        <div className="pt-body">
          {year2Data[programKey].pillars.map((pillar, i) => (
            <PillarSection key={`y2-${i}`} pillar={pillar} programKey={programKey} />
          ))}
        </div>
      </section>

      {/* ===================== YEAR 3 ===================== */}
      <section className="pt-section pt-year" aria-label="Year 3 Outcomes" style={{ marginTop: 20 }}>
        <div className="pt-yearHead">
          <div className="pt-yearTitle">
            <h2 style={{ fontSize: 'clamp(25px, 4vw, 37px)', fontWeight: 900, margin: 0, lineHeight: 1.1 }}>YEAR 3 • WORK YEAR</h2>
            <span className="pt-tealBox" style={{ fontSize: '12px' }}>{current.name}</span>
            <div style={{ marginTop: '4px', fontSize: '14px', opacity: 0.8, fontWeight: 400 }}>Deep Industry Immersion</div>
          </div>
          <ImageStrip images={current.images?.y3} />
        </div>

        <div className="pt-body">
          {/* Intro */}
          <p style={{ fontSize: '14px', lineHeight: '1.5', marginBottom: '16px', opacity: 0.9, borderLeft: '4px solid #25BCBD', paddingLeft: '12px' }}>
            {audience === 'parent' ? current.y3.intro : current.y3.intro.replace(/Your child/g, 'You').replace(/your child/g, 'you').replace(/completes/g, 'complete').replace(/spends/g, 'spend').replace(/their ultimate/g, 'your ultimate')}
          </p>

          {year3Data[programKey].pillars.map((pillar, i) => (
            <PillarSection key={`y3-${i}`} pillar={pillar} programKey={programKey} />
          ))}

          {/* Graduation Outcome */}
          <GradOutcomeSection data={current.y3.gradOutcome} audience={audience} />
        </div>
      </section>



      {/* ===================== FINAL CTA ===================== */}
      <div className="pt-ctaBlock">
        <button className="pt-ctaBtn" onClick={() => onCTA('final', ctaCopy.final[audience])}>{ctaCopy.final[audience]} →</button>
      </div>
    </div>
  );
};

