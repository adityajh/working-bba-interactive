# Visual Design & Layout Standards

## 1. Strict Color Scale
All colors must strictly adhere to the following hex codes. Do not use approximations.

### Section Backgrounds
*   **Education & Experience**: `#282f6c` (Dark Navy)
*   **Awareness & Career**: `#1e88b8` (Teal Blue)
*   **Evidence**: `#ffffff` (White)
*   **Assessments**: `#282f6c` (Dark Navy)
*   **Roles**: `#3269ae` (Mid Blue)

### Text Highlights & Accents
*   **Assessments Header**: `#D946EF` (Electric Magenta)
*   **Roles Header**: `#FBBF24` (Golden Yellow)
*   **Awareness Text**: `#160E44` (Deep Blue Text on Teal)

### Element Colors (Button Styles)
*   **Education Elements**: Gradient Blue (`#334c91` -> `#3663AD`)
*   **Awareness Elements**: Teal (`#25BCBD`) w/ Deep Blue Text (`#160E44`)
*   **Assessments Elements**: Deep Blue (`#160E44`) w/ Magenta Text (`#D946EF`)
*   **Roles Elements**: Deep Blue (`#160E44`) w/ Yellow Text (`#FBBF24`)
*   **Selection Ring**: `#D946EF` (Magenta)

## 2. Typography
*   **Headings**: `Montserrat` (Bold, Geometric)
*   **Body**: `Inter` (Clean, Legible)
*   **Standard Sizes**:
    *   Section Headers: `text-xl font-bold`
    *   Column Headers: `text-xs font-bold tracking-wider`
    *   Element Text: `text-[10px] sm:text-xs font-bold`

## 3. Layout Patterns
*   **Periodic Table Grid**:
    *   **Awareness**: 4 Columns (Self, Career, Story-Sells, Evidence).
    *   **Assessments**: 2 Rows × 4 Columns Grid.
    *   **Roles**: 2 Rows × 4 Columns Grid.
    *   **Education**: Standard Periodic Layout (Cohort/Team/Solo rows).
*   **Mobile Responsiveness**:
    *   Use horizontal scrolling containers (`overflow-x-auto`) for complex grids.
    *   Force minimum widths (`min-w-[500px]`) to ensure grid integrity prevents layout breakage.

## 4. Component Standards
*   **Element Buttons**:
    *   **Height**: Fixed `h-10` for touch targets.
    *   **Widths**:
        *   Short: `w-24`
        *   Medium: `w-36`
        *   Long: `w-48`
    *   **Effects**: `hover:scale-105`, `hover:shadow-lg`.
*   **Modals**:
    *   Background: White (`bg-white`).
    *   Text: Dark (`text-gray-900`) for readability.
    *   Header: Inherits element color for context.

## 5. Critical Rules
*   **Never** use generic tailwind colors (e.g., `bg-blue-500`) for brand elements.
*   **Evidence** items belong in the Awareness section (Column 4).
*   **Assessments** and **Roles** must use the Deep Blue element background for consistency, differentiated by text color.
