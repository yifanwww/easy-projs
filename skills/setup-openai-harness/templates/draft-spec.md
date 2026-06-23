---
name: draft-spec
description: Create or update a product spec for a user-facing feature
argument-hint: '<feature description or existing spec name>'
disable-model-invocation: true
---

# /draft-spec — Create or Update a Product Spec

Draft a product feature specification in `docs/product-specs/`, or update an existing one. A
product spec captures _what_ to build — user workflows, acceptance criteria, edge cases, and what
is explicitly out of scope. It is implementation-agnostic: no mention of database tables, API
routes, or component names.

A product spec is a **living document**. It stays **Active** as the feature evolves, moving to
**Deprecated** only when the feature is removed. One spec can drive many design docs over its
lifetime — each design doc covers one slice of implementation.

Product specs are distinct from design docs and exec plans:

- **Product spec** — WHAT: user workflows, acceptance criteria, edge cases. Readable by PMs,
  designers, and engineers. No implementation details. Stays **Active** as the living reference;
  moves to **Deprecated** only when the feature is removed.
- **Design doc** — HOW: data model, API contracts, file-by-file breakdown. Archives to
  `completed/` once built. One spec can drive many design docs.
- **Exec plan** — PLAN: phased work breakdown for implementation.

## Procedure

### 1. Determine: New or Update?

Read the user's description and check `docs/product-specs/` for an existing spec that matches.

- **New spec** — no existing spec matches the feature. Proceed to step 2.
- **Update existing** — an existing spec covers this feature. Read it in full, then proceed to
  step 2b.

If ambiguous, ask: "Did you mean updating the existing `<name>` spec, or creating a new one?"

### 2. Understand the Request (New Spec)

Read the user's description. Identify:

- What user need or problem this feature addresses
- Who the user is and what their context is
- What the current experience is and how this changes it
- Any constraints or preferences the user mentioned

Then read relevant context:

- `docs/PRODUCT_SENSE.md` for the product's user model and core values
- `docs/product-specs/` for any related existing specs
- `ARCHITECTURE.md` for domain context (but keep the spec implementation-agnostic)

If a critical ambiguity would change the spec meaningfully, ask one focused question. Otherwise
proceed with reasonable assumptions and document them.

### 2b. Understand the Update (Existing Spec)

Read the existing spec in full. Identify:

- What the user wants to change about the _what_ — new workflows? revised acceptance criteria?
  expanded scope? narrowed scope?
- Whether this is an additive change or a revision of existing behavior
- Whether any existing design docs reference this spec and may need revisiting

### 3. Think Through the Feature

Before writing, consider:

- **User workflows** — step-by-step journeys the **user** takes. What do they do? What does the
  system show or do in response? Prioritize: put the everyday case first, the power-user
  case second.
- **Core experience** — what mental model should the reader have before the step-by-step
  workflows? Define the key concepts and how they relate. This becomes the **Core Experience**
  section in the spec.
- **Terminology** — when the spec uses terms whose meaning differs between contexts (e.g., a
  value that means one thing in staging and another after promotion), define them in a
  **Terminology** table so later sections can reference them without repeating definitions.
- **Acceptance criteria** — promises to the user, not UI constraints. Each criterion answers
  "how does the user know this works?" Group them by theme (e.g., Recording entries, Data
  integrity, Display).
- **Edge cases** — situations the user encounters: empty states, error states, boundary
  conditions. Frame them as user-facing situations, not technical mechanics. No database
  internals, no API details, no component names.
- **Known limitations** — issues acknowledged but not yet resolved. Unlike out-of-scope items
  (deliberately excluded), these are gaps that should be addressed eventually but the design
  isn't settled yet. Document them so they aren't forgotten.
- **Out of scope** — explicitly name what this spec does NOT cover. Be specific — name features
  someone might reasonably expect to find here. A long list is fine; it means the spec is
  well-bounded.

**Voice:** The user is the subject of every sentence. Write like a PM describing what the
product does for the user, not an engineer describing what the code does. Start the Motivation
with a concrete narrative — a quote, a scenario, a moment of frustration — not an abstract
problem statement. See `docs/product-specs/template.md` for detailed guidance and examples.

Stay at the product level. Do not mention data models, API endpoints, or technology choices.
Those belong in the design doc.

### 4. Write or Update the Spec

**For a new spec:** Create the file at `docs/product-specs/<feature-name>.md`. Use a short,
descriptive, lowercase-hyphenated name (product specs do not need a date prefix — they evolve
with the feature). Use the template at `docs/product-specs/template.md`. Set `**Status**: Draft`.

**For an existing spec:** Edit the file in place. Update `**Last Updated**`. If the spec was
`Active` and the change is significant, consider leaving it `Active` (the spec evolves in place).
Only set it back to `Draft` if the change fundamentally redefines the feature.

Omit sections that don't apply, but always include Summary, Core Experience, Acceptance Criteria,
and Out of Scope.

### 5. Update the Product Specs Index

Open `docs/product-specs/index.md` and add or move the row in the appropriate table (Draft, Active,
or Deprecated).

### 6. Present and Advise

After creating or updating the file:

1. Show the file path and what changed
2. Highlight the key user workflows captured or revised
3. List the acceptance criteria
4. **Explicitly advise on next steps:**
   - If the spec is newly Active: suggest `/design-change` to create a design doc for the first
     slice of implementation
   - If an existing spec was updated: note whether existing design docs may be affected
   - If the spec needs more product thinking: note what's still open
5. Remind the user: this spec is a living document — it can drive many design docs over time, and
   can be updated again with `/draft-spec` whenever the _what_ changes.
