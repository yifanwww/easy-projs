---
name: draft-reference
description: >-
  Create or update a reference doc for any external information — library APIs,
  data formats, protocols, procedures, workflows, design patterns, or domain logic. Use when the
  user asks to document how something external works, or says things like "document this API",
  "create a reference for", "we need to capture how this works". Reference docs are self-contained
  and describe the external resource as-is — no project-internal concepts, no source code dumps.
---

# /draft-reference — Create or Update a Reference Doc

Draft a reference document in the project's references directory, or update an existing one. A
reference describes **external** information — a library API, data format, protocol, service,
procedure, workflow, design pattern, or domain concept — as-is, independent of how the project
consumes it.

Reference docs are the single source of truth for "how does this external thing work?" They save
future readers from digging through source code, minified bundles, or third-party docs that may be
incomplete, outdated, or confusing.

## What Makes a Good Reference

A reference doc must be:

- **Self-contained** — a human can understand the entire thing by reading only the reference. No
  need to check source code, `node_modules`, or external docs.
- **No internal file paths** — never reference paths like `node_modules/<lib>/dist/...`. The
  reference describes the external resource, not where its files live in this project.
- **No source code dumps** — don't paste minified or raw source code. Describe behavior in plain
  English. Use code blocks only for type definitions, API signatures, and short examples.
- **No project-internal concepts** — never mention internal types, files, components, or
  implementation decisions. Internal docs (design docs, exec plans) reference the reference, not the
  other way around.
- **Human-friendly** — write for a developer who has never seen the external thing before. Explain
  counterintuitive behavior, define all terms, include practical examples.

## Procedure

### 1. Find the References Directory

Locate where reference docs live in this project. Common locations:

- `docs/references/`
- `docs/external/`
- `references/`

Search for a directory that contains reference-style documents (self-contained descriptions of
external resources) and an index file. If found, use that directory. If not found or ambiguous,
ask the user: "Where should reference docs be stored?" and use the answer as the references
directory for the rest of this procedure.

### 2. Determine: New or Update?

Read the user's description and check the references directory for an existing reference that matches.

- **New reference** — no existing reference covers this external resource. Proceed to step 3.
- **Update existing** — an existing reference covers this resource. Read it in full, identify
  what's missing or outdated, then proceed to step 4.

If ambiguous, ask: "Did you mean updating the existing `<name>` reference, or creating a new one?"

### 3. Research the External Resource

Gather information about the external resource. Sources include:

- **Type definitions** (`.d.ts` files) — the most reliable source for APIs and interfaces.
- **Official documentation** — the library/service's own docs, README, or wiki.
- **Observed behavior** — if docs are incomplete, check test files, examples, or run experiments to
  verify behavior.
- **Source code** — read source to understand edge cases and undocumented behavior, but
  **do not paste source code into the reference**. Translate findings into plain English.

For data formats (CSV, JSON schemas, protocols):

- Examine real samples of the data.
- Document every field, type, and convention observed.
- Note any inconsistencies across samples (e.g., different columns for different markets).

### 4. Structure the Reference

Adapt the structure to the resource type. Common patterns:

**For a library API:**

- Overview — what the API does, one paragraph
- Type Definitions — complete interfaces and types the reader needs
- Key Concepts — naming conventions, counterintuitive behavior, mental model
- Behavior — when callbacks are triggered, what happens with the data, lifecycle
- Practical Example — minimal wiring code showing the pattern
- Common Pitfalls — mistakes that are easy to make and hard to debug

**For a data format:**

- File Overview — source, encoding, delimiter, line endings, special conventions
- Column/Field Reference — complete table of every field with type and description
- Formatting Conventions — datetime formats, numeric formatting, special values
- Edge Cases — partial fills, multi-currency, missing fields, duplicates

**For a service/protocol:**

- Overview — what the service does, authentication, rate limits
- Endpoints / Messages — complete reference of each endpoint or message type
- Request/Response Shapes — type definitions or schemas
- Error Handling — error codes, retry behavior, edge cases
- Practical Example — minimal working interaction

Don't force sections that don't fit. Omit what doesn't apply.

### 5. Write the Reference

Create the file at:

```
<references-dir>/<resource-name>.md
```

where `<references-dir>` is the directory found in step 1.

Use a short, descriptive, lowercase-hyphenated name.

**Writing guidelines:**

- Start with a blockquote header summarizing what the external resource is and where it comes from.
- Define all types and interfaces inline — the reader should not need to look up type definitions
  elsewhere.
- Use tables for structured data (fields, columns, enum values, flag combinations).
- Use code blocks for type definitions, API signatures, and short examples — not for source code
  dumps.
- When behavior is counterintuitive, call it out explicitly with a "Critical Naming Convention"
  or similar prominent section.
- Include a practical example that shows the minimal wiring pattern — keep it short, no comments
  that restate what the prose already explains.
- End with Common Pitfalls — things a new reader would likely get wrong.

### 6. Update the References Index

Open the index file in the references directory (typically `index.md`) and add a row for the new
file in the Active References table. Update the description if modifying an existing entry.

### 7. Link from Related Docs

If the reference replaces inline documentation in an **active** design doc or exec plan, update
those docs to link to the reference instead of duplicating the content. Use relative links
from the referencing document to the reference file.

Do not modify completed/archived documents — they are historical records.

### 8. Present

After creating or updating the file:

1. Show the user the file path and a brief summary of what the reference covers
2. Highlight any counterintuitive behavior or common pitfalls discovered
3. Note if any existing design docs or exec plans should be updated to link to the new reference
