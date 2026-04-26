---
name: setup-harness
description: Scaffold harness engineering for a project: creates /design-change, /plan-change, /exec-change slash commands and the docs/ knowledge structure, adapted to the project's tech stack and conventions.
argument-hint: '[notes or constraints]'
disable-model-invocation: true
---

# /setup-harness — Bootstrap Harness Engineering

Set up harness engineering infrastructure in the current project:
1. Create the `docs/` knowledge base (AGENTS.md, ARCHITECTURE.md, and supporting docs)
2. Create the three workflow skills: `/design-change`, `/plan-change`, `/exec-change`

Run this once in a new project. It adapts everything to the project's actual tech stack and structure.

---

## Procedure

### 1. Explore the Project

Read enough to understand the project before generating anything. At minimum:

- `package.json` / `Cargo.toml` / `pyproject.toml` / equivalent — identify language, framework, package manager, and script commands (build, test, lint, typecheck)
- Root directory listing — identify existing structure, any existing docs/, .github/, .agents/ folders
- `README.md` — understand what the project is and how to run it
- Entry points (e.g. `src/`, `app/`, `lib/`) — understand code organization
- Any existing `AGENTS.md`, `ARCHITECTURE.md`, or `docs/` — read them to avoid overwriting good content

Identify:
- **Package manager / build tool** (pnpm, npm, cargo, uv, etc.)
- **Validation commands** — how to typecheck, lint, and test (these go into the exec-change skill)
- **Project type** — web app, CLI, library, desktop, API, etc.
- **Process model** — any multi-process or multi-context concerns (e.g. Electron main/renderer, frontend/backend)
- **Docs structure** — what already exists vs. what needs to be created

### 2. Check What Already Exists

Before creating anything:
- Check if `.agents/skills/design-change/`, `plan-change/`, `exec-change/` already exist — skip or update them if so
- Check if `docs/`, `AGENTS.md`, `ARCHITECTURE.md` already exist — do not overwrite without noting what was preserved

### 3. Create the docs/ Knowledge Structure

Create the following files, adapting content to the actual project. Skip any that already exist with meaningful content.

#### Required

| File | Purpose |
|------|---------|
| `AGENTS.md` | ~100-line table of contents: what the project is, dev commands, repo layout, key doc pointers, working model |
| `ARCHITECTURE.md` | Process model, source tree, dependency rules, build system |
| `docs/design-docs/index.md` | Index of design docs |
| `docs/design-docs/core-beliefs.md` | Engineering principles for this project |
| `docs/exec-plans/active/README.md` | Exec plan format and guidance |
| `docs/exec-plans/completed/README.md` | Archive stub |
| `docs/exec-plans/tech-debt-tracker.md` | Structured debt tracking |
| `docs/product-specs/index.md` | Product spec index and template |
| `docs/FRONTEND.md` | UI/renderer conventions (skip if no frontend) |
| `docs/DESIGN.md` | Visual/component design conventions (skip if no UI) |
| `docs/PLANS.md` | Current focus + backlog |
| `docs/PRODUCT_SENSE.md` | What the product is, user model, core values |
| `docs/QUALITY_SCORE.md` | Per-domain quality grades |
| `docs/RELIABILITY.md` | Data integrity, startup, error handling requirements |
| `docs/SECURITY.md` | Security model and requirements |

**Adapting content:**
- Use the actual project's tech stack names, not generic placeholders
- Use the real build/test/lint commands everywhere commands are referenced
- For `ARCHITECTURE.md`, describe the actual source tree structure found in step 1
- For `core-beliefs.md`, write principles that reflect this project's actual constraints (process boundaries, data ownership, etc.)
- Omit frontend/UI docs for backend-only or CLI projects
- Add domain-specific docs as needed (e.g. `docs/DATABASE.md` for data-heavy projects)

#### AGENTS.md Requirements
- Keep it to ~100 lines — it's a table of contents, not an encyclopedia
- Include: what the project is, dev commands table, repository layout, key docs table, working model note
- Every important doc in `docs/` should have a row in the key docs table
- End with a note that harness engineering is set up (mixed or pure agent workflow)

### 4. Create the Three Workflow Skills

Create these files under `.agents/skills/`:

```
.agents/skills/design-change/SKILL.md
.agents/skills/plan-change/SKILL.md
.agents/skills/exec-change/SKILL.md
```

Use the templates below, substituting:
- `{VALIDATION_COMMANDS}` → the actual typecheck/lint/test commands for this project
- `{ARCH_DOCS}` → the actual architecture reference files (e.g. `ARCHITECTURE.md`, `docs/design-docs/core-beliefs.md`)
- Any project-specific layer/boundary rules in the "Staying in bounds" section of exec-change

#### design-change template

```markdown
---
name: design-change
description: Create a design doc for a feature or change
argument-hint: '<feature or change description>'
disable-model-invocation: true
---

# /design-change — Create a Design Doc

Capture the design of a feature or change as a durable document in `docs/design-docs/`.
Design docs record *what* and *why* — they are permanent reference, not task checklists.

---

## Procedure

### 1. Understand the Request

Read the user's description. Identify what is being added or changed, what problem it solves, and any constraints mentioned.

Then read relevant context:
- `ARCHITECTURE.md` for layer rules and domain structure
- `docs/design-docs/core-beliefs.md` for applicable principles
- `docs/product-specs/` for related feature specs
- Any existing code in the area being designed

If a critical ambiguity would change the design meaningfully, ask one focused question. Otherwise proceed with reasonable assumptions and document them.

### 2. Design the Feature

Think through the design before writing. Consider:
- **What changes** — which types, interfaces, modules, storage structures
- **Where it lives** — which layer/domain owns each piece
- **Key decisions** — where multiple approaches exist, pick one and record why
- **Risks** — breaking changes, backward compat, performance, data integrity
- **What's out of scope** — explicitly name what this design does NOT cover

### 3. Write the Design Doc

Create the file at:
\`\`\`
docs/design-docs/<feature-name>.md
\`\`\`

Template:

\`\`\`markdown
# Design: <Feature Name>

**Status**: Draft
**Created**: YYYY-MM-DD

## Summary

One paragraph: what this feature does and what user problem it solves.

## Motivation

Why this is being added.

## Design

### Overview

High-level description of the approach.

### Data Model

Any new or changed types, fields, or storage structures.

### API / Interface Changes

New or changed public interfaces.

### Implementation Notes

Layer-by-layer breakdown of what changes where.

## Key Decisions

| Decision | Chosen Approach | Rationale |
|----------|----------------|-----------|

## Out of Scope

## Open Questions
\`\`\`

Omit sections that don't apply.

### 4. Update the Design Doc Index

Add a row for the new file in `docs/design-docs/index.md`.

### 5. Present and Advise

After creating the file, show the file path, a brief summary, and the key decisions made.

Then explicitly advise:
- **Suggest `/plan-change`** if: the feature spans multiple files/layers, has more than ~3 implementation steps, or takes more than one session
- **Skip to `/exec-change`** if: the change is small and clear enough to implement directly

State your reasoning in one sentence.
```

#### plan-change template

```markdown
---
name: plan-change
description: Create a phased execution plan for a task
argument-hint: '[path/to/design-doc.md or task description]'
disable-model-invocation: true
---

# /plan-change — Create an Execution Plan

Turn a design doc (or task description) into a phased execution plan checked into `docs/exec-plans/active/`.
A plan breaks work into **phases** — logical chunks executed one at a time via `/exec-change`.

---

## Procedure

### 1. Identify the Input

**If the user provided a design doc path:** Read that file as the primary source.

**If the user provided a description (or this follows `/design-change` in context):**
- If a design doc was just created in this conversation, use it
- Otherwise check `docs/design-docs/` for a matching doc
- If none exists, read relevant architecture docs and proceed from the description

If ambiguity remains, ask one focused question before continuing.

### 2. Explore Relevant Code

Read the code areas that will be affected: which files need to change, what patterns to follow, what constraints apply, what risks exist.

### 3. Divide into Phases

Group work into sequential phases where each phase is independently completable and leaves the codebase in a valid state. Typical phases:

- **Foundation**: shared types, data model changes
- **Backend / Core**: business logic, storage, handlers
- **Interface / Bridge**: public API, IPC, protocol changes
- **Frontend / UI**: UI components, user-facing changes
- **Validation**: tests, lint, typecheck, manual verification

Tailor phases to the actual work. Small tasks may have only 1–2 phases.

### 4. Write the Plan File

Create at `docs/exec-plans/active/YYYY-MM-DD-<short-slug>.md`:

\`\`\`markdown
# Plan: <Title>

**Status**: In Progress
**Started**: YYYY-MM-DD
**Design Doc**: [docs/design-docs/<name>.md](../../design-docs/<name>.md) _(if applicable)_
**Owner**: human | agent | both

## Goal

One paragraph describing what this plan accomplishes.

## Phase 1: <Name>

- [ ] Step 1.1: <concrete action>
- [ ] Step 1.2: <concrete action>

## Phase 2: <Name>

- [ ] Step 2.1: <concrete action>

## Decisions

## Progress Log
\`\`\`

Steps should be concrete actions, not areas. Each phase must leave the codebase compilable. Include validation steps in the final phase.

### 5. Present the Plan

Show the file path, phase structure, and full step list. Ask: "Does this look right, or do you want to adjust phases or steps before executing?"
```

#### exec-change template

```markdown
---
name: exec-change
description: Execute a feature or the next phase of an execution plan
argument-hint: '[path/to/plan-file.md or plan description]'
disable-model-invocation: true
---

# /exec-change — Execute a Feature or Plan Phase

Execute a feature directly, or work through the next incomplete phase of an execution plan.
- **With an exec plan**: one `/exec-change` = one phase. Run `/exec-change` again for the next phase.
- **Without an exec plan** (small feature): execute the full change directly from the design doc or description.

---

## Procedure

### 1. Identify What to Execute

**If given a file path:**
- Exec plan → phase-based execution
- Design doc → execute directly (no phases)

**If given a description (or following `/plan-change` or `/design-change` in context):**
- Use a plan just created in this conversation, or find one in `docs/exec-plans/active/`
- If no exec plan exists, use a design doc from `docs/design-docs/` or the description directly

**If nothing is found and no context exists:** Ask the user to provide a path or description.

> **No exec plan ≠ blocked.** Small features may skip `/plan-change`. Execute directly from the design doc or description.

### 2. Read and Understand the Source

**From an exec plan:** Read Goal, all phases and steps, Decisions, Progress Log. Find the first phase with unchecked steps (`[ ]`). If partially done, resume it.

**From a design doc or description:** Read the full design. Derive implementation steps yourself — treat the feature as one phase.

Check architecture docs if the work touches structural boundaries. Read referenced source files before changing them.

### 3. Confirm the Scope

**Exec plan:** Tell the user: "Executing **Phase N: \<Name\>** — \<one-sentence summary\>."

**No exec plan:** Tell the user: "No exec plan — executing directly. Implementing: \<one-sentence summary\>."

For risky operations (breaking API changes, schema migrations, file renames), list what will change and ask for confirmation.

### 4. Execute This Phase Only (or the full feature if no plan)

For each step:
1. Do the work
2. Validate incrementally — after logic changes run:
   {VALIDATION_COMMANDS}
3. Mark the step complete: `- [ ]` → `- [x]`
4. Fix validation failures before moving on — don't accumulate broken states

**Staying in bounds:**
- Follow `docs/design-docs/core-beliefs.md` for all changes
- [Add any project-specific layer/boundary rules here]

**When blocked:** Record in Decisions, set Status to `Blocked`, stop and report.

**When making a non-obvious decision:** Add to Decisions with rationale before continuing.

**Do not start the next phase.** Stop at the phase boundary.

### 5. Update the Plan

- Mark all completed steps `[x]`
- Add a progress log entry: `- **YYYY-MM-DD**: Completed Phase N (<Name>) — <summary>`
- Update Status: `In Progress` | `Blocked` | `Waiting for Review`

### 6. Report and Prompt

After the phase:
- Summarize what was done
- Report validation status
- Name the next phase (if any): "Run `/exec-change` to continue with Phase N+1: \<Name\>."

When **all phases complete**, run the full suite:
\`\`\`
{FULL_VALIDATION_COMMAND}
\`\`\`
Fix failures, set Status to `Waiting for Review`, then ask: "All phases complete. Move to `docs/exec-plans/completed/`?"

---

## Notes

- Plans without explicit phases are treated as a single phase
- If executing from a design doc with no plan, run full validation at the end and report what was done
- Never skip a step without a documented reason in Decisions
```

Substitute `{VALIDATION_COMMANDS}` and `{FULL_VALIDATION_COMMAND}` with the actual commands found in step 1 (e.g. `pnpm run typecheck`, `cargo test`, `pytest`).

### 5. Report What Was Created

After completing setup, show the user:

1. A list of all files created (docs + skills)
2. The three slash commands now available: `/design-change`, `/plan-change`, `/exec-change`
3. The workflow summary:
   > `/design-change <feature>` → design doc → `/plan-change` (if complex) → `/exec-change` (one phase at a time)
4. Any files that were skipped because they already existed

---

## Notes

- If the project already has a partial harness setup, read what exists and fill in only the gaps — do not overwrite good content
- The generated skills are starting points; refine `core-beliefs.md` and the "Staying in bounds" rules to match the project's actual architectural constraints
