# SKY_42

![SKY_42 Logo](public/images/logo.png)

An elegant event management system built specifically for 42 Abu Dhabi, providing a seamless experience for event discovery, management, and participation.

## 🌟 Features

### For Students
- **Beautiful Landing Page** showcasing upcoming events with dynamic layouts
- **Event Discovery** with filtering and search capabilities
- **Event Details** with comprehensive information and registration options
- **42 Authentication** integration for secure student login
- **Mobile-responsive** design for access on any device

### For Administrators
- **Admin Dashboard** for event management and analytics
- **Event Creation & Editing** with rich formatting options
- **Bulk Upload** functionality for events via CSV file
- **User Management** to control access and permissions
- **Desktop Mode** optimized for administrator workflows

## 📸 Screenshots

<div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
  <img src="public/images/screenshots/landing-page.png" alt="Landing Page" width="48%">
  <img src="public/images/screenshots/event-details.png" alt="Event Details" width="48%">
</div>
<div style="display: flex; justify-content: space-between;">
  <img src="public/images/screenshots/admin-dashboard.png" alt="Admin Dashboard" width="48%">
  <img src="public/images/screenshots/event-creation.png" alt="Event Creation" width="48%">
</div>

## 🚀 Getting Started

### Prerequisites
- Node.js 16.x or later
- npm or yarn package manager
- 42 API credentials (for authentication)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/sky42.git
cd sky42
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
- Create a `.env.local` file based on `.env.example`
- Add your 42 API credentials and other configuration details

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 💾 Bulk Upload Format

For bulk uploading events, prepare a CSV file with the following columns:

| Column Name | Description | Example |
|-------------|-------------|---------|
| title | Event title | Introduction to AI |
| description | Event description | Learn the basics of AI and ML... |
| date | Event date (YYYY-MM-DD) | 2025-06-15 |
| time | Event time (HH:MM) | 14:30 |
| location | Event location | Lab 3, 42 Abu Dhabi |
| capacity | Maximum participants | 30 |
| imageUrl | Image URL (optional) | /images/events/ai-event.jpg |
| organizer | Event organizer | Tech Club |
| category | Event category | Workshop |

A sample CSV file is available at `samples/sample_events.csv`.

## 🔐 Authentication

### Student Login
Students can log in through the standard 42 authentication system.

### Admin Login
- **Username:** admin
- **Password:** admin123
- Note: Admin features are only accessible on desktop devices.

## 🏗️ Project Structure

```
sky42/
├── app/                # Next.js app directory
│   ├── api/            # API routes
│   ├── admin/          # Admin dashboard pages
│   ├── events/         # Event-related pages
│   ├── auth/           # Authentication pages
│   └── page.tsx        # Landing page
├── components/         # Reusable components
│   ├── common/         # Common UI components
│   ├── events/         # Event-related components
│   └── admin/          # Admin-specific components
├── lib/                # Utility functions and helpers
├── models/             # Data models
├── public/             # Static assets
│   └── images/         # Image assets
├── samples/            # Sample files
│   └── sample_events.csv # Sample CSV for bulk upload
└── styles/             # Global styles
```

## 🛠️ Built With

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [NextAuth.js](https://next-auth.js.org/) - Authentication
- [React Query](https://tanstack.com/query/latest) - Data fetching
- [Prisma](https://www.prisma.io/) - Database ORM
- [CSV-Parse](https://csv.js.org/parse/) - CSV parsing for bulk uploads

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- 42 Abu Dhabi for the opportunity to develop this project
- All contributors who participated in this competition
- The Next.js team for their excellent framework
