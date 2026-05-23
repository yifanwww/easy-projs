---
name: setup-openai-harness
description: Scaffold OpenAI harness engineering for a project
argument-hint: '[notes or constraints]'
disable-model-invocation: true
---

# /setup-openai-harness — Bootstrap OpenAI Harness Engineering

Set up OpenAI harness engineering infrastructure in the current project:
1. Create the `docs/` knowledge base (AGENTS.md, ARCHITECTURE.md, and supporting docs)
2. Create the three workflow skills: `/design-change`, `/plan-change`, `/exec-change`

Run this once in a new project. It adapts everything to the project's actual tech stack and structure.

## Procedure

1. Read [harness.md](./harness.md) — understand what harness engineering is and the structure to
   create
2. Read [setup.md](./setup.md) — follow the full step-by-step setup procedure

Templates for the three workflow skills:
- [templates/design-change.md](./templates/design-change.md)
- [templates/plan-change.md](./templates/plan-change.md)
- [templates/exec-change.md](./templates/exec-change.md)

Templates to copy into `docs/`:
- [templates/design-doc.md](./templates/design-doc.md) → `docs/design-docs/template.md`
- [templates/exec-plan.md](./templates/exec-plan.md) → `docs/exec-plans/template.md`
