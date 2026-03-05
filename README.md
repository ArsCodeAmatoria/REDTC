# REDTC

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat-square&logo=vercel)](https://redtc.vercel.app)
[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=flat-square)](https://redtc.vercel.app)

**Red Seal Tower Crane Exam Practice** — A modern, accessible practice exam platform for BC Red Seal Tower Crane certification.

![REDTC Screenshot](images/screenshot.png)

---

## Features

- **200 Practice Questions** — Comprehensive question bank covering all Red Seal Tower Crane topics
- **Randomized Tests** — Each test presents 10 random questions for varied practice sessions
- **Instant Feedback** — Detailed explanations for every answer, including why incorrect options are wrong
- **Review Mode** — Browse the entire question bank by category
- **Dark Mode** — Full light/dark theme support with system preference detection
- **Responsive Design** — Works seamlessly on desktop, tablet, and mobile
- **No Account Required** — Start practicing immediately

## Topics Covered

- Safety & Legislation
- Load Charts & Calculations
- Rigging & Slinging
- Crane Components & Operation
- Site Operations & Planning
- Inspection & Maintenance
- Climbing & Erection
- Communication & Supervision
- Troubleshooting & Failure Prevention

## Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/ArsCodeAmatoria/REDTC.git

# Navigate to the project directory
cd REDTC

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
REDTC/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # Landing page
│   │   └── test/
│   │       ├── page.tsx        # Practice test page
│   │       └── review/
│   │           └── page.tsx    # Question review page
│   ├── components/
│   │   ├── layout/             # Layout components
│   │   ├── providers/          # Context providers
│   │   ├── quiz/               # Quiz components
│   │   └── ui/                 # UI primitives
│   ├── data/
│   │   └── questions.json      # Question bank
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utility functions
│   └── types/                  # TypeScript types
├── images/                     # Static images
└── public/                     # Public assets
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Questions aligned with BC WorkSafeBC regulations and Red Seal certification standards
- Built with modern web technologies for optimal performance

---

<p align="center">
  Made by <a href="https://bigfootcrane.com/">Bigfoot Crane</a> – 2026
</p>
