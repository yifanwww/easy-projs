# Enforcement, feedback, and maintenance

Use this guide to assess or improve enforcement, feedback, and maintenance during the requested
harness work. Apply the [entrypoint scope rules](../SKILL.md#select-the-requested-work).

## Turn principles into useful checks

Identify the important project constraints and their owners: domain dependencies, process
boundaries, contracts, persistence, lifecycle, diagnostics, and shared UI conventions. Start with
the architecture and existing enforcement. Extend the established checks before introducing a
second enforcement system.

For each candidate rule, establish:

1. What failure the rule prevents and whether the condition can be determined reliably.
2. Which code or artifact owns the rule and where the check belongs.
3. What a contributor should do when the check fails, including legitimate exceptions.
4. What passing the check proves and what still requires behavioral validation or judgment.

Choose enforcement that matches the invariant:

| Constraint                                                | Suitable check                                                    | Practical limit                                                       |
| --------------------------------------------------------- | ----------------------------------------------------------------- | --------------------------------------------------------------------- |
| Process/domain import direction                           | Dependency rules or an import lint                                | Does not prove runtime capability isolation                           |
| External input shape and decision-critical fields         | Runtime readers and focused malformed-input tests                 | TypeScript types alone do not validate wire data                      |
| RPC operation registration and bridge alignment           | Typed registries and contract/bridge checks                       | Real process wiring may still need an integration check               |
| Ownership, stale replies, replay, and shutdown            | Deterministic behavioral tests around lifecycle/races             | Fake peers do not establish native child cleanup                      |
| Formatting, naming, module size                           | Existing formatter/linter or a narrow structural check            | Exceptions should be explicit; line count is only a complexity signal |
| Documentation links, index membership, status consistency | Local link/index checks                                           | A valid link does not establish factual freshness                     |
| Required diagnostics and safe context                     | Tests at the handling boundary, plus static checks where reliable | Counting log calls does not prove diagnostic coverage                 |

Keep rules scoped to the actual architecture. A layered dependency model should reflect the
project's domain and process boundaries; do not impose an example layer sequence on every project.
Cross-cutting capabilities should have clear owners and narrow interfaces where the design needs
them. Keep durable rationale in the appropriate engineering guide.

When adding a checker, show that it rejects a representative violation and accepts a valid case.
Make failures actionable: name the violated boundary, identify the affected artifact, and point to
the intended repair. Integrate the check with the existing validation path within the authorized
scope. A local script that is never run should not be described as CI enforcement.

Some rules remain review criteria because reliable automation is unavailable. State that limit
and record consequential enforcement gaps in the existing debt tracker. Avoid making a
brittle text-matching check stand in for semantic correctness.

## Make behavior inspectable

Determine what evidence an agent can obtain for the affected behavior and what is missing. Use
existing tools and test seams first. For requested harness improvements, choose the smallest
capability that closes a demonstrated feedback gap.

| Area                        | Useful evidence or capability                                                                            |
| --------------------------- | -------------------------------------------------------------------------------------------------------- |
| Backend behavior            | Deterministic fixtures, controllable clocks/peers, lifecycle outcomes, and reproducible failure cases    |
| UI behavior                 | Component/browser checks for interaction and accessibility; DOM inspection or screenshots when available |
| Native application behavior | A real process/IPC/window check and a documented manual smoke procedure when agents cannot drive it      |
| Diagnostics                 | Safe structured logs with operation/runtime correlation and observable recovery outcomes                 |
| Performance                 | A repeatable measurement with a stated workload, environment, metric, and acceptance threshold           |
| Parallel workspaces         | Separate state, ports, homes, and artifacts when isolated execution is needed                            |

Compare the claimed guarantee with the evidence. For example, a fake transport test can establish
ordering and stale-instance rejection; it cannot establish that a macOS child and its descendants
exit correctly. Record remaining native checks clearly.

Keep diagnostic paths and test hooks appropriate to the product's trust boundaries. Capture
useful outcomes without exposing credentials, user content, or raw sensitive payloads. Follow the
repository's security and logging guidance.

Worktree isolation is useful when otherwise shared state would contaminate runs. Inspect actual
state/configuration ownership before prescribing it. Do not automatically install browser tools,
add observability services, launch restricted development commands, or alter production wiring
merely because those capabilities might help. If a requested improvement needs unavailable access
or an external system, explain the specific missing capability and continue independent work.

## Improve the harness after demonstrated failures

When an agent or contributor repeatedly misses a constraint, investigate the cause before adding
more instructions:

- Was the relevant fact absent, misplaced, duplicated, or obsolete?
- Did the repository map make the right document discoverable for this task?
- Could an existing check have detected the mistake earlier?
- Did a failure message explain how to repair it?
- Was there enough evidence to distinguish success, partial progress, and uncertainty?

Fix the code defect and the contributing harness gap within the authorized scope. An effective
correction may be a better pointer, a focused current explanation, an actionable lint message, or
a regression test. Add guidance only when it changes future decisions; avoid growing AGENTS or
architecture with every observed failure. Record a larger unresolved improvement in the existing
debt tracker instead of silently expanding the task.

## Reconcile drift

For requested maintenance, examine the affected knowledge and its implementation together:

1. Compare current docs with owning source/configuration and available validation evidence.
2. Check duplicated claims, current-versus-proposed behavior, links, index membership, statuses,
   and supersession pointers. Include commands and version claims that commonly drift.
3. Repair the affected documents using [documentation guidance](documentation.md). Remove obsolete
   advice after checking its references and purpose.
4. Record concrete unresolved follow-up in the existing debt tracker. When findings change an
   existing quality assessment, reassess affected grades using the [quality guidance](quality.md).
5. Validate the changed artifacts and report the remaining limitations.

Keep maintenance focused on the requested area. Recurring maintenance is an option when the user asks
for it: define the target, cadence, evidence, and permitted actions before configuring automation.
This skill does not create scheduled jobs, open issues/MRs, message others, or relax review gates
as a side effect of maintenance.
