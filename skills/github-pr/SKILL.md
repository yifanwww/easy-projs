---
name: github-pr
description: >
  Create, edit, and manage GitHub pull requests using the `gh` CLI. Use this skill whenever
  the user asks to create a PR, open a pull request, submit changes for review, or manage
  existing PRs. Also applies when the user says things like "make a PR", "open a PR for this",
  "submit a PR", or wants to link a PR to an issue.
---

# GitHub Pull Request Management

Guidelines for creating and managing well-structured GitHub pull requests via the `gh` CLI.

## Prerequisites

- `gh` CLI must be authenticated (`gh auth status` to verify).
- PRs are created in the current repo (detected from git remote).
- Changes should be committed and pushed to a branch before creating a PR.

## PR Anatomy

Every PR should have:

1. **Title** — concise, imperative mood, under 72 characters.
   Follows Conventional Commits format: `<type>(<scope>): <description>`
   - Good: `feat(settings): add dark mode toggle`
   - Bad: `updated settings page stuff`

2. **Body** — structured markdown with these sections (adapt as needed):

   ```markdown
   ## What

   One-sentence summary of what this PR does.

   ## Changes

   - Bullet list of key changes
   - Keep each item concise and specific

   ## Related Issues

   Closes #<issue-number>
   ```

   - For **small PRs** (typo fix, config tweak), a short body is fine.

## Creating a PR

PRs don't need labels — the linked issue carries all categorization (type, area, priority, status).
Focus the PR body on linking to the issue with `Closes #N`.

Write the body to `.tmp/pr-body.md` using the `create_file` tool (the `.tmp/` directory
is gitignored), then pass it with `--body-file`:

```bash
gh pr create \
  --title "feat(<scope>): <concise description>" \
  --body-file .tmp/pr-body.md
```

The body should follow the PR template from the "PR Anatomy" section above.

## Linking Issues

Always reference related issues in the PR body. Use these keywords for auto-closing:

- `Closes #123` — closes the issue when the PR is merged
- `Fixes #123` — same as Closes
- `Resolves #123` — same as Closes
- `Related to #123` — links without auto-closing

Place the closing reference at the end of the body or in a dedicated section.

## Editing a PR

```bash
# Change title
gh pr edit 45 --title "updated title"

# Add reviewers (if collaborating)
gh pr edit 45 --add-reviewer username
```

## Best Practices

- **One PR = one concern.** Keep PRs focused — don't mix unrelated changes.
- **Use Conventional Commits** in PR titles: `feat`, `fix`, `refactor`, `chore`, `docs`.
- **Always link issues** with `Closes #N` so they auto-close on merge.
- **Keep PRs small** — easier to review, less risk of conflicts.
- **Write descriptive bodies** — future you will thank present you.
