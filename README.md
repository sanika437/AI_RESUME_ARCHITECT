# CareerForge Pro — AI Resume Architect & ATS Optimizer
# Project 2 | Zaalima Development Q4 Roadmap

## ⚡ Quick Setup (2 minutes)

### 1. Get Gemini API Key (Free)
→ https://aistudio.google.com/app/apikey → Sign In → Create API Key

### 2. Set API Key
Edit `server/server/.env`:
```
GEMINI_API_KEY=AIzaSy...your_key_here
PORT=5000
```

### 3. Run Server
```bash
cd server/server
npm install
node index.js
# → Server on http://localhost:5000
```

### 4. Run Client
```bash
cd client
npm install
npm start
# → App on http://localhost:3000
```

---

## Project 2 Requirements — Implementation Status

| Requirement | Status | Implementation |
|-------------|--------|----------------|
| **Gemini 1.5 Flash** (not 2.5!) | ✅ Fixed | `aiService.js` uses `gemini-1.5-flash` |
| **JD Analysis Agent** | ✅ Done | `POST /api/ai/analyze-jd` |
| **AI Rewrite Logic** | ✅ Done | `POST /api/ai/rewrite-bullet` |
| **ATS Scoring** (keyword %) | ✅ Done | `POST /api/ai/ats-score` |
| **Cover Letter Generator** | ✅ Done | `POST /api/ai/cover-letter` |
| **SSE Streaming (typing effect)** | ✅ Done | `POST /api/ai/cover-letter-stream` |
| **PDF text extraction** | ✅ Done | `POST /api/pdf/extract-text` (pdf-parse) |
| **Full pipeline** | ✅ Done | `POST /api/ai/full-process` |

---

## Why the 503 Errors Were Happening

The original code used **`gemini-2.5-flash`** — an experimental preview model
that constantly hits rate limits. The project requirement specifies **`gemini-1.5-flash`**
which is the stable, production-ready model. This single change fixes all 503 errors.

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/ai/full-process` | Full pipeline: extract + optimize + ATS |
| POST | `/api/ai/analyze-jd` | Extract keywords from JD |
| POST | `/api/ai/ats-score` | Calculate ATS score |
| POST | `/api/ai/cover-letter` | Generate cover letter (sync) |
| POST | `/api/ai/cover-letter-stream` | Generate cover letter (SSE streaming) |
| POST | `/api/ai/rewrite-bullet` | Rewrite single bullet with keyword |
| POST | `/api/pdf/extract-text` | Extract text from PDF upload |
| POST | `/api/pdf/download` | Generate downloadable PDF |

---

## Bugs Fixed

1. Wrong Gemini model (`gemini-2.5-flash` → `gemini-1.5-flash`)
2. PDF uploads sent placeholder text instead of real content
3. Resume showed generic "Your Name" / "Alex Johnson" instead of real candidate data
4. Cover letter said "With fresher years of experience" (jd.experience="fresher" bug)
5. Cover letter now streams token-by-token with typing cursor effect
