# Saros Vadi — Mediterranean Boutique Resort Website

A full hotel website with a promotional landing page and a reservation system, built with **Next.js 14**, **Tailwind CSS**, and full **Turkish/English** bilingual support.

---

## Quick Start

### Prerequisites

Make sure you have **Node.js** installed on your computer (version 18 or newer).

- Download Node.js: https://nodejs.org

### How to Run

Open a terminal, navigate to the `Hotel101` folder, and run:

```bash
./start.sh
```

That's it. The script will:

1. Check that Node.js is installed
2. Install all dependencies automatically (only on first run)
3. Start both the promotional and reservation apps
4. Display the local URLs when everything is ready

### URLs

| App | Address |
|---|---|
| Promotional Landing Page | http://localhost:3000 |
| Reservation Page | http://localhost:3001 |

### Stopping the Website

Press **Ctrl + C** in the terminal where `start.sh` is running. Both servers will be stopped cleanly.

---

## Project Structure

```
Hotel101/
├── start.sh              ← Run this to start the website
├── README.md             ← This file
│
├── promotional/          ← Landing page (Next.js app)
│   ├── public/
│   │   └── hero-video.mp4
│   └── src/
│       ├── app/
│       │   ├── globals.css
│       │   ├── layout.tsx
│       │   └── page.tsx
│       ├── components/
│       │   ├── Navbar.tsx
│       │   ├── Hero.tsx
│       │   ├── Welcome.tsx
│       │   ├── Rooms.tsx
│       │   ├── Amenities.tsx
│       │   ├── Location.tsx
│       │   ├── Footer.tsx
│       │   ├── ThemeProvider.tsx
│       │   ├── ThemeToggle.tsx
│       │   ├── LanguageProvider.tsx
│       │   └── LanguageToggle.tsx
│       └── translations/
│           └── index.ts  ← Turkish & English strings
│
└── reservation/          ← Booking flow (Next.js app)
    └── src/
        ├── app/
        │   ├── globals.css
        │   ├── layout.tsx
        │   └── page.tsx
        ├── components/
        │   ├── StepIndicator.tsx
        │   ├── DateRangePicker.tsx
        │   ├── RoomSelector.tsx
        │   ├── RoomCard.tsx
        │   ├── GuestForm.tsx
        │   ├── BookingSummary.tsx
        │   ├── ConfirmationSuccess.tsx
        │   ├── ThemeProvider.tsx
        │   ├── ThemeToggle.tsx
        │   ├── LanguageProvider.tsx
        │   └── LanguageToggle.tsx
        └── translations/
            └── index.ts  ← Turkish & English strings
```

---

## Features

- **Bilingual** — Turkish (default) and English, switchable via TR / EN button
- **Light & Dark mode** — Switchable via sun/moon icon, light mode is default
- **Video hero section** — Full-screen background video (`Saros Video.mp4`)
- **Responsive** — Works on desktop, tablet, and mobile
- **Multi-step reservation** — Stay dates → Room selection → Guest info → Confirm
- **Theme persistence** — Language and theme preferences are saved in the browser

---

## First-Time Setup Note

The first time you run `./start.sh`, it will download and install all required packages into `node_modules/` folders inside `promotional/` and `reservation/`. This takes about 1–2 minutes depending on your internet connection. Subsequent runs will start immediately.

---

## Troubleshooting

**Permission denied when running `./start.sh`**
```bash
chmod +x start.sh
./start.sh
```

**Port already in use**

The script automatically stops anything running on ports 3000 and 3001 before starting. If you still see an error, restart your terminal and try again.

**Node.js not found**

Install Node.js from https://nodejs.org (choose the LTS version).
