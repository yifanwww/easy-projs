# Setup Procedure

Follow these steps to bootstrap harness engineering for a project.

Read `./harness.md` first to understand what you're setting up and why.

## Step 1. Explore the Project

Read enough to understand the project before generating anything. At minimum:

- `package.json` / `Cargo.toml` / `pyproject.toml` / equivalent — identify language, framework,
  package manager, and script commands (build, test, lint, typecheck)
- Root directory listing — identify existing structure, any existing `docs/`, `.github/`,
  `.agents/` folders
- `README.md` — understand what the project is and how to run it
- Entry points (e.g. `src/`, `app/`, `lib/`) — understand code organization
- Any existing `AGENTS.md`, `ARCHITECTURE.md`, or `docs/` — read them to avoid overwriting good
  content

Identify:

- **Package manager / build tool** (pnpm, npm, cargo, uv, etc.)
- **Validation commands** — how to typecheck, lint, and test (these go into the exec-change skill)
- **Human-only commands** — scripts the agent must never run: dev servers, watch modes, interactive
  installers, deployments, destructive operations (these get annotated in AGENTS.md)
- **Project type** — web app, CLI, library, desktop, API, etc.
- **Process model** — any multi-process or multi-context concerns (e.g. Electron main/renderer,
  frontend/backend)
- **Docs structure** — what already exists vs. what needs to be created

## Step 2. Check What Already Exists

Before creating anything:

- Check if `.agents/skills/design-change/`, `plan-change/`, `exec-change/` already exist — skip or
  update them if so
- Check if `docs/`, `AGENTS.md`, `ARCHITECTURE.md` already exist — do not overwrite without noting
  what was preserved

## Step 3. Create the docs/ Knowledge Structure

Create the following files, adapting content to the actual project. Skip any that already exist
with meaningful content.

### Required Files

| File                                   | Purpose                                                                                                      |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `AGENTS.md`                            | ~100-line table of contents: what the project is, dev commands, repo layout, key doc pointers, working model |
| `ARCHITECTURE.md`                      | Process model, source tree, dependency rules, build system                                                   |
| `docs/design-docs/index.md`            | statuses, and index of active + completed design docs                                                        |
| `docs/design-docs/core-beliefs.md`     | Engineering principles for this project                                                                      |
| `docs/design-docs/template.md`         | Design doc template (copy from `templates/design-doc.md`)                                                    |
| `docs/design-docs/active/`             | Directory for active (in-progress) design docs                                                               |
| `docs/design-docs/completed/`          | Directory for completed design docs (archive)                                                                |
| `docs/exec-plans/index.md`             | when-to-use guidance, statuses, completion workflow, and index of active + completed plans                   |
| `docs/exec-plans/template.md`          | Exec plan template (copy from `templates/exec-plan.md`)                                                      |
| `docs/exec-plans/active/`              | Directory for active (in-progress) execution plans                                                           |
| `docs/exec-plans/completed/`           | Directory for completed execution plans (archive)                                                            |
| `docs/exec-plans/tech-debt-tracker.md` | Structured debt tracking                                                                                     |
| `docs/product-specs/index.md`          | Product spec index and template                                                                              |
| `docs/FRONTEND.md`                     | UI/renderer conventions (skip if no frontend)                                                                |
| `docs/DESIGN.md`                       | Visual/component design conventions (skip if no UI)                                                          |
| `docs/PLANS.md`                        | Current focus + backlog                                                                                      |
| `docs/PRODUCT_SENSE.md`                | What the product is, user model, core values                                                                 |
| `docs/QUALITY_SCORE.md`                | Per-domain quality grades                                                                                    |
| `docs/RELIABILITY.md`                  | Data integrity, startup, error handling requirements                                                         |
| `docs/SECURITY.md`                     | Security model and requirements                                                                              |

### Adapting Content

- Use the actual project's tech stack names, not generic placeholders
- Use the real build/test/lint commands everywhere commands are referenced
- For `ARCHITECTURE.md`, describe the actual source tree structure found in step 1
- For `core-beliefs.md`, write principles that reflect this project's actual constraints (process
  boundaries, data ownership, etc.)
- Omit frontend/UI docs for backend-only or CLI projects
- Add domain-specific docs as needed (e.g. `docs/DATABASE.md` for data-heavy projects)
- `docs/PLANS.md` tracks current focus and backlog only — it must NOT list completed plans;
  `docs/exec-plans/index.md` is the single source of truth for active and completed plans; having
  both track completions guarantees drift
- `docs/design-docs/index.md` must include a Statuses table listing the valid statuses for design
  docs: `Draft`, `Accepted`, `Implemented`, `Superseded`
- `docs/exec-plans/index.md` must include a Statuses table listing the valid statuses for exec
  plans: `Active`, `Waiting for Review`, `Completed`, `Blocked`, `Superseded`

### AGENTS.md Requirements

- Keep it to ~100 lines — it's a table of contents, not an encyclopedia
- Include: what the project is, dev commands table, repository layout, key docs table
- Every important doc in `docs/` should have a row in the key docs table — each row must link to
  an **exact file path**, never a folder path; agents need to know exactly what to read
- **Do NOT mention `/design-change`, `/plan-change`, or `/exec-change`** — these are human-facing
  slash commands, explicitly triggered by the user; AI agents reading AGENTS.md should not be
  proactively aware of them

#### Key Operating Principles (must appear as content in the generated AGENTS.md)

The generated AGENTS.md must include a **Key Operating Principles** section.
Include these exact bullets:

- **Agents follow the same conventions as humans.** Nothing special-cased.
- **If something is not in the repo, it does not exist.** Context in chat/docs outside the repo
  is invisible to agents; encode decisions as markdown or code.
- **Enforce mechanically where possible.** Prefer lints and tests over documentation-only rules.
- **File links use backtick-wrapped relative paths, not Markdown link syntax.** Write
  `docs/design-docs/core-beliefs.md`, not `[core beliefs](docs/design-docs/core-beliefs.md)`.
  Backtick paths are easier to scan, copy, and grep. Agents parse them reliably.
- **When uncertain, check `docs/design-docs/core-beliefs.md` first.**

Add any project-specific principles below these core ones.

#### Classifying Commands: Agent-Safe vs Human-Only

When writing the dev commands table, scan every script in `package.json` (or equivalent) and
classify each as **agent-safe** or **human-only**:

**Agent-safe** — the agent may run these freely:

- Finite execution: the command completes and exits on its own
- Non-interactive: no prompts, no stdin, no watch mode
- Non-destructive: no deploys, no releases, no data wiping
- Examples: `build`, `test`, `lint`, `typecheck`, `format`

**Human-only** — the agent must NEVER run these; annotate them in AGENTS.md:

- Long-running servers / watch modes (e.g. `dev`, `start`, `serve`, `watch`)
- Interactive commands (e.g. `init`, `create`, interactive installers)
- Destructive or release commands (e.g. `deploy`, `publish`, `dist:mac`, `dist:win`, `reset-db`)
- Commands that require human judgment (e.g. `merge`, `approve`)

Mark each human-only command clearly in the AGENTS.md commands table, for example:

```
pnpm run dev           # launch in dev mode (HMR) — **human only**, do NOT run via agent
```

If uncertain about a command, default to **human-only**.

## Step 4. Create Four Workflow Skills

Create these files under `.agents/skills/`:

```
.agents/skills/design-change/SKILL.md
.agents/skills/plan-change/SKILL.md
.agents/skills/exec-change/SKILL.md
.agents/skills/close-change/SKILL.md
```

Templates are in `templates/` next to this file:

- `./templates/design-change.md`
- `./templates/plan-change.md`
- `./templates/exec-change.md`
- `./templates/close-change.md`

Read each template and create the corresponding `SKILL.md`, substituting these placeholders in
`exec-change`:

- `{VALIDATION_COMMANDS}` → the actual typecheck/lint/test commands for this project (one per line,
  formatted as a code block)
- `{FULL_VALIDATION_COMMAND}` → the command that runs the full validation suite

Add any project-specific layer/boundary rules to the "Staying in bounds" section of exec-change.

## Step 5. Report What Was Created

After completing setup, show the user:

1. A list of all files created (docs + skills)
2. The four slash commands now available: `/design-change`, `/plan-change`, `/exec-change`, `/close-change`
3. The workflow summary:
   > `/design-change <feature>` → design doc → `/plan-change` (if complex) → `/exec-change` (one
   > phase at a time) → `/close-change` (archive when done)
4. Any files that were skipped because they already existed

## Notes

- If the project already has a partial harness setup, read what exists and fill in only the gaps —
  do not overwrite good content
- The generated skills are starting points; refine `core-beliefs.md` and the "Staying in bounds"
  rules to match the project's actual architectural constraints
