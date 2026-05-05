---
name: design-change
description: Create a design doc for a feature or change
argument-hint: '<feature or change description>'
disable-model-invocation: true
---

# /design-change — Create a Design Doc

Capture the design of a feature or change as a durable document in `docs/design-docs/`.
Design docs record *what* and *why* — they are permanent reference, not task checklists.

---

## Procedure

### 1. Understand the Request

Read the user's description. Identify what is being added or changed, what problem it solves, and
any constraints mentioned.

Then read relevant context:
- `ARCHITECTURE.md` for layer rules and domain structure
- `docs/design-docs/core-beliefs.md` for applicable principles
- `docs/product-specs/index.md` for related feature specs
- Any existing code in the area being designed

If a critical ambiguity would change the design meaningfully, ask one focused question. Otherwise
proceed with reasonable assumptions and document them.

### 2. Design the Feature

Think through the design before writing. Consider:
- **What changes** — which types, interfaces, modules, storage structures
- **Where it lives** — which layer/domain owns each piece
- **Key decisions** — where multiple approaches exist, pick one and record why
- **Risks** — breaking changes, backward compat, performance, data integrity
- **What's out of scope** — explicitly name what this design does NOT cover

### 3. Write the Design Doc

Create the file at:
```
docs/design-docs/<feature-name>.md
```

Use the template at `docs/design-docs/template.md`.

Omit sections that don't apply.

### 4. Update the Design Doc Index

Add a row for the new file in `docs/design-docs/index.md`.

### 5. Present and Advise

After creating the file, show the file path, a brief summary, and the key decisions made.

Then explicitly advise:
- **Suggest `/plan-change`** if: the feature spans multiple files/layers, has more than ~3
  implementation steps, or takes more than one session
- **Skip to `/exec-change`** if: the change is small and clear enough to implement directly

State your reasoning in one sentence.
