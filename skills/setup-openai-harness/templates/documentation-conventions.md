# DOCUMENTATION_CONVENTIONS.md — How to Write Project Docs

Formatting rules and conventions for all documentation in `docs/`.

## Prefer Mermaid for Structure and Flow

When describing content with non-trivial relational structure, use Mermaid diagrams instead of
prose or tables. A diagram communicates topology, order, and grouping in a single scan; prose
forces the reader to reconstruct these mentally.

### When to Use Mermaid

Choose the diagram type that matches the content:

| Content describes                                                                                     | Diagram type             |
| ----------------------------------------------------------------------------------------------------- | ------------------------ |
| Ordered interaction between 3+ participants (IPC, request/response chains, event propagation)         | `sequenceDiagram`        |
| Branching logic, decision paths, error/validation flows                                               | `flowchart`              |
| Stateful lifecycle with constrained transitions (import pipeline, order status, connection lifecycle) | `stateDiagram`           |
| Structural dependencies, layered architecture, domain boundaries                                      | `graph` or block diagram |
| Entity relationships, foreign keys, cardinality                                                       | `erDiagram`              |
| Temporal phases, parallel workstreams, rollouts, migration timelines                                  | `gantt` or `timeline`    |
| Hierarchical decomposition, deep nesting, taxonomies                                                  | `mindmap`                |
| Part-to-whole distribution, proportions                                                               | `pie`                    |

### When NOT to Use Mermaid

Skip diagrams when the content is better served by simpler formats:

| Content                                          | Better as                                   |
| ------------------------------------------------ | ------------------------------------------- |
| Simple linear sequence (≤3 steps)                | Numbered list                               |
| Tabular reference data for lookup                | Markdown table                              |
| Design rationale, trade-off analysis, motivation | Prose — these are arguments, not structures |
| Code snippets, API signatures, type definitions  | Fenced code blocks                          |
| Single relationship ("X depends on Y")           | One sentence of prose                       |
| Binary yes/no decision                           | Bullet list or prose                        |

### Diagram Checklist

Before adding a Mermaid diagram, confirm:

- [ ] The diagram shows something that is **harder to express in prose** — not just decoration.
- [ ] The diagram type matches the content (don't force a flowchart for a sequence).
- [ ] Every node/participant/state is a **named concept** from the project, not a vague label.
- [ ] The diagram is **self-contained** — readable without cross-referencing surrounding prose.
- [ ] The diagram is **maintainable** — if the underlying design changes, the diagram must change
      too. Don't diagram volatile details.
