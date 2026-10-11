# Set up or repair the harness

Use this procedure for requested harness setup, missing infrastructure, or repair.

## Inspect before writing

Read `AGENTS.md`, `README.md`, dependency/build manifests, runtime entry points, existing docs,
validation configuration, and architecture enforcement. Inspect data stores, deployment, and CI
configuration where present. Identify the repository's applications, services, libraries, tools,
and shared packages, their runtime/state owners, and project-specific operating constraints.

For an existing harness, use the [drift audit](engineering.md#reconcile-drift) to identify repairs.
Setup fills missing structure; a repair request may justify rewriting or moving affected content.

Read [documentation guidance](documentation.md) before drafting.

Assess enforcement and validation feedback using [engineering guidance](engineering.md). Include
the checks and feedback improvements required by the requested setup scope; creating docs alone
does not establish a complete engineering harness.

## Select the documentation set

Choose guides from the areas and engineering concerns found during inspection. The paths below
are defaults for missing documentation; reuse an existing equivalent when it already owns the
content. The set can include several areas, such as backend and frontend in a full-stack project.

| Project area                  | Default guides                                                          | Appropriate content                                                                                                                   |
| ----------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Backend services and workers  | `docs/BACKEND.md`                                                       | Service boundaries, request/job handling, contract validation, data access, transactions/migrations, errors, retries, and idempotency |
| Client applications with a UI | `docs/FRONTEND.md`; `docs/DESIGN.md` for visual/interaction conventions | UI composition, state and data loading, runtime bridges, accessibility, and visual/interaction rules                                  |
| Libraries and SDKs            | `docs/LIBRARY.md`                                                       | Public API boundaries, compatibility/versioning, supported runtimes, extension points, and library testing conventions                |
| CLIs and developer tools      | `docs/CLI.md`                                                           | Command structure, configuration, input/output, exit/error behavior, and automation conventions                                       |
| Data processing               | `docs/DATA.md`                                                          | Repository-owned datasets, pipeline stages, schema changes, reproducibility, validation, and recovery                                 |
| Infrastructure and operations | `docs/OPERATIONS.md`                                                    | Environment ownership, provisioning, deployment, rollback, operational checks, and incident recovery                                  |

Create additional area or subsystem guides when distinct responsibilities need their own home.
Extend these examples to the project's actual areas. Keep a small project's related content
together when an existing guide provides a coherent home.

For a monorepo, keep shared rules in the root map and link to package/service guidance where
conventions differ. Keep validation commands and source paths scoped to their actual owner.

## Shared repository map and current knowledge

Combine the applicable shared documents below with the selected area guides. Create a dedicated
document when it has useful project-specific content to own; keep the set proportional to the
project's needs.

| Destination                         | Purpose                                                                                       |
| ----------------------------------- | --------------------------------------------------------------------------------------------- |
| `AGENTS.md`                         | Brief project orientation, operating rules, commands, and action-oriented pointers to docs    |
| `README.md`                         | Product introduction, getting started, development, and delivery instructions                 |
| `ARCHITECTURE.md`                   | System context, major components, relationships, boundaries, runtime and state ownership      |
| `docs/GOAL.md`                      | Product direction, scope, non-goals, and success criteria when these need a dedicated home    |
| `docs/PRODUCT_SENSE.md`             | User model and product decision principles when distinct from the goal                        |
| `docs/design-docs/core-beliefs.md`  | Project-specific engineering principles                                                       |
| `docs/DOCUMENTATION_CONVENTIONS.md` | Repository-specific document ownership, writing, links, diagrams, and maintenance conventions |
| `docs/RELIABILITY.md`               | Reliability guarantees, recovery expectations, and acknowledged limits                        |
| `docs/SECURITY.md`                  | Trust boundaries, capabilities, threats, controls, and limits                                 |
| `docs/LOGGING.md`                   | Diagnostic ownership, delivery, and safe context, when a dedicated guide helps                |
| `docs/QUALITY_SCORE.md`             | Current domain/layer quality grades, rationale, and priority improvements                     |
| `docs/<subsystem>/`                 | Current subsystem explanations when details would overwhelm the overview                      |

Use the [quality guidance](quality.md) when creating or maintaining `QUALITY_SCORE.md`.

Keep AGENTS concise enough to orient a new contributor. Commands and component indexes should
have a clear owner; link to detailed lists when the map becomes unwieldy.

### AGENTS defaults for a new repository

Use a short introduction, essential operating principles, a command table, the source-layout map,
and a key-doc table. Roughly 100 lines is a useful orientation target; adapt it to the repository's
real needs. Keep substantial procedures in linked docs rather than reproducing them in AGENTS.
Keep AGENTS as the repository map.

Use **File** and **When to Read** columns for doc pointers. Describe a task trigger rather than
restating a document title:

| Destination                          | Example reading trigger                                                      |
| ------------------------------------ | ---------------------------------------------------------------------------- |
| Architecture and core beliefs        | Changing ownership, boundaries, or architectural decisions                   |
| Product specs and product principles | Understanding or changing user-facing behavior                               |
| Design/plan indexes                  | Creating a requested artifact or continuing the change the user identifies   |
| Documentation conventions            | Writing, moving, or correcting project docs                                  |
| Reliability and security             | Changing lifecycle, recovery, persistence, authentication, or capabilities   |
| Backend guidance                     | Changing service contracts, request/job handling, data access, or migrations |
| Frontend and visual guidance         | Changing UI state, accessibility, components, or presentation                |
| Logging                              | Changing diagnostics, failures, or recovery                                  |
| Quality scorecard                    | Assessing quality or identifying priority improvements                       |
| Debt tracker                         | Recording or following up on concrete unresolved work                        |

Include pointers for the documents that exist. Do not invent content or requirements merely to
populate a standard table.

Describe actual command behavior and preserve established authorization restrictions. Finite,
non-interactive validation commands are usually suitable for agents. Do not infer universal
human-only restrictions from a command name: inspect its effects and the repository's rules.
Do not run development servers, installers, packaging, deployment, or destructive commands as a
side effect of setting up documentation.

For new command guidance, use **Command**, **Purpose**, and **Agent Use** columns. Inspect script
bodies and side effects, including package hooks. Distinguish ordinary finite validation from
long-running or interactive sessions, destructive cleanup, native packaging, and externally
mutating delivery. Record the actual repository restriction or authorization requirement and a
short reason. Inspect or clarify unresolved consequential effects before running the command.

## Optional workflow structure

When establishing the workflow infrastructure, use these destinations unless the repository
already has equivalents:

| Destination                                 | Purpose                                                                  |
| ------------------------------------------- | ------------------------------------------------------------------------ |
| `docs/product-specs/`                       | Living feature specs, template, and index                                |
| `docs/design-docs/active/` and `completed/` | Proposed/accepted designs and implemented or superseded decision records |
| `docs/exec-plans/active/` and `completed/`  | Requested plans and their archived execution records                     |
| `docs/exec-plans/tech-debt-tracker.md`      | Concrete unresolved debt and follow-up work                              |

Use the index defaults below. Empty directories need no placeholder files unless the repository
requires them.

### Template copying

Keep existing meaningful repository templates. For missing templates, copy the original asset file
unchanged to the corresponding destination below, or the repository's established equivalent:

| Source relative to this skill      | Default repository destination   |
| ---------------------------------- | -------------------------------- |
| `assets/templates/product-spec.md` | `docs/product-specs/template.md` |
| `assets/templates/design-doc.md`   | `docs/design-docs/template.md`   |
| `assets/templates/exec-plan.md`    | `docs/exec-plans/template.md`    |

Use a file-copy operation such as `cp`; do not regenerate, summarize, tailor, or reformat the
template content. Preserve all headings, examples, placeholders, comments, and whitespace. Verify
each newly copied destination against its source with `cmp` or an equivalent byte comparison.
Customize a reusable template only when the user explicitly requests that customization.

Adapt project-specific content in the documents instantiated from a template. For example, replace
placeholder dates and links or omit irrelevant sections while leaving the reusable `template.md`
unchanged. Apply [workflow guidance](workflow.md) when creating those artifacts. Link checks should
recognize reusable template placeholders rather than rewriting them into project-specific values.

For a fresh workflow, use these status conventions:

- Product specs: `Draft`, `Active`, `Deprecated`. Active specs remain current as features evolve.
- Design docs: `Draft`, `Accepted`, `Implemented`, `Superseded`. Acceptance records a settled
  design; implementation records delivered code, independently of merge status.
- Execution plans: `Active`, `Waiting for Review`, `Completed`, `Blocked`, `Superseded`.
  Record the project's close-out/review criterion in the index.

### Default index structure

For a new repository, create each applicable `index.md` with a brief purpose, lifecycle/status
definitions where applicable, the following tables, and a reference to its template when one exists:

| Index           | Sections and columns                                                                    |
| --------------- | --------------------------------------------------------------------------------------- |
| Design docs     | Active: Created, Design Doc, Status, Summary. Completed: Completed, Design Doc, Summary |
| Execution plans | Active: Created, Plan, Summary. Completed: Completed, Plan, Summary                     |
| Product specs   | Draft, Active, and Deprecated tables, each with File, Feature, Status                   |

Use `YYYY-MM-DD` dates and one-sentence summaries. For design-doc and execution-plan references,
use plain or backticked paths or clickable relative links according to the user's preference or
existing index style; clickable links are optional. Creation dates remain stable; completion dates
record eligible close-out. Each document owns its status, which must agree with its index placement
and any Status column. Keep existing index schemas
unless repairing a demonstrated inconsistency. Avoid duplicate entries for the same artifact.

Populate the plan index's participation and completion guidance from the
[entrypoint scope rules](../SKILL.md#select-the-requested-work) and [workflow guide](workflow.md).

Create missing `DOCUMENTATION_CONVENTIONS.md` guidance from [documentation defaults](documentation.md)
and the index/date conventions above. Preserve established project conventions that serve those
purposes.

Do not generate separate workflow skills or copies of their instructions.

## Finish

Check facts against source/configuration, relative links, index/status consistency, and formatting.
Explain what was created, reconciled, or preserved and any remaining uncertainty. Do not claim
that writing a rule implements a lint, CI check, test, or recurring maintenance task. Add mechanical
checks only when requested or necessary for the authorized setup scope.
