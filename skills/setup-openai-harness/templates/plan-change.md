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

### 2. Accept the Design Doc

If a design doc was identified in step 1 and its **Status** field is `Draft`, change it to
`Accepted` before proceeding. This signals that the design is finalized and ready for
implementation planning.

If the status is already `Accepted` or another non-Draft value, skip this step.

### 3. Explore Relevant Code

Read the code areas that will be affected: which files need to change, what patterns to follow,
what constraints apply, what risks exist.

### 4. Divide into Phases

Group the work into sequential phases where each phase is independently completable and leaves the
codebase in a valid state.

**Order phases by the natural dependency sequence of subtasks**, not by code layer. Each phase
represents one logical step in the overall plan — the kind of step you'd describe in a sentence:
"first we set up the data model, then we build the core logic, then we wire up the UI."

Each phase should cut across whatever code layers it needs to complete that step. Don't split a
single step across phases just because it touches multiple layers — keep all the pieces of one
logical step together.

Think about what order a developer would naturally do the work in, where each step builds on the
previous one. The right phases depend on the project and the task.

**Document updates are free to go in any phase.** Put each doc change (harness, architecture, etc.)
in the same phase as the change it describes, so the docs stay truthful at every phase boundary.
Do not force a trailing docs-only phase — add one only if something still needs consolidating
after the implementation is done.

### 5. Write the Plan File

Create at `docs/exec-plans/active/YYYY-MM-DD-<short-slug>.md`, using the template at
`docs/exec-plans/template.md`. If no design doc exists, omit the **Design Doc** field.

**Writing good steps:**

- Concrete actions, not areas
- Steps within a phase depend only on earlier steps in the same or prior phases
- If a step is risky or uncertain, note it in Decisions

### 6. Update the Exec Plan Index

Open `docs/exec-plans/index.md` and add a row for the new file in the Active Plans table.

### 7. Present the Plan

After creating the file, show the user:

1. The file path
2. The phase structure with step counts
3. The full step list to review

Ask: "Does this look right, or do you want to adjust phases or steps before executing?"
