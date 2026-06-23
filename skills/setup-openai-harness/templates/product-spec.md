# Spec: <Feature Name>

**Status**: Draft | Active | Deprecated
**Created**: YYYY-MM-DD
**Last Updated**: YYYY-MM-DD

## Summary

> One paragraph. The user is the subject, not the feature. Answer: what can the user do now
> that they couldn't before? Keep it concrete.

_Bad:_ "Core feature for recording individual records, organizing them into named groups, and
linking related records into round-trip groupings."

_Good:_ "The user records every entry into a named group. The system handles calculations
automatically. The user can optionally link entries into round-trip groupings to see
aggregated results."

## Motivation

> Start with a narrative that makes the problem real. A concrete scenario, a quote, a moment
> of frustration. Then one sentence that distills it.

_Bad:_ "Without a managed registry, users would type raw values into every record —
error-prone and inconsistent."

_Good:_ "A user is filling out a form. They type a value from memory — but was it the right
one? Did they typo it? Every keystroke is a chance to create a bad record that silently
pollutes their data."

## Core Experience

> Before the step-by-step workflows, give the reader a mental model. What are the key
> concepts? How do they relate? What does the user see? Keep it to a few short paragraphs.
> This section teaches vocabulary the workflows will use.

- What the page/layout is
- What each major concept is
- How they relate to each other
- What the user sees at a glance

## Terminology

> When the spec introduces terms that are used throughout — especially terms whose meaning
> differs between contexts (e.g., a value that means one thing before processing and another
> after) — define them here in a table. Later sections can reference the terms without
> repeating definitions.

| Term     | Definition                 |
| -------- | -------------------------- |
| **term** | What it means in this spec |

## User Workflows

> Prioritize. Put the everyday case first — the thing the user does every day. Put the
> occasional case second — the thing they do less often but that delivers disproportionate
> value. Put edge-case workflows (edit, delete, review) last. Label them honestly:
> "The Everyday Case: <Action>" is better than "Workflow 2: <Action>."

### <The Primary Workflow>

> Step-by-step, but keep the voice. The user is doing things; the system responds. Don't
> describe UI chrome ("user clicks the button on the left pane") unless the layout matters
> to understanding the flow.

1. User does X…
2. System responds with Y…
3. User sees Z…

### <The Secondary Workflow>

…

### <Reviewing / Editing / Deleting>

…

## Acceptance Criteria

> Group them by theme. Each criterion is a promise to the user, not a UI constraint. State
> what correct behavior looks like from the user's perspective — observable, testable, no
> implementation details.

_Bad:_ "Direction is derived automatically from input quantities."

_Good:_ "Direction is always correct and never asks the user to decide."

Example groups:

### <Theme 1 — e.g., Recording entries>

- …
- …

### <Theme 2 — e.g., Data integrity>

- …
- …

## Edge Cases

> Frame every edge case as a situation the user encounters. Don't describe technical
> mechanics. Don't mention databases, APIs, or component names.

_Bad:_ "What happens during a crash mid-operation? The database is not modified by a read
operation, so no corruption risk."

_Good:_ "**Crash during operation:** The user may need to retry. No data is lost."

Format: **Situation:** What the user experiences.

## Known Limitations

> Issues acknowledged but not yet resolved. Unlike Out of Scope (things deliberately excluded),
> these are gaps that should be addressed eventually — but the design isn't settled yet.
> Documenting them here prevents them from being forgotten.

- **<Limitation>:** …

## Out of Scope

> What this spec explicitly does NOT cover. Drawing boundaries prevents scope creep and clarifies
> what belongs in a follow-up spec. Be specific — name features someone might reasonably expect
> to find here. If the list is long, that's fine. It means the spec is well-bounded.
