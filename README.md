# MediRemind - Patient Follow-up System

A comprehensive patient follow-up reminder system that helps clinics track patients and automate appointment reminders.

## Features

- 🔐 Secure doctor authentication with role-based access
- 👥 Complete patient management system
- 📅 Smart scheduling engine with automated follow-ups
- 📱 Automated SMS/WhatsApp reminders
- 📊 Analytics dashboard
- 🎨 Beautiful, responsive design

## Tech Stack

- Frontend:
  - React + TypeScript
  - Tailwind CSS for styling
  - Framer Motion for animations
  - React Query for data fetching
  - React Router for navigation
  - React Hook Form for forms
  - Lucide React for icons
  - React Hot Toast for notifications
  - Use Sound for audio feedback

- Backend:
  - Supabase for database and authentication
  - PostgreSQL for data storage
  - Row Level Security for data protection

## Prerequisites

- Node.js 18+ installed
- A Supabase account
- npm or yarn package manager

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/mediremind.git
   cd mediremind
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Supabase:
   - Create a new project in Supabase
   - Click "Connect to Supabase" in the top right of your editor
   - Follow the setup instructions
   - The database schema will be automatically created

4. Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
├── src/
│   ├── components/     # Reusable UI components
│   ├── context/       # React context providers
│   ├── hooks/         # Custom React hooks
│   ├── pages/         # Application pages
│   ├── utils/         # Utility functions
│   ├── App.tsx        # Main application component
│   └── main.tsx       # Application entry point
├── public/            # Static assets
├── supabase/          # Supabase configuration and migrations
└── package.json       # Project dependencies and scripts
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Deployment

i tried to deploy this project on netlify and vercel it was not showing 

![image](https://github.com/user-attachments/assets/35d72305-cd24-4160-aab4-d685f9cac47e)

![image](https://github.com/user-attachments/assets/f466c9c4-4135-4871-8485-125a3c56682d)


![image](https://github.com/user-attachments/assets/c016d040-8104-4847-9f82-c4d19727bed8)
there are some of the images 
this is the most challenge i encounterd .

## Security

- JWT-based authentication
- Row Level Security in Supabase
- Input validation on both frontend and backend
- Secure password handling
- CORS protection

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

# prompts i used for this project
 # Prompt for claude ai
Hi .... today clinics and private doctors lose track of patients follow ups therefore i want a tool that automatically reminds both doctors and patients of appointments via SMS, WhatsApp, or other channels. Key Features to Build
* Doctor Login / Dashboard → Add, view, and manage patient records.
* Patient Details Capture → Name, phone number, appointment date, follow-up schedule.
* Automated Reminder Engine → Set AI-powered scheduling (i want you to suggest optimal follow-up time based on appointment type). → Send reminders via SMS/WhatsApp (using APIs like Twilio or Africa’s Talking).
* View Reminders History → Doctors can view sent and upcoming reminders.
* Error Handling & Data Security → Proper validations and secure patient data management.
* AI-prompted health tips with the follow-up message “Hey John! Remember your follow-up appointment tomorrow at 10 AM. Quick tip: Stay hydrated and avoid heavy meals before your check-up!”
* Audio notification / vibing animation when reminder is sent successfully.
i want you to to help manage patient follow-up reminders by doing the following tasks:
Given the following patient appointment information:
- Patient Name: [PATIENT_NAME]
- Phone Number: [PHONE_NUMBER]
- Appointment Date: [APPOINTMENT_DATE] (format: YYYY-MM-DD)
- Appointment Type: [APPOINTMENT_TYPE]
Do the following:
1. Check if any required fields are missing. Required fields are: Patient Name, Phone Number, Appointment Date, and Appointment Type. If any are missing, list them under "Missing Fields". If all are present, say "All good".
2. Generate a Follow-Up Date based on the Appointment Type:
- General check-up → 14 days later
- Lab test result review → 7 days later
- Dental check-up → 30 days later
- Vaccination → 21 days later
- Other → 10 days later
Use the Appointment Date to calculate the Follow-Up Date.
3. Write a polite SMS reminder to the patient for their follow-up appointment. Keep it under 160 characters and friendly.
4. Generate a motivational health tip under 100 characters that can be sent as part of the SMS.
5. Format the response i an appealing way.
* I want you to design the best possible UI/UX for this tool, following modern, clean, minimalistic design principles with a human-centered, joy-driven aesthetic. The design should evoke trust, calmness, and simplicity while being highly functional.
Here’s what I want you to include:
   1. A beautiful landing screen/dashboard with calming colors (soft blues, light greens, whites, and hints of warm neutrals), rounded corners, soft shadows, and light, clean typography (recommend fonts too).
   2. Smart, well-styled buttons: Use modern button styles with good padding, rounded edges (10–16px), subtle shadows, and hover/tap effects. Colors should contrast well against the background while maintaining a soft, professional look.
   3. Smooth animations: Recommend subtle UI animations for button clicks, screen transitions, notification popups, and loaders — no overdone effects. Think Material Design motion or Apple Human Interface Guidelines.
   4. Joyful microinteractions: Include delightful details like animated checkmarks after sending a reminder, or gentle health tip cards that fade in smoothly.
   5. A responsive layout: Mobile-first, with easy adaptability to desktop. Recommend layouts, spacing, and grid systems.
   6. Typography hierarchy: Suggest font sizes, weights, and how to structure headings, subheadings, and body text for maximum readability.
   7. Use of icons and illustrations: Recommend modern icon packs or AI-generated illustrations for medical and wellness visuals.
   8. Color palette: Propose 3–4 color schemes optimized for healthcare/wellness apps with color codes.
   9. Best design practices: Suggest UI/UX patterns used by leading health apps (like Headspace, Calm, or Ada Health) that I should borrow for better user flow and engagement.
   10. Code styling guide (optional): If possible, provide CSS/Tailwind styling rules for buttons, cards, input fields, and animations.
this is all how i want the tool to look like  generate for me a good powerful prompt that will ensure i get the best outcome.

# prompt that i used for bolt.new
CONTEXT & PROBLEM:
I need a complete, production-ready patient follow-up reminder system. Clinics lose track of patients, leading to missed appointments and poor health outcomes. I want to solve this with automated, intelligent reminders.
EXACT DELIVERABLES REQUIRED:

Full-stack web application with responsive design
Complete source code with detailed comments
Database schema with sample data
API integration examples (working code)
Deployment instructions
User documentation

TECHNICAL SPECIFICATIONS:

Frontend: React.js + TypeScript + Tailwind CSS + Framer Motion for animations
Backend: Node.js + Express + JWT authentication + input validation
Database: PostgreSQL with encrypted patient data storage
APIs: Twilio SMS + WhatsApp Business API integration
Security: HIPAA-compliant data handling, AES-256 encryption, secure API endpoints
Testing: Jest unit tests + Cypress E2E tests included

EXACT FEATURES TO BUILD:

Doctor Authentication: Secure login with role-based access
Patient Management: Add/edit/view patient records with form validation
Smart Scheduling Engine:

General check-up → 14 days follow-up
Lab test review → 7 days follow-up
Dental check-up → 30 days follow-up
Vaccination → 21 days follow-up
Other → 10 days follow-up

Automated Reminders: SMS/WhatsApp with personalized health tips
Dashboard Analytics: Sent/pending/failed reminder tracking
Audio Notifications: Success sounds when reminders sent
Error Handling: Comprehensive validation and user feedback

DESIGN REQUIREMENTS (CRITICAL):

Color Palette: Primary #2196F3 (medical blue), Secondary #4CAF50 (wellness green), Background #FAFAFA, Text #424242
Typography: Inter font family, 16px base size, proper hierarchy (24px headings, 18px subheadings)
Components:

Buttons: 12px border-radius, #2196F3 background, white text, hover effects
Cards: 16px border-radius, subtle shadows (0 2px 8px rgba(0,0,0,0.1))
Input fields: Clean borders, focus states, validation styling

Animations: 300ms ease-in-out transitions, success checkmarks, loading spinners
Mobile-first: Responsive design, touch-friendly buttons (44px minimum)

SAMPLE DATA & EXAMPLES:
Include working examples with:

Sample patient: "John Doe", phone "+1234567890", appointment "2024-12-01", type "General check-up"
Expected SMS: "Hi John! Your follow-up appointment is tomorrow at 10 AM. Tip: Stay hydrated before your visit!"
Error handling for missing fields, invalid phone numbers, past dates

USER EXPERIENCE REQUIREMENTS:

Dashboard Layout: Clean sidebar navigation, main content area, quick actions panel
Form Design: Progressive disclosure, clear labels, inline validation, success states
Microinteractions: Button press animations, form field focus effects, notification toasts
Success Feedback: Visual + audio confirmation when reminders sent successfully

CODE QUALITY STANDARDS:

Clean, readable code with consistent naming conventions
Comprehensive error handling with user-friendly messages
Input validation on both frontend and backend
Security best practices (sanitized inputs, parameterized queries)
Performance optimization (lazy loading, API caching)
Accessibility compliance (ARIA labels, keyboard navigation)

INTEGRATION REQUIREMENTS:

Working Twilio SMS integration with API key configuration
WhatsApp Business API setup instructions
Database migration scripts
Environment variable configuration
Docker containerization setup

SUCCESS CRITERIA:
The final deliverable should be a complete, working application that I can:

Run locally with simple setup commands
Deploy to production with provided instructions
Customize and extend easily
Use immediately for real patient management
Scale to handle hundreds of patients and reminders

DELIVERABLE FORMAT:
Provide complete code in organized file structure with:

README.md with setup instructions
package.json with all dependencies
Database schema and seed data
API documentation
Deployment guide
User manual

INSPIRATION REFERENCES:
Design should feel like a blend of:

Headspace app (calming, trustworthy)
Apple Health app (clean, medical)
Slack interface (intuitive, professional)

Create this as a production-ready solution, not a prototype. I want to use this immediately with real patients.

