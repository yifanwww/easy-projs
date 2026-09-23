---
name: github-issue
description: >
  Create, edit, and manage GitHub issues using the `gh` CLI. Use this skill whenever the user
  asks to create an issue, file a bug report, submit a feature request, manage GitHub issues,
  or wants to track work via GitHub issues. Also applies when the user says things like
  "open an issue for this", "file this as a bug", "add this to GitHub", or asks to review
  or update existing issues.
---

# GitHub Issue Management

Guidelines for creating and managing well-structured GitHub issues via the `gh` CLI.

## Prerequisites

- `gh` CLI must be authenticated (`gh auth status` to verify).
- Issues are created in the current repo (detected from git remote).

## Choose a template

Use a concise title that describes the request or problem, such as `Attach images to a message`
or `Clicking a notification in Settings does not open the conversation`.

Use the template that best fits the request. Include only sections that help explain the work.
Omit optional sections when they add no useful context, and avoid repeating information across
sections. Replace all placeholders with issue content.

Write feature requests and bug reports from the user's perspective. Describe what the user wants
to accomplish, what they experience today when relevant, and what they expect instead. Keep titles
and descriptions in user-facing language. Do not include technical details, implementation
proposals, debugging leads, acceptance criteria, or test plans. Implementation may change before
the issue is handled; the issue should preserve the user's need.

### Feature request

Use this for a desired capability or interaction. Include actual behavior only when it helps
explain the request.

```markdown
## User need

<What does the user want to accomplish, and why?>

## Actual behavior

<Optional: what can the user do today, and what is difficult or missing?>

## Expected behavior

<What should the user be able to do or experience?>
```

### Bug report

Use this for behavior that does not match what the user expects. Describe the actual and expected
experience. Include steps to reproduce only when the user's actions are needed to understand when
the problem occurs; omit them when the actual behavior already provides enough context.

```markdown
## Steps to reproduce

1. <Optional: user actions that lead to the problem.>

## Actual behavior

<What does the user experience, and how does it affect what they are trying to do?>

## Expected behavior

<What should happen from the user's perspective?>
```

### Investigation

Use this when the requested outcome is an answer, decision, or recommendation. Describe the open
question and what needs to be evaluated without assuming a solution has already been chosen.

```markdown
## Context

<Relevant background, available evidence, and why this question matters.>

## Investigation

<Question to answer and the alternatives being evaluated.>

## Questions to assess

- <Specific question about risk, lifecycle, protocol, performance, or security.>

## Outcome

<The answer, recommendation, or decision needed to determine the next step.>
```

### Maintenance or technical cleanup

Use this for refactoring, dependency updates, or upkeep whose primary purpose is technical
maintenance.

```markdown
## Context

<What needs maintenance, and why?>

## Change

<What should be simplified, updated, or removed.>

## Constraints

- <Behavior, compatibility, or architectural property to preserve.>

## Validation

- <Tests, checks, or review evidence needed to verify the change.>
```

For investigations and maintenance, add `## Out of scope`, `## Dependencies`, `## Follow-on`, or
`## References` only when they clarify the work. Keep implementation planning in a separate
execution plan.

## Labels

Labels are managed on GitHub and may change over time. **Always fetch the current label set before
creating or editing issues** by running:

```bash
gh label list --limit 100
```

Labels follow a `prefix: name` naming convention (e.g., `type: bug`, `area: settings`).
When applying labels:

- Always apply at least one **type** label (the label whose prefix is `type:`).
- Apply **area** labels (prefix `area:`) that match the affected part of the app.
- Apply any other labels (e.g., `blocked`, `needs-design`) as relevant.
- Prefer the closest matching label from the fetched set. Label names vary per repository — one
  repo may use `type: enhancement` where another uses `type: feature`, or use a completely
  different prefix. Never assume a label exists; always match against the fetched list.
- Never create, rename, or delete labels as a side effect of filing an issue. If a needed type or
  area label is missing from the fetched set, ask the user whether to create it first (e.g.,
  `gh label create "<name>" --description "<desc>" --color <hex>`), then continue once it exists
  or a substitute is agreed on. Do not silently skip a needed label or force an ill-fitting one.

## Creating an Issue

Use `gh issue create` with `--label` flags. Write the body to a **unique** temp file under
`.tmp/issues/`, then pass it with `--body-file`.

**Important:** Always use a unique filename to avoid collisions when creating multiple issues
concurrently. Derive the filename from the issue title by slugifying it — lowercase, hyphens for
spaces, strip special characters. Example: for the title "Add dark mode toggle to settings page",
use `.tmp/issues/add-dark-mode-toggle-to-settings-page.md`.

```bash
# Fetch current labels first, then create the issue
gh label list --limit 100
gh issue create \
  --title "<concise imperative title>" \
  --label "<type-label>,<area-label>[,<other-labels>]" \
  --body-file .tmp/issues/<slugified-title>.md
```

The body should follow the matching template from the "Choose a template" section above.

## After Creating

1. Capture the returned issue number and URL.
2. Run `gh issue view <number> --json labels` and verify every intended label is present. If a
   label is missing, add it with `gh issue edit <number> --add-label <label>` and verify again.
3. Report the issue number and URL, followed by the applied labels. Mention any classification
   judgment that was non-obvious or any failed verification. Keep the report short.
4. Do not assign a milestone, assignee, priority, or due date unless the user asks for it.

## Editing an Issue

To update an existing issue (add labels, change title, append to body):

```bash
# Add labels
gh issue edit 123 --add-label "<label-1>,<label-2>"

# Change title
gh issue edit 123 --title "Updated title here"

# Add a comment
gh issue comment 123 --body "Updated the spec — see design doc at docs/design-docs/..."
```

## Batch Issue Creation

When the user wants to create multiple related issues (e.g., breaking down a feature into tasks),
plan them together first:

1. List all the issues to create with their titles, types, and labels.
2. Show the plan to the user for confirmation.
3. Create them in sequence with `gh issue create`.

Use a short delay between creations to avoid rate limits if creating many issues.

## Best Practices

- **One issue = one concern.** Don't bundle unrelated changes into a single issue.
- **Use checkboxes** (`- [ ]`) for task lists in maintenance issues (e.g. `## Validation` items) —
  GitHub tracks completion percentage. Keep feature requests and bug reports free of acceptance
  criteria and test plans; those belong in the execution plan.
- **Reference related issues** with `#N` syntax in the body.
- **Apply `needs-design`** if the issue requires a design doc or spec before coding.
  The workflow is: `needs-design` → write design doc → remove `needs-design` → implement.
- **Apply `blocked`** with a comment explaining what's blocking it.
- **Use imperative mood** in titles: "Add X" not "Adding X" or "Added X".
- **Keep titles scannable** — front-load the key noun/verb so issues are easy to scan in a list.
