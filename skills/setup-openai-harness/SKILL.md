---
name: setup-openai-harness
description: Scaffold harness engineering for a project: creates /design-change, /plan-change, /exec-change slash commands and the docs/ knowledge structure, adapted to the project's tech stack and conventions.
argument-hint: '[notes or constraints]'
disable-model-invocation: true
---

# /setup-openai-harness — Bootstrap Harness Engineering

Set up harness engineering infrastructure in the current project:
1. Create the `docs/` knowledge base (AGENTS.md, ARCHITECTURE.md, and supporting docs)
2. Create the three workflow skills: `/design-change`, `/plan-change`, `/exec-change`

Run this once in a new project. It adapts everything to the project's actual tech stack and structure.

---

## Procedure

1. Read [harness.md](./harness.md) — understand what harness engineering is and the structure to
   create
2. Read [setup.md](./setup.md) — follow the full step-by-step setup procedure

Templates for the three workflow skills:
- [templates/design-change.md](./templates/design-change.md)
- [templates/plan-change.md](./templates/plan-change.md)
- [templates/exec-change.md](./templates/exec-change.md)

Templates to copy into `docs/`:
- [templates/design-doc-template.md](./templates/design-doc-template.md) → `docs/design-docs/template.md`
- [templates/exec-plan-template.md](./templates/exec-plan-template.md) → `docs/exec-plans/template.md`
