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

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy to your preferred hosting platform:
   - Netlify
   - Vercel
   - AWS
   - etc.

3. Set up environment variables on your hosting platform

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