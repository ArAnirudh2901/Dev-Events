# DevEvents 🎉

A modern platform to discover and create developer events including hackathons, meetups, and conferences.

## ✨ Features

- **Browse Events** - View all developer events in a beautiful grid layout
- **Event Details** - See complete event information with booking capability
- **Create Events** - Add new events with rich details (title, description, venue, date, etc.)
- **Book Events** - Reserve spots at events via email registration
- **Similar Events** - Discover related events based on tags

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: MongoDB with Mongoose
- **Styling**: Tailwind CSS v4
- **Image Hosting**: Cloudinary
- **Analytics**: PostHog

## 🚀 Getting Started

### Prerequisites

- Node.js 18+  
- MongoDB database
- Cloudinary account

### Environment Variables

Create a `.env` file in the root directory:

```env
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_BASE_URL=http://localhost:3000
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📁 Project Structure

```
src/
├── app/
│   ├── api/events/       # API routes for events
│   ├── events/           # Events listing & detail pages  
│   ├── create/           # Create event page
│   └── page.js           # Homepage
├── components/           # Reusable UI components
├── database/             # Mongoose models
└── lib/
    ├── actions/          # Server actions
    └── mongodb.js        # Database connection
```

## 📝 License

MIT License
