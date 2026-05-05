# TODO: setup-harness Improvements

## High Priority

- **Architecture enforcement scaffolding**
  The skill creates `ARCHITECTURE.md` but doesn't help set up any mechanical enforcement.
  The article's core thesis is that constraints must be *enforced*, not just documented.
  - Add guidance to generate a starter custom lint rule (or structural test) that validates the layer dependency directions described in `ARCHITECTURE.md`
  - Populate the `exec-change` template's "Staying in bounds" section with real rules derived from the project's architecture, not just a placeholder comment
  - Note in `ARCHITECTURE.md` where the enforcement lives (e.g. `eslint.config.js`, `scripts/check-arch.ts`)

- **Entropy / garbage collection workflow**
  The article dedicates a full section to recurring cleanup. The skill creates `QUALITY_SCORE.md` but never explains how it gets maintained.
  - Add a `doc-gardening` task description or recurring skill that scans for stale docs and opens fix-up PRs
  - Add guidance for a recurring "golden principles" enforcement pass (scan for hand-rolled helpers that should be shared utilities, YOLO-style data access, etc.)
  - Document how `QUALITY_SCORE.md` grades get updated (cadence, who/what updates them)

## Medium Priority

- **`docs/references/` directory**
  The article's knowledge layout includes `docs/references/` with `llms.txt` files for third-party libraries.
  - Add `docs/references/` to the Required files table
  - Add guidance to generate `llms.txt` stubs for key dependencies (e.g. the framework, ORM, test runner) so agents can reason about them in-repo

- **`docs/generated/` directory**
  The article includes a slot for generated artifacts like `db-schema.md`.
  - Add `docs/generated/` stub to the Required files table (skip if no DB/generated artifacts apply)

- **CI integration**
  The article uses CI jobs to validate that the knowledge base is cross-linked and up to date.
  - Add a step in the procedure to generate (or at least stub) a CI job that validates:
    - `AGENTS.md` links to real files in `docs/`
    - All exec plans in `active/` have a status field
    - `QUALITY_SCORE.md` was updated within the last N days (optional)

## Low Priority

- **Application legibility guidance**
  The article emphasizes making the app directly inspectable by the agent (boot per worktree, browser/CDP integration, local observability stack).
  - Add an optional `docs/OBSERVABILITY.md` stub for projects with a server/app component
  - Note in `ARCHITECTURE.md` whether the app is bootable per worktree, and how to do it

- **PR workflow**
  The article describes an agent-to-agent review loop (Ralph Wiggum Loop).
  - Add a note to `AGENTS.md` template describing the expected PR lifecycle: agent opens PR → agent self-reviews → responds to feedback → merges when all reviewers satisfied
  - Consider a lightweight `docs/WORKFLOW.md` that documents the review loop for this project
