---
name: close-change
description: Archive a completed change: move plan and design doc to completed and update indexes
argument-hint: '[path/to/plan-file.md]'
disable-model-invocation: true
---

# /close-change — Archive a Completed Change

Move a fully-completed change (plan + design doc) from active to completed archives,
and update all indexes.

This is the final step after `/exec-change` has finished all phases. It handles the
mechanical bookkeeping — status updates, file moves, and index updates — so `/exec-change`
stays focused on execution.

## Procedure

### 1. Identify What to Close

**If the user provided a file path:**

- Exec plan (`docs/exec-plans/active/`) → close that plan (and its linked design doc, if any)
- Design doc (`docs/design-docs/active/`) → close that design doc directly (no plan)

**If no argument:**

- If a plan was just completed in this conversation, use it
- Otherwise check `docs/exec-plans/active/` for a plan with status `Waiting for Review`
- If exactly one such plan exists, use it
- If none, check `docs/design-docs/active/` for a design doc with status `Accepted` or `Draft`
- If ambiguity remains, ask the user which change to close

**If nothing is found:** Tell the user no change appears ready to close.

### 2. Read and Verify

- **Exec plan**:
  > All phases must have all steps `[x]`, Status must be `Waiting for Review` or `Completed`.
  > If `Active` or `Blocked`, abort.
- **Design doc (no plan)**: Status should be `Accepted` or `Draft`.
- If the plan has a **Design Doc** field, read that file too.

### 3. Print What Will Be Done

> "Closing this change will:
>
> - Set Status to `Completed` / `Implemented`
> - Move `<plan>.md` to `docs/exec-plans/completed/`
> - Move `<design-doc>.md` to `docs/design-docs/completed/` _(if applicable)_
> - Update `docs/exec-plans/index.md`
> - Update `docs/design-docs/index.md` _(if applicable)_
>
> Proceeding..."

Then continue directly with the operations — no confirmation needed.

### 4. Close the Exec Plan (if applicable)

1. Set `**Status**: Completed` in the plan file
2. Update `**Last Updated**` to today's date
3. Move: `docs/exec-plans/active/<plan>.md` → `docs/exec-plans/completed/<plan>.md`
4. In `docs/exec-plans/index.md`:
   - Remove from Active Plans table
   - Add to Completed Plans table: `| YYYY-MM-DD | [<Title>](./completed/<plan>.md) | <summary> |`

### 5. Close the Design Doc (if applicable)

1. Set `**Status**: Implemented` in the design doc file
2. Move: `docs/design-docs/active/<doc>.md` → `docs/design-docs/completed/<doc>.md`
3. Update plan's **Design Doc** field to the new `completed/` path
4. In `docs/design-docs/index.md`:
   - Remove from Active Design Docs table
   - Add to Completed Design Docs table: `| YYYY-MM-DD | [<Title>](./completed/<doc>.md) | <summary> |`

### 6. Report

Tell the user which files were moved and that indexes are updated.
