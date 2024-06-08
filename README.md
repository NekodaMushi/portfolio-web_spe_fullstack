<div align="center">
  <br />
    <a href="https://nexlearn.vercel.app/" target="_blank">
      <img src="" alt="Multi device app showcase">
    </a>
  <br />

  <div>
    <img src="https://img.shields.io/badge/-Typescript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
    <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="nextdotjs" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
  </div>

  <h3 align="center">NexLearn</h3>

   <div align="center">
     <a href="https://nexlearn.vercel.app/" target="_blank"><b>WebApp</b></a> using AI to generate quiz, implementing spaced learning algorithms for reviews, and featuring a chatbot to enhance interaction with learning content.
    </div>
</div>

## 📋 <a name="table">Table of Contents</a>

1. 💻 [Introduction](#introduction)
2. 🛠️ [Tech Stack](#tech-stack)
3. 🧬 [Features](#features)
4. 💨 [Quick Start](#quick-start)
5. 🎨 [Snippets](#snippets)
6. 🔗 [Links](#links)
7. 🚀 [More](#more)

## 🚨 Before you start

---

## <a name="introduction">💻 Introduction</a>

## Getting Started

Follow these steps to set up the project locally on your machine.

**Prerequisites**

To be able to generate quiz, you need to use the custom chrome extension from this repository:

<a href="https://github.com/NekodaMushi/portfolio-web_spe_fullstack_chrome_extension" target="_blank"><b>Brave Extension</b></a>

<b>Warning</b>: It only works on brave for the moment.

<a href="https://youtu.be/cuzw4vL1z5E?feature=shared" target="_blank"><img src="https://github.com/sujatagunale/EasyRead/assets/151519281/1736fca5-a031-4854-8c09-bc110e3bc16d" /></a>

**Installation**

**Cloning the Repository**

Chrome extension:

```bash
git clone git@github.com:NekodaMushi/portfolio-web_spe_fullstack_chrome_extension.git
cd portfolio-web_spe_fullstack_chrome_extension
```

NexLearn

```bash
git clone git@github.com:NekodaMushi/portfolio-web_spe_fullstack.git
cd portfolio-web_spe_fullstack
```

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

## <a name="tech-stack">🛠️ Tech Stack</a>

- Next.js
- Tailwind CSS
- TypeScript
- PostGres
- Neon
- Drizzle

## <a name="features">🔋 Features</a>

👉 **Engaging Hero Section**: Visually appealing hero section that grabs attention and introduces NexLearn's key value proposition.

👉 **Udemy Course Integration**: Seamless integration with Udemy courses, allowing users to easily access and learn from their enrolled courses.

👉 **Quiz Generation from Video Transcripts**: Innovative feature that automatically generates quizzes based on the video transcripts of Udemy courses, enhancing the learning experience.

👉 **Spaced Repetition and Active Recall**: Implementation of proven learning techniques like spaced repetition and active recall to help users retain knowledge effectively.

👉 **AI-Powered Summaries and Bullet Points**: Utilization of AI algorithms to generate concise summaries and key bullet points from video content, making it easier for users to grasp the main concepts.

👉 **ChatBot for Interactive Learning**: An intelligent chatbot that engages users in interactive conversations, answers questions, and provides personalized learning support.

designed to improve the way people learn code with Udemy courses, making the learning process more engaging, effective, and personalized.

## <a name="quick-start">🤸 Quick Start</a>

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## <a name="snippets">🎨 Snippets</a>

<details>
<summary><code>package.json</code></summary>

```json
{
  "name": "nex_learn",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "db:generate": "drizzle-kit generate:pg",
    "db:migrate": "tsx ./db/migrate.ts",
    "db:drop": "drizzle-kit drop",
    "db:seed": "tsx ./db/seed.ts",
    "test": "jest",
    "test:watch": "jest --watch"
  },
  "dependencies": {
    "@auth/core": "^0.30.0",
    "@auth/drizzle-adapter": "^1.0.0",
    "@fortawesome/fontawesome-svg-core": "^6.5.2",
    "@fortawesome/free-solid-svg-icons": "^6.5.2",
    "@fortawesome/react-fontawesome": "^0.2.0",
    "@neondatabase/serverless": "^0.9.1",
    "@radix-ui/react-accordion": "^1.1.2",
    "@radix-ui/react-alert-dialog": "^1.0.5",
    "@radix-ui/react-checkbox": "^1.0.4",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-icons": "^1.3.0",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-navigation-menu": "^1.1.4",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-slot": "^1.0.2",
    "@radix-ui/react-tabs": "^1.0.4",
    "@radix-ui/react-toggle": "^1.0.3",
    "@radix-ui/react-toggle-group": "^1.0.4",
    "@radix-ui/react-tooltip": "^1.0.7",
    "@react-spring/web": "^9.7.3",
    "@reduxjs/toolkit": "^2.2.3",
    "@tabler/icons-react": "^3.2.0",
    "@tanstack/react-query": "^5.37.1",
    "@tanstack/react-table": "^8.17.3",
    "@upstash/ratelimit": "^1.1.3",
    "@upstash/redis": "^1.31.3",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "drizzle-orm": "^0.30.9",
    "embla-carousel-autoplay": "^8.0.4",
    "embla-carousel-react": "^8.0.4",
    "eventsource-parser": "^1.1.2",
    "framer-motion": "^11.0.24",
    "jsonwebtoken": "^9.0.2",
    "lucide-react": "^0.263.1",
    "next": "14.1.4",
    "next-auth": "5.0.0-beta.17",
    "next-cookies": "^2.0.3",
    "next-themes": "^0.3.0",
    "node-watch": "^0.7.4",
    "oslo": "^1.2.0",
    "pg": "^8.11.5",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-icon-cloud": "^4.1.4",
    "react-icons": "^5.0.1",
    "react-intersection-observer": "^9.10.2",
    "react-redux": "^9.1.2",
    "react-rewards": "^2.0.4",
    "react-spring": "^9.7.3",
    "react-textarea-autosize": "^8.5.3",
    "react-type-animation": "^3.2.0",
    "sonner": "^1.4.41",
    "tailwind-merge": "^2.2.2",
    "tailwind-scrollbar": "^3.1.0",
    "tailwindcss-animate": "^1.0.7",
    "vaul": "^0.9.1",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.4.2",
    "@testing-library/react": "^15.0.2",
    "@types/cors": "^2.8.17",
    "@types/jest": "^29.5.12",
    "@types/jsonwebtoken": "^9.0.6",
    "@types/node": "^20.12.7",
    "@types/react": "^18.2.73",
    "@types/react-dom": "^18.2.23",
    "autoprefixer": "^10.4.19",
    "drizzle-kit": "^0.20.17",
    "eslint": "^8.57.0",
    "eslint-config-next": "14.1.4",
    "eslint-plugin-jest-dom": "^5.4.0",
    "eslint-plugin-testing-library": "^6.2.2",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0",
    "jest-fetch-mock": "^3.0.3",
    "postcss": "^8.4.38",
    "prettier": "^3.2.5",
    "prettier-plugin-tailwindcss": "^0.5.13",
    "tailwindcss": "^3.4.3",
    "ts-node": "^10.9.2",
    "tsx": "^4.7.2",
    "typescript": "^5.4.5"
  },
  "engines": {
    "npm": "Please use pnpm",
    "yarn": "Please use pnpm"
  }
}
```

</details>

<details>
<summary><code>globals.css</code></summary>

```typescript
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 346.8 77.2% 49.8%;
    --primary-foreground: 355.7 100% 97.3%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 346.8 77.2% 49.8%;
    --radius: 1rem;

    /* HomePage */
    --emerald-500: #34d399;
    --emerald-600: #2c7a7b;
  }

  .dark {
    --background: 20 14.3% 4.1%;
    --foreground: 0 0% 95%;
    --card: 24 9.8% 10%;
    --card-foreground: 0 0% 95%;
    --popover: 0 0% 9%;
    --popover-foreground: 0 0% 95%;
    --primary: 346.8 77.2% 49.8%;
    --primary-foreground: 355.7 100% 97.3%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 0 0% 15%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 12 6.5% 15.1%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 85.7% 97.3%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 346.8 77.2% 49.8%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}

/* Recall - CustomCard */
.icon-blink {
  animation: blink 6s linear infinite;
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

/* Carousel */

.embla {
  overflow: hidden;
}
.embla__container {
  display: flex;
}
.embla__slide {
  flex: 0 0 100%;
}

/* Chat */

.vertical-scroll::-webkit-scrollbar {
  width: 0.4em;
  height: 1em;
}

.vertical-scroll::-webkit-scrollbar-track {
  background: secondary;
  border-radius: 100vw;
  margin-block: 0.5em;
}

.vertical-scroll::-webkit-scrollbar-thumb {
  background: #6b6b6b;
  border: 0.25em solid secondary;
  border-radius: 100vw;
}

.vertical-scroll::-webkit-scrollbar-thumb:hover {
  background: #7e7e7e;
}


/* HomePage - Lazy loading img */
.blurred-img {
  filter: blur(20px);
  transition: filter 0.3s ease;
}

.blurred-img.loaded {
  filter: blur(0);
}

```

</details>

<details>
<summary><code>tailwind.config.ts</code></summary>

```typescript
import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./assets/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-jetbrains-mono)", ...fontFamily.sans],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        score: {
          10: "#e53935", // Vivid Red
          20: "#ff5722", // Vivid Deep Orange
          30: "#ff9800", // Vivid Orange
          40: "#ffc107", // Vivid Amber
          50: "#ffeb3b", // Vivid Yellow
          60: "#009688", // Vivid Light Green
          70: "#4caf50", // Vivid Green
          80: "#8bc34a", // Vivid Teal
          90: "#b2ff59", // Vivid Blue
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        spring: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        spring: "spring 3s ease-in-out infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("tailwind-scrollbar"),
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-hidden": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      });
    }),
    plugin(addVariablesForColors),
  ],
} satisfies Config;

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val]),
  );

  addBase({
    ":root": newVars,
  });
}

export default config;
```

</details>

## <a name="links">🔗 Links</a>

<a href="https://github.com/NekodaMushi/portfolio-web_spe_fullstack_chrome_extension" target="_blank"><b>Brave Extension</b></a>

## <a name="more">🚀 More</a>

**Serverless Backend with Neon Postgres and Drizzle**: Utilization of serverless architecture with Neon Postgres and Drizzle, ensuring efficient data management and seamless scalability.

**Deployment on Vercel**: Seamless deployment of the NexLearn website on Vercel, enabling fast and reliable access.

**Contributing**

We welcome contributions from the community. If you have suggestions for improvements or new features, please create a pull request or open an issue on our GitHub repository.

**License**

This project is licensed under the MIT License. See the <a href="https://github.com/NekodaMushi/portfolio-web_spe_fullstack/blob/632bd674705a535ea98c529af52038dbf3f3def8/LICENSE" target="_blank"><b>LICENSE</b></a> file for more details.

**Contact**

For any inquiries, please reach out to me at 4252@holbertonstudents.com.

**Advance your skills with HolbertonSchool**

This webapp was developed as a portfolio project at the end of the second year of Holberton School. Many of the skills demonstrated in this project were learned at school.

#
