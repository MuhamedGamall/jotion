# Notion Clone

A fullstack Notion clone built with Next.js, React, Shadcn-UI, Tailwind, Clerk, Convex, and BlockNote.

## Landing page

![Screenshot 1](https://github.com/MuhamedGamall/jotion/blob/master/public/Screenshot%20(147).png)
## Editor

![Screenshot 2](https://github.com/MuhamedGamall/jotion/blob/master/public/Screenshot%20(151).png)

## Features

* 🔐 Authentication using Clerk
* 📊 Real-time backend and database powered by Convex.dev
* 🖼️ Upload images using convex storage
* 📝 Create and edit notes using BlockNote editor
* 🙂 Emojis using Emoji Picker React
* 🌲 Create hierarchies of notes
* 🗑️ Archive, restore, and delete notes
* 📢 Publish notes to share with others
* ⬅️ Adjustable sidebar
* ✨ Responsive UI and light/dark mode built with Tailwind and shadcn/ui

## Getting Started

### Clone the repo

```bash
git clone https://github.com/MuhamedGamall/jotion.git
```

### Install dependencies

```bash
npm install
```

### Setup .env file

```env
# Convex
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=
CLERK_PUBLIC_CLERK_SIGN_UP_URL=
CLERK_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=

```

### Start Convex

```bash
npx convex dev
```

### Start the app

```bash
npm run dev
```
