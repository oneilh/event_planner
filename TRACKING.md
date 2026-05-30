# Tracking

- Added next-themes and lucide-react for dark mode and icons.
- Created `app/components/ThemeProvider.tsx` to handle dark mode context.
- Updated `app/layout.tsx` to use ThemeProvider and apply `bg-[var(--bg-primary)]` and `text-[var(--text-primary)]` to the body tag.
- Redesigned the `app/components/Navbar.tsx` dark mode button to be a sleek icon swap instead of a toggle pill.
- Updated the "Create Event" button in the Navbar to have a gradient look and change colors dynamically in dark mode.
- Replaced the custom SVG logo with a premium Lucide React `CalendarDays` icon.
- Upgraded the primary accent color from a generic blue to a premium modern Indigo/Violet palette for both light and dark modes.
- Polished the UI by completely redesigning `app/page.tsx` into a modern landing page, utilizing modern web guidance (glassmorphism, `@starting-style` entry animations, dynamic fluid grids, and `text-wrap: balance`).
- Completely redesigned the mobile menu in `app/components/Navbar.tsx` into an animated floating dropdown (pill-shaped) per user preference.
- Standardized horizontal padding classes (`px-4 sm:px-6 lg:px-8`) on the homepage to precisely match the navbar, fixing layout alignment across different screen sizes.
- Cleaned up layout inconsistencies by establishing `app/layout.tsx` as the central responsive layout wrapper (`w-[95%] md:w-[85%] lg:w-[70%]`) and removing redundant `max-w-7xl mx-auto` restrictions from individual components.
- Updated `Navbar` to a premium floating pill design to fit perfectly within the new centralized layout.
