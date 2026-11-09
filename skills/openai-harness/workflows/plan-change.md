# Plan change

A plan turns an agreed design into work that can be delivered, checked and resumed. Use the
[shared workflow](../references/workflow.md#determine-scope) to identify the requested stage and
[documentation guidance](../references/documentation.md) for document responsibilities.

## Establish the baseline

Read the named design or find the matching design from the task context, then inspect the affected
code and current documentation. Identify the intended outcome, the important constraints and the
distance between the design and the implemented system. When revising a plan, use its actual
completed work, decisions and progress to understand what remains.

Apply the [design readiness and acceptance guidance](design-change.md#design-readiness) before
using the design as the plan's baseline. A material feasibility gap returns the affected decision
to design work. If a design is missing, use [design change](design-change.md) to establish it
within the authorized scope, or explain the prerequisite that prevents planning.

## Shape deliverable increments

Group work into phases that produce coherent behavior and leave a valid codebase. For a change
across process boundaries, an increment can deliver the contract, backend behavior and user
interaction together. Order increments by their actual dependencies and choose boundaries that
make progress useful to review and safe to resume.

Write steps around outcomes, important constraints and completion conditions. Use source
references where an exact contract, integration point or migration target makes the work clearer.
Link to the design for its reasoning and detailed behavior so the plan can focus on delivery.
Include current-document updates in the increment that changes the facts they describe.

Scale the plan to the work. A requested small plan can use a single checklist without phase
headings; execution treats that checklist as one phase, including validation and documentation.
Use a separate consolidation phase when cross-cutting work remains after the earlier increments.

## Define completion evidence

For each increment, identify the observable outcomes that show the accepted design has been
delivered. Select checks using the repository's testing guidance and current configuration.
Describe concrete behavioral coverage, applicable commands and any human acceptance procedures,
with enough context to understand what they establish and what remains unverified.

Make the handoff explicit: describe what evidence establishes a reviewable implementation and
which existing review or acceptance activities assess that result afterward. Classify checks by
their purpose using the repository's requirements; required delivery validation may include human
checks. This gives execution a basis for distinguishing remaining delivery work from acceptance
of a ready result.

Make validation part of completing the increment. Reserve later validation phases for checks that
need the combined result of earlier work. The plan develops and verifies a solution whose material
feasibility questions have already been resolved during design.

## Write or revise the plan

Use the repository's template and index conventions. Every plan identifies its existing baseline
in the **Design Doc** field. In the default layout, create
`docs/exec-plans/active/YYYY-MM-DD-<change>.md` as Active and add its index entry.

For a revision, update the existing plan in place. Preserve its creation date, completed work,
decisions and useful phase findings and validation. Consolidate progress using the
[progress-log guidance](../references/documentation.md#execution-plan-progress-logs), rather than retaining every
intermediate update. Adjust remaining steps, dependencies and validation to the
requested change and actual progress, and align the status, Last Updated date and index entry.

## Present the plan for review

Present the plan's path, delivery sequence, key dependencies and completion conditions. For a
single-checklist plan, summarize that increment. Highlight significant planning decisions and,
for a revision, explain how the remaining work changed. Continue into execution when that stage
is already authorized.
