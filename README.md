TicketFlow - React Version
A modern, responsive ticket management application built with React 18.
🚀 Features

✅ Responsive Navbar with mobile hamburger menu
✅ Landing Page with wavy hero section and decorative circles
✅ Authentication (Login/Signup) with validation
✅ Dashboard with ticket statistics
✅ Full CRUD ticket management
✅ Toast Notifications for user feedback
✅ Protected Routes with session management
✅ Fully Responsive design
✅ Accessible (ARIA labels, semantic HTML, keyboard navigation)

📦 Tech Stack

React 18
Lucide React (Icons)
Vite (Build tool)
LocalStorage (State persistence)
CSS-in-JS (Inline styles)

🔑 Demo Credentials
Email: demo@test.com
Password: password123
📥 Installation
Prerequisites

Node.js 18+
npm or yarn

Setup Steps

Clone the repository

bashgit clone <your-repo-url>
cd react-version

Install dependencies

bashnpm install

Start development server

bashnpm run dev

Open browser

http://localhost:5173

bash# Development
npm run dev          # Start dev server (http://localhost:5173)

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Linting
npm run lint         # Run ESLint
🎨 Design Specifications
Layout

Max Width: 1440px (centered on large screens)
Responsive Breakpoints:

Mobile: < 768px
Tablet: 768px - 1024px
Desktop: > 1024px

🔒 Authentication & Security
Session Management

Uses localStorage with key: ticketapp_session
Automatically restores session on page reload
Protected routes redirect to login if not authenticated

Validation Rules

Email: Must be valid format (name@example.com)
Password: Minimum 6 characters
Title: Required, minimum 3 characters
Status: Must be 'open', 'in_progress', or 'closed'
Description: Optional, maximum 500 characters

📱 Responsive Features
Navbar

Desktop: Horizontal navigation with all links visible
Mobile: Hamburger menu that slides down with vertical navigation

Layout

Mobile: Single column, stacked elements
Tablet: 2-column grid for stats and tickets
Desktop: Multi-column layout with optimal spacing

♿ Accessibility

✅ Semantic HTML5 elements
✅ ARIA labels and descriptions
✅ Keyboard navigation support (Tab, Enter, Escape)
✅ Focus visible states
✅ Error messages tied to form inputs
✅ Color contrast meets WCAG AA standards
✅ Screen reader friendly

🧪 Component Structure
Pages

LandingPage: Hero section with features
LoginPage: User authentication
SignupPage: New user registration
Dashboard: Ticket statistics overview
TicketsPage: Full CRUD ticket management

Components

Navbar: Responsive navigation with mobile menu
Toast: Notification system
Footer: Site footer
WaveSVG: Hero wave background
Modal: Ticket create/edit modal

Context

AuthContext: Global authentication state

📊 State Management
Local State (useState)

Form data (login, signup, ticket forms)
Form validation errors
Toast notifications
Modal visibility
Mobile menu state

Global State (Context API)

Authentication status
User session

Persistent State (localStorage)

Session token: ticketapp_session
Tickets: tickets (array of ticket objects)

🎯 Key Features Implementation
1. Ticket CRUD Operations
Create
javascript- Validate all required fields
- Generate unique ID (timestamp)
- Save to localStorage
- Show success toast
Read
javascript- Load from localStorage on mount
- Display in responsive grid
- Show empty state if no tickets
Update
javascript- Load existing ticket data into form
- Validate changes
- Update in localStorage
- Show success toast
Delete
javascript- Confirm with user
- Remove from localStorage
- Show success toast
2. Form Validation
Real-time Validation

Validates on blur (when user leaves field)
Clears errors on input change
Shows inline error messages

Submit Validation

Validates all fields on submit
Prevents submission if errors exist
Focuses first error field

3. Protected Routes
javascriptif (['dashboard', 'tickets'].includes(page) && !isAuthenticated) {
  redirect to login
}
4. Session Management
javascript// Login
localStorage.setItem('ticketapp_session', JSON.stringify({
  user: 'demo',
  timestamp: Date.now()
}))

// Check on mount
const session = localStorage.getItem('ticketapp_session')
if (session) setIsAuthenticated(true)

// Logout
localStorage.removeItem('ticketapp_session')
🚀 Deployment
Build for Production
bashnpm run build
This creates an optimized production build in the dist folder.

Deploy to Vercel
bashnpm install -g vercel
vercel login
vercel --prod
Important: SPA Routing
Add a _redirects file to public/ for SPA routing:
/*    /index.html   200
Or for Vercel, add vercel.json:
json{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
🐛 Troubleshooting
Issue: "Module not found" error
Solution: Run npm install to ensure all dependencies are installed
Issue: Port 5173 already in use
Solution: Kill the process or use a different port:
bashnpm run dev -- --port 3000
Issue: Tickets not persisting
Solution: Check browser console for localStorage errors. Ensure cookies/storage are enabled.
Issue: Toast notifications not showing
Solution: Check z-index conflicts in CSS. Toast should have z-index: 2000
📝 LocalStorage Schema
Session
json{
  "ticketapp_session": {
    "user": "demo",
    "timestamp": 1729785600000
  }
}
Tickets
json{
  "tickets": [
    {
      "id": 1729785600000,
      "title": "Fix login bug",
      "description": "Users unable to login",
      "status": "open",
      "priority": "high",
      "createdAt": "2025-10-24T12:00:00.000Z"
    }
  ]
}

📞 Support
For issues or questions: 

Check this README
Review validation rules
Ensure demo credentials are correct
Check browser console for errors

🤝 Contributing
This is a learning project for HNG Stage 2. Feel free to fork and modify!
📄 License
MIT License - Educational purposes

Built using React for HNG Stage 2