# KeenKeeper 🌿

> **Keep your friendships alive** — A modern personal relationship manager designed to surface overdue connections, log instant check-ins, and visualize interaction history.

![KeenKeeper Preview](https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&auto=format&fit=crop&q=80)

---

## 🌟 Overview

**KeenKeeper** solves the modern challenge of staying in touch with the people who matter most. In busy everyday lives, it's easy to lose track of when you last caught up with close friends, mentors, or family. 

KeenKeeper acts as your personal relationship dashboard:
- It proactively surfaces who needs attention based on custom contact goals.
- Provides seamless one-click logging for calls, texts, and video chats.
- Delivers rich analytics on your communication habits over time.
- Implements a custom, bespoke **Dark Theme** with lush emerald accents, glassmorphic card depth, and accessible indicators.

---

## ✨ Key Features (PRD Section 1–8 & Challenges)

### 1. 🎯 Dynamic Friend Status Tracking
- Categorizes all contacts into three distinct statuses:
  - 🔴 **Overdue**: Contact frequency goal exceeded.
  - 🟡 **Almost Due**: Approaching the scheduled contact interval.
  - 🟢 **On-Track**: Recently contacted and in good standing.
- Dual visual encoding: Text labels plus animated pulsing dot indicators to comply with accessibility standards (status not conveyed by color alone).
- Dynamic summary cards on Home compute **Total Friends**, **On Track**, **Need Attention**, and **Interactions This Month** in real time from local state.

### 2. ⚡ One-Click Check-In Logging & Real-Time Sync
- Visit any friend's detail page (`/friend/:id`) to find dedicated **Call**, **Text**, and **Video** check-in triggers.
- Clicking any action:
  - Immediately logs a timestamped event into the shared timeline.
  - Fires a celebratory toast notification (e.g., *"Call logged with Emma Wilson"*).
  - Automatically resets the friend's `days_since_contact` to `0` and updates their status to `on-track`.
  - Persists all state automatically to `localStorage` across page reloads.

### 3. 📊 Friendship Analytics (Challenge C1)
- Interactive Recharts Donut & Pie Chart on the `/stats` page.
- Visual breakdown of interactions across communication channels (Call, Text, Video, Meetup).
- Features custom glassmorphic hover tooltips with percentage calculations and color-matched legends.
- Summary metric tiles for *Preferred Channel*, *Latest Catch-Up*, and *On-Track Ratio*.
- Graceful empty state when no interaction history exists.

### 4. 🕒 Timeline with Multi-Filter, Search & Sorting (Challenge C2)
- Chronological timeline (`/timeline`) with newest interactions displayed first.
- Interactive category filter pills: `All`, `Call`, `Text`, `Video`, `Meetup`.
- Instant search bar filtering by friend name or interaction description.
- Toggleable sort order (Newest first vs. Oldest first).

### 5. 🌙 Bespoke Dark Theme Design & Aesthetics
- Styled with an obsidian slate base (`#090d16`), deep navy cards (`#111827`), glowing emerald highlights (`#10b981`), and subtle border translucency.
- Polished micro-interactions: card hover lifts, smooth button ripples, and responsive mobile drawer menu.

### 6. ➕ Interactive "Add a Friend" Experience
- The "+ Add a Friend" button opens an accessible modal dialog allowing users to add custom friends with name, email, contact goal interval, tags, and personal bio notes.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [React 18](https://react.dev/) + [Vite](https://vitejs.dev/) |
| **Routing** | [React Router DOM v6](https://reactrouter.com/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) with custom dark palette |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Data Visualization** | [Recharts](https://recharts.org/) |
| **Notifications** | [React Hot Toast](https://react-hot-toast.com/) |
| **State Management** | React Context (`TimelineContext`) + LocalStorage |
| **Deployment Readiness** | Netlify (`_redirects`) & Vercel (`vercel.json`) SPA rewrite rules |

---

## 📁 Project Structure

```
KeenKeeper/
├── public/
│   ├── _redirects              # Netlify SPA fallback rule
│   └── favicon.svg             # Custom SVG favicon
├── src/
│   ├── components/
│   │   ├── AddFriendModal.jsx  # New connection modal
│   │   ├── Banner.jsx          # Hero header + 4 summary cards
│   │   ├── Footer.jsx          # Deep green footer matching Figma
│   │   ├── FriendCard.jsx      # Friend card with avatar, tags & status
│   │   ├── Loader.jsx          # Simulated loading animation & skeletons
│   │   ├── Navbar.jsx          # Top navigation with mobile drawer
│   │   ├── StatusBadge.jsx     # Accessible overdue/almost/on-track badge
│   │   ├── SummaryCard.jsx     # Top metric summary card
│   │   └── TimelineItem.jsx    # Individual interaction item
│   ├── context/
│   │   └── TimelineContext.jsx # Global context & localStorage sync
│   ├── data/
│   │   └── friends.json        # 10 realistic friend records
│   ├── pages/
│   │   ├── FriendDetails.jsx   # 2-column details & check-in buttons
│   │   ├── Home.jsx            # Main dashboard & responsive friend grid
│   │   ├── NotFound.jsx        # 404 error page with Home recovery
│   │   ├── Stats.jsx           # Recharts pie chart analytics
│   │   └── Timeline.jsx        # Filterable & searchable interaction log
│   ├── App.jsx                 # Route definitions & layout shell
│   ├── index.css               # Tailwind directives & glass utilities
│   └── main.jsx                # Entry point & toast configuration
├── vercel.json                 # Vercel SPA rewrite rule
├── vite.config.js              # Vite config
├── tailwind.config.js          # Tailwind dark theme configuration
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0 or newer)
- npm or yarn

### Installation

1. Clone or navigate to the repository:
   ```bash
   cd KeenKeeper
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview the production build:
   ```bash
   npm run preview
   ```

---

## 🌐 SPA Routing & Deployment

When deploying as a single page application (SPA), direct reloads on sub-paths like `/friend/1`, `/timeline`, or `/stats` require server rewrites:
- **Netlify**: Configured via `public/_redirects` (`/* /index.html 200`).
- **Vercel**: Configured via `vercel.json` rewrite routing.

---

## 📄 License & Credits
Created for KeenKeeper — Keep your friendships alive. All rights reserved © 2026.
