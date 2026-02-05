# Working BBA Interactive - Periodic Table of Experiences

An interactive React application visualizing the curriculum structure for the Working BBA program using a periodic table metaphor.

## Features

- **Interactive Periodic Table**: Click any element to see detailed information
- **Three Main Tabs**:
  - Program Overview: Year 1 foundation and track comparison
  - Track Comparison: Compare Original, Business Families, and Solo-preneurs tracks
  - Periodic Table: Complete interactive grid of all program elements

## Sections

- **Education & Experience**: Courses, challenges, ventures, client work, and employer placements
- **Awareness & Portfolio**: Self-awareness, career development, community, and evidence collection
- **Assessments**: Various assessment methods and ratings
- **Roles**: Different stakeholder roles in the program

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- PostCSS

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:3000/`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
ProgramPeriodic/
├── index.html              # Entry HTML file
├── main.jsx                # React entry point
├── WorkingBBAInteractive.jsx  # Main application component
├── index.css               # Global styles with Tailwind
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── postcss.config.js       # PostCSS configuration
```

## Color Scheme

- **Education**: Blue gradient (#3663AD to #4A7CC9)
- **Experience**: Teal gradient (#25BCBD to #2E9B9C)
- **Awareness**: Purple/Gray gradient
- **Roles**: Dark Navy (#1E1B4B, #312E81)
- **Assessments**: Outline style (white with black border)
- **Evidence**: Outline style (white with black border)

## License

MIT
