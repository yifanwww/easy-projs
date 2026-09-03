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

## Issue Anatomy

Every issue should have:

1. **Title** — concise, imperative mood, under 72 characters.
   - Good: `Add dark mode toggle to settings page`
   - Bad: `I think we should maybe add a dark mode thing`

2. **Body** — structured markdown with these sections (adapt as needed):

   ```markdown
   ## What

   One-sentence description of what needs to be done.

   ## Why

   Motivation — user value, technical debt, bug impact. Skip if obvious from the title.

   ## Acceptance Criteria

   - [ ] Criterion 1
   - [ ] Criterion 2
   - [ ] Criterion 3

   ## Notes

   Technical context, design decisions, references to docs or related issues.
   ```

   - For **bugs**, replace the template with: steps to reproduce, expected behavior,
     actual behavior, and any error messages or screenshots.
   - For **small/obvious issues**, a short body is fine — don't over-prescribe.

3. **Labels** — apply from the project's label set (see below).

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
- Prefer the closest matching label; if none fit, apply the best available one and note
  the gap in the issue body.

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

The body should follow the issue template from the "Issue Anatomy" section above.

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
- **Use checkboxes** (`- [ ]`) in acceptance criteria — GitHub tracks completion percentage.
- **Reference related issues** with `#N` syntax in the body.
- **Apply `needs-design`** if the issue requires a design doc or spec before coding.
  The workflow is: `needs-design` → write design doc → remove `needs-design` → implement.
- **Apply `blocked`** with a comment explaining what's blocking it.
- **Use imperative mood** in titles: "Add X" not "Adding X" or "Added X".
- **Keep titles scannable** — front-load the key noun/verb so issues are easy to scan in a list.
