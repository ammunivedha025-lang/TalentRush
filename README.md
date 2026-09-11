# TalentRush — Prototype

A React/Vite prototype for:

**Assessment → Talent Profile → Challenge → Portfolio → Opportunities**

## What's new in this version

The baseline scaffold rendered every screen from static, disconnected mock
data — the quiz result had no relationship to the questions you answered.
This version wires the whole flow together into one working state machine:

- **Real scoring** (`src/context/AppContext.jsx`): each quiz option is tagged
  with a talent (`src/data/questions.js`). Finishing the assessment tallies
  those tags into a 0–100 score per talent — your profile is now actually
  derived from your answers.
- **All 8 talent categories** from the brief: Design, Singing, Dance,
  Photography, Video Editing, Coding, Writing, Music (`src/data/talents.js`).
- **Matched challenge**: the Challenge page recommends a challenge template
  (`src/data/challenges.js`) based on your top-scoring talent, not a fixed one.
- **Live portfolio & XP**: submitting a challenge actually adds it to your
  portfolio and adds XP — Level/XP shown in the navbar update in real time.
- **Matched opportunities**: opportunities (`src/data/opportunities.js`) are
  tagged by talent and sorted/scored against your live profile.
- **Persistence**: state is saved to `localStorage`, so a refresh doesn't
  lose your profile, XP, or portfolio.
- Empty states added: visiting Results/Opportunities before taking the
  assessment prompts you to take it first, instead of showing fake data.

## Run locally

Requirements:
- Node.js 18+

```bash
npm install
npm run dev
```

Then open the local URL shown by Vite.

## Notes

Still an intentional prototype:
- Talent scoring is a simple weighted-tally heuristic, not a real ML model.
- File submission on the Challenge page is simulated (no upload/storage).
- Opportunities are mock data (matched, not sourced live).
- No real authentication or payments are connected yet.

Recommended next upgrades:
1. Supabase authentication + database (persist across devices, not just localStorage) 
2. Real file storage for challenge submissions
3. Gemini/OpenAI-powered assessment analysis (replace the tally heuristic)
4. Live opportunity sourcing + AI matching
5. Employer/admin dashboard
6. Real payment integration for paid gigs
