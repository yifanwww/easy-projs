---
name: exec-change
description: Execute a feature or the next phase of an execution plan
argument-hint: '[path/to/plan-file.md or plan description]'
disable-model-invocation: true
---

# /exec-change — Execute a Feature or Plan Phase

Execute a feature directly, or work through the next incomplete phase of an execution plan.

- **With an exec plan**: one `/exec-change` = one phase. Run `/exec-change` again for the next
  phase.
- **Without an exec plan** (small feature): execute the full change directly from the design doc or
  description.

## Procedure

### 1. Identify What to Execute

**If given a file path:**

- Exec plan → phase-based execution
- Design doc → execute directly (no phases)

**If given a description (or following `/plan-change` or `/design-change` in context):**

- Use a plan just created in this conversation, or find one in `docs/exec-plans/active/`
- If no exec plan exists, use a design doc from `docs/design-docs/active/` or the description directly

**If nothing is found and no context exists:** Ask the user to provide a path or description.

> **No exec plan ≠ blocked.** Small features may skip `/plan-change`. Execute directly from the
> design doc or description.

### 2. Read and Understand the Source

**From an exec plan:** Read Goal, all phases and steps, Decisions, Progress Log. Find the first
phase with unchecked steps (`[ ]`). If partially done, resume it.

**From a design doc or description:** Read the full design. Derive implementation steps yourself —
treat the feature as one phase.

Check architecture docs if the work touches structural boundaries. Read referenced source files
before changing them.

### 3. Confirm the Scope

**Exec plan:** Tell the user: "Executing **Phase N: \<Name\>** — \<one-sentence summary\>."

**No exec plan:** Tell the user: "No exec plan — executing directly. Implementing: \<one-sentence
summary\>."

For risky operations (breaking API changes, schema migrations, file renames), list what will change
and ask for confirmation.

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
- Add a progress log entry:
  `- **YYYY-MM-DD**: Completed Phase N (<Name>) — <summary>`
- Update Status: `Active` | `Blocked` | `Waiting for Review`

### 6. Validate the Phase

After all steps in the phase are complete, run the full validation suite:

```
{FULL_VALIDATION_COMMAND}
```

Fix any failures before proceeding.

### 7. Report and Prompt

After the phase passes validation:

- Summarize what was done
- Confirm validation passed
- Name the next phase (if any): "Run `/exec-change` to continue with Phase N+1: \<Name\>."

When **all phases complete**, set Status to `Waiting for Review`, then ask: "All phases complete.
Move to `docs/exec-plans/completed/`?"

If confirmed:

1. Set Status to `Completed` in the plan file
2. Move the file to `docs/exec-plans/completed/`
3. Remove the row for this plan from the Active Plans table in `docs/exec-plans/index.md`
4. Add an entry for it in the Completed Plans table in `docs/exec-plans/index.md` (title, date completed, one-line summary)
5. If the plan's **Design Doc** field references a design doc:
   - Move the design doc file from `docs/design-docs/active/` to `docs/design-docs/completed/` (same filename)
   - Update the **Design Doc** field in the plan file to point to the new path: `docs/design-docs/completed/<name>.md`
   - Open the design doc and set its **Status** to `Implemented`

## Notes

- Plans without explicit phases are treated as a single phase
- If executing from a design doc with no plan, run full validation at the end, set the design
  doc's **Status** to `Implemented`, and report what was done
- Never skip a step without a documented reason in Decisions
