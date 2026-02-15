# Specification

## Summary
**Goal:** Build the EdenMind core experience to collect plant care/symptom inputs and return a deterministic “AI-like” diagnosis with a treatment plan and ongoing care guidance, presented in a cohesive botanical-themed UI.

**Planned changes:**
- Create a frontend form to collect plant type/name, environment (light exposure), watering frequency, and free-text symptoms/observations.
- Add a single Motoko backend method that deterministically analyzes inputs and returns structured results (issues, rationale, confidence/likelihood, treatment steps, ongoing care checklist) across common problem categories.
- Implement a results UI with sections for Diagnosis, Why this is likely, Treatment plan (step-by-step), and Ongoing care (do/don’t checklist), plus a “Start over” action.
- Apply a consistent earthy/botanical theme (greens and warm neutrals; avoid blue/purple as primary colors) across the app using Tailwind and existing components.
- Add and display static EdenMind brand imagery (logo + hero/banner) from frontend public assets.

**User-visible outcome:** Users can enter their plant details and symptoms, submit for analysis without page reload, and see an actionable diagnosis summary with confidence, step-by-step treatment, and an ongoing care checklist in a themed EdenMind interface with visible logo and hero imagery.
