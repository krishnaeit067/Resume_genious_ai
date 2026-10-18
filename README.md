# AI Resume Screener

Upload a resume PDF, optionally paste a job description, and get an instant AI-powered evaluation — ATS score, skill breakdown, strengths, weaknesses, and a hiring recommendation.

Built with **TanStack Start**, **React 19**, **Tailwind CSS**, **shadcn/ui**, and a modern AI SDK.

---

## Features

- **PDF resume upload** — drag-and-drop or click to browse, with client-side text extraction.
- **Inline text editing** — review and fix extracted resume text before re-analyzing.
- **AI-powered analysis** — extracts candidate info, skills, experience, and generates a structured score.
- **Scoring rubrics** — choose from role-specific presets (general, engineering, product, design, etc.) with weighted categories.
- **Job-fit matching** — optionally paste a job description to improve relevance scoring.
- **Step-by-step progress** — visual indicator for parsing, AI extraction, scoring, and final summary.
- **Export reports** — download results as PDF or CSV.
- **Type-safe server functions** — all AI calls run through TanStack `createServerFn`.

---

## Tech Stack

- **Framework:** [TanStack Start](https://tanstack.com/start) — full-stack React with SSR and server functions.
- **Frontend:** React 19, Tailwind CSS 4, shadcn/ui components.
- **Routing:** TanStack Router (file-based).
- **Server:** TanStack server functions (`createServerFn`), edge-ready.
- **Validation:** Zod.
- **AI SDK:** `ai` + `@ai-sdk/openai-compatible` for structured generation.
- **PDF Parsing:** `pdfjs-dist` for client-side text extraction.
- **Build Tool:** Vite 8.

---

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 20+

### Install

```bash
bun install
```

### Run locally

```bash
bun dev
```

Open `http://localhost:8080`.

### Build

```bash
bun run build
```

---

## Project Structure

```text
src/
├── components/ui/        # shadcn/ui components
├── lib/
│   ├── ai-gateway.server.ts   # AI provider setup
│   ├── pdf-extract.ts         # PDF text extraction
│   ├── resume.functions.ts    # Server functions for analysis
│   ├── rubric-presets.ts      # Scoring rubric definitions
│   └── report-export.ts       # PDF/CSV export helpers
├── routes/
│   ├── __root.tsx        # Root layout
│   ├── index.tsx         # Home / resume screener page
│   └── api/              # Public API routes (if any)
├── router.tsx            # Router setup
├── start.ts              # Server function middleware
├── styles.css            # Tailwind entry + theme tokens
```

---

## How It Works

1. **Upload a PDF** — `pdfjs-dist` extracts the raw text in the browser.
2. **Edit extracted text** (optional) — fix any OCR errors before scoring.
3. **Select a rubric** — pick the role profile that best matches the job.
4. **Paste a job description** (optional) — improves job-fit scoring.
5. **Analyze** — the frontend calls `analyzeResume` server function.
6. **Server-side AI** — the server sends the resume text to an AI model with a structured schema, returning:
   - Candidate name
   - Contact info
   - Skills list
   - Experience summary
   - Category scores (skills, experience, education, impact, job fit)
   - Overall ATS score
   - Strengths and weaknesses
   - Hiring recommendation (Strong Hire / Hire / Maybe / No Hire)
7. **Results** — displayed in a clean card layout with export options.

---

## Environment Variables

Create a `.env` file in the project root:

```env
# AI provider (OpenAI-compatible endpoint)
LOVABLE_API_KEY=your_api_key_here

# Optional: Supabase / Lovable Cloud credentials if you add auth/storage
# SUPABASE_URL=
# SUPABASE_PUBLISHABLE_KEY=
# SUPABASE_SERVICE_ROLE_KEY=
```

> The exact variables depend on your deployment setup. The server functions read them inside the handler at runtime.

---

## Deployment

This project is configured for edge/serverless deployment through TanStack Start.

Common platforms:

- **Lovable Cloud** — built-in, zero-config.
- **Vercel / Cloudflare Pages / Netlify** — compatible with TanStack Start SSR.

Build command:

```bash
bun run build
```

---

## Customizing Rubrics

Rubric presets live in `src/lib/rubric-presets.ts`. Each preset defines:

- `id` — unique identifier.
- `label` — display name.
- `description` — helper text.
- `weights` — percentage scores for skills, experience, education, impact, and job fit.

Add or edit presets to match your hiring profiles.

---

## Export Formats

- **PDF** — formatted one-page report using `jspdf`.
- **CSV** — structured rows for spreadsheet imports.

---

## Scripts

| Script | Description |
| --- | --- |
| `bun dev` | Start the dev server |
| `bun run build` | Production build |
| `bun run build:dev` | Development build |
| `bun run preview` | Preview production build |
| `bun run lint` | Run ESLint |
| `bun run format` | Format with Prettier |

---

## License

MIT — free to use, modify, and deploy.

---

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com) for the component system.
- [TanStack](https://tanstack.com) for the full-stack React framework.
- [Vercel AI SDK](https://sdk.vercel.ai) for structured AI generation.
