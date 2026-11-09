# Design change

A design helps a reviewer understand a proposed change, assess its decisions and judge whether
the approach is ready to develop. Use the [shared workflow](../references/workflow.md#determine-scope) to identify
the requested stage and [documentation guidance](../references/documentation.md) for document responsibilities.

## Understand the change

Start with the problem and intended outcome. Read the relevant product context, current behavior,
architecture and source to understand what needs to change and which constraints shape the solution.
Find an existing matching design when revising work so its decisions and open questions inform
the next iteration.

Establish the scope and the difference between the current and intended behavior. Identify whose
workflow changes, what the system must preserve, and which assumptions could affect the approach.

## Develop the approach

Work through the proposed behavior and its consequences for state, interfaces, ownership and
lifecycle. Explore significant alternatives where they expose a meaningful tradeoff. Choose an
approach that fits the problem and the existing system, and explain why its costs and limits are
acceptable.

Investigate uncertainties that could change those choices. Use source inspection, authoritative
documentation or a bounded prototype according to the question. Existing evidence may establish
the needed behavior without a runtime experiment. Let the findings refine the approach and expose
any remaining limits.

## Write the decision record

Organize the design around the decisions a reviewer needs to assess. Connect each significant
choice to the problem it solves, the evidence supporting it and its tradeoffs. Explain state and
interface changes at enough depth to make ownership and important behavior understandable.

Integrate research as the resulting understanding and constraints. Keep supporting sources,
relevant versions and evidence limits with the decisions they inform. Develop detailed delivery
work when moving into execution planning or implementation.

Use the repository's template and index conventions, adapting the sections to the change. In the
default layout, create `docs/design-docs/active/YYYY-MM-DD-<change>.md` as Draft and add its entry
to the active index. For revisions, update the matching document and preserve its creation date.

## Design readiness

Assess whether the evidence resolves questions that could invalidate the approach or materially
change its behavior, contracts or ownership. A reviewer should be able to understand why the
approach is viable, what it relies on and where its guarantees end.

When a material capability remains uncertain, keep the design Draft and explain the missing
evidence or decision. Resolve that gap within the authorized scope before using the design as an
implementation baseline. Readiness concerns the viability of the chosen solution; tests of the
finished implementation and native acceptance checks can remain pending.

## Accept the design baseline

Drafting a design leaves it Draft for review. When a plan change or exec change request authorizes
using it as the baseline, assess readiness, then mark a ready Draft design `Accepted`, update its
Last Updated date and align the design-index status. The same transition applies when executing
a design directly without a plan.

An Accepted or Implemented design can retain its status while its baseline remains valid.
Reassess affected decisions when new evidence reveals a feasibility gap. Acceptance records the
agreed baseline; further work follows the user's requested scope.

## Present and recommend the next step

Present the document's path, key decisions, readiness and any choices that need review. If a
feasibility gap remains, explain what evidence or decision would settle it.

For a ready design, recommend an execution plan when sequencing, dependencies or progress across
increments would help delivery. Recommend direct execution when the change can be implemented
and validated as one clear increment. Explain the recommendation, respect the user's preference
and continue into the next stage when it is already authorized.
