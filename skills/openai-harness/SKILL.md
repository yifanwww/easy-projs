---
name: openai-harness
description: >-
  Set up or improve a repository harness; write, review, or maintain project documentation; guide
  quality assessment, enforcement, and validation feedback. Follow the tracked change workflow
  when the user requests a design document, execution-plan creation or revision, implementation
  of a named design or plan, or document close-out. Ordinary coding and external-reference authoring
  are outside this skill's scope.
---

# OpenAI Harness

Maintain the repository knowledge and working practices that help agents make reliable changes.
The repository holds the product truth, architecture, commands, constraints, and decision history.
This skill provides the procedures for creating and maintaining that knowledge.

## Select the requested work

For change stages, read the [shared workflow rules](references/workflow.md) and the selected stage
below. Load other stage files only when their procedures or prerequisites are needed.

| User intent                                                                              | Read                                         | Outcome                                                                              |
| ---------------------------------------------------------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------ |
| Set up the harness, fill missing structure, or repair an existing harness                | [Setup](references/setup.md)                 | Repository-specific docs and working guidance                                        |
| Write, review, reorganize, or correct project documentation                              | [Documentation](references/documentation.md) | Content in the appropriate current document or historical record                     |
| Assess repository quality, create a quality scorecard, or reassess existing grades       | [Quality](references/quality.md)             | Current grades by product domain and architectural layer, with priority improvements |
| Assess or improve architectural enforcement, validation feedback, or harness maintenance | [Engineering](references/engineering.md)     | Focused improvements or evidence-backed gaps within the requested scope              |
| Design change; draft or update a design doc                                              | [Design change](references/design-change.md) | Design artifact and its index                                                        |
| Plan change; create or update a repository execution plan                                | [Plan change](references/plan-change.md)     | Plan linked to a ready design, with aligned statuses and indexes                     |
| Exec change; implement or resume a named design or plan                                  | [Exec change](references/exec-change.md)     | Authorized implementation, validation, current-doc updates, and progress             |
| Close change; close or archive a change                                                  | [Close change](references/close-change.md)   | Verified completion and eligible document archival                                   |
| Explicitly request a spec or an end-to-end tracked change workflow                       | [Workflow](references/workflow.md)           | Only the requested stages and artifacts                                              |

**The change workflow is opt-in.** Size, risk, multiple files, process boundaries, and the presence
of old plans do not activate it. A generic request to "plan an approach" can be answered in the
conversation; it does not require a repository execution plan. Invoking this skill alone does not
request every workflow stage. Infer the requested mode from the user's accompanying task; if no
task is supplied, ask what they want to do.

Ordinary coding follows the agent's normal repository instructions and is outside this skill's
scope. An explicit request to execute a named design or plan uses the exec change procedure.
Documentation maintenance related to ordinary coding does not activate the tracked workflow.

External-resource reference authoring is also outside this skill's scope.

Respect the requested workflow stages and review points. Planning is optional: execute and close
a design directly, or create and execute a plan before close-out.

## Shared operating rules

- Read the project's `AGENTS.md` and the docs relevant to the task. Inspect source and validation
  configuration before making claims about current behavior or enforcement.
- Adapt to the repository's established layout, templates, statuses, and commands. Keep
  project-specific facts in repository docs and configuration rather than copying them into this
  skill. Read only the supporting guidance needed for the current task.
- In design-doc and execution-plan indexes and a plan's **Design Doc** field, follow the user's
  preferred reference format or the existing style. Plain paths (including backticked paths) and
  clickable relative links are both valid; do not require conversion to clickable links. Check that
  references identify existing documents and remain accurate when files move.
- Update the document that owns a fact and link to it from other docs. Separate current behavior,
  proposed behavior, historical decisions, and validation evidence.
- Preserve useful existing content during setup and repair. Resolve demonstrated contradictions
  within the requested scope; report unresolved questions precisely.
- Prefer mechanical checks for important, objectively testable constraints. Use the engineering
  guidance during harness setup or when a demonstrated failure requires improving the harness.
  Infrastructure changes and recurring automation still follow the user's authorized scope.
- Run validation appropriate to the actual change, using the repository's testing guide or
  equivalent and current configuration. Markdown-only changes need formatting and link checks;
  application changes use the project's applicable tests and build checks.
- Completion of implementation, documentation close-out, review, and merge are separate facts.
  Record each accurately. This skill does not authorize commits, pushes, releases, merges,
  messages, or other external actions.

## Templates

Use existing repository templates first. For missing defaults, follow the
[template-copying procedure](references/setup.md#template-copying) with these bundled assets:

- [Product spec](assets/templates/product-spec.md)
- [Design doc](assets/templates/design-doc.md)
- [Execution plan](assets/templates/exec-plan.md)
