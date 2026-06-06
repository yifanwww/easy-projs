# Harness Engineering

> Source: [Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/)
> by Ryan Lopopolo, OpenAI — February 2026

Harness engineering is a software development methodology where **humans steer and agents
execute**. Engineers do not write code directly. Instead, they define environments, specify intent,
and build feedback loops that allow AI coding agents to do reliable, high-quality work at scale.

The term comes from the idea of building a _harness_ — the scaffolding, tooling, constraints, and
knowledge structures that an agent needs in order to work effectively in a codebase. Just as a
harness keeps a worker safe while they do their job, a harness engineering setup keeps an agent
oriented while it implements, tests, reviews, and ships code.

## The Origin

OpenAI's team ran an experiment: build and ship a real internal software product with **zero lines
of manually written code**. Every line — application logic, tests, CI configuration,
documentation, observability, and internal tooling — was written by Codex agents.

The result: a million lines of code in roughly five months, with a team of three to seven
engineers. ~1,500 pull requests merged. Throughput of 3.5 PRs per engineer per day. The product
had daily internal users and external alpha testers.

The key insight was that slow progress early on wasn't because the agent was incapable. It was
because **the environment was underspecified**. The agent lacked the tools, abstractions, and
internal structure required to make progress toward high-level goals.

## Redefining the Role of the Engineer

In a harness engineering setup, the engineer's job is no longer to write code. It is to:

- **Break down goals** into smaller building blocks (design, code, review, test)
- **Prompt the agent** to construct those blocks
- **Identify missing capabilities** when the agent fails — then encode them in the repo
- **Validate outcomes** rather than produce outputs
- **Encode human taste** into tools, lints, and docs so it applies automatically

When something fails, the fix is almost never "try harder." Because the only way to make progress
is to get the agent to do the work, engineers always ask: **"What capability is missing, and how do
we make it both legible and enforceable for the agent?"**

## Core Principle: The Repo Is the System of Record

Agents can only see what's in the repository. Knowledge in chat threads, design docs outside the
repo, Slack messages, or people's heads is **invisible** to the agent. Everything relevant must be
encoded as versioned artifacts — markdown, code, schemas, plans.

> "From the agent's point of view, anything it can't access in-context while running effectively
> doesn't exist."

This means:

- Architectural decisions → `ARCHITECTURE.md` and `docs/design-docs/`
- Engineering principles → `docs/design-docs/core-beliefs.md`
- Active in-progress work → `docs/exec-plans/index.md`
- Known debt → `docs/exec-plans/tech-debt-tracker.md`
- Product decisions → `docs/product-specs/index.md`

If a Slack discussion aligned the team on an architectural pattern, and it isn't discoverable to
the agent, it is effectively unknown — the same as it would be to a new hire joining months later.

## Progressive Disclosure: Give Agents a Map, Not a Manual

The "one big AGENTS.md" approach fails in predictable ways:

- **Context is scarce** — a giant instruction file crowds out the task, the code, and the relevant
  docs. The agent either misses key constraints or optimizes for the wrong ones.
- **Too much guidance becomes no guidance** — when everything is "important," nothing is. Agents
  pattern-match locally instead of navigating intentionally.
- **It rots instantly** — a monolithic manual turns into a graveyard of stale rules. Agents can't
  tell what's still true, humans stop maintaining it, and the file quietly becomes an attractive
  nuisance.
- **It's hard to verify** — a single blob doesn't lend itself to mechanical checks (coverage,
  freshness, ownership, cross-links), so drift is inevitable.

Instead: keep `AGENTS.md` to **~100 lines** as a **table of contents** — a small, stable entry
point that points to deeper sources of truth. Agents load the map first, then follow pointers to
only the context they need for the task at hand.

### The docs/ Structure

The `docs/` directory is the knowledge base. Files are structured, cross-linked, and mechanically
verifiable.

| File                                   | Purpose                                                                            |
| -------------------------------------- | ---------------------------------------------------------------------------------- |
| `AGENTS.md`                            | ~100-line table of contents: project overview, commands, repo layout, doc pointers |
| `ARCHITECTURE.md`                      | Process model, source tree, dependency rules, build system                         |
| `docs/design-docs/core-beliefs.md`     | Engineering principles that guide all agent decisions                              |
| `docs/design-docs/index.md`            | Index of all design docs                                                           |
| `docs/design-docs/active/`             | Active design docs (in-progress)                                                   |
| `docs/design-docs/completed/`          | Completed design docs (archive)                                                    |
| `docs/exec-plans/index.md`             | Execution plans index: active and completed plans, format, and completion workflow |
| `docs/exec-plans/active/`              | Active execution plans (in-progress)                                               |
| `docs/exec-plans/completed/`           | Completed execution plans (archive)                                                |
| `docs/exec-plans/tech-debt-tracker.md` | Known tech debt, tracked continuously                                              |
| `docs/product-specs/index.md`          | Feature specs and product decisions                                                |
| `docs/QUALITY_SCORE.md`                | Per-domain quality grades                                                          |
| `docs/RELIABILITY.md`                  | Reliability and data integrity requirements                                        |
| `docs/SECURITY.md`                     | Security model and requirements                                                    |
| `docs/FRONTEND.md`                     | UI/renderer conventions (if applicable)                                            |
| `docs/PLANS.md`                        | Current focus + backlog                                                            |
| `docs/PRODUCT_SENSE.md`                | What the product is, user model, core values                                       |

## Workflow: Design → Plan → Execute

Complex changes flow through three stages. Each stage is a separate agent invocation.

```
/design-change <feature>   →   design doc in docs/design-docs/active/
/plan-change               →   execution plan in docs/exec-plans/active/
/exec-change               →   one phase at a time
```

### /design-change — Capture What and Why

Creates a durable design document in `docs/design-docs/active/`. Design docs record what is changing,
why it's changing, the key decisions made, and what is explicitly out of scope. They are permanent
reference artifacts, not task checklists.

An agent reading a design doc should be able to answer: "What is being built, what problem does it
solve, and what constraints must be respected?"

### /plan-change — Break Work into Phases

Turns a design doc (or a task description) into a phased execution plan in
`docs/exec-plans/active/`. A plan breaks work into **phases** — logical chunks where each phase is
independently completable and leaves the codebase in a valid state.

Typical phases for a feature:

- **Foundation** — shared types, data model changes
- **Backend / Core** — business logic, storage, handlers
- **Interface / Bridge** — public API, IPC, protocol changes
- **Frontend / UI** — UI components, user-facing changes

Plans are checked into the repository and updated as work progresses. The Progress Log in each
plan serves as a decision and history record.

### /exec-change — Execute One Phase

Executes the next incomplete phase of an execution plan — or the full change if no plan exists.
One `/exec-change` invocation = one phase. After each phase:

1. Validation runs (typecheck, lint, test)
2. Completed steps are marked `[x]` in the plan
3. A progress log entry is added
4. The agent reports and stops at the phase boundary

Small changes may skip `/plan-change` and use `/exec-change` directly from a design doc or
description.

## Enforcing Architecture and Taste

Documentation alone doesn't keep an agent-generated codebase coherent. Invariants must be
**enforced mechanically**.

### Strict Architectural Boundaries

Agents work best in environments with strict boundaries and predictable structure. Define a rigid
architectural model:

- Divide the codebase into business domains
- Each domain has a fixed set of layers (e.g. Types → Config → Repo → Service → Runtime → UI)
- Enforce valid dependency directions — code can only depend "forward" through layers
- Cross-cutting concerns (auth, telemetry, feature flags) enter through a single explicit interface

Enforce these rules with custom linters and structural tests. Write lint error messages as
remediation instructions injected into agent context.

### Encode Taste as Rules

Human preferences and best practices should be encoded as mechanical rules, not documentation:

- Naming conventions → custom lints
- File size limits → CI checks
- Structured logging requirements → static enforcement
- Doc freshness → automated doc-gardening agent

Once encoded, a rule applies everywhere at once. Human taste is captured once and then enforced
continuously on every line of code.

### Golden Principles

Define "golden principles" — opinionated, mechanical rules that keep the codebase legible and
consistent for future agent runs. Examples:

- Prefer shared utility packages over hand-rolled helpers (keeps invariants centralized)
- Parse data at boundaries — validate shapes before trusting them (don't probe data "YOLO-style")
- Prefer technologies that are well-represented in training data (composable, stable APIs)

## Entropy and Garbage Collection

Full agent autonomy introduces drift. Agents replicate patterns that exist in the repository —
including uneven or suboptimal ones. Over time this compounds.

The solution is **continuous garbage collection**, not periodic manual cleanup:

- Run background agent tasks that scan for deviations from golden principles
- Update quality grades on a regular cadence
- Open targeted refactoring PRs that can be reviewed in under a minute
- Fix bad patterns daily, not after they've spread for weeks

Technical debt is like a high-interest loan: almost always better to pay it down continuously in
small increments than to let it compound and tackle it in painful bursts.

## Making the Application Legible to Agents

As code throughput increases, the bottleneck becomes the agent's ability to validate its own work.
Make the application directly legible to the agent:

- **UI legibility** — wire browser DevTools into the agent runtime; create skills for DOM
  snapshots, screenshots, and navigation so the agent can reproduce bugs and validate fixes
  visually
- **Observability legibility** — expose logs, metrics, and traces to the agent via a local
  ephemeral observability stack (LogQL, PromQL, TraceQL); this makes prompts like "ensure startup
  completes in under 800ms" tractable
- **Per-worktree isolation** — make the app bootable per git worktree so the agent can launch and
  drive one instance per change, without interfering with other work

When agents can inspect, validate, and modify the system directly, leverage compounds.

## Throughput Changes the Merge Philosophy

At high agent throughput, conventional engineering norms become counterproductive:

- Pull requests are short-lived
- Merge gates are minimal — corrections are cheap, waiting is expensive
- Test flakes may be addressed with follow-up runs rather than blocking progress indefinitely
- Agent-to-agent review handles most quality control; human review is reserved for judgment calls

This would be irresponsible at low throughput. At high throughput, it is often the right tradeoff.

## What "Agent-Generated" Actually Means

In a full harness engineering setup, agents produce everything:

- Product code and tests
- CI configuration and release tooling
- Internal developer tools
- Documentation and design history
- Evaluation harnesses
- Review comments and responses
- Scripts that manage the repository itself
- Production dashboard definitions

Humans remain in the loop but work at a different layer of abstraction: prioritizing work,
translating user feedback into acceptance criteria, validating outcomes, and — when the agent
struggles — identifying what is missing and encoding it back into the repository.

## Increasing Autonomy

A well-built harness enables a full end-to-end agent loop:

1. Validate current codebase state
2. Reproduce a reported bug
3. Record a video demonstrating the failure
4. Implement a fix
5. Validate the fix by driving the application
6. Record a video demonstrating the resolution
7. Open a pull request
8. Respond to agent and human feedback
9. Detect and remediate build failures
10. Escalate to a human only when judgment is required
11. Merge the change

This level of autonomy depends on the specific structure and tooling of the repository. It does not
happen automatically — it is the result of deliberate investment in the harness.

## Key Lessons

1. **Slow early progress is usually an underspecified environment**, not an incapable agent
2. **The repo is the only context** — encode everything that matters as versioned artifacts
3. **Give agents a map, not a manual** — AGENTS.md is a table of contents, not an encyclopedia
4. **Enforce mechanically** — lints and tests beat documentation for keeping a codebase coherent
5. **Encode taste once** — a rule applied everywhere beats a preference stated nowhere
6. **Garbage collect continuously** — small daily fixes beat painful periodic rewrites
7. **Agent legibility is the goal** — organize context so the agent can reason over it, not just
   access it
8. **Building software still demands discipline** — it just shows up in the scaffolding, not the
   code
