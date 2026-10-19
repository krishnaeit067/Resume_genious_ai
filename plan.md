## Goals

1. Add a visible, step-by-step progress indicator during resume analysis with clear status messages for each stage.
2. When a new resume is uploaded (or "Analyze" is re-run on a different resume), fully reset old resume text, extracted data, and prior analysis results so nothing stale bleeds into the new run.

## Stages to show

```text
1. Parsing PDF        → extracting text from the uploaded file
2. AI extraction      → sending resume + JD to the model, reading structured fields
3. Scoring            → applying the selected rubric weights
4. Final summary      → building recommendation & rationale
```

Only step 1 (PDF parsing) is a real client-side phase. Steps 2–4 happen inside a single server function call, so the indicator will advance through them on a timed schedule while the request is in flight, then snap to "Done" when the response arrives. Any error marks the current stage as failed and shows the error message inline.

## Changes in `src/routes/index.tsx`

- Add a `stage` state: `"idle" | "parsing" | "ai" | "scoring" | "summary" | "done" | "error"` plus an `errorStage` marker.
- During `onFile`: set stage to `parsing` while `extractPdfText` runs; on success move to `idle` (ready to analyze); on failure mark `error`.
- On "Analyze resume" click: drive stages `ai → scoring → summary` via `setTimeout` steps (e.g. ~1.5s, ~1.5s) while the `analyze` mutation is pending. When the mutation resolves, jump to `done`; on error, freeze on the current stage and flag it as failed.
- New `<AnalysisProgress />` component rendered in the results column (replaces the current "Analyzing resume…" card). Shows a vertical checklist:
  - Pending steps: muted circle
  - Active step: spinner + "in progress" label
  - Completed steps: green check
  - Failed step: red alert + short message
  - Optional thin `<Progress />` bar showing overall percentage (25/50/75/100).
- Keep the existing top-level error toast/inline error for the mutation.

## Reset behavior for a new resume

- In `onFile` (drop / file picker) and in the "Remove file" (X) handler:
  - Clear `resumeText`, `file` (as appropriate), `extractError`, `stage → idle`.
  - Call `mutation.reset()` so `mutation.data` and `mutation.error` are cleared — this removes the prior results card immediately.
- When "Analyze resume" is clicked and prior results exist, call `mutation.reset()` before starting the new run so the results pane shows the progress indicator instead of stale data.
- Also reset when the user edits the pasted resume text after a previous analysis (debounced/simple: on first change after `done`, clear results).

## Files touched

- `src/routes/index.tsx` — state additions, reset logic in `onFile` / remove handler / analyze handler, new `AnalysisProgress` component rendered in the results column.

No changes to server functions, schemas, or export logic.

## Out of scope

- True server-streamed progress (would require converting `analyzeResume` to a server route with SSE/streaming). Called out here so expectations are clear; the timed client-side stepper is a visual approximation of real work happening on the server.
