---
name: plan-change
description: Create a phased execution plan for a task
argument-hint: '[path/to/design-doc.md or task description]'
disable-model-invocation: true
---

# /plan-change — Create an Execution Plan

Turn a design doc (or task description) into a phased execution plan checked into
`docs/exec-plans/active/`. A plan breaks work into **phases** — logical chunks executed one at a
time via `/exec-change`.

## Procedure

### 1. Identify the Input

**If the user provided a design doc path:** Read that file as the primary source.

**If the user provided a description (or this follows `/design-change` in context):**
- If a design doc was just created in this conversation, use it
- Otherwise check `docs/design-docs/active/` for a matching doc
- If none exists, read relevant architecture docs and proceed from the description

If ambiguity remains, ask one focused question before continuing.

### 2. Explore Relevant Code

Read the code areas that will be affected: which files need to change, what patterns to follow,
what constraints apply, what risks exist.

### 3. Divide into Phases

Group work into sequential phases where each phase is independently completable and leaves the
codebase in a valid state. Typical phases:

- **Foundation**: shared types, data model changes
- **Backend / Core**: business logic, storage, handlers
- **Interface / Bridge**: public API, IPC, protocol changes
- **Frontend / UI**: UI components, user-facing changes

Tailor phases to the actual work. Small tasks may have only 1–2 phases.

### 4. Write the Plan File

Create at `docs/exec-plans/active/YYYY-MM-DD-<short-slug>.md`, using the template at
`docs/exec-plans/template.md`.

**Writing good steps:**
- Concrete actions, not areas
- Steps within a phase depend only on earlier steps in the same or prior phases
- If a step is risky or uncertain, note it in Decisions

### 5. Update the Exec Plan Index

Open `docs/exec-plans/index.md` and add a row for the new file in the Active Plans table.

### 6. Present the Plan

After creating the file, show the user:
1. The file path
2. The phase structure with step counts
3. The full step list to review

Ask: "Does this look right, or do you want to adjust phases or steps before executing?"
